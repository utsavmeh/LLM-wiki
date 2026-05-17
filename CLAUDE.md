# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **llm-wiki-dashboard**, an educational React web application that serves as interactive documentation for setting up a personal knowledge management system using Obsidian vaults with Claude AI. The app itself IS the documentation - it's a living guide that teaches users how to create AI-maintained knowledge repositories with proper safety mechanisms.

## Development Commands

```bash
# Start development server (binds to 127.0.0.1)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **Frontend**: React 19.2.1 with JSX
- **Build Tool**: Vite 7.2.7 (with React plugin)
- **Styling**: Pure CSS with custom variables and responsive grid
- **No Backend**: Static frontend only, builds to plain HTML/JS/CSS

## Architecture

### Single-Component Design
The app uses a monolithic architecture with one primary component:

- **`src/main.jsx`**: Entry point that renders React app
- **`src/App.jsx`** (1320 lines): Contains the entire application logic and documentation content
- **`src/styles.css`** (1268 lines): Comprehensive styling with theming system

### Content Structure in App.jsx
The documentation is organized into sections that teach:

1. **LLM-Wiki Concept**: Three-zone vault architecture (raw/, wiki/, dev/)
2. **Setup Guide**: 8-step process with copy-paste commands and configurations
3. **Ingestion Workflow**: How to add new source material with AI synthesis
4. **Developer Patterns**: Architecture Decision Records (ADRs) and collaborative notes
5. **Safety Mechanisms**: Permission matrices, approval gates, Git versioning
6. **Integration Paths**: Multiple ways to connect Claude with Obsidian

### CSS Theming System
Uses CSS custom properties for consistent theming:
- Color palette: green, blue, rose, gold, muted ink
- Responsive breakpoints: 980px, 560px
- Component-based styling for cards, panels, matrices, code blocks

## Key Development Patterns

### Content Management
All documentation content is stored as JavaScript constants in `App.jsx`. When updating content:
- Modify the relevant constants (e.g., `SETUP_STEPS`, `INGESTION_STEPS`)
- Content includes code examples, configuration templates, and safety rules
- Maintain consistency between code examples and actual implementation guidance

### Component Structure
The app renders different sections based on internal state:
- Uses conditional rendering for multi-step guides
- Interactive elements for copying code snippets
- Responsive grid layouts for complex information matrices

### Styling Approach
- Mobile-first responsive design
- Heavy use of CSS Grid for complex layouts
- Custom component classes rather than utility frameworks
- Professional UI with shadows, rounded corners, and smooth animations

## Important Constraints

### Read-Only Educational Content
This application teaches users about file system organization and AI workflows, but does not itself manipulate external files or systems. All examples and templates are for copying into user's own environments.

### No External Dependencies
The app intentionally has minimal external dependencies beyond React and Vite. This keeps the build lightweight and reduces maintenance overhead for an educational resource.

### Static Deployment Ready
The build output (`npm run build`) produces static files suitable for hosting on any web server or CDN without server-side requirements.