# Timeline Clip Sequence

The main footage track is an ordered, **gap-free** sequence of clips. A clip separator has no duration. If you cut at 2.8 seconds, both sides meet at exactly 2.8 seconds on the timeline, even when the second clip starts somewhere else in the source recording.

## 🧩 Data model

| Field / module | Meaning |
| --- | --- |
| `ClipRegion.startMs` / `endMs` | Position on the edited timeline |
| `sourceStartMs` | Where the clip starts in the source recording. Packing or reordering never changes it |
| `speed` | Source milliseconds played per timeline millisecond |
| `clipSequence.ts` | Packs trims, deletes, and speed changes. Handles insertion points, and remaps connected effects and audio |
| `timeline/core/clipPresentation.ts` | Converts between media time and clip rectangles on screen. Scrubbing a separator returns its cut time; the playhead never pauses on it |

## ✂️ Editing behavior

- **Resizing** a clip is limited by the available source footage and the minimum clip length, not by the next clip.
- **Dragging** a clip picks an insertion point instead of looking for empty space.
- **Captions** created from the source are re-mapped from their original cues.
- **Imported audio** keeps its length when its anchor moves.
- **Annotations** can be selected even when they aren't visible at the current playhead time.
- **Older projects** with gaps on the main track are closed up when they load, before the undo history starts. Editing and export use the same clip positions.

## 🧲 Snapping and preview

- Zoom, annotation, caption, and audio blocks snap to other block edges, including clip cuts, within **8 screen pixels** at any zoom level. Moving further away releases the snap.
- Dragging a block keeps its duration.
- Zoom blocks can span clip separators.
- Hover previews, caption placement, keyframes, and playhead snapping all use the same time mapping as clips.
- Seeking across a cut keeps camera motion smooth. An explicit seek on the timeline still lands on the exact frame.
