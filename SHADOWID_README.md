# ShadowID v2 - Shadowrun Identity Card Generator

A fictional Shadowrun cyberpunk identity card generator for roleplay, worldbuilding, and prop creation.

**⚠️ DISCLAIMER: This is a FICTIONAL TOOL for creating fake Shadowrun SIN cards for roleplay purposes. It is NOT a real identification document generator. Not affiliated with Shadowrun or Catalyst Game Labs.**

## Features

### Core Functionality
- **Live Card Preview**: High-fidelity cyberpunk design with customizable theming
- **Comprehensive Identity Editor**: Full control over all card fields with organized sections
- **Validation Engine**: Rules-driven validation system for in-universe constraints
- **Multiple Themes**: "Neon Rain", "Red Samurai", "Arcology", "Street Doc", "Black ICE"
- **Random Generator**: Create plausible Shadowrun identities with one click
- **Template System**: Pre-built archetypes (Corporate Wage Slave, Street Runner, Licensed Mage, DocWagon, Black ICE Admin)

### Card Features
- Full name, alias/handle, metatype
- Nationality and corporate affiliation
- SIN and Cred ratings with validation
- Date of birth, issue date, expiration date
- Unique ID and biometric hash (auto-generated or custom)
- Clearance levels (0-5)
- License tags and languages
- Augmentations list
- Status indicator (Valid/Suspended/Burned)
- Optional QR code encoding identity data
- Optional barcode display

### Visual Customization
- Accent color picker
- Corner style options (sharp/rounded/chamfer)
- Hologram overlay toggle
- Glitch effect intensity slider
- Theme-based color schemes

### Export & Import
- **PNG Export**: High-quality card image export
- **PDF Export**: Single-page printable document with disclaimer
- **JSON Export/Import**: Save and load identity configurations
- **Responsive Design**: Works on desktop and mobile

### Technical Features
- React + TypeScript for type safety
- Tailwind CSS for responsive styling
- Local state with localStorage persistence
- Rules-driven validation architecture (easily extendable)
- No backend required, no external API calls
- Accessibility-first design

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── types.ts                   # TypeScript interfaces and types
├── lib/
│   ├── rules.ts              # Validation rules engine
│   ├── generators.ts         # Random and template generators
│   └── export.ts             # PNG/PDF/JSON export functionality
├── components/
│   ├── EditorPanel.tsx       # Left panel editor with collapsible sections
│   ├── CardPreview.tsx       # Right panel live preview
│   └── ValidationPanel.tsx   # Validation report display
├── index.css                 # Global styles and Tailwind directives
├── main.tsx                  # React entry point
└── App.css                   # Component-specific styles
```

## Installation & Running

### Prerequisites
- Node.js 16+ and npm/yarn

### Setup

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

## Usage

### Basic Workflow
1. **Load a Template** or **Randomize** to start with preset values
2. **Edit Fields** in the left panel - changes update the preview instantly
3. **Check Validation** in the middle panel for rule violations
4. **Customize Visuals** - theme, colors, effects in the Theme section
5. **Export** as PNG for sharing, PDF for printing, or JSON for saving

### Validation Rules

The app includes a extensible rules engine. Current rules:
- Expiration date must be after issue date
- SIN Rating: 1-6
- Clearance Level: 0-5
- Biometric hash: minimum 12 characters
- Full name required
- Troll metatype should have height notes (warning)
- Cred Rating: 0-10 recommended (warning)
- Burned status triggers alert (warning)

### Adding Custom Rules

Edit `src/lib/rules.ts`:

```typescript
export const validationRules: ValidationRule[] = [
  // ... existing rules ...
  {
    id: 'my-custom-rule',
    description: 'My custom validation',
    severity: 'error', // or 'warn'
    check: (identity: Identity) => {
      // return true if valid, false if invalid
      return identity.someField.length > 5;
    },
    message: 'Field must be longer than 5 characters',
  },
];
```

### Customizing Themes

Edit the `themeConfig` object in `src/components/CardPreview.tsx` to add new color schemes or modify existing ones.

### Adding Templates

Edit `src/lib/generators.ts` and add to the `getTemplates()` function:

```typescript
{
  name: 'My Custom Template',
  description: 'Description here',
  theme: 'Neon Rain',
  getIdentity: () => ({
    // ... identity object ...
  }),
}
```

## Local Storage

The app automatically saves your current identity to browser localStorage under key `shadowrun-identity-v1`. Clear your browser data to reset.

## Keyboard Navigation

- Tab through form fields
- Enter to submit
- Space to toggle checkboxes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Modern mobile browsers

## Performance Notes

- Card preview updates in real-time
- Large augmentation/language lists may impact performance slightly
- QR code generation is async to prevent UI blocking
- All processing is client-side; no network delays

## Security & Privacy

- **No data is sent anywhere**: All processing is purely client-side
- **No tracking**: No analytics, cookies, or external connections
- **Local only**: Identity data stays in your browser's localStorage

## Customization Ideas

- **Add height/build fields** for Trolls/Orks
- **Implement custom SIN prefixes** by corporation
- **Add background story editor** for rich character profiles
- **Create card preset themes** based on different Shadowrun locations
- **Add matrix/hacking profiles** for netrunners
- **Implement faction reputation scores**
- **Add print-specific styling** for better physical props
- **Create digital wallet integration** for decentralized identity
- **Add image background for corporate logos**
- **Implement multi-language support** in the UI

## Disclaimers

This tool is **FICTIONAL** and for **ENTERTAINMENT ONLY**. It:
- Does NOT create real identification documents
- Should NOT be used to impersonate or deceive anyone
- Is INSPIRED BY Shadowrun universe lore
- Is NOT affiliated with Catalyst Game Labs or Shadowrun copyright holders
- Contains NO real government data or identification information

Any use of this tool for illegal purposes is strictly prohibited.

## Credits

Created as a fan tool for Shadowrun roleplay and worldbuilding. Shadowrun is © Catalyst Game Labs.

## License

Personal use only. Not for commercial use without permission.
