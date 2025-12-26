import React, { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import QrScanner from 'qr-scanner';

interface CameraScannerProps {
  onScanResult: (text: string) => void;
  onClose: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onScanResult, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [scannedText, setScannedText] = useState<string>('');

  useEffect(() => {
    const initScanner = async () => {
      try {
        if (!videoRef.current) return;

        console.log('Initializing QR Scanner...');

        // Create new scanner instance with improved settings
        const newScanner = new QrScanner(
          videoRef.current,
          (result) => {
            console.log('QR Code detected:', result.data);
            setScannedText(result.data);
            // Automatically process the scanned QR code
            onScanResult(result.data);
          },
          {
            onDecodeError: (error) => {
              // Silently ignore decode errors (normal for video scanning)
              const errorMsg = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
              console.debug('QR decode error:', errorMsg);
            },
            maxScansPerSecond: 10, // Increased from 5 for better detection
            highlightScanRegion: true, // Show scan region
            highlightCodeOutline: true, // Show code outline
            preferredCamera: 'environment', // Use back camera on mobile
          }
        );

        setScanner(newScanner);
        setIsLoading(false);
        setError('');

        // Start scanning
        console.log('Starting scanner...');
        await newScanner.start();
        console.log('Scanner started successfully');
      } catch (err) {
        console.error('Scanner initialization error:', err);
        const errorMsg =
          err instanceof Error ? err.message : 'Failed to initialize camera. Please check permissions.';
        setError(errorMsg);
        setIsLoading(false);
      }
    };

    initScanner();

    // Cleanup
    return () => {
      if (scanner) {
        console.log('Destroying scanner');
        scanner.destroy();
      }
    };
  }, [onScanResult]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-darker border-2 border-cyber-neon-cyan rounded-lg w-full max-w-sm overflow-hidden font-cyber">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-cyber-darker border-b border-cyber-border">
          <h3 className="text-lg font-bold text-cyber-neon-cyan uppercase flex items-center gap-2">
            <Camera size={20} />
            Scan QR Code
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyber-border rounded transition-colors"
          >
            <X size={20} className="text-cyber-neon-cyan" />
          </button>
        </div>

        {/* Camera View */}
        <div className="relative w-full bg-black aspect-square">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-neon-cyan mb-2" />
                <p className="text-cyber-neon-cyan text-sm">Initializing camera...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4">
              <div className="text-center">
                <p className="text-cyber-neon-pink font-bold mb-2">Camera Error</p>
                <p className="text-xs text-white mb-4">{error}</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-cyber-neon-pink text-cyber-darker font-bold rounded text-xs hover:opacity-80 transition-opacity"
                >
                  Close Scanner
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ display: error ? 'none' : 'block' }}
          />

          {/* Scan Guide */}
          {!error && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-64 h-64 border-2 border-cyber-neon-cyan">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-neon-cyan" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-neon-cyan" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-neon-cyan" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-neon-cyan" />
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-cyber-darker border-t border-cyber-border space-y-2">
          <p className="text-xs text-cyber-neon-cyan text-center font-bold">
            Point your camera at the QR code on the ID card
          </p>
          <p className="text-xs text-cyber-neon-yellow text-center">
            🎯 Center the QR code in the scan area
          </p>
          {scannedText && (
            <div className="mt-3 p-2 bg-cyber-neon-green bg-opacity-20 border border-cyber-neon-green rounded text-xs text-cyber-neon-green font-bold text-center">
              ✅ QR Code detected! Processing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
