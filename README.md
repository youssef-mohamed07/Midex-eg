# Midex-eg

**Midex for Integrated Projects and Contracting** — a WordPress block theme with a product catalog, solution pages, and quote request forms.

---

## Requirements

| Tool | Purpose |
|------|---------|
| [PHP](https://www.php.net/) 8.0+ | Run WordPress |
| [MariaDB](https://mariadb.org/) or MySQL | Database |
| [Node.js](https://nodejs.org/) 18+ | Build CSS (Tailwind) |
| [WP-CLI](https://wp-cli.org/) | WordPress setup from the terminal (optional but recommended) |

On macOS, install dependencies with Homebrew:

```bash
brew install php mariadb node wp-cli
```

---

## Quick start (after cloning)

### 1) Clone the repository

```bash
git clone https://github.com/youssef-mohamed07/Midex-eg.git
cd Midex-eg
```

### 2) Install Node packages (for CSS build)

```bash
npm install
npm install --prefix wp-content/themes/midex
npm run build:css
```

### 3) Start the database

```bash
brew services start mariadb
```

### 4) First-time WordPress setup

> `wp-config.php` is not committed to GitHub for security. Create it locally:

```bash
# Create the database
mariadb -u "$(whoami)" -e "CREATE DATABASE IF NOT EXISTS midex_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create wp-config.php (adjust user/password for your machine)
wp config create \
  --dbname=midex_wp \
  --dbuser="$(whoami)" \
  --dbpass='' \
  --dbhost='localhost:/tmp/mysql.sock' \
  --force

# Install WordPress
wp core install \
  --url='http://127.0.0.1:8080' \
  --title='Midex' \
  --admin_user=admin \
  --admin_password=admin \
  --admin_email=admin@midex.local \
  --skip-email

# Activate the theme and set permalinks
wp theme activate midex
wp rewrite structure '/%postname%/' --hard
```

If `--dbhost='localhost:/tmp/mysql.sock'` does not work, try `--dbhost='127.0.0.1'` or `--dbhost='localhost'`.

### 5) Start the local server

```bash
npm start
```

Open in your browser: **http://127.0.0.1:8080**

| | |
|---|---|
| **Admin** | http://127.0.0.1:8080/wp-admin |
| **Username** | `admin` |
| **Password** | `admin` |

Stop the server:

```bash
npm run stop
```

---

## Theme development (CSS)

When editing Tailwind files in `wp-content/themes/midex/src/input.css`:

```bash
# One-off build
npm run build:css

# Watch for changes during development
npm run watch:css
```

---

## Project structure

```
Midex-eg/
├── router.php                      # Router for PHP built-in server
├── package.json                    # npm scripts (start / build:css)
├── wp-config-sample.php            # WordPress config template
├── wp-content/themes/midex/        # Custom theme
│   ├── templates/                  # Page layouts
│   ├── parts/                      # Header & footer
│   ├── inc/                        # PHP: menus, blocks, setup
│   ├── src/input.css               # Tailwind source
│   └── assets/                     # CSS, JS, images
├── wp-admin/                       # WordPress core
└── wp-includes/                    # WordPress core
```

---

## Site map

```
Home
├── Products          → /products/
├── Solutions         → /solutions/
├── Blog              → /blog/
├── About Us          → /about-us/
└── Contact           → /contact/
```

---

## Reset site content (menus & pages)

```bash
wp option delete midex_site_setup_complete
wp theme activate midex
```

---

## Notes

- **wp-config.php** and **wp-content/uploads/** are excluded from Git — each developer creates them locally.
- Compiled CSS lives in `assets/css/tailwind.css`; run `npm run build:css` after any style changes.
- For production: deploy to a PHP + MySQL host, create a database, and copy `wp-config-sample.php` to `wp-config.php` with your hosting credentials.

---

## Multilingual (English, Arabic, German)

**English is the default language.** Arabic and German are added with the free [Polylang](https://wordpress.org/plugins/polylang/) plugin. The theme includes a language switcher in the header and RTL support for Arabic.

### 1) Install Polylang

```bash
wp plugin install polylang --activate
wp midex polylang-setup
```

Or: **Plugins → Add New → Polylang → Install → Activate** — the theme auto-runs setup on first admin visit.

The `wp midex polylang-setup` command creates **English (default), Arabic, and German** translations for pages, menus, categories, and theme strings.

### 2) Add languages

Go to **Languages → Languages** and add:

| Language | Locale | Slug | Default | RTL |
|----------|--------|------|---------|-----|
| English | en_US | en | ✓ Yes | No |
| Arabic | ar | ar | No | ✓ Yes |
| German | de_DE | de | No | No |

### 3) URL structure (recommended)

**Settings → Languages → URL modifications:**

- **Different languages in directories**
- Hide URL language information for default language → **on** (English URLs stay `/products/`, Arabic `/ar/products/`, German `/de/products/`)

### 4) Translate content

For each page, product, and menu item:

1. Edit the English version
2. In the **Languages** box, click **+** to create the Arabic or German translation
3. Fill in translated title and content

Homepage sections use theme strings — translate them under **Languages → String translations** (group: **Midex Theme**).

### 5) Menus per language

**Appearance → Menus** — create or assign a menu for each language and link it in **Languages → Settings → Custom menu**.

### 6) After setup

```bash
wp rewrite flush
```

**Result:**

| Language | Example URL |
|----------|-------------|
| English (default) | `http://127.0.0.1:8080/products/` |
| Arabic | `http://127.0.0.1:8080/ar/products/` |
| German | `http://127.0.0.1:8080/de/products/` |

The header shows **EN | AR | DE** when Polylang is active.

---

## License

All rights reserved — Midex for Integrated Projects and Contracting.
