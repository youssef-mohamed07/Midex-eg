# Midex-eg

موقع **Midex for Integrated Projects and Contracting** — WordPress block theme مع كتالوج منتجات، صفحات حلول، ونماذج طلب عرض سعر.

---

## المتطلبات

| الأداة | الغرض |
|--------|--------|
| [PHP](https://www.php.net/) 8.0+ | تشغيل WordPress |
| [MariaDB](https://mariadb.org/) أو MySQL | قاعدة البيانات |
| [Node.js](https://nodejs.org/) 18+ | بناء CSS (Tailwind) |
| [WP-CLI](https://wp-cli.org/) | إعداد WordPress من الطرفية (اختياري لكن موصى به) |

على macOS يمكن تثبيت المتطلبات عبر Homebrew:

```bash
brew install php mariadb node wp-cli
```

---

## التشغيل السريع (بعد تحميل المشروع)

### 1) استنساخ المشروع

```bash
git clone https://github.com/youssef-mohamed07/Midex-eg.git
cd Midex-eg
```

### 2) تثبيت حزم Node (لبناء CSS)

```bash
npm install
npm install --prefix wp-content/themes/midex
npm run build:css
```

### 3) تشغيل قاعدة البيانات

```bash
brew services start mariadb
```

### 4) إعداد WordPress لأول مرة

> ملف `wp-config.php` غير مرفوع على GitHub لأسباب أمنية. أنشئه محلياً:

```bash
# إنشاء قاعدة البيانات
mariadb -u "$(whoami)" -e "CREATE DATABASE IF NOT EXISTS midex_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# إنشاء wp-config.php (عدّل المستخدم/كلمة المرور حسب جهازك)
wp config create \
  --dbname=midex_wp \
  --dbuser="$(whoami)" \
  --dbpass='' \
  --dbhost='localhost:/tmp/mysql.sock' \
  --force

# تثبيت WordPress
wp core install \
  --url='http://127.0.0.1:8080' \
  --title='Midex' \
  --admin_user=admin \
  --admin_password=admin \
  --admin_email=admin@midex.local \
  --skip-email

# تفعيل الثيم وإعداد الروابط
wp theme activate midex
wp rewrite structure '/%postname%/' --hard
```

إذا لم يعمل `--dbhost='localhost:/tmp/mysql.sock'`، جرّب `--dbhost='127.0.0.1'` أو `--dbhost='localhost'`.

### 5) تشغيل السيرفر المحلي

```bash
npm start
```

افتح المتصفح على: **http://127.0.0.1:8080**

| | |
|---|---|
| **لوحة التحكم** | http://127.0.0.1:8080/wp-admin |
| **المستخدم** | `admin` |
| **كلمة المرور** | `admin` |

إيقاف السيرفر:

```bash
npm run stop
```

---

## تطوير الثيم (CSS)

عند تعديل ملفات Tailwind في `wp-content/themes/midex/src/input.css`:

```bash
# بناء مرة واحدة
npm run build:css

# مراقبة التغييرات أثناء التطوير
npm run watch:css
```

---

## هيكل المشروع

```
Midex-eg/
├── router.php                      # Router لسيرفر PHP المدمج
├── package.json                    # أوامر npm (start / build:css)
├── wp-config-sample.php            # نموذج إعداد WordPress
├── wp-content/themes/midex/        # الثيم المخصص
│   ├── templates/                  # قوالب الصفحات
│   ├── parts/                      # Header & Footer
│   ├── inc/                        # PHP: menus, blocks, setup
│   ├── src/input.css               # مصدر Tailwind
│   └── assets/                     # CSS, JS, images
├── wp-admin/                       # WordPress core
└── wp-includes/                    # WordPress core
```

---

## خريطة الموقع

```
الرئيسية
├── Products          → /products/
├── Solutions         → /solutions/
├── Blog              → /blog/
├── About Us          → /about-us/
└── Contact           → /contact/
```

---

## إعادة تهيئة محتوى الموقع (Menus & Pages)

```bash
wp option delete midex_site_setup_complete
wp theme activate midex
```

---

## ملاحظات

- **wp-config.php** و **wp-content/uploads/** مستثناة من Git — كل مطوّر ينشئها محلياً.
- CSS المُجمَّع موجود في `assets/css/tailwind.css`؛ شغّل `npm run build:css` بعد أي تعديل على الـ styles.
- للإنتاج: ارفع الملفات على استضافة تدعم PHP + MySQL، أنشئ قاعدة بيانات، وانسخ `wp-config-sample.php` إلى `wp-config.php` مع بيانات الاستضافة.

---

## الرخصة

All rights reserved — Midex for Integrated Projects and Contracting.
