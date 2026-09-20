# Boddu Aarathi – Portfolio

Personal portfolio site built with plain HTML, CSS and JavaScript. No build step and no dependencies, so it can be hosted anywhere that serves static files.

## Project structure

```
aarathi-portfolio/
├── index.html      Page content (all sections)
├── css/
│   └── style.css   Styles, colour tokens, light and dark themes
├── js/
│   └── main.js     Theme toggle and the hero waveform animation
├── assets/         Put images, your resume PDF and other files here
├── vercel.json     Optional Vercel settings
├── .gitignore
└── README.md
```

## Run it locally

Just open `index.html` in your browser. Or, for a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Put it on GitHub

```bash
cd aarathi-portfolio
git init
git add .
git commit -m "Add portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repository on github.com first (no README, no .gitignore), then use its URL in the `git remote add` line. A good repo name is `portfolio` or `<your-username>.github.io`.

## Deploy

### Option 1: Vercel (recommended)
1. Go to vercel.com and sign in with GitHub.
2. Click **Add New → Project** and import your repository.
3. Leave every setting as it is (Framework Preset: Other, no build command) and click **Deploy**.

### Option 2: GitHub Pages
1. In your repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
3. Save. Your site appears at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Option 3: Netlify
1. Go to netlify.com and choose **Add new site → Import an existing project**.
2. Pick your GitHub repository. Leave the build command empty and set the publish directory to `.` (the root).
3. Click **Deploy**.

## Things to update

- **LinkedIn and GitHub links:** add them in the Contact section of `index.html`.
- **Resume download:** copy your PDF into `assets/` (for example `assets/Boddu-Aarathi-Resume.pdf`) and add `<a href="assets/Boddu-Aarathi-Resume.pdf" download>Download resume</a>` in the Contact section.
- **New projects:** copy one `<article class="project">…</article>` block in `index.html` and edit the text.
- **Colours:** change the values at the top of `css/style.css` (the `:root` block for light mode and the dark blocks below it).

## Note on the Healthcare Platform project

The Healthcare Platform is a prototype built for a recruitment assignment. The portfolio says so on purpose. Keep that label when you edit the page.
