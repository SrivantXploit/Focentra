# StudyPilot / Focentra — Static Web Application

StudyPilot (Focentra) is an intelligent academic study decision assistant helping students decide what, when, where, and how long to study based on exams, schedules, and active recall drills.

This folder contains the complete, standalone static web application ready for deployment on **GitHub Pages** without any Electron desktop dependencies.

---

## 📁 Repository & Deployment File Structure

```text
Focentra/
├── index.html                # Main application entry point
├── favicon.svg               # Application SVG favicon
├── icons.svg                 # SVG icons sprite sheet
├── .nojekyll                 # Bypass Jekyll processing on GitHub Pages
├── README.md                 # Deployment documentation
└── assets/
    ├── index-DsASNKKk.css    # Full application styling & theme design system
    └── index-J0VUUFD-.js     # React UI application bundle & logic
```

---

## 🚀 How to Deploy to GitHub Pages

### Method 1: Deploying via GitHub Settings (Recommended)

1. **Create GitHub Repository**:
   Create a new public or private repository on GitHub named `Focentra`.

2. **Push Workspace Code**:
   Commit and push all files in this directory to your `main` or `master` branch:
   ```bash
   git init
   git add .
   git commit -m "Deploy StudyPilot static web application"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/Focentra.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your GitHub repository page: `https://github.com/<YOUR_GITHUB_USERNAME>/Focentra`
   - Click on **Settings** -> **Pages** (under Code and automation on the left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`
     - **Branch**: Select `main` (or `master`) and folder `/ (root)`
   - Click **Save**.

4. **Access Your Live Website**:
   After a minute, your website will be live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/Focentra/`

---

## 💻 Running Locally

To run and preview the static website on your local machine:

### Using Python:
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Using Node.js / `http-server`:
```bash
npx http-server -p 8000
```
Open `http://localhost:8000` in your web browser.

---

## 🛠 Features Included

- ⚡ **Zero Electron Dependencies**: Pure HTML5, CSS3, and JavaScript web bundle.
- 🎯 **Relative Pathing**: Loads cleanly under any path depth or custom domain (including `/Focentra/`).
- 🤖 **AI Study Decision Assistant**: Dynamic study recommendations, session timers, and active recall drills.
- 🎨 **Pixel-Identical Design**: Identical dark-mode theme, glassmorphism card styling, responsive layouts, and smooth micro-animations.
