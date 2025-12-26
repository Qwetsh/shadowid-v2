import React, { useState } from 'react';
import type { Identity, Theme, CornerStyle } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EditorPanelProps {
  identity: Identity;
  onIdentityChange: (identity: Identity) => void;
  onRandomize: () => void;
  onLoadTemplate: (templateName: string) => void;
  templateNames: string[];
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cyber-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-cyber-border transition-colors"
      >
        <span className="text-sm font-bold text-cyber-neon-cyan uppercase tracking-wider">
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-cyber-neon-cyan" />
        ) : (
          <ChevronDown size={16} className="text-cyber-neon-cyan" />
        )}
      </button>
      {open && <div className="px-4 py-3 space-y-3 bg-cyber-darker bg-opacity-50">{children}</div>}
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  tooltip?: string;
}> = ({ label, value, onChange, type = 'text', tooltip }) => (
  <div className="space-y-1">
    <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
      {label}
      {tooltip && <span title={tooltip} className="ml-1 text-cyber-neon-pink cursor-help">?</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none"
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  tooltip?: string;
}> = ({ label, value, options, onChange, tooltip }) => (
  <div className="space-y-1">
    <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
      {label}
      {tooltip && <span title={tooltip} className="ml-1 text-cyber-neon-pink cursor-help">?</span>}
    </label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const NumberField: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  tooltip?: string;
}> = ({ label, value, onChange, min, max, tooltip }) => (
  <div className="space-y-1">
    <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
      {label}
      {tooltip && <span title={tooltip} className="ml-1 text-cyber-neon-pink cursor-help">?</span>}
    </label>
    <input
      type="number"
      value={value}
      onChange={e => onChange(parseInt(e.target.value) || 0)}
      min={min}
      max={max}
      className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none"
    />
  </div>
);

const Button: React.FC<{
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}> = ({ label, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-cyber-neon-cyan text-cyber-darker hover:bg-opacity-80',
    secondary: 'border border-cyber-neon-cyan text-cyber-neon-cyan hover:bg-cyber-neon-cyan hover:text-cyber-darker',
    danger: 'bg-cyber-neon-pink text-white hover:bg-opacity-80',
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export const EditorPanel: React.FC<EditorPanelProps> = ({
  identity,
  onIdentityChange,
  onRandomize,
  onLoadTemplate,
  templateNames,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleChange = (field: keyof Identity, value: any) => {
    onIdentityChange({ ...identity, [field]: value });
  };

  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
    onLoadTemplate(templateName);
  };

  const metatypes: Identity['metatype'][] = ['Human', 'Elf', 'Ork', 'Troll', 'Dwarf', 'Other'];
  const statuses: Identity['status'][] = ['Valid', 'Suspended', 'Burned'];
  const themes: Theme[] = ['Neon Rain', 'Red Samurai', 'Arcology', 'Street Doc', 'Black ICE'];
  const cornerStyles: CornerStyle[] = ['sharp', 'rounded', 'chamfer'];
  const nationalities = [
    'UCAS',
    'Aztlan',
    'Tír na nÓg',
    'Tír Tairngire',
    'Free City of Singapore',
    'Free Hold',
    'Corporate Arcology',
    'Unknown',
  ];

  return (
    <div className="h-full overflow-y-auto bg-cyber-darker border-r border-cyber-border font-cyber text-sm">
      {/* Quick Actions */}
      <div className="p-4 border-b border-cyber-border space-y-2 bg-cyber-darker">
        <Button label="Randomize" onClick={onRandomize} variant="primary" className="w-full" />
        <SelectField
          label="Load Template"
          value={selectedTemplate}
          options={templateNames}
          onChange={handleTemplateChange}
        />
      </div>

      {/* Identity Info */}
      <CollapsibleSection title="Identity Info" defaultOpen={true}>
        <InputField
          label="Full Name"
          value={identity.fullName}
          onChange={v => handleChange('fullName', v)}
          tooltip="Legal name on SIN"
        />
        <InputField
          label="Alias / Handle"
          value={identity.alias}
          onChange={v => handleChange('alias', v)}
          tooltip="Street name or handle"
        />
        <SelectField
          label="Metatype"
          value={identity.metatype}
          options={metatypes}
          onChange={v => handleChange('metatype', v as Identity['metatype'])}
        />
        <SelectField
          label="Nationality"
          value={identity.nationality}
          options={nationalities}
          onChange={v => handleChange('nationality', v)}
        />
      </CollapsibleSection>

      {/* Portrait Image */}
      <CollapsibleSection title="Portrait Image" defaultOpen={false}>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Upload Portrait
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const base64 = event.target?.result as string;
                  handleChange('portraitImage', base64);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-2 text-xs text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none"
          />
          {identity.portraitImage && (
            <div className="mt-2 space-y-2">
              <img
                src={identity.portraitImage}
                alt="Portrait preview"
                className="w-full h-32 object-cover rounded border border-cyber-border"
              />
              <button
                onClick={() => handleChange('portraitImage', undefined)}
                className="w-full px-2 py-1 bg-cyber-neon-pink text-cyber-darker font-bold rounded text-xs hover:opacity-80 transition-opacity"
              >
                Remove Portrait
              </button>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Corporate & Ratings */}
      <CollapsibleSection title="Corporate & Ratings">
        <InputField
          label="Corporate Affiliation"
          value={identity.corporateAffiliation}
          onChange={v => handleChange('corporateAffiliation', v)}
          tooltip="Empty if independent"
        />
        <NumberField
          label="SIN Rating"
          value={identity.sinRating}
          onChange={v => handleChange('sinRating', v)}
          min={1}
          max={6}
          tooltip="1-6, higher = better"
        />
        <NumberField
          label="Cred Rating"
          value={identity.credRating}
          onChange={v => handleChange('credRating', v)}
          min={0}
          max={10}
          tooltip="Street reputation"
        />
        <NumberField
          label="Clearance Level"
          value={identity.clearanceLevel}
          onChange={v => handleChange('clearanceLevel', v)}
          min={0}
          max={5}
          tooltip="0=None, 5=Top Secret"
        />
      </CollapsibleSection>

      {/* Dates & Identity */}
      <CollapsibleSection title="Dates & Identity">
        <InputField
          label="Date of Birth"
          value={identity.dateOfBirth}
          onChange={v => handleChange('dateOfBirth', v)}
          type="date"
        />
        <InputField
          label="Issue Date"
          value={identity.issueDate}
          onChange={v => handleChange('issueDate', v)}
          type="date"
        />
        <InputField
          label="Expiration Date"
          value={identity.expirationDate}
          onChange={v => handleChange('expirationDate', v)}
          type="date"
        />
        <InputField
          label="Unique ID"
          value={identity.uniqueId}
          onChange={v => handleChange('uniqueId', v)}
          tooltip="Auto-generated, edit if needed"
        />
        <InputField
          label="Biometric Hash"
          value={identity.biometricHash}
          onChange={v => handleChange('biometricHash', v)}
          tooltip="Auto-generated on randomize"
        />
      </CollapsibleSection>

      {/* Location & Tags */}
      <CollapsibleSection title="Location & Tags">
        <InputField
          label="Address / District"
          value={identity.address}
          onChange={v => handleChange('address', v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            License Tags (comma-separated)
          </label>
          <textarea
            value={identity.licenseTags.join(', ')}
            onChange={e => handleChange('licenseTags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none resize-none h-16"
          />
        </div>
      </CollapsibleSection>

      {/* Languages & Augmentations */}
      <CollapsibleSection title="Languages & Augmentations">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Languages (comma-separated)
          </label>
          <textarea
            value={identity.languages.join(', ')}
            onChange={e => handleChange('languages', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none resize-none h-12"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Augmentations (comma-separated)
          </label>
          <textarea
            value={identity.augmentations.join(', ')}
            onChange={e => handleChange('augmentations', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none resize-none h-12"
          />
        </div>
      </CollapsibleSection>

      {/* Status & Notes */}
      <CollapsibleSection title="Status & Notes">
        <SelectField
          label="Status"
          value={identity.status}
          options={statuses}
          onChange={v => handleChange('status', v as Identity['status'])}
          tooltip="Valid/Suspended/Burned"
        />
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Notes / Flags
          </label>
          <textarea
            value={identity.notes}
            onChange={e => handleChange('notes', e.target.value)}
            className="w-full bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber focus:border-cyber-neon-cyan focus:outline-none resize-none h-16"
          />
        </div>
      </CollapsibleSection>

      {/* Theming */}
      <CollapsibleSection title="Theme & Visuals">
        <SelectField
          label="Theme"
          value={identity.theme}
          options={themes}
          onChange={v => handleChange('theme', v as Theme)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Accent Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={identity.accentColor}
              onChange={e => handleChange('accentColor', e.target.value)}
              className="h-10 w-16 border border-cyber-border rounded cursor-pointer"
            />
            <input
              type="text"
              value={identity.accentColor}
              onChange={e => handleChange('accentColor', e.target.value)}
              className="flex-1 bg-cyber-darker border border-cyber-border rounded px-2 py-1 text-sm text-white font-cyber"
            />
          </div>
        </div>
        <SelectField
          label="Corner Style"
          value={identity.cornerStyle}
          options={cornerStyles}
          onChange={v => handleChange('cornerStyle', v as CornerStyle)}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={identity.showHologram}
            onChange={e => handleChange('showHologram', e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-xs font-bold text-cyber-neon-cyan uppercase">Show Hologram</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={identity.includeQRCode}
            onChange={e => handleChange('includeQRCode', e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-xs font-bold text-cyber-neon-cyan uppercase">Include QR Code</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={identity.includeBarcode}
            onChange={e => handleChange('includeBarcode', e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-xs font-bold text-cyber-neon-cyan uppercase">Include Barcode</span>
        </label>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-cyber-neon-cyan uppercase">
            Glitch Intensity: {(identity.glitchIntensity * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={identity.glitchIntensity}
            onChange={e => handleChange('glitchIntensity', parseFloat(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>
      </CollapsibleSection>

      {/* Padding at bottom */}
      <div className="h-4" />
    </div>
  );
};
