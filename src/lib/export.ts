import type { Identity } from '../types';
import * as html2canvas from 'html-to-image';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { createVerificationData } from './verification';

export async function exportCardAsPNG(
  cardElement: HTMLElement,
  filename: string = 'shadowrun-id.png'
): Promise<void> {
  try {
    const dataUrl = await html2canvas.toPng(cardElement, {
      backgroundColor: '#050810',
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting PNG:', error);
    throw new Error('Failed to export card as PNG');
  }
}

export async function exportCardAsPDF(
  cardElement: HTMLElement,
  filename: string = 'shadowrun-id.pdf'
): Promise<void> {
  try {
    const canvas = await html2canvas.toCanvas(cardElement, {
      backgroundColor: '#050810',
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgData = canvas.toDataURL('image/png');

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let width = pdfWidth * 0.9;
    let height = width / ratio;

    if (height > pdfHeight * 0.8) {
      height = pdfHeight * 0.8;
      width = height * ratio;
    }

    const x = (pdfWidth - width) / 2;
    const y = (pdfHeight - height) / 2;

    pdf.addImage(imgData, 'PNG', x, y, width, height);

    pdf.setFontSize(8);
    pdf.setTextColor(200, 0, 110);
    pdf.text(
      'This is a fictional Shadowrun roleplay prop. Not valid identification.',
      pdf.internal.pageSize.getWidth() / 2,
      pdf.internal.pageSize.getHeight() - 5,
      { align: 'center' }
    );

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export card as PDF');
  }
}

export function exportAsJSON(identity: Identity, filename: string = 'identity.json'): void {
  const dataStr = JSON.stringify(identity, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function importFromJSON(file: File): Promise<Identity> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const identity = JSON.parse(e.target?.result as string) as Identity;
        resolve(identity);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}

export async function generateQRCodeDataUrl(identity: Identity): Promise<string> {
  const qrData = createVerificationData(identity);

  try {
    const dataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
      width: 300,
      margin: 1,
      color: {
        dark: '#00f0ff',
        light: '#050810',
      },
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export function generateBarcode(uniqueId: string): string {
  const barcodeChars = uniqueId
    .replace(/[^0-9]/g, '')
    .slice(0, 12)
    .padEnd(12, '0');
  return barcodeChars;
}
