# ShadowID v2 - Quick Start Guide

## ⚡ Get Running in 30 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173 in your browser
```

That's it! The app is ready to use.

---

## 🎮 Basic Usage

### Creating Your First SIN

1. **Load a Template**: Select from the dropdown in the left panel
   - Corporate Wage Slave
   - Street Runner
   - Licensed Mage
   - DocWagon Contract Holder
   - Black ICE Admin

2. **Customize Fields**: Edit any field in the left panel - preview updates instantly

3. **Check Rules**: Middle panel shows validation errors/warnings in real-time

4. **Export**: Click buttons at top:
   - **PNG**: High-quality card image
   - **PDF**: Printable document with disclaimer
   - **JSON**: Save configuration for later

### Random Generation

Click **"Randomize"** button to generate a completely new random identity from Shadowrun lore-appropriate values.

### Theme Customization

In the "Theme & Visuals" section:
- Select a preset theme (Neon Rain, Red Samurai, etc.)
- Pick a custom accent color
- Toggle hologram overlay
- Adjust glitch effect intensity
- Choose corner style (sharp, rounded, chamfer)

---

## 🎨 Theme Options

| Theme | Style | Best For |
|-------|-------|----------|
| **Neon Rain** | Cyan/Pink cyberpunk | General runners |
| **Red Samurai** | Red/Samurai aesthetic | Combat specialists |
| **Arcology** | Blue corporate | Corporate SINs |
| **Street Doc** | Green/underground | Underworld operators |
| **Black ICE** | Dark/hacker | Matrix specialists |

---

## 💾 Saving & Loading

### Auto-Save
Your identity is **automatically saved** to browser storage. It persists even if you close the browser.

### Manual Save
- **Export JSON**: Download your identity as a JSON file
- **Import JSON**: Load a previously exported identity

---

## 📋 Validation Rules

The middle panel shows:
- 🔴 **Errors** (red): Must fix for valid SIN
- 🟡 **Warnings** (yellow): Suggestions or lore notes

Examples:
- Expiration date before issue date = ERROR
- SIN Rating outside 1-6 = ERROR
- Troll without height notes = WARNING
- Burned status = WARNING

---

## 📦 Exporting

### PNG
- **Use**: Share online, print-friendly image
- **Quality**: High resolution card image
- **Size**: Depends on card size (usually 100-500KB)

### PDF
- **Use**: Professional printing, roleplay props
- **Format**: Single page with disclaimer footer
- **Includes**: "This is a fictional Shadowrun prop" notice

### JSON
- **Use**: Save for later, backup, sharing with GM
- **Size**: Small text file (~2-5KB)
- **Format**: Complete identity data in JSON

---

## ⚙️ Customization

### Edit Rules
Edit `src/lib/rules.ts` to add/remove validation rules.

### Add Templates
Edit `src/lib/generators.ts` and add to `getTemplates()` array.

### Change Themes
Edit card colors in `src/components/CardPreview.tsx`.

### Modify Random Data
Edit name/corporation/district arrays in `src/lib/generators.ts`.

---

## 🎯 Field Reference

| Field | Type | Notes |
|-------|------|-------|
| Full Name | Text | Legal name on SIN |
| Alias | Text | Street handle/nickname |
| Metatype | Select | Human, Elf, Ork, Troll, Dwarf |
| Nationality | Select | In-universe nations/corps |
| Corporate Affiliation | Text | Optional corp name |
| SIN Rating | Number | 1-6, higher = better |
| Cred Rating | Number | 0-10, street reputation |
| Date of Birth | Date | YYYY-MM-DD format |
| Issue Date | Date | When SIN was created |
| Expiration Date | Date | When SIN expires |
| Address | Text | District or location |
| License Tags | List | Comma-separated permits |
| Biometric Hash | Text | Auto-generated fingerprint data |
| Clearance Level | Number | 0-5, access level |
| Unique ID | Text | SIN identifier (auto-gen) |
| Notes | Text | Status flags, observations |
| Languages | List | Comma-separated languages |
| Augmentations | List | Cyberware mods |
| Status | Select | Valid, Suspended, Burned |

---

## 🚀 Production Build

```bash
# Build for deployment
npm run build

# Output goes to dist/ folder
# Ready to deploy to any static hosting (Netlify, Vercel, etc.)
```

---

## ⚠️ Important Notes

1. **FICTIONAL TOOL ONLY**: Not a real ID generator
2. **NEVER USE**: For actual fraud or deception
3. **NO DATA COLLECTION**: Everything stays on your computer
4. **ENTERTAINMENT**: For Shadowrun roleplay and props only
5. **NOT AFFILIATED**: Not endorsed by Catalyst Game Labs

---

## 🆘 Common Issues

**"Preview not updating?"**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

**"Export button not working?"**
- Check browser console for errors (F12)
- Ensure popup blockers are disabled
- Try a different browser

**"App is slow?"**
- Reduce glitch intensity slider
- Try a simpler theme
- Close other browser tabs

**"Lost my identity?"**
- Check localStorage: 
  - Right-click page → Inspect → Application → Local Storage
  - Look for "shadowrun-identity-v1" key
- Try resetting browser cache (careful - affects all sites)

---

## 📞 Need Help?

1. Check `DEVELOPER_GUIDE.md` for technical details
2. Review `SHADOWID_README.md` for full feature list
3. Check browser console (F12 → Console tab) for error messages
4. Try the Reset button to start fresh

---

**Have fun creating your SINs, runner!** 🎲

*Stay chrome. Stay alive.*
