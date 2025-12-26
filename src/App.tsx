import React, { useState, useEffect, useRef } from 'react';
import type { Identity } from './types';
import { EditorPanel } from './components/EditorPanel';
import { CardPreview } from './components/CardPreview';
import { ValidationPanel } from './components/ValidationPanel';
import { GMVerification } from './components/GMVerification';
import { validateIdentity } from './lib/rules';
import { generateRandomIdentity, getTemplates } from './lib/generators';
import { exportCardAsPNG, exportCardAsPDF, exportAsJSON, importFromJSON } from './lib/export';
import { Download, Upload, RotateCcw, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useIsMobile } from './hooks/useIsMobile';
import './index.css';

const DEFAULT_IDENTITY: Identity = {
  id: crypto.randomUUID(),
  fullName: 'James Morrison',
  alias: 'Zero',
  metatype: 'Human',
  nationality: 'UCAS',
  corporateAffiliation: 'Ares Macrotechnology',
  sinRating: 3,
  credRating: 5,
  dateOfBirth: '2050-06-15',
  issueDate: '2076-01-01',
  expirationDate: '2081-01-01',
  address: '4521 Downtown Core, Seattle',
  licenseTags: ['Firearms Permit (Class A)', 'Corporate Security Clearance'],
  biometricHash: 'DEADBEEFCAFEBABE1234567',
  clearanceLevel: 2,
  uniqueId: 'SIN-ARES-2050061500001',
  notes: 'Corporate SIN - Street legitimate',
  languages: ['English', 'Japanese'],
  augmentations: ['Datajack', 'Wired Reflexes'],
  status: 'Valid',
  theme: 'Neon Rain',
  accentColor: '#00f0ff',
  cornerStyle: 'chamfer',
  showHologram: true,
  glitchIntensity: 0.3,
  includeQRCode: true,
  includeBarcode: true,
};

const STORAGE_KEY = 'shadowrun-identity-v1';

function App() {
  const [identity, setIdentity] = useState<Identity>(DEFAULT_IDENTITY);
  const [showPreview, setShowPreview] = useState(true);
  const [showGMVerification, setShowGMVerification] = useState(false);
  const [issues, setIssues] = useState(validateIdentity(identity));
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const templates = getTemplates();
  const isMobile = useIsMobile();

  // Auto-show GM Verify on mobile
  useEffect(() => {
    if (isMobile) {
      setShowGMVerification(true);
    }
  }, [isMobile]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        setIdentity(loaded);
      } catch (e) {
        console.error('Failed to load saved identity:', e);
      }
    }
  }, []);

  // Update validation whenever identity changes
  useEffect(() => {
    setIssues(validateIdentity(identity));
  }, [identity]);

  // Save to localStorage whenever identity changes
  // Note: portraitImage is excluded to avoid exceeding localStorage quota
  useEffect(() => {
    const { portraitImage, ...identityWithoutImage } = identity;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(identityWithoutImage));
  }, [identity]);

  const handleIdentityChange = (newIdentity: Identity) => {
    setIdentity(newIdentity);
  };

  const handleRandomize = () => {
    const newIdentity = generateRandomIdentity();
    setIdentity({ ...newIdentity, id: identity.id });
  };

  const handleLoadTemplate = (templateName: string) => {
    if (templateName) {
      const template = templates.find(t => t.name === templateName);
      if (template) {
        const newIdentity = template.getIdentity();
        setIdentity({ ...newIdentity, id: identity.id });
      }
    }
  };

  const handleExportPNG = async () => {
    if (cardRef.current) {
      try {
        await exportCardAsPNG(cardRef.current, `shadowrun-id-${identity.uniqueId}.png`);
      } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export PNG');
      }
    }
  };

  const handleExportPDF = async () => {
    if (cardRef.current) {
      try {
        await exportCardAsPDF(cardRef.current, `shadowrun-id-${identity.uniqueId}.pdf`);
      } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export PDF');
      }
    }
  };

  const handleExportJSON = () => {
    // Export without portrait image to keep file size manageable
    const { portraitImage, ...identityWithoutImage } = identity;
    exportAsJSON(identityWithoutImage as Identity, `identity-${identity.uniqueId}.json`);
    alert('Portrait image not included in JSON export. It will need to be re-uploaded after import.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importFromJSON(file)
        .then(imported => {
          // Preserve current portrait image when importing
          setIdentity({ ...imported, id: identity.id, portraitImage: identity.portraitImage });
          alert('Identity loaded successfully');
        })
        .catch(error => {
          console.error('Import failed:', error);
          alert('Failed to import identity');
        });
    }
  };

  const handleReset = () => {
    if (confirm('Reset to default identity?')) {
      setIdentity(DEFAULT_IDENTITY);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark to-cyber-darker text-white font-cyber">
      {/* Mobile: Show only GM Verification */}
      {isMobile ? (
        <div className="w-full h-screen flex flex-col">
          {showGMVerification && <GMVerification onClose={() => setShowGMVerification(false)} isMobile={true} />}
        </div>
      ) : (
        /* Desktop: Show full app */
        <>
     

          {/* Header */}
          <header className="border-b border-cyber-border bg-cyber-darker">
            <div className="max-w-[1800px] mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold text-cyber-neon-cyan uppercase tracking-wider">
                    ShadowID v2
                  </h1>
                  <p className="text-xs text-cyber-neon-pink mt-1">Shadowrun Identity Generator</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border border-cyber-neon-cyan text-cyber-neon-cyan hover:bg-cyber-neon-cyan hover:text-cyber-darker transition-all flex items-center gap-1"
                  >
                    {showPreview ? <Eye size={16} /> : <EyeOff size={16} />}
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>

                  <button
                    onClick={handleExportPNG}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-cyber-neon-cyan text-cyber-darker hover:bg-opacity-80 transition-all flex items-center gap-1"
                  >
                    <Download size={16} />
                    Export PNG
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-cyber-neon-purple text-white hover:bg-opacity-80 transition-all flex items-center gap-1"
                  >
                    <Download size={16} />
                    Export PDF
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border border-cyber-neon-green text-cyber-neon-green hover:bg-cyber-neon-green hover:text-cyber-darker transition-all flex items-center gap-1"
                  >
                    <Download size={16} />
                    Export JSON
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border border-cyber-neon-yellow text-cyber-neon-yellow hover:bg-cyber-neon-yellow hover:text-cyber-darker transition-all flex items-center gap-1"
                  >
                    <Upload size={16} />
                    Import JSON
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border border-cyber-neon-pink text-cyber-neon-pink hover:bg-cyber-neon-pink hover:text-cyber-darker transition-all flex items-center gap-1"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>

                  <button
                    onClick={() => setShowGMVerification(true)}
                    className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border border-cyber-neon-green text-cyber-neon-green hover:bg-cyber-neon-green hover:text-cyber-darker transition-all flex items-center gap-1"
                  >
                    <ShieldCheck size={16} />
                    GM Verify
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-[1800px] mx-auto">
            <div className="flex gap-4 p-4 h-[calc(100vh-200px)]">
              {/* Left Panel - Editor */}
              <div className="w-80 flex flex-col bg-cyber-darker rounded-lg overflow-hidden border border-cyber-border shadow-lg">
                <EditorPanel
                  identity={identity}
                  onIdentityChange={handleIdentityChange}
                  onRandomize={handleRandomize}
                  onLoadTemplate={handleLoadTemplate}
                  templateNames={templates.map(t => t.name)}
                />
              </div>

              {/* Middle Panel - Validation */}
              <div className="w-64 flex flex-col gap-4 overflow-y-auto">
                <ValidationPanel issues={issues} />
              </div>

              {/* Right Panel - Card Preview */}
              {showPreview && (
                <div
                  ref={cardRef}
                  className="flex-1 flex flex-col bg-cyber-darker rounded-lg overflow-hidden border border-cyber-border shadow-lg"
                >
                  <CardPreview identity={identity} />
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-cyber-border bg-cyber-darker py-3 px-4 text-center text-xs text-cyber-neon-cyan opacity-60">
            ShadowID v2 — Fictional Shadowrun Roleplay Tool | Not affiliated with Shadowrun or Catalyst Game Labs
          </footer>

          {/* GM Verification Modal */}
          {showGMVerification && <GMVerification onClose={() => setShowGMVerification(false)} isMobile={false} />}
        </>
      )}
    </div>
  );
}

export default App;
