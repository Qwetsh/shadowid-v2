import React, { useState } from 'react';
import { QrCode, ArrowLeft, Camera } from 'lucide-react';
import type { VerificationData } from '../lib/verification';
import { verifyQRData, checkIDAuthenticity } from '../lib/verification';
import { CameraScanner } from './CameraScanner';

interface GMVerificationProps {
  onClose: () => void;
}

export const GMVerification: React.FC<GMVerificationProps> = ({ onClose }) => {
  const [qrData, setQrData] = useState<VerificationData | null>(null);
  const [result, setResult] = useState<{
    isFake: boolean;
    probability: number;
    result: string;
  } | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<{
    isValid: boolean;
    message: string;
    color: string;
  } | null>(null);
  const [error, setError] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [showScanner, setShowScanner] = useState(false);

  const handleScanResult = (text: string) => {
    try {
      setError('');
      setResult(null);
      const data = JSON.parse(text) as VerificationData;
      setQrData(data);

      // Verify the QR code signature
      const verification = verifyQRData(data);
      setVerificationStatus(verification);

      // Check authenticity based on SIN rating
      if (verification.isValid) {
        const authenticity = checkIDAuthenticity(data.sinRating);
        setResult(authenticity);
      }
    } catch (err) {
      setError('Invalid QR code data. Please scan a valid ShadowID card.');
      setQrData(null);
      setResult(null);
      setVerificationStatus(null);
    }
  };

  const handleJsonInput = () => {
    if (!jsonInput.trim()) {
      setError('Please paste QR code data');
      return;
    }
    handleScanResult(jsonInput);
    setJsonInput('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-darker border-2 border-cyber-neon-cyan rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto font-cyber">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-cyber-neon-cyan uppercase">GM ID Verification</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyber-border rounded transition-colors"
            title="Close"
          >
            <ArrowLeft size={20} className="text-cyber-neon-cyan" />
          </button>
        </div>

        {/* Instructions */}
        {!qrData && !result && (
          <div className="space-y-4 mb-6 text-sm text-cyber-neon-cyan">
            <p className="font-bold text-cyber-neon-pink">📱 How to Use:</p>
            <ol className="list-decimal list-inside space-y-2 text-xs">
              <li>Ask the player to show you their ID card</li>
              <li>Scan the QR code with your phone camera</li>
              <li>Copy the data and paste it below</li>
              <li>The system will verify authenticity</li>
            </ol>
            <p className="text-xs text-cyber-neon-yellow">
              💡 Lower SIN ratings have higher detection chances!
            </p>
          </div>
        )}

        {/* QR Data Input */}
        {!result && (
          <div className="space-y-3 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setShowScanner(true)}
                className="flex-1 px-4 py-2 bg-cyber-neon-green text-cyber-darker font-bold rounded hover:opacity-80 transition-opacity uppercase text-sm flex items-center justify-center gap-2"
              >
                <Camera size={16} />
                Scan Camera
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyber-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-cyber-darker text-cyber-neon-cyan">OR</span>
              </div>
            </div>

            <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
              <QrCode size={16} className="inline mr-2" />
              Paste QR Code Data
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste the decoded QR code JSON here...'
              className="w-full h-24 bg-cyber-darker border border-cyber-border rounded px-2 py-2 text-xs text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none"
            />
            <button
              onClick={handleJsonInput}
              className="w-full px-4 py-2 bg-cyber-neon-cyan text-cyber-darker font-bold rounded hover:opacity-80 transition-opacity uppercase text-sm"
            >
              Verify QR Code
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-cyber-neon-pink bg-opacity-20 border border-cyber-neon-pink rounded text-cyber-neon-pink text-xs">
            {error}
          </div>
        )}

        {/* Verification Status */}
        {verificationStatus && (
          <div
            className="mb-4 p-3 rounded text-xs font-bold"
            style={{
              backgroundColor: verificationStatus.color + '20',
              borderColor: verificationStatus.color,
              borderWidth: '2px',
              color: verificationStatus.color,
            }}
          >
            {verificationStatus.message}
          </div>
        )}

        {/* QR Data Display */}
        {qrData && (
          <div className="space-y-3 mb-6 p-4 bg-cyber-darker border border-cyber-border rounded text-xs">
            <div>
              <span className="text-cyber-neon-cyan font-bold">Name:</span>
              <span className="ml-2">{qrData.name}</span>
            </div>
            <div>
              <span className="text-cyber-neon-cyan font-bold">Alias:</span>
              <span className="ml-2">{qrData.alias}</span>
            </div>
            <div>
              <span className="text-cyber-neon-cyan font-bold">SIN ID:</span>
              <span className="ml-2 font-cyber text-xs">{qrData.sinId}</span>
            </div>
            <div>
              <span className="text-cyber-neon-cyan font-bold">Metatype:</span>
              <span className="ml-2">{qrData.metatype}</span>
            </div>
            <div>
              <span className="text-cyber-neon-cyan font-bold">SIN Rating:</span>
              <span className="ml-2">{qrData.sinRating}/6</span>
            </div>
            <div>
              <span className="text-cyber-neon-cyan font-bold">Status:</span>
              <span className="ml-2">{qrData.status}</span>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {result && (
          <div className="space-y-4">
            {/* Big Result Display */}
            <div
              className="p-6 rounded border-2 text-center"
              style={{
                backgroundColor: result.isFake ? '#ff006e30' : '#39ff1430',
                borderColor: result.isFake ? '#ff006e' : '#39ff14',
              }}
            >
              <div
                className="text-3xl font-bold uppercase mb-3"
                style={{
                  color: result.isFake ? '#ff006e' : '#39ff14',
                  textShadow: `0 0 20px ${result.isFake ? '#ff006e' : '#39ff14'}`,
                }}
              >
                {result.result}
              </div>
              <div className="text-xs text-cyber-neon-cyan">
                Detection Probability: {result.probability.toFixed(0)}%
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-3 bg-cyber-border bg-opacity-30 rounded text-xs text-cyber-neon-yellow">
              <p className="font-bold mb-2">🎲 System Note:</p>
              <p>
                {result.probability === 0
                  ? 'This is a high-quality SIN. Almost impossible to fake detect.'
                  : result.probability < 33
                    ? 'This SIN passes most casual inspections.'
                    : result.probability < 66
                      ? 'This SIN has visible flaws under inspection.'
                      : 'This SIN is clearly fraudulent.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setQrData(null);
                  setResult(null);
                  setVerificationStatus(null);
                }}
                className="flex-1 px-4 py-2 bg-cyber-neon-cyan text-cyber-darker font-bold rounded hover:opacity-80 transition-opacity uppercase text-xs"
              >
                Verify Another
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-cyber-border text-cyber-neon-cyan font-bold rounded hover:opacity-80 transition-opacity uppercase text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Camera Scanner Modal */}
        {showScanner && (
          <CameraScanner
            onScanResult={handleScanResult}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </div>
  );
};
