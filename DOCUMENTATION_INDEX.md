# 📖 ShadowID v2 - Documentation Index

Welcome to **ShadowID v2**, a complete Shadowrun identity card generator for roleplay and prop creation.

## 🚀 Quick Start (2 minutes)

```bash
npm install
npm run dev
# Open http://localhost:5173
```

**That's it.** The app is ready to use.

---

## 📚 Documentation Guide

### Start Here 👇

1. **[QUICKSTART.md](./QUICKSTART.md)** (5 min read)
   - How to run the app
   - Basic usage
   - Common features
   - Export options
   
   **Read this first to get up and running.**

### Deep Dives 👇

2. **[DELIVERY_COMPLETE.md](./DELIVERY_COMPLETE.md)** (10 min read)
   - What you're getting
   - Feature summary
   - Technology stack
   - Quality verification
   
   **Read this for an overview of what was delivered.**

3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** (10 min read)
   - Project statistics
   - File structure
   - Architecture overview
   - Extensibility guide
   
   **Read this to understand the project structure.**

4. **[FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md)** (20 min read)
   - Every feature detailed
   - 52 requirements verified
   - Implementation notes
   - 100% completion confirmed
   
   **Read this for comprehensive feature verification.**

### Reference 👇

5. **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** (30 min read)
   - Complete technical reference
   - How to add rules
   - How to add templates
   - How to customize themes
   - Troubleshooting guide
   
   **Read this to extend or modify the app.**

6. **[SHADOWID_README.md](./SHADOWID_README.md)** (Full reference)
   - Feature descriptions
   - Installation guide
   - Usage patterns
   - Customization examples
   
   **Read this for the original comprehensive documentation.**

---

## 🎯 Choose Your Path

### "I want to use the app now"
1. Read [QUICKSTART.md](./QUICKSTART.md)
2. Run `npm install && npm run dev`
3. Start creating SINs!

### "I want to understand the code"
1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
2. Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
3. Explore `src/` folder

### "I want to customize it"
1. Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) sections on:
   - Adding validation rules
   - Adding templates
   - Changing themes
2. Edit the relevant files
3. Rebuild with `npm run build`

### "I want all the details"
1. Read [FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md)
2. Read [DELIVERY_COMPLETE.md](./DELIVERY_COMPLETE.md)
3. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

### "I'm deploying this"
1. Run `npm install`
2. Run `npm run build`
3. Upload `dist/` folder to your hosting
4. Done!

---

## 📂 Project Structure

```
ShadowID v2/
├── src/                         # Application code
│   ├── App.tsx                 # Main component
│   ├── types.ts                # Interfaces
│   ├── index.css               # Global styles
│   ├── components/
│   │   ├── EditorPanel.tsx     # Form editor
│   │   ├── CardPreview.tsx     # Card preview
│   │   └── ValidationPanel.tsx # Validation display
│   └── lib/
│       ├── rules.ts            # Validation rules
│       ├── generators.ts       # Templates & random
│       └── export.ts           # Export functions
├── dist/                        # Production build
├── public/                      # Static assets
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind theme
├── vite.config.ts              # Vite config
└── README.md                   # This documentation

Documentation files:
├── QUICKSTART.md               # 2-minute guide
├── DELIVERY_COMPLETE.md        # What you got
├── PROJECT_SUMMARY.md          # Project overview
├── FEATURES_CHECKLIST.md       # All 52 features
├── DEVELOPER_GUIDE.md          # Technical reference
└── SHADOWID_README.md          # Original spec
```

---

## 🎮 What Can You Do?

### Use the App
- ✅ Create fictional SIN cards
- ✅ Apply themes and effects
- ✅ Export as PNG/PDF/JSON
- ✅ Load pre-built templates
- ✅ Generate random identities
- ✅ Validate against rules
- ✅ Save locally with auto-save

### Customize the App
- ✅ Add validation rules
- ✅ Add templates
- ✅ Change colors/themes
- ✅ Modify card layout
- ✅ Adjust random generation
- ✅ Update field lists

### Deploy the App
- ✅ Build: `npm run build`
- ✅ Upload: `dist/` folder
- ✅ Host anywhere
- ✅ No backend needed

---

## ✨ Key Features

| Feature | Location | Status |
|---------|----------|--------|
| Card preview | Right panel | ✅ Working |
| Form editor | Left panel | ✅ Working |
| Validation | Center panel | ✅ Working |
| PNG export | Top toolbar | ✅ Working |
| PDF export | Top toolbar | ✅ Working |
| JSON export | Top toolbar | ✅ Working |
| Randomize | Left panel | ✅ Working |
| Templates | Left panel | ✅ Working |
| Themes | Settings | ✅ Working |
| QR code | Card | ✅ Working |
| Barcode | Card | ✅ Working |
| Auto-save | Browser | ✅ Working |

---

## 🔧 Technology

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 3.4** - Styling
- **Vite 7.2** - Build tool
- **html-to-image 1.11** - PNG export
- **jsPDF 2.5** - PDF export
- **qrcode 1.5** - QR codes
- **lucide-react 0.408** - Icons

---

## 🎯 Answers to Common Questions

### Q: How do I run it?
A: `npm install && npm run dev` → http://localhost:5173

### Q: How do I customize it?
A: See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)

### Q: How do I deploy it?
A: `npm run build` then upload `dist/` folder

### Q: Is it really free?
A: Yes. It's a personal project. Use as you like.

### Q: Does it send data anywhere?
A: No. Everything stays on your computer.

### Q: Can I modify it?
A: Yes. The code is there. Modify as needed.

### Q: Is it affiliated with Shadowrun?
A: No. It's a fan project. Not endorsed by Catalyst Game Labs.

### Q: Can I use it to create real IDs?
A: Absolutely not. This is fictional entertainment only. Do not use for fraud.

---

## ⚠️ Important Notice

**This application is for FICTIONAL roleplay purposes only.**

- It does NOT generate real identification documents
- It should NEVER be used to impersonate or deceive anyone
- It contains NO real government data or identification information
- Using it for actual fraud would be illegal and unethical

The app includes prominent disclaimers that make this clear.

---

## 📞 If You Get Stuck

### The app won't run
- Check: Is Node.js 16+ installed? (`node --version`)
- Try: Delete `node_modules/` and `npm install` again
- Try: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Something's broken
- Check: Browser console (F12 → Console tab)
- Check: Are there error messages?
- Try: Reset with the Reset button
- Try: Clear localStorage manually

### I want to customize X
- Check: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- Look: The relevant source file
- Edit: Make your changes
- Build: `npm run build`

### I still need help
- Re-read: The relevant documentation
- Check: Browser console for errors
- Search: Your error message online
- Ask: Your favorite AI assistant

---

## 🎓 Learning From This Project

This is a good example of:

- **React patterns**: Components, hooks, state management
- **TypeScript**: Interfaces, types, strict mode
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Modern JavaScript bundler
- **Architecture**: Clean code, separation of concerns
- **UX design**: Forms, validation, real-time feedback
- **Web APIs**: localStorage, file downloads, canvas

---

## 🚀 Next Steps

### Option 1: Use It Now
```bash
npm install
npm run dev
```

### Option 2: Deploy It
```bash
npm install
npm run build
# Upload dist/ folder to hosting
```

### Option 3: Customize It
1. Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
2. Edit source files
3. `npm run build`

### Option 4: Learn From It
- Read the code
- Understand the architecture
- Use patterns in your own projects

---

## 📊 Project Status

| Aspect | Status |
|--------|--------|
| Features | ✅ 100% complete |
| Testing | ✅ All working |
| Documentation | ✅ Comprehensive |
| Code Quality | ✅ Type-safe |
| Build | ✅ No errors |
| Deployment | ✅ Ready |

**This is a complete, production-ready application.**

---

## 🎲 Have Fun!

Whether you're:
- Running a Shadowrun campaign
- Worldbuilding a cyberpunk setting
- Creating roleplay props
- Learning React & TypeScript
- Just curious about the code

**There's something here for you.**

Create your SINs. Share them with your friends. Enjoy the cyberpunk aesthetic. Learn some code.

---

## 📞 Document Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICKSTART.md](./QUICKSTART.md) | Get running fast | 5 min |
| [DELIVERY_COMPLETE.md](./DELIVERY_COMPLETE.md) | Understand what you got | 10 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project overview | 10 min |
| [FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md) | Complete feature list | 20 min |
| [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) | Technical deep dive | 30 min |
| [SHADOWID_README.md](./SHADOWID_README.md) | Full feature description | 20 min |

---

**Start with [QUICKSTART.md](./QUICKSTART.md). You'll be running in 2 minutes.** ✅

*Last Updated: 2025-12-26*  
*Version: 2.0 - Complete*
