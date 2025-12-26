# 🛡️ ShadowID v2 - Shadowrun Identity Card Generator

A complete web application for generating fictional Shadowrun identity cards with QR code verification and real-time camera scanning. Perfect for Shadowrun roleplay, worldbuilding, and game mastering.

**⚠️ FICTIONAL PROP ONLY** - Not valid identification. For Shadowrun roleplay purposes only.

## ✨ Features

### 🎨 **Card Generation**
- Create complete fictional identity cards with 25+ fields
- 5 cyberpunk themes with customizable colors
- Real-time preview with animated effects
- Portrait image upload support
- Hologram overlay and glitch effects
- Multiple corner style options

### 📋 **Identity Management**
- 8 validation rules with error/warning distinction
- 5 pre-built templates (Corporate, Street Runner, Mage, etc.)
- Random identity generator
- Full CRUD operations
- Instant field validation

### 📸 **QR Code & Verification**
- Dynamic QR codes encoding identity data
- Cryptographic signature verification
- Detection-resistant ID system
- Detection probability based on SIN rating
- Perfect for GM verification

### 📱 **Camera Scanner**
- Real-time QR code scanning with phone camera
- Automatic verification on scan
- Game Master verification mode
- Works on mobile devices

### 💾 **Export & Import**
- PNG export (high-quality card image)
- PDF export (with disclaimer footer)
- JSON export/import (for data backup)
- Barcode generation

### 💻 **Technology Stack**
- **Frontend**: React 19.2 + TypeScript 5.9
- **Build**: Vite 7.2
- **Styling**: Tailwind CSS 3.4
- **Components**: Lucide React icons
- **Export**: html-to-image, jsPDF, qrcode
- **Scanning**: qr-scanner
- **Storage**: Browser localStorage

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/shadowid-v2.git
cd shadowid-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Building for Production
```bash
npm run build
```

Output files will be in the `dist/` folder.

## 📖 Usage

### Creating an ID
1. Fill in identity details in the left panel
2. Select from 5 pre-built templates or randomize
3. Customize theme, colors, and visual effects
4. Real-time preview on the right

### GM Verification
1. Click "GM Verify" button
2. Choose "Scan Camera" or "Paste QR Data"
3. Point camera at QR code or paste decoded data
4. System shows: "FAKE ID DETECTED" or "ID AUTHENTIC"
5. Detection probability based on SIN rating

### Exporting
- **PNG**: High-quality card image for printing
- **PDF**: Card with disclaimer footer
- **JSON**: Backup identity data (without portrait)

## 📊 Validation Rules

The system validates:
- ✅ Expiration date > issue date
- ✅ SIN rating between 1-6
- ✅ Clearance level between 0-5
- ✅ Biometric hash minimum length
- ✅ Full name required
- ✅ Troll height suggestions
- ✅ Burned status warnings
- ✅ Cred rating recommendations

## 🎮 Game Master Features

### ID Verification System
- **SIN 1**: 83% chance of fake detection
- **SIN 2**: 67% chance of fake detection
- **SIN 3**: 50% chance of fake detection
- **SIN 4**: 33% chance of fake detection
- **SIN 5**: 17% chance of fake detection
- **SIN 6**: 0% chance of fake detection (perfect forgery)

Each verification is a roll - same ID can have different results!

## 📁 Project Structure

```
shadowid-v2/
├── src/
│   ├── components/
│   │   ├── CardPreview.tsx       # ID card rendering
│   │   ├── EditorPanel.tsx       # Form editor
│   │   ├── ValidationPanel.tsx   # Validation display
│   │   ├── GMVerification.tsx    # GM verification modal
│   │   └── CameraScanner.tsx     # Camera QR scanner
│   ├── lib/
│   │   ├── rules.ts              # Validation engine
│   │   ├── generators.ts         # Random & templates
│   │   ├── export.ts             # Export functions
│   │   └── verification.ts       # QR verification
│   ├── App.tsx                   # Main component
│   ├── types.ts                  # TypeScript types
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── Documentation files           # Guides & references
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Customization

### Add Custom Validation Rule
Edit `src/lib/rules.ts`:
```typescript
{
  id: 'my-rule',
  description: 'My custom rule',
  severity: 'error',
  check: (identity) => {
    return identity.fullName.length > 3;
  },
  message: 'Name must be longer than 3 characters'
}
```

### Add Custom Template
Edit `src/lib/generators.ts` and add to `getTemplates()`:
```typescript
{
  name: 'My Template',
  description: 'Template description',
  theme: 'Neon Rain',
  getIdentity: () => ({ /* identity data */ })
}
```

### Change Theme Colors
Edit `tailwind.config.js` and update the `cyber` color palette.

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 2-minute getting started guide
- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Complete technical reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview & stats
- **[FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md)** - All 52 features verified
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Guide to all docs
- **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** - GitHub repository setup

## 🎯 Statistics

- **Total Code**: ~2000 lines
- **Components**: 5 React components
- **Modules**: 4 business logic modules
- **Validation Rules**: 8 rules
- **Templates**: 5 pre-built templates
- **Themes**: 5 cyberpunk themes
- **Features**: 52 verified features
- **Documentation**: 7 comprehensive guides

## ⚖️ License

This project is provided as-is for educational and entertainment purposes.

**Not affiliated with:**
- Shadowrun or Catalyst Game Labs
- Any real identification systems or authorities

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 🎮 Shadowrun Disclaimer

This is a **fictional roleplay tool** for Shadowrun tabletop gaming. The identity cards are not real and should never be used as actual identification. All data is randomly generated and fictional.

## 📱 Mobile Support

The application is responsive and works on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile phones (especially for camera QR scanning)

## 🔐 Privacy & Security

- 100% client-side application
- No backend servers or databases
- No data sent to external services
- Uses browser localStorage only
- Portrait images stored in memory only (not in localStorage)

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
npm run build
# Then deploy the dist/ folder to GitHub Pages
```

### Deploy to Vercel
```bash
# Connect GitHub repo to Vercel
# Vercel auto-deploys on push
```

### Deploy to Netlify
```bash
# Connect GitHub repo to Netlify
# Netlify auto-deploys on push
```

## 💬 Support

For issues or questions:
1. Check the documentation files
2. Review [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
3. Open an issue on GitHub

## 🎉 Features Implemented

- [x] Identity card generation with 25+ fields
- [x] 5 cyberpunk themes with custom colors
- [x] Real-time validation (8 rules)
- [x] Random identity generator
- [x] 5 pre-built templates
- [x] PNG/PDF/JSON export
- [x] JSON import
- [x] QR code generation
- [x] QR verification with checksum
- [x] Camera QR scanner
- [x] GM verification mode
- [x] Portrait image upload
- [x] Barcode generation
- [x] Hologram overlay effects
- [x] Glitch animation effects
- [x] localStorage persistence
- [x] Responsive design
- [x] Comprehensive documentation

## 📞 Credits

**Created with:**
- React & TypeScript
- Tailwind CSS
- Vite
- ❤️ for Shadowrun

---

**ShadowID v2** - A fictional identity for a fictional world. 🏙️🛡️

*Not valid identification. For roleplay purposes only.*
