# Smith Degamo — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Scripts

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the dev server at http://localhost:3000   |
| `npm run build`     | Production build                                |
| `npm start`         | Serve the production build                      |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`       |
| `npm run images`    | Re-generate WebP images from `assets-src/`      |

## Editing content

- **Personal details, email, socials:** `src/data/site.ts`
- **Projects:** `src/data/projects.ts`
- **Tech stack:** `src/data/stack.ts`

## Images

Source images live in `assets-src/` and are converted to WebP in `public/images/` by `npm run images`.

- Portrait: replace `assets-src/portrait/smith-degamo.jpg`, then run `npm run images`. It is also used for the social share image.
- Project screenshots: add `assets-src/work/<slug>.png`, run `npm run images`, and set `image: '/images/work/<slug>'` on the project.
