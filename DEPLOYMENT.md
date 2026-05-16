# Deployment Instructions for Hostinger

This application is built with React, Vite, and React Router. To deploy it to Hostinger (shared hosting or VPS), follow these steps:

## 1. Build the Application
Run the following command in your local terminal:
```bash
npm run build
```
This will generate a `dist` folder.

## 2. Upload to Hostinger
Upload the contents of the `dist` folder to your Hostinger server (usually under `public_html`).

## 3. Configure SPA Routing (.htaccess)
The build includes a `.htaccess` file (originally in the `public` folder) that ensures React Router works correctly on page refreshes and direct URL access.

If you don't see it in your root directory after uploading, create a file named `.htaccess` in your `public_html` folder with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## 4. Subdomain Routing (Optional)
If you are using subdomains (like `wellness.yourdomain.com`), ensure the subdomain points to the same directory or a directory with its own copy of the build and `.htaccess`. The application is configured to detect subdomains and show the appropriate content.

## 5. SSL
Ensure you have an SSL certificate active on Hostinger (Life-time Free SSL is usually included) to serve your site over HTTPS.
