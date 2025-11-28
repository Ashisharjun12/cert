# Deployment Guide - DigitalOcean

This guide explains how to deploy your Node.js application to DigitalOcean App Platform and connect a custom domain.

## Prerequisites

1.  **GitHub Repository**: Push your code to a GitHub repository.
    - Ensure your `package.json` has a `start` script (e.g., `"start": "node server.js"`).
    - Ensure your `package.json` lists all dependencies (`express`, `ejs`).
2.  **DigitalOcean Account**: Create an account at [digitalocean.com](https://www.digitalocean.com/).

## Step 1: Deploy to App Platform

1.  Log in to DigitalOcean and click **Create** > **Apps**.
2.  Choose **GitHub** as your source.
3.  Select your repository and the branch (e.g., `main`).
4.  **IMPORTANT: Source Directory**:
    - By default, DigitalOcean looks at the root `/`.
    - You **MUST** click **Edit** (pencil icon) next to the source directory.
    - Change it from `/` to `/cert`.
    - If you don't do this, it will say "No components detected" or "target source directory does not exist".
5.  **Autodetect**: After changing the directory, DigitalOcean should detect the Node.js service.
6.  **Environment Variables**:
    - App Platform automatically sets `PORT`, and our code now uses `process.env.PORT`, so no special config is needed here.
7.  **Review & Launch**: Choose a plan (the Basic plan is usually fine for starting) and click **Create Resources**.

## Step 2: Connect a Custom Domain

Once your app is deployed and running:

1.  Go to your App's dashboard in DigitalOcean.
2.  Click on the **Settings** tab.
3.  Click **Domains** > **Add Domain**.
4.  Enter your domain name (e.g., `example.com` or `cert.example.com`).
5.  Follow the instructions to update your DNS records:
    - If you manage DNS on DigitalOcean, it can be automatic.
    - If you use another provider (like GoDaddy or Namecheap), you'll need to add a **CNAME** record pointing to your App Platform URL (e.g., `your-app-name.ondigitalocean.app`).

## Troubleshooting

- **Build Errors**: Check the "Activity" or "Logs" tab. Ensure `npm install` runs successfully.
- **Runtime Errors**: Check "Runtime Logs". Ensure the PDF file exists in the correct path relative to `server.js`.
