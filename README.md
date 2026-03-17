# Streakly

A desktop habit tracker built with Electron + React (TypeScript).

Track your daily habits, maintain streaks, and visualise your progress over the past 7 days — all from a native desktop app.

---

## Features

- Add habits with a custom icon and colour
- Mark habits as done each day
- 7-day completion grid per habit
- Streak counter showing your current daily streak
- Stats bar showing today's progress and best streak
- Auto-update support via `electron-updater`

---

## Tech Stack

- [Electron](https://www.electronjs.org/) — desktop shell
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) — UI
- [electron-vite](https://electron-vite.org/) — build tooling
- [date-fns](https://date-fns.org/) — date formatting
- [electron-updater](https://www.electron.build/auto-update) — auto-update

---

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm
- Git

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

### Build the installer

```bash
# Windows
npm run build:win

# macOS
npm run build:mac
```

The installer will be output to the `dist-packages/` folder.

---

## Project Structure

```
streakly/
├── src/
│   ├── main/               # Electron main process
│   │   └── index.ts        # App lifecycle + auto-updater
│   ├── preload/            # Preload scripts
│   └── renderer/           # React app
│       └── src/
│           ├── App.tsx
│           ├── App.css
│           └── components/
│               ├── HabitCard.tsx
│               ├── HabitForm.tsx
│               └── StatsBar.tsx
├── resources/              # App icons
├── build/                  # electron-builder resources
├── electron-builder.yml    # Packaging configuration
└── package.json
```

---

## Releases

See the [Releases](https://github.com/jasmineteng04-dot/streakly/releases) page for downloadable installers.

---

## License

Copyright 2025
