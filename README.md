# Web design studio portfolio
Static site (HTML/CSS/vanilla JS). Deploy on Cloudflare Pages: no build command, output directory `/`.

- Edit brand, email, Instagram and form endpoint at the top of `script.js`.
- Serbian text lives in `index.html`; English text lives in the `EN` object in `script.js` (same keys as `data-i18n`).
- Residents SK preview: put a screenshot in `assets/` and replace the `.shot` div in the first project card with an `<img>` (comment shows how).
- Contact form: set `CONFIG.formEndpoint` to Formspree/Web3Forms/Getform, or a Cloudflare Worker that accepts JSON `{name,email,message}`. Without it, the form opens the visitor's email app.
- After deploy add canonical, `og:url` and an `og:image` (1200x630).
