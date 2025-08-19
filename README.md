# UI Components Assignment (Vite + React + TypeScript + Tailwind + Storybook)

Polished, human-crafted components with custom animations and a non-default color scheme.

## ✨ Tech
- Vite + React + TypeScript
- TailwindCSS (custom theme colors)
- Framer Motion animations
- Storybook 8 (React + Vite)
- Vitest + Testing Library

## 📦 Install & Run
```bash
npm install
npm run dev
```
Storybook:
```bash
npm run storybook
```
Tests:
```bash
npm test
```

## 🧩 Components
### InputField
- Variants: `filled | outlined | ghost`
- Sizes: `sm | md | lg`
- States: `disabled | invalid | loading`
- Helper text & error message
- Clear button & password toggle
- Light/Dark theme

### DataTable
- Display tabular data
- Column sorting
- Row selection (single/multiple)
- Loading & empty states
- Responsive

> **Note:** To support *single or multiple* selection, an optional prop `selectionMode?: 'single' | 'multiple'` is added (defaults to `multiple`). This is a minimal extension over the provided interface and keeps backward compatibility.

## 🗂️ Structure
```
my-ui-components/
  .storybook/
  src/
    components/
      InputField.tsx
      DataTable.tsx
      index.ts
    stories/
      InputField.stories.tsx
      DataTable.stories.tsx
    components/__tests__/
      InputField.test.tsx
      DataTable.test.tsx
    App.tsx
    main.tsx
    index.css
  tailwind.config.ts
  postcss.config.js
  vite.config.ts
  tsconfig.json
  package.json
```

## 🌈 Design
- Custom palette (plum, indigo, amber) – no default Tailwind colors.
- Soft shadows, 2xl rounding, subtle glassy surfaces.
- Motion on focus/hover/invalid and table interactions.

## 🚀 Deploy Storybook
- Push to GitHub, connect to Chromatic or deploy via Vercel.
