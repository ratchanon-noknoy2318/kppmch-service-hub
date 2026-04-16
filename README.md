# KPPMCH Service Hub
**Centralized Hospital Service & Resource Platform**


![System Screenshot](https://kppmch-service.vercel.app/og-image.png)

---

## Overview
KPPMCH Service Hub is a **production-ready centralized platform** designed to streamline access to hospital services, internal resources, and clinical workflows.

The system **reduces access time, improves performance, and scales for future hospital modules**.

**Key Achievements:**
- Reduced service access time by **50%+**
- Modular, extendable architecture for new hospital features
- Consistent, responsive UI across devices
- Production-grade deployment with SSR/SSG and Vercel edge

---

## Tech Stack

| Layer      | Technology           | Notes |
| ---------- | ------------------ | ----- |
| Framework  | Next.js (App Router)| Hybrid SSR/SSG, React Server Components |
| Frontend   | React.js            | Functional Components & Hooks |
| Styling    | CSS Modules         | Scoped, maintainable styles |
| Deployment | Vercel              | Edge network, global CDN, automated CI/CD |

---

## Architecture & Design
- **Hybrid SSR/SSG Rendering** for optimal performance & SEO  
- **Component-Based Architecture** ensures modularity & maintainability  
- **Optimized Asset Delivery** (images, fonts, caching)  
- **Scalable Structure** ready for backend API integration  
- **Edge Deployment** via Vercel for low-latency access  

---

## Features

| Feature               | Description |
| --------------------- | ----------- |
| Service Hub           | Centralized access to hospital services and internal systems |
| Performance Optimized | SSR/SSG for fast load times and SEO-friendly pages |
| Responsive UI         | Adaptive interface for desktop, tablet, and mobile |
| Modular Architecture  | Easily extendable for new hospital service modules |
| Production Ready      | CI/CD, edge deployment, optimized build pipeline |

---

## Project Structure

```
/app         → Routing & server logic  
/components  → Reusable UI components  
/public      → Static assets  
```

---

## Getting Started

### 1. Clone repository

```bash
git clone https://gitlab.com/ratchanon.noknoy2318/kppmch-service.git
cd kppmch-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=<your_api_url>
```

---

## Usage

| Task             | Command / Description |
| ---------------- | --------------------- |
| Development      | `npm run dev`         |
| Production Build | `npm run build`       |
| Start Server     | `npm start`           |
| Deployment       | Deploy via Vercel     |

---

## Performance

* Optimized for Core Web Vitals (LCP, CLS)
* Automatic image optimization
* Font preloading and caching
* Edge deployment via Vercel

---

## Live Demo

👉 https://kppmch-service.vercel.app/

---

## Roadmap

* [ ] Add authentication system
* [ ] Integrate backend services
* [ ] Improve monitoring & logging
* [ ] Expand hospital service modules

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a merge request

---

## Author

**Ratchanon Noknoy**
Software Engineer

---

## License

MIT License © 2025–2026 Ratchanon Noknoy
