import type { Identity } from '../types';

// Generate a simple checksum for verification
export function generateVerificationCode(identity: Identity): string {
  const dataToSign = `${identity.fullName}|${identity.uniqueId}|${identity.sinRating}`;
  let hash = 0;
  for (let i = 0; i < dataToSign.length; i++) {
    const char = dataToSign.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
}

// Verification data structure for QR codes
export interface VerificationData {
  name: string;
  alias: string;
  sinId: string;
  metatype: string;
  status: string;
  sinRating: number;
  verificationCode: string;
}

// Create verification data with checksum
export function createVerificationData(identity: Identity): VerificationData {
  return {
    name: identity.fullName,
    alias: identity.alias,
    sinId: identity.uniqueId,
    metatype: identity.metatype,
    status: identity.status,
    sinRating: identity.sinRating,
    verificationCode: generateVerificationCode(identity),
  };
}

// Verify QR code data
export function verifyQRData(qrData: VerificationData): {
  isValid: boolean;
  message: string;
  color: string;
} {
  // Create a temporary identity-like object to generate verification code
  const tempData = `${qrData.name}|${qrData.sinId}|${qrData.sinRating}`;
  let hash = 0;
  for (let i = 0; i < tempData.length; i++) {
    const char = tempData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const expectedCode = Math.abs(hash).toString(16).substring(0, 8).toUpperCase();

  const isValid = qrData.verificationCode === expectedCode;

  return {
    isValid,
    message: isValid ? 'QR Code signature valid' : 'QR Code signature invalid',
    color: isValid ? '#39ff14' : '#ff006e',
  };
}

// Determine if ID is detected as fake based on SIN rating
export function checkIDAuthenticity(sinRating: number): {
  isFake: boolean;
  probability: number;
  result: string;
} {
  // Higher SIN rating = lower chance of being detected as fake
  // SIN 1 = 83% chance of detection
  // SIN 6 = 0% chance of detection
  const detectionChance = (6 - sinRating) / 6;
  const roll = Math.random();
  const isFake = roll < detectionChance;

  return {
    isFake,
    probability: detectionChance * 100,
    result: isFake ? 'FAKE ID DETECTED' : 'ID AUTHENTIC',
  };
}
