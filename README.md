# The Farm's — 3D E-Commerce & Marketing Platform

A modern, high-performance MERN-stack monorepo application for **The Farm's** — Pakistani farm-to-table brand selling cold-ground spices, raw Sidr honey, and wellness products (Himalayan Salajit, curcumin capsules).

## Architecture

This project is organized as a **pnpm monorepo** with 3 deployable applications and 2 shared packages:

- `apps/web`: Public storefront & marketing website (React 18 + Vite, Three.js / R3F, GSAP ScrollTrigger, Lenis).
- `apps/admin`: Dedicated Admin Dashboard (React 18 + Vite, SaaS aesthetic, role-gated).
- `apps/server`: Node.js + Express + TypeScript REST API (`/api/v1/*`).
- `packages/shared-types`: TypeScript interfaces, DTOs, Enums, and API signatures shared across web, admin, and server.
- `packages/ui`: Design tokens and shared UI primitives.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose (optional for local MongoDB & Redis)

## Local Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start MongoDB & Redis (via Docker):**
   ```bash
   docker-compose up -d
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` in root and in each `apps/*` folder to `.env` and adjust as needed.

4. **Seed Database:**
   ```bash
   pnpm seed
   ```

5. **Start Development Servers:**
   - Server API (`http://localhost:5000`): `pnpm dev:server`
   - Storefront Web (`http://localhost:5173`): `pnpm dev:web`
   - Admin Dashboard (`http://localhost:5174`): `pnpm dev:admin`

## Security Overview

- Short-lived JWT access tokens + httpOnly refresh cookies with token rotation.
- Role-Based Access Control (RBAC): `customer`, `admin`, `editor`.
- Request validation using Zod.
- Security headers via Helmet, CORS strict allowlist, NoSQL injection protection, and XSS sanitization via DOMPurify.
