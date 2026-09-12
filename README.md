# GIKI Prayer Times

An installable PWA for the Students' Mosque GIKI jamaat timings, with a live next-prayer countdown and reminders.

Live: https://giki-prayer-times.vercel.app

This builds on the existing mosque site at https://salahtimes-giki.vercel.app. I didn't make the original; this just adds a mobile, installable front-end with notifications on top of the same jamaat board.

## What it does

- Shows the fixed jamaat times (Fajr, Dhuhr, Asr, Isha, and Jumu'ah on Fridays).
- Pulls the mosque's official times on open and hourly, so it updates by itself if the board changes.
- Recalculates Maghrib daily from sunset for GIKI (34.06N, 72.64E) via the AlAdhan API.
- Sends a reminder at each jamaat time plus an optional pre-reminder.
- Installs to the home screen and works offline after the first load.

## How it works

The mosque API (`salahtimes-giki.vercel.app/api/config`) blocks cross-origin browser requests, so `api/times.js` fetches it server-side and re-serves it with CORS headers. The front-end in `index.html` reads from `/api/times`, normalizes the formats, and renders everything in the browser.

## Files

- `index.html`: the app (UI, countdown, scheduling, notifications)
- `api/times.js`: serverless proxy for the jamaat board
- `sw.js`: service worker for offline support and notifications
- `manifest.webmanifest`: PWA manifest
- `icon.svg`, `icon-maskable.svg`: app icons

## Notes

- Jamaat times can be overridden locally in the Settings panel (saved per device).
- Notifications are reliable on Android/Chrome; iOS PWA support is limited.
