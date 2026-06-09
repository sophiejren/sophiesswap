# TapLRC — tap-to-sync `.lrc` lyric maker

A tiny, free, **single-file** web tool that makes synced lyric files (`.lrc`) **by ear**.
Load an audio file, paste your lyrics, and **tap along** — each tap stamps the line you're on.
Export a standard `.lrc` (or JSON) for music players, karaoke apps, lyric pages, and your own projects.

> **No install. No upload. No account.** Your audio and lyrics never leave your browser — it's all client-side.

**▶ Live demo:** https://sophieren.com/taplrc/

---

## Why

Making an `.lrc` today means either hand-typing timestamps line by line, or installing a forced-alignment / Whisper pipeline. TapLRC is the in-between: open a web page, tap to the beat, done. One thing, done well.

## Features

- 🎧 **Bring your own audio** — drag & drop or pick a file (mp3 / wav / m4a / ogg)
- ✍️ **Paste any lyrics** — one line per lyric line; repeat choruses as actually sung
- 👆 **Tap to sync** — tap (or press `Space`) when each line begins; the current line auto-highlights and scrolls
- 🐢 **Slow-down playback** (0.5×–1×) so you can tap accurately
- ⤵️ **Blank lines auto-skip** — stanza gaps don't need a tap
- 🎚️ **Global offset** — nudge every timestamp if you tap a little late
- ▶️ **Preview** — play it back with the synced highlight to check before you export
- 📤 **Export** standard **`.lrc`** (with `[ti:]` / `[ar:]` tags) or **JSON** `[[time, line], …]`
- ⌨️ **Keyboard:** `Space` tap · `Z` undo · `R` restart · `P` play/pause · `←/→` seek
- 🔒 **100% local & private** · zero dependencies · works offline

## Use it

Just open `index.html` in any modern browser. That's the whole app — one HTML file, no build step.

Or self-host: drop `index.html` on any static host (GitHub Pages, Netlify, your own site).

### The `.lrc` you get

```
[ti:Your Song]
[ar:Your Name]
[tool:TapLRC]
[00:07.76]I wanted to build one agent
[00:12.63]One became ten, ten became a hundred
...
```

Works in most lyric-capable players and anything that reads LRC.

## Tips for an accurate sync

1. Set speed to **0.75×**.
2. Tap on the **first syllable** of each line.
3. If it feels consistently late, pull the **offset** to about `-0.2s` to `-0.3s`.
4. Use **Preview** to verify, then **Download .lrc**.

## Contributing

Issues and PRs welcome — keep it dependency-free and single-file.

## License

MIT © Sophie Ren. Build weird, useful things.
