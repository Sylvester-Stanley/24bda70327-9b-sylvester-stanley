NAME: Sylvester Stanley
UID:24BDA70327
EXPT: 9B

AIM: Build a Next.js app, containerize it with Docker, and ship it automatically using GitHub Actions.
Next.js Static Export — Docker, GHCR & GitHub Actions CI/CD

OBJECTIVES:
To get A Next.js static site served by Nginx inside Docker
To get A CI/CD pipeline that tests every PR and publishes a Docker image to GHCR on every push to main
To get a Slack notifications on each deployment

PROCEDURES:
Step 1 — Create a Next.js App
Step 2 — Configure Static Export
Step 3 — Dockerize the App
Step 4 — Run Locally with Docker
Step 5 — Set Up GitHub Actions CI/CD
Step 6 — Set Up Slack Notifications


Project Structure
Project Structure
my-app/
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions pipeline
├── app/
│   ├── globals.css          # Global Tailwind styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── public/                  # Static assets
├── Dockerfile               # Multi-stage Docker build
├── compose.yml              # Docker Compose for local testing
├── nginx.conf               # Nginx config (rootless, port 8080)
├── next.config.ts           # Static export config
├── package.json             # Scripts and dependencies
└── pnpm-lock.yaml           # Locked dependency tree


Tech Stack:
Layer	Technology
Framework	Next.js 16 (App Router, static export)
Styling	Tailwind CSS v4
Language	TypeScript
Package manager	pnpm
Container runtime	Docker (multi-stage build)
Web server	Nginx (nginx-unprivileged, rootless)
Registry	GitHub Container Registry (GHCR)
CI/CD	GitHub Actions
Notifications	Slack Incoming Webhooks

Prerequisites
To Install before:

Node.js 24+
pnpm — npm install -g pnpm
Docker
A GitHub account with a new empty repository created
Step 1 — Create a Next.js App
Scaffold a new Next.js project with pnpm:

pnpm create next-app@latest my-app --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
cd my-app
Start the dev server to verify everything works:

pnpm dev
Open http://localhost:3000.



"scripts": {
  "test:ci": "pnpm lint && pnpm build"
}
Step 2 — Configure Static Export
Open next.config.ts and set:

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
output: "export" tells Next.js to write plain HTML/CSS/JS to /out instead of starting a Node server.

Step 3 — Dockerise the App
3a — Create the Dockerfile
Create a Dockerfile in the project root with three stages:

ARG NODE_VERSION=24.13.0-slim
ARG NGINXINC_IMAGE_TAG=alpine3.22

# Stage 1: install dependencies
FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: build
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN --mount=type=cache,target=/app/.next/cache \
    corepack enable pnpm && pnpm build

# Stage 3: serve with Nginx
FROM nginxinc/nginx-unprivileged:${NGINXINC_IMAGE_TAG} AS runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/out /usr/share/nginx/html
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
Why three stages? Each stage only carries what it needs into the next. The final image contains only Nginx and your static files — no Node.js, no source code.

3b — Create nginx.conf
worker_processes 1;
pid /tmp/nginx.pid;

3c — Create compose.yml
services:
  nextjs-static-export:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    restart: unless-stopped
Step 4 — Run Locally with Docker
docker compose up -d --build
Open http://localhost:8080. You should see your app served by Nginx.

# Stop the container
docker compose down
Step 5 — Set Up GitHub Actions CI/CD
5a — Push your code to GitHub
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
5b — Create the workflow file
Create .github/workflows/ci-cd.yml:

5c — What the pipeline does
On every PR:
  test job → pnpm lint + pnpm build

On push to main:
  test job → docker job
                ├── Login to GHCR
                ├── Build Docker image
                └── Push with two tags:
                      ghcr.io/<owner>/<repo>:latest
                      ghcr.io/<owner>/<repo>:sha-<commit>
No extra secrets are needed — the workflow uses the built-in GITHUB_TOKEN to push to GHCR.

Step 6 — Set Up Slack Notifications
The pipeline sends a Block Kit message to Slack after every deployment. Follow the official Slack docs for full details.

6a — Create a Slack app
Go to https://api.slack.com/apps → Create New App → From scratch
Name it (e.g. my-app-ci) and select your workspace → Create App
6b — Enable Incoming Webhooks
In your app settings, select Incoming Webhooks from the left sidebar
Toggle Activate Incoming Webhooks to On
Click Add New Webhook to Workspace, pick a channel, then click Allow
Copy the URL — it looks like:
https://hooks.slack.com/services/YOUR/WEBHOOK/URL
Keep it secret. Never commit this URL to version control. Slack actively revokes leaked secrets.

6c — Add the secret to GitHub
Repo → Settings → Secrets and variables → Actions → New repository secret
Name: SLACK_WEBHOOK_URL
Value: paste the webhook URL
6d — Add the notification step to your workflow
Append this step inside the docker job, after the build-push step:

     
