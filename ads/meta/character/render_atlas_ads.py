#!/usr/bin/env python3
"""Render almost-real Atlas Meta ads from locked primary stills.

Produces 15s 1080x1920 mp4s with slow motion (ken-burns + crossfade)
and burned-in captions. Destination in Ads Manager = GRW guide.

Usage:
  .venv-ads/bin/python ads/meta/character/render_atlas_ads.py
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from imageio_ffmpeg import write_frames

ROOT = Path(__file__).resolve().parent
REF = ROOT / "reference"
OUT = ROOT / "output"

W, H = 1080, 1920
FPS = 30
DURATION = 15
TOTAL = FPS * DURATION

WHITE = (248, 250, 252)
ACCENT = (96, 165, 250)
EMERALD = (52, 211, 153)
MUTED = (148, 163, 184)
SHADOW = (0, 0, 0, 160)


def font(size: int, bold: bool = False):
    paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def load_cover(path: Path) -> Image.Image:
    """Scale/crop source to exact 1080x1920 cover."""
    im = Image.open(path).convert("RGB")
    scale = max(W / im.width, H / im.height)
    nw, nh = int(im.width * scale + 0.5), int(im.height * scale + 0.5)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - W) // 2
    top = (nh - H) // 2
    return im.crop((left, top, left + W, top + H))


def ken_burns(base: Image.Image, t: float, zoom_from: float = 1.0, zoom_to: float = 1.08) -> Image.Image:
    """t in 0..1 — slow zoom in on center-weighted crop."""
    z = zoom_from + (zoom_to - zoom_from) * t
    bw, bh = base.size
    cw, ch = int(bw / z), int(bh / z)
    # bias slightly upward so face stays in frame
    cx, cy = bw // 2, int(bh * 0.42)
    left = max(0, min(bw - cw, cx - cw // 2))
    top = max(0, min(bh - ch, cy - ch // 2))
    crop = base.crop((left, top, left + cw, top + ch))
    return crop.resize((W, H), Image.Resampling.LANCZOS)


def blend(a: Image.Image, b: Image.Image, alpha: float) -> Image.Image:
    alpha = max(0.0, min(1.0, alpha))
    return Image.blend(a, b, alpha)


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_caption_block(
    frame: Image.Image,
    headline: str,
    sub: str,
    footer: str,
    opacity: float = 1.0,
) -> Image.Image:
    if opacity <= 0.01:
        return frame
    img = frame.convert("RGBA")
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    # bottom gradient panel
    for i, y in enumerate(range(H - 620, H)):
        a = int(min(210, 20 + i * 0.55) * opacity)
        d.rectangle((0, y, W, y + 1), fill=(8, 12, 24, a))

    f_brand = font(28, True)
    f_h = font(48, True)
    f_s = font(28, False)
    f_f = font(22, False)

    y = H - 560
    tw = d.textlength("GRW RESEARCH", font=f_brand)
    d.text(((W - tw) / 2, y), "GRW RESEARCH", font=f_brand, fill=(*ACCENT, int(255 * opacity)))
    y += 48

    for line in wrap(d, headline, f_h, W - 120):
        tw = d.textlength(line, font=f_h)
        # soft shadow
        d.text(((W - tw) / 2 + 2, y + 2), line, font=f_h, fill=(0, 0, 0, int(180 * opacity)))
        d.text(((W - tw) / 2, y), line, font=f_h, fill=(*WHITE, int(255 * opacity)))
        y += 56

    y += 8
    d.rectangle((W / 2 - 32, y, W / 2 + 32, y + 3), fill=(*ACCENT, int(255 * opacity)))
    y += 22

    for line in wrap(d, sub, f_s, W - 140):
        tw = d.textlength(line, font=f_s)
        d.text(((W - tw) / 2, y), line, font=f_s, fill=(*MUTED, int(255 * opacity)))
        y += 34

    tw = d.textlength(footer, font=f_f)
    d.text(((W - tw) / 2, H - 100), footer, font=f_f, fill=(*EMERALD, int(255 * opacity)))

    out = Image.alpha_composite(img, overlay)
    return out.convert("RGB")


ADS = [
    {
        "id": "atlas-what-is-bpc",
        "beats": [
            # (start_s, end_s, image_key, headline, sub)
            (0, 5, "read", "Before you trust online peptide claims", "Read what the research actually covers"),
            (5, 10, "read", "Evidence. Limits. Context.", "A calm BPC-157 research overview"),
            (10, 15, "lookup", "Free research guide", "grwresearch.com/research/bpc-157"),
        ],
        "footer": "Educational · Not medical advice",
    },
    {
        "id": "atlas-evidence-limits",
        "beats": [
            (0, 5, "read", "Most BPC-157 claims outrun the evidence", "Stay cautious. Stay literate."),
            (5, 10, "read", "Mechanisms ≠ proven outcomes", "Separate signal from noise"),
            (10, 15, "lookup", "Read the independent guide", "GRW Research · free educational overview"),
        ],
        "footer": "Education first · Swiss later on-page",
    },
]


def frame_for_ad(images: dict, ad: dict, i: int) -> Image.Image:
    t = i / FPS
    # pick beat
    beat = ad["beats"][-1]
    for start, end, key, headline, sub in ad["beats"]:
        if start <= t < end or (end == DURATION and t <= end):
            beat = (start, end, key, headline, sub)
            break
    start, end, key, headline, sub = beat
    local = (t - start) / max(0.001, end - start)

    base = images[key]
    # ken burns
    if key == "read":
        frame = ken_burns(base, local, 1.0, 1.06)
    else:
        frame = ken_burns(base, local, 1.02, 1.08)

    # crossfade into look-up near end of middle beat
    if key == "read" and end >= 10 and t >= 9.2:
        alpha = (t - 9.2) / 0.8
        frame = blend(frame, ken_burns(images["lookup"], min(1.0, alpha), 1.02, 1.05), alpha)

    # caption fade in each beat
    fade = min(1.0, local * 4) if local < 0.85 else max(0.0, 1.0 - (local - 0.85) / 0.15)
    # keep captions readable — don't fully fade out
    fade = max(0.75, fade)
    return draw_caption_block(frame, headline, sub, ad["footer"], opacity=fade)


def render_ad(images: dict, ad: dict) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{ad['id']}-15s.mp4"
    writer = write_frames(
        str(path),
        (W, H),
        fps=FPS,
        quality=8,
        bitrate="3500k",
        codec="libx264",
        macro_block_size=1,
        pix_fmt_in="rgb24",
        pix_fmt_out="yuv420p",
        output_params=["-movflags", "+faststart"],
    )
    writer.send(None)
    for i in range(TOTAL):
        frame = frame_for_ad(images, ad, i)
        writer.send(np.asarray(frame))
    writer.close()

    # poster still
    poster = frame_for_ad(images, ad, FPS * 3)
    poster_path = OUT / f"{ad['id']}-poster.png"
    poster.save(poster_path, quality=95)
    print("wrote", path, path.stat().st_size)
    print("wrote", poster_path)
    return path


def main():
    images = {
        "read": load_cover(REF / "atlas-primary.png"),
        "lookup": load_cover(REF / "atlas-primary-look-up.png"),
    }
    # slightly larger working buffer for ken burns
    images = {k: v.resize((int(W * 1.12), int(H * 1.12)), Image.Resampling.LANCZOS) for k, v in images.items()}

    for ad in ADS:
        render_ad(images, ad)


if __name__ == "__main__":
    main()
