# Kaushik Jain — Portfolio Website

Personal portfolio website of **Kaushik Jain** — Data Analyst & Supply Chain Enthusiast.
B.Sc. Mathematics (Hons), M.S. Ramaiah University of Applied Sciences · PG Programme in Data Science & Generative AI, IIT Roorkee.

🔗 **Live site:** _add your GitHub Pages URL here after deployment_
`https://<your-username>.github.io/<repo-name>/`

---

## ✨ Overview

A single-page personal portfolio (About · Portfolio · Gallery) built as a static site — no build step, no framework, no backend. Styled in a cinematic **black / gold / white** theme with scroll-reveal animations, a gold-dust particle background, and glowing hover interactions.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 (custom properties, Grid, Flexbox, keyframe animations) |
| Interactivity | Vanilla JavaScript (ES6, no dependencies) |
| Icons | [Ionicons 5.5.2](https://ionic.io/ionicons) via CDN |
| Font | [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts |
| Hosting | GitHub Pages (static) |

No package manager, no `node_modules`, no build tooling — clone and open `index.html`, or serve it with any static file server.

## 📁 Project Structure

```
.
├── index.html              # Single-page app: About / Portfolio / Gallery
├── Project-Work.pdf         # Downloadable project document (fractional derivatives study)
├── assets/
│   ├── css/style.css        # All styling incl. cinematic gold theme
│   ├── js/script.js         # Nav switching, filters, modal, scroll reveal, particles
│   └── images/               # Icons, certificates, avatar, logos
└── Gallery/                  # Personal photo gallery (masonry grid)
```

## 🚀 Run Locally

No build step required.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Option 1 — just open it
open index.html          # macOS
start index.html         # Windows

# Option 2 — serve it (recommended, avoids any local file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deploying on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch** → Branch: `main`, Folder: `/ (root)`.
4. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a couple of minutes.

> `index.html` sits at the repo root by design, so GitHub Pages picks it up automatically — no extra configuration needed.

## 📝 Editing Content

- **Text & sections:** edit directly inside `index.html` — content is organized under `<article data-page="about|portfolio|gallery">`.
- **Images:** replace files inside `assets/images/` or `Gallery/` keeping the same filenames, or update the `src` paths in `index.html` if you rename them.
- **Colors/theme:** tweak the CSS custom properties inside `:root` at the top of `assets/css/style.css`.
- **Skills, timeline, projects:** each is a repeating `<li>` block in `index.html` — copy an existing block to add a new entry.

## 📄 License

See [`LICENSE`](./LICENSE).

## 📬 Contact

- Email: kaushikjainb@gmail.com
- LinkedIn: [linkedin.com/in/kaushikbjain](https://www.linkedin.com/in/kaushikbjain/)
