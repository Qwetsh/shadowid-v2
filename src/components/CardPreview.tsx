import React, { useState, useRef } from 'react';
import type { Identity, Status } from '../types';
import { generateQRCodeDataUrl, generateBarcode } from '../lib/export';

interface CardPreviewProps {
  identity: Identity;
}

const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'Valid':
      return '#39ff14';
    case 'Suspended':
      return '#ffed4e';
    case 'Burned':
      return '#ff006e';
  }
};

export const CardPreview: React.FC<CardPreviewProps> = ({
  identity,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  React.useEffect(() => {
    if (identity.includeQRCode) {
      generateQRCodeDataUrl(identity).then(setQrCode).catch(console.error);
    }
  }, [identity]);

  const statusColor = getStatusColor(identity.status);
  const barcode = generateBarcode(identity.uniqueId);

  const cornerStyle = {
    sharp: 'rounded-none',
    rounded: 'rounded-xl',
    chamfer: 'rounded-lg',
  }[identity.cornerStyle];

  return (
    <div className="h-full flex flex-col gap-4 pb-4">
      <div
        ref={cardRef}
        className={`
          flex-1 min-h-0
          relative
          rounded-xl overflow-hidden
          border-2
          transition-all duration-300
          ${cornerStyle}
        `}
        style={{
          borderColor: identity.accentColor,
          backgroundColor: '#050810',
          backgroundImage: `
            linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%),
            repeating-linear-gradient(
              0deg,
              rgba(0, 240, 255, 0.03) 0px,
              rgba(0, 240, 255, 0.03) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          boxShadow: identity.status === 'Burned' ? `0 0 30px ${statusColor}` : 'none',
        }}
      >
        {/* Hologram overlay */}
        {identity.showHologram && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 240, 255, 0.1) 2px,
                    rgba(0, 240, 255, 0.1) 4px
                  )
                `,
              }}
            />
          </div>
        )}

        {/* Glitch effect container */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            animation:
              identity.glitchIntensity > 0.2
                ? `glitch ${0.3 + (1 - identity.glitchIntensity) * 0.5}s infinite`
                : 'none',
          }}
        />

        {/* Card Content */}
        <div className="relative h-full flex flex-col p-6 font-cyber text-xs overflow-y-auto">
          {/* Status Indicator */}
          <div className="mb-4 flex items-center justify-between">
            <div
              className="px-3 py-1 font-bold uppercase tracking-wider"
              style={{
                color: statusColor,
                textShadow: `0 0 10px ${statusColor}`,
              }}
            >
              {identity.status}
            </div>
            <div
              className="text-xs opacity-60"
              style={{ color: identity.accentColor }}
            >
              SIN VALID
            </div>
          </div>

          {/* Portrait Image */}
          {identity.portraitImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={identity.portraitImage}
                alt="Portrait"
                className="w-24 h-24 object-cover rounded border-2"
                style={{ borderColor: identity.accentColor }}
              />
            </div>
          )}

          {/* Header Section */}
          <div className="mb-4 pb-3 border-b border-opacity-30" style={{ borderColor: identity.accentColor }}>
            <div style={{ color: identity.accentColor }} className="font-bold text-lg uppercase mb-1">
              {identity.fullName}
            </div>
            <div style={{ color: identity.accentColor }} className="text-xs opacity-70">
              HANDLE: {identity.alias}
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                METATYPE
              </div>
              <div className="font-bold">{identity.metatype}</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                NATIONALITY
              </div>
              <div className="font-bold text-xs">{identity.nationality.substring(0, 20)}</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                CORP
              </div>
              <div className="font-bold text-xs">{identity.corporateAffiliation || '—'}</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                SIN RATING
              </div>
              <div className="font-bold">{identity.sinRating}/6</div>
            </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs border-t border-opacity-30 pt-3" style={{ borderColor: identity.accentColor }}>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                DOB
              </div>
              <div className="font-bold">{identity.dateOfBirth}</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                CLEARANCE
              </div>
              <div className="font-bold">{identity.clearanceLevel}/5</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                ISSUE
              </div>
              <div className="font-bold text-xs">{identity.issueDate}</div>
            </div>
            <div>
              <div className="opacity-60" style={{ color: identity.accentColor }}>
                EXPIRES
              </div>
              <div className="font-bold text-xs">{identity.expirationDate}</div>
            </div>
          </div>

          {/* ID & Hash */}
          <div className="mb-4 text-xs border-t border-opacity-30 pt-3" style={{ borderColor: identity.accentColor }}>
            <div className="opacity-60 mb-1" style={{ color: identity.accentColor }}>
              UNIQUE ID
            </div>
            <div className="font-bold font-cyber break-all text-xs">{identity.uniqueId}</div>
            <div className="opacity-60 mt-2 mb-1" style={{ color: identity.accentColor }}>
              BIO HASH
            </div>
            <div className="font-bold font-cyber text-xs">{identity.biometricHash.substring(0, 16)}...</div>
          </div>

          {/* Tags & Languages */}
          {(identity.licenseTags.length > 0 || identity.languages.length > 0 || identity.augmentations.length > 0) && (
            <div className="mb-4 text-xs border-t border-opacity-30 pt-3" style={{ borderColor: identity.accentColor }}>
              {identity.licenseTags.length > 0 && (
                <>
                  <div className="opacity-60" style={{ color: identity.accentColor }}>
                    LICENSES
                  </div>
                  <div className="font-bold text-xs mb-2">{identity.licenseTags.join(', ')}</div>
                </>
              )}
              {identity.languages.length > 0 && (
                <>
                  <div className="opacity-60" style={{ color: identity.accentColor }}>
                    LANGUAGES
                  </div>
                  <div className="font-bold text-xs mb-2">{identity.languages.join(', ')}</div>
                </>
              )}
              {identity.augmentations.length > 0 && (
                <>
                  <div className="opacity-60" style={{ color: identity.accentColor }}>
                    AUGMENTATIONS
                  </div>
                  <div className="font-bold text-xs">{identity.augmentations.join(', ')}</div>
                </>
              )}
            </div>
          )}

          {/* QR Code */}
          {qrCode && (
            <div className="mb-4 flex justify-center">
              <img src={qrCode} alt="QR Code" className="w-32 h-32 border" style={{ borderColor: identity.accentColor }} />
            </div>
          )}

          {/* Barcode */}
          {identity.includeBarcode && (
            <div className="mb-4 flex items-center justify-center gap-1 py-2 border-t border-opacity-30" style={{ borderColor: identity.accentColor }}>
              {barcode.split('').map((digit, i) => (
                <div
                  key={i}
                  className="w-1 bg-current"
                  style={{ height: digit === '1' ? '20px' : '12px', color: identity.accentColor }}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-opacity-30 text-xs" style={{ borderColor: identity.accentColor }}>
            <div className="text-center opacity-50" style={{ color: identity.accentColor }}>
              SHADOWRUN IDENTITY DOCUMENT
            </div>
            <div className="text-center text-xs opacity-40 mt-1" style={{ color: identity.accentColor }}>
              Fictional prop — not valid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
