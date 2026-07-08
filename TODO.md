# TODO

## Portfolio page editorial replacement
- [x] Read current `src/routes/portfolio.tsx` and identify existing gallery + card implementation.
- [ ] Replace the current portfolio gallery section with a new **Featured Projects** section while keeping the existing heading and description text exactly.
- [ ] Ensure **exactly 7** cards render immediately below the heading.
- [ ] Implement alternating split layout per card (Image 70/Text 30 vs Text 30/Image 70; then Image|Text; Text|Image; continue through all 7).
- [ ] Enforce layout constraints: one card per row, no masonry, ~90–95% container width, equal spacing 48–64px.
- [ ] Update animations: card fade + move upward; image zoom 1.08 → 1; replay on viewport re-entry; hover image slight zoom; gold border glow on hover.
- [ ] Update project data ordering/titles if needed to match the requested list.
- [ ] Run typecheck/build to ensure no TS/JSX errors.

