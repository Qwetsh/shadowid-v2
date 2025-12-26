# ShadowID v2 - Complete Developer Guide

## 🎯 Project Overview

ShadowID v2 is a fully functional Shadowrun-themed identity card generator web application. It allows users to create fictional Shadowrun "SIN" (System Identification Number) cards for roleplay, worldbuilding, and prop creation.

**Key Point**: This is a FICTIONAL tool for entertainment purposes only. It includes prominent disclaimers and generates no real identification documents.

---

## 📋 Features Checklist

### ✅ Core Layout
- [x] Left side: Editor panel with collapsible sections
- [x] Right side: Live card preview with cyberpunk design
- [x] Top bar: App title + export buttons
- [x] Responsive design (works on desktop, acceptable on mobile)
- [x] Middle validation panel

### ✅ Card Content (Editable Fields)
- [x] Full Name
- [x] Alias / Handle
- [x] Metatype (Human, Elf, Ork, Troll, Dwarf, Other)
- [x] Nationality / Citizenship (in-universe options)
- [x] Corporate Affiliation (optional)
- [x] SIN Rating (1-6) with validation
- [x] Cred Rating (0-10) with warning
- [x] Date of Birth, Issue Date, Expiration Date
- [x] Address / District
- [x] License Tags (optional list)
- [x] Biometric Hash (auto-generated, editable)
- [x] Clearance Level (0-5) with validation
- [x] Unique ID (auto-generated, editable)
- [x] Notes / Flags
- [x] Languages (list)
- [x] Augmentations (optional list)
- [x] Status (Valid/Suspended/Burned) with visual indicator

### ✅ Graphics & Visual
- [x] Optional QR code (encodes identity JSON)
- [x] Optional barcode display
- [x] Portrait image support (prepared for upload)
- [x] Generic fictional corporate emblems (through themes)

### ✅ Theming & Customization
- [x] 5 preset themes: Neon Rain, Red Samurai, Arcology, Street Doc, Black ICE
- [x] Custom accent color picker
- [x] Card background with procedural gradients
- [x] Hologram overlay toggle
- [x] Glitch effect intensity slider
- [x] Corner style selector (sharp/rounded/chamfer)
- [x] Consistent sci-fi typography

### ✅ Validation Rules (Rules-Driven)
- [x] Expiration date > issue date
- [x] SIN Rating 1-6 (error)
- [x] Clearance 0-5 (error)
- [x] Biometric hash >= 12 chars (error)
- [x] Full name required (error)
- [x] Troll height suggestion (warning)
- [x] Burned status alert (warning)
- [x] Cred Rating 0-10 recommendation (warning)
- [x] Real-time validation panel
- [x] Easily extensible rule architecture

### ✅ Templates & Random Generator
- [x] Randomize button generates plausible Shadowrun identities
- [x] 5 pre-built templates:
  - Corporate Wage Slave
  - Street Runner
  - Licensed Mage
  - DocWagon Contract Holder
  - Black ICE Admin
- [x] Each template includes default theme and values

### ✅ Export / Output
- [x] Export as PNG (high-quality card image)
- [x] Export as PDF (single page with disclaimer)
- [x] Export as JSON (identity configuration)
- [x] Import from JSON (load saved identities)
- [x] LocalStorage persistence (auto-save)

### ✅ UX & Quality
- [x] Instant preview updates
- [x] Collapsible form sections
- [x] Tooltips on key fields
- [x] Reset button
- [x] localStorage auto-save
- [x] No external API calls
- [x] Good contrast and accessibility
- [x] Smooth interactions
- [x] Prominent disclaimer banner

### ✅ Design Direction
- [x] Shadowrun cyberpunk aesthetic (neon, dark, scanlines)
- [x] Holographic overlay effects
- [x] Grid/tech patterns
- [x] Glitch effects (adjustable)
- [x] High-end prop appearance
- [x] Original design (no trademark infringement)

---

## 🗂️ Project Structure

```
ShadowID v2/
├── src/
│   ├── App.tsx                      # Main app component (header, layout, state)
│   ├── types.ts                     # TypeScript interfaces and enums
│   ├── index.css                    # Global styles + Tailwind directives
│   ├── main.tsx                     # React entry point
│   ├── App.css                      # (now minimal, Tailwind-based)
│   ├── components/
│   │   ├── EditorPanel.tsx          # Left panel with collapsible sections
│   │   ├── CardPreview.tsx          # Right panel live card preview
│   │   └── ValidationPanel.tsx      # Validation report display
│   └── lib/
│       ├── rules.ts                 # Validation rules engine
│       ├── generators.ts            # Random identity + templates
│       └── export.ts                # PNG/PDF/JSON export functions
├── public/                          # Static assets
├── package.json                     # Dependencies (React, Tailwind, etc.)
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript config
└── README.md / SHADOWID_README.md   # Documentation
```

---

## 🚀 Running the Project

### Install & Start Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment

- **Node.js**: 16+ required
- **npm**: 8+

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-dom` | React rendering |
| `typescript` | Type safety |
| `tailwindcss` | Utility CSS styling |
| `html-to-image` | PNG export from DOM |
| `jspdf` | PDF generation |
| `qrcode` | QR code generation |
| `lucide-react` | Icon components |
| `vite` | Build tool |

---

## 💾 Core Data Model (`types.ts`)

### Identity Interface
```typescript
interface Identity {
  id: string;                         // UUID
  fullName: string;
  alias: string;
  metatype: 'Human' | 'Elf' | 'Ork' | 'Troll' | 'Dwarf' | 'Other';
  nationality: string;
  corporateAffiliation: string;
  sinRating: number;                  // 1-6
  credRating: number;                 // 0-10
  dateOfBirth: string;                // YYYY-MM-DD
  issueDate: string;
  expirationDate: string;
  address: string;
  licenseTags: string[];
  biometricHash: string;
  clearanceLevel: number;             // 0-5
  uniqueId: string;
  notes: string;
  languages: string[];
  augmentations: string[];
  status: 'Valid' | 'Suspended' | 'Burned';
  
  // Visual customization
  theme: Theme;
  accentColor: string;
  cornerStyle: CornerStyle;
  showHologram: boolean;
  glitchIntensity: number;
  
  // Optional features
  includeQRCode: boolean;
  includeBarcode: boolean;
  portraitImage?: string;             // Base64 or URL (future)
  emblem?: string;
}
```

---

## 🔧 Extending the Application

### Adding a New Validation Rule

Edit `src/lib/rules.ts`:

```typescript
export const validationRules: ValidationRule[] = [
  // ...existing rules...
  {
    id: 'my-new-rule',
    description: 'Rule description',
    severity: 'error',  // or 'warn'
    check: (identity: Identity) => {
      // Return true if valid, false if invalid
      return identity.sinRating >= 1;
    },
    message: 'Error message shown to user',
  },
];
```

### Adding a New Theme

Edit `src/components/CardPreview.tsx` theme colors in the card rendering:

```typescript
// Add to style objects when rendering the card:
style={{
  borderColor: identity.accentColor,
  // ... other styles
}}
```

The accent color is already user-customizable via the color picker.

### Adding a New Template

Edit `src/lib/generators.ts` and add to `getTemplates()`:

```typescript
{
  name: 'My New Template',
  description: 'Template description',
  theme: 'Neon Rain',
  getIdentity: () => ({
    id: crypto.randomUUID(),
    fullName: 'Template Name',
    // ... fill in all Identity fields ...
    includeQRCode: true,
    includeBarcode: true,
  }),
}
```

### Customizing Random Generation

Edit `src/lib/generators.ts`:

Add names, corporations, districts, augmentations to the respective arrays, then `generateRandomIdentity()` will automatically use them.

### Modifying Card Preview Layout

Edit `src/components/CardPreview.tsx`:

The card is built as a React component with nested divs and inline styles. You can:
- Reorder sections
- Add new fields
- Change formatting/styling
- Adjust colors and glitch effects

---

## 🎨 Styling Architecture

### Tailwind CSS
- All utility classes via `tailwind.config.js`
- Custom color palette for cyberpunk theme
- Custom animations (glitch, scan, pulse-glow)
- Responsive breakpoints

### Global CSS (`src/index.css`)
- Tailwind directives
- Custom @keyframes for animations
- Scrollbar styling
- Selection styling

### Component Styles
- Mostly inline styles for dynamic colors
- Tailwind classes for layout
- CSS-in-JS for conditional styling

---

## 💾 Local Storage

The app auto-saves to browser localStorage under key: `shadowrun-identity-v1`

```typescript
const STORAGE_KEY = 'shadowrun-identity-v1';

// Auto-save on identity change
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
}, [identity]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setIdentity(JSON.parse(saved));
}, []);
```

To clear: `localStorage.removeItem('shadowrun-identity-v1')`

---

## 🚨 Important Notes

### Disclaimer
The app includes a **prominent red banner** at the top:
> "⚠️ FICTIONAL SHADOWRUN PROP — NOT A REAL IDENTIFICATION DOCUMENT ⚠️"

This is repeated in:
- PDF footer
- App footer
- JSON exports (recommended)

### No External APIs
- No backend server required
- No API calls
- 100% client-side processing
- No data collection

### Shadowrun Universe
- Not affiliated with Catalyst Game Labs
- Inspired by Shadowrun cyberpunk setting
- Uses fictional corporations, metatypes, and in-universe terminology
- No real-world identification information

---

## 🐛 Troubleshooting

### Build Errors
If you see TypeScript errors:
1. Ensure type-only imports: `import type { Identity }`
2. Check that all Identity fields are included in templates
3. Run `npm install` if dependencies are missing

### Export Issues
- **PNG fails**: Check browser console for canvas errors
- **PDF fails**: Ensure the card element is fully rendered
- **JSON import fails**: Ensure file is valid JSON with all required fields

### Styling Issues
- Run `npm run build` to rebuild Tailwind CSS
- Check that `tailwind.config.js` extends theme correctly
- Verify custom colors in `tailwind.config.js`

### Performance Issues
- Large QR codes may slow preview: adjust complexity if needed
- Many augmentations: consider pagination (future enhancement)
- Glitch effects can be disabled for lower-end devices

---

## 📱 Mobile Responsiveness

The app is designed for desktop primarily, but includes:
- Stack layout on smaller screens
- Scrollable panels
- Touch-friendly buttons
- Collapsible sections to save space

To further improve mobile:
- Consider drawer/modal for editor panel
- Optimize card preview size
- Add landscape/portrait orientation handling

---

## 🎯 Future Enhancement Ideas

1. **Image Upload**: Add portrait image upload/cropping
2. **Advanced Rules**: Custom rule builder UI
3. **Multi-language**: Support for UI translation
4. **Dark/Light Mode**: Theme toggle
5. **History**: Undo/Redo for edits
6. **Sharing**: QR code to share identities online
7. **Print CSS**: Optimize for physical printing
8. **Search/Filter**: Browse templates better
9. **Comments**: Add notes to rule violations
10. **Import/Export**: CSV, XML format support

---

## 📄 License & Attribution

**Personal Use Only** - Not for commercial use without permission.

Shadowrun © Catalyst Game Labs - This tool is a fan creation and is not affiliated with or endorsed by Catalyst Game Labs.

---

## ✅ Verification Checklist

- [x] All 8 core features implemented
- [x] TypeScript compilation successful
- [x] Vite build successful
- [x] Dev server runs without errors
- [x] Validation rules work in real-time
- [x] Export functions operational
- [x] localStorage persistence functional
- [x] Templates load correctly
- [x] Random generator produces valid IDs
- [x] UI is responsive
- [x] Disclaimer is prominent
- [x] Code is maintainable and extensible
- [x] No external API calls
- [x] All components render without errors

---

## 📞 Support / Issues

If you encounter issues:
1. Check the browser console for error messages
2. Clear localStorage and reload
3. Ensure all dependencies are installed (`npm install`)
4. Try rebuilding (`npm run build`)
5. Check that Node.js version is 16+

---

**Happy SINing, runner!** 🎲

*Remember: This is a fictional tool for Shadowrun roleplay and worldbuilding. Not valid identification.*
