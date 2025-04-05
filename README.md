# 📦 Dependencies

The blog editor uses a curated set of libraries and extensions for a full-featured editing experience.

---

## 🧠 Editor Core
- `@tiptap/react`
- `@tiptap/starter-kit`
- `@tiptap/pm`
- `lowlight` – Syntax highlighting

---

## ✍️ Tiptap Extensions Used

| Extension | Description |
| --------- | ----------- |
| `@tiptap/extension-bullet-list` | Bullet list support |
| `@tiptap/extension-character-count` | Word/character counter |
| `@tiptap/extension-code-block` | Code block |
| `@tiptap/extension-code-block-lowlight` | Code block with syntax highlighting |
| `@tiptap/extension-collaboration` | Real-time collaboration (optional) |
| `@tiptap/extension-collaboration-cursor` | Cursor avatars |
| `@tiptap/extension-color` | Text color styles |
| `@tiptap/extension-document` | Base document structure |
| `@tiptap/extension-dropcursor` | Drag cursor visuals |
| `@tiptap/extension-focus` | Focus ring styling |
| `@tiptap/extension-font-family` | Font customization |
| `@tiptap/extension-heading` | Headings for TOC |
| `@tiptap/extension-highlight` | Inline highlights |
| `@tiptap/extension-horizontal-rule` | `<hr />` support |
| `@tiptap/extension-image` | Embed images |
| `@tiptap/extension-link` | Hyperlinks |
| `@tiptap/extension-ordered-list` | Numbered lists |
| `@tiptap/extension-paragraph` | Paragraph block |
| `@tiptap/extension-placeholder` | Placeholder text |
| `@tiptap/extension-subscript` | Subscript |
| `@tiptap/extension-superscript` | Superscript |
| `@tiptap/extension-table` | Table support |
| `@tiptap/extension-table-header` | Table header rows |
| `@tiptap/extension-table-row` | Table rows |
| `@tiptap/extension-task-item` | Task list items |
| `@tiptap/extension-task-list` | Task list container |
| `@tiptap/extension-text-align` | Text alignment |
| `@tiptap/extension-text-style` | Inline styles |
| `@tiptap/extension-typography` | Smart punctuation |
| `@tiptap/extension-underline` | Underlined text |

Enable/disable extensions in `use-editor-setup.ts`.

---

## 🎨 Styling & UI
- `tailwindcss`
- `@tailwindcss/typography`
- `clsx`
- `class-variance-authority`

### Tailwind Setup Required
Add the following plugins in your Tailwind config:

```ts
// tailwind.config.js or tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## 🧩 UI Components (via shadcn/ui)
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-separator`
- `@radix-ui/react-slot`
- `@radix-ui/react-tooltip`
- `lucide-react` – Icon set

---

## 📝 Blog Editor – Documentation
A rich blog editing interface built with Tiptap, supporting editing, preview mode, and an auto-generated Table of Contents (TOC).

### ✨ Features
- ✅ WYSIWYG Editor using Tiptap with custom setup
- 🪄 Live Preview mode using Tailwind Typography (`prose`)
- 🧽 Table of Contents generated from headings inside the editor
- 🔛 Toggle bar to switch between Edit and Preview modes
- 🌙 Dark mode support

---

## 🗂 File Structure – `features/editor`

```
features/
└── editor/
    ├── extensions/          # Custom Tiptap extensions
    ├── hooks/               # Editor-related hooks
    ├── table-of-content/    # TOC generation components
    ├── topbar/              # Editor topbar UI
    ├── ui/                  # Editor-specific UI components
    ├── index.tsx            # Editor entry point component
    └── utils.ts             # Editor utility functions
```


---

## 🧠 Editor Setup
The editor is initialized via a custom `useEditorSetup()` hook that configures extensions, placeholder text, and other Tiptap options. This setup is abstracted into a reusable hook.

---

## 🎨 Syntax Highlighting
Add these CSS styles for syntax highlighting in code blocks:

```css
.tiptap {
  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
    overflow-x: auto;

    code {
      font-size: 0.8rem;
      padding: 0;
      color: inherit;
      font-family: inherit;
      white-space: pre;
    }
  }

  /* Syntax highlighting colors */
  pre code .hljs-comment,
  pre code .hljs-quote {
    color: #616161;
  }

  pre code .hljs-variable,
  pre code .hljs-template-variable,
  pre code .hljs-attribute,
  pre code .hljs-tag,
  pre code .hljs-regexp,
  pre code .hljs-link,
  pre code .hljs-name,
  pre code .hljs-selector-id,
  pre code .hljs-selector-class {
    color: #f98181;
  }

  pre code .hljs-number,
  pre code .hljs-meta,
  pre code .hljs-built_in,
  pre code .hljs-builtin-name,
  pre code .hljs-literal,
  pre code .hljs-type,
  pre code .hljs-params {
    color: #fbbc88;
  }

  pre code .hljs-string,
  pre code .hljs-symbol,
  pre code .hljs-bullet {
    color: #b9f18d;
  }

  pre code .hljs-title,
  pre code .hljs-section {
    color: #faf594;
  }

  pre code .hljs-keyword,
  pre code .hljs-selector-tag {
    color: #70cff8;
  }

  pre code .hljs-emphasis {
    font-style: italic;
  }

  pre code .hljs-strong {
    font-weight: 700;
  }
}
```

---

## 📚 Table of Contents
The `TableOfContent` component walks through the editor’s JSON content and extracts headings (`h1`–`h6`). It:

- Generates `id` values from text (slugified)
- Tracks updates via `editor.on('update')`
- Truncates long heading text to avoid layout breaking

---

## 👀 Preview Mode
When toggled, the editor content is rendered as HTML using:

```tsx
<dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
```

> This is safe in this context since the content is authored by the user.

The preview is styled using Tailwind's `prose` and `dark:prose-invert` classes for a clean reading experience.

