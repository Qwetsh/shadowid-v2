# 🚀 GitHub Repository Setup Guide - ShadowID v2

## Step-by-Step Instructions

### 1️⃣ **Create Repository on GitHub**

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `shadowid-v2` (or your preferred name)
   - **Description**: `Complete Shadowrun Identity Card Generator with QR code verification and camera scanner`
   - **Visibility**: Choose **Public** (recommended for community) or **Private**
   - **Initialize repository**: Leave unchecked (we already have files)
3. Click **Create repository**

### 2️⃣ **Connect Local Repository to GitHub**

After creating the repo on GitHub, you'll see commands like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/shadowid-v2.git
git branch -M main
git push -u origin main
```

Run these in your terminal (in the `ShadowID v2` folder):

```powershell
cd "c:\Users\Utilisateur\Desktop\ShadowID v2"

# Add GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/shadowid-v2.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

### 3️⃣ **Verify Push Was Successful**

Run:
```bash
git status
```

Should show: `On branch main` and `nothing to commit`

Check GitHub - your repository should now have all the files!

---

## 📋 What Gets Pushed

✅ All source code (src/)  
✅ All configuration files  
✅ Documentation (6 comprehensive guides)  
✅ Package.json with all dependencies  
✅ Build files (Vite, TypeScript config)  
✅ .gitignore (excludes node_modules, dist, etc.)

❌ NOT pushed: `node_modules/`, `dist/` (ignored by .gitignore)

---

## 🔄 Future Commits

After making changes, commit with:

```bash
git add .
git commit -m "Your message here"
git push
```

---

## 📝 Optional: Add GitHub Topics

After pushing, go to your GitHub repo settings and add topics:
- `shadowrun`
- `identity-generator`
- `roleplay`
- `qr-code`
- `react`
- `typescript`

---

## 🎯 Next Steps

1. ✅ Create repo on GitHub
2. ✅ Run the git commands above
3. ✅ Verify files on GitHub
4. ✅ Share repository link!

---

## 📖 Repository Files Overview

```
shadowid-v2/
├── src/                       # React application
│   ├── components/            # React components
│   │   ├── CardPreview.tsx     # ID card display
│   │   ├── EditorPanel.tsx     # Form editor
│   │   ├── ValidationPanel.tsx # Validation display
│   │   ├── GMVerification.tsx  # GM verification modal
│   │   └── CameraScanner.tsx   # Camera QR scanner
│   ├── lib/                    # Business logic
│   │   ├── rules.ts            # Validation rules
│   │   ├── generators.ts       # Random & templates
│   │   ├── export.ts           # PNG/PDF/JSON export
│   │   └── verification.ts     # QR verification
│   ├── App.tsx                 # Main app component
│   ├── types.ts                # TypeScript types
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── public/                     # Static assets
├── dist/                       # Production build (not in git)
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS theme
├── tsconfig.json               # TypeScript config
├── Documentation files         # Guides & references
└── .gitignore                  # Git ignore rules
```

---

## ⚠️ Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/shadowid-v2.git
```

**Error: "Authentication failed"**
- Use GitHub token: https://github.com/settings/tokens
- Or set up SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**Forgot to set email/name?**
```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

---

## 📚 GitHub Resources

- [GitHub Hello World](https://guides.github.com/activities/hello-world/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)

---

**Your ShadowID v2 repository is ready to be pushed! 🎉**
