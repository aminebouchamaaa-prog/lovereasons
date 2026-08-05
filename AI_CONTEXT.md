# LoveReasons - Project Specification

## Goal

This website is a personal gift for my long-distance girlfriend.

The website reveals one letter per day over 33 days until we meet again.

The experience should feel emotional, minimal, elegant and smooth.

Do NOT redesign the project architecture unless requested.

---

# Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Vercel

---

# Existing Backend

Already completed.

- Supabase project connected.
- Environment variables configured.
- Database working.
- Storage working.
- Photos bucket exists.
- Music bucket exists.

Do NOT modify the backend unless requested.

---

# Database

Table:

days

Columns:

- id
- unlock_date
- title
- content
- photo_path
- music_path
- music_name

One row = one day.

---

# Storage

photos/
music/

Decoration assets are stored inside Next.js public folder.

---

# File Organization

app/
    page.tsx          -> Password page

    love/
        page.tsx      -> Main experience

components/

    Password/
    Intro/
    Countdown/
    Envelope/
    Letter/
    Music/
    Decorations/

lib/

    supabase.ts
    storage.ts
    days.ts

types/

public/

    decor/

---

# Rules

Keep components small.

Create reusable components.

Use TypeScript.

Do not install libraries unless requested.

Do not change the folder structure.

Do not delete existing files unless requested.

Do not redesign previously completed features.

Only work on the requested functionality.

---

# Development Strategy

We build functionality first.

Styling comes later.

Each prompt implements only ONE feature.

Do not implement future features.