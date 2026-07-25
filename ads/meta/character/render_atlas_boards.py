#!/usr/bin/env python3
"""Render semi-realistic illustrated Atlas character boards (1080x1920).

More human proportions than the geometric v1 — still flat-illustrated
(animatable), not photoreal.

Usage:
  .venv-ads/bin/python ads/meta/character/render_atlas_boards.py
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(__file__).resolve().parent / "boards"
W, H = 1080, 1920

INK = (15, 23, 42)
NAVY = (22, 35, 62)
ACCENT = (29, 78, 216)
EMERALD = (5, 150, 105)
SOFT = (186, 198, 214)
MUTED = (120, 134, 156)
WHITE = (248, 250, 252)
SKIN = (232, 205, 180)
SKIN_SHADOW = (210, 175, 148)
HAIR = (35, 32, 40)
COAT = (28, 48, 110)
COAT_DARK = (18, 32, 78)
SHIRT = (236, 240, 245)


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


def bg() -> Image.Image:
    y = np.linspace(0, 1, H, dtype=np.float32)[:, None]
    deep = np.array((10, 14, 28), dtype=np.float32)
    mid = np.array((24, 36, 64), dtype=np.float32)
    arr = deep + (mid - deep) * y
    arr = np.broadcast_to(arr[:, None, :], (H, W, 3)).astype(np.uint8).copy()
    img = Image.fromarray(arr)
    # soft vignette-ish side light
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse((W - 520, 200, W + 200, 1100), fill=(56, 120, 220, 28))
    d.ellipse((-180, 900, 420, 1700), fill=(5, 150, 105, 18))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    return img


def brand(draw: ImageDraw.ImageDraw, y: int = 72):
    f = font(40, True)
    sub = font(16, False)
    tw = draw.textlength("GRW", font=f)
    draw.text(((W - tw) / 2, y), "GRW", font=f, fill=WHITE)
    sw = draw.textlength("RESEARCH", font=sub)
    draw.text(((W - sw) / 2, y + 48), "RESEARCH", font=sub, fill=(96, 165, 250))


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = f"{cur} {w}".strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _ellipse(draw, box, fill, outline=None, width=1):
    draw.ellipse(box, fill=fill, outline=outline, width=width)


def draw_atlas(
    base: Image.Image,
    cx: int,
    cy: int,
    scale: float = 1.0,
    gesture: str = "idle",
):
    """Semi-realistic flat illustration of Atlas (adult proportions)."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    s = scale

    def x(v):
        return cx + v * s

    def y(v):
        return cy + v * s

    def box(x0, y0, x1, y1):
        return (x(x0), y(y0), x(x1), y(y1))

    # --- legs ---
    d.rounded_rectangle(box(-36, 95, -8, 210), radius=int(12 * s), fill=(30, 41, 59, 255))
    d.rounded_rectangle(box(8, 95, 36, 210), radius=int(12 * s), fill=(30, 41, 59, 255))
    # shoes
    d.rounded_rectangle(box(-42, 200, -4, 218), radius=int(8 * s), fill=(20, 24, 36, 255))
    d.rounded_rectangle(box(4, 200, 42, 218), radius=int(8 * s), fill=(20, 24, 36, 255))

    # --- torso / coat ---
    d.rounded_rectangle(box(-62, -10, 62, 110), radius=int(28 * s), fill=(*COAT_DARK, 255))
    d.rounded_rectangle(box(-56, -5, 56, 105), radius=int(24 * s), fill=(*COAT, 255))
    # lapels
    d.polygon(
        [(x(-18), y(-5)), (x(-6), y(55)), (x(-28), y(55))],
        fill=(*SHIRT, 255),
    )
    d.polygon(
        [(x(18), y(-5)), (x(6), y(55)), (x(28), y(55))],
        fill=(*SHIRT, 255),
    )
    # shirt
    d.rounded_rectangle(box(-16, -8, 16, 70), radius=int(8 * s), fill=(*SHIRT, 255))
    # pocket
    d.rounded_rectangle(box(18, 35, 48, 62), radius=int(6 * s), outline=(180, 200, 240, 200), width=max(1, int(2 * s)))

    # --- neck ---
    d.rectangle(box(-14, -28, 14, -8), fill=(*SKIN_SHADOW, 255))

    # --- head ---
    _ellipse(d, box(-48, -118, 48, -22), (*SKIN, 255))
    # cheek soft shadow
    _ellipse(d, box(-44, -70, -8, -30), (*SKIN_SHADOW, 70))
    _ellipse(d, box(8, -70, 44, -30), (*SKIN_SHADOW, 70))

    # hair (short, neat)
    d.pieslice(box(-50, -125, 50, -40), 200, 340, fill=(*HAIR, 255))
    d.ellipse(box(-50, -118, 50, -70), fill=(*HAIR, 255))
    # sideburns
    d.rectangle(box(-48, -85, -38, -45), fill=(*HAIR, 255))
    d.rectangle(box(38, -85, 48, -45), fill=(*HAIR, 255))

    # ears
    _ellipse(d, box(-56, -78, -42, -50), (*SKIN, 255))
    _ellipse(d, box(42, -78, 56, -50), (*SKIN, 255))

    # eyebrows
    d.arc(box(-30, -88, -8, -72), 200, 340, fill=(55, 45, 40, 255), width=max(2, int(3 * s)))
    d.arc(box(8, -88, 30, -72), 200, 340, fill=(55, 45, 40, 255), width=max(2, int(3 * s)))

    # eyes (more human)
    _ellipse(d, box(-28, -78, -8, -58), (255, 255, 255, 255))
    _ellipse(d, box(8, -78, 28, -58), (255, 255, 255, 255))
    _ellipse(d, box(-23, -73, -13, -63), (45, 60, 90, 255))
    _ellipse(d, box(13, -73, 23, -63), (45, 60, 90, 255))
    _ellipse(d, box(-20, -71, -16, -67), (255, 255, 255, 220))
    _ellipse(d, box(16, -71, 20, -67), (255, 255, 255, 220))

    # glasses (thin metal)
    d.ellipse(box(-32, -82, -4, -54), outline=(70, 80, 100, 255), width=max(2, int(3 * s)))
    d.ellipse(box(4, -82, 32, -54), outline=(70, 80, 100, 255), width=max(2, int(3 * s)))
    d.line((x(-4), y(-68), x(4), y(-68)), fill=(70, 80, 100, 255), width=max(2, int(2 * s)))
    d.line((x(-32), y(-68), x(-40), y(-72)), fill=(70, 80, 100, 255), width=max(1, int(2 * s)))
    d.line((x(32), y(-68), x(40), y(-72)), fill=(70, 80, 100, 255), width=max(1, int(2 * s)))

    # nose
    d.line((x(0), y(-62), x(-3), y(-48)), fill=(*SKIN_SHADOW, 255), width=max(1, int(2 * s)))
    d.arc(box(-6, -52, 6, -42), 20, 160, fill=(*SKIN_SHADOW, 255), width=max(1, int(2 * s)))

    # mouth (neutral / slight closed smile)
    d.arc(box(-12, -42, 12, -28), 20, 160, fill=(150, 90, 90, 255), width=max(2, int(2 * s)))

    # --- arms + props ---
    if gesture == "checklist":
        # left arm holding clipboard
        d.rounded_rectangle(box(-95, 10, -58, 55), radius=int(14 * s), fill=(*SKIN, 255))
        # clipboard
        d.rounded_rectangle(box(-150, -25, -55, 95), radius=int(10 * s), fill=(250, 252, 255, 255))
        d.rectangle(box(-150, -25, -55, -5), fill=(*ACCENT, 255))
        for i, yy in enumerate((10, 35, 60)):
            d.rounded_rectangle(box(-138, yy, -122, yy + 14), radius=3, outline=(*EMERALD, 255), width=2)
            d.line((x(-112), y(yy + 7), x(-70), y(yy + 7)), fill=(200, 210, 225, 255), width=max(2, int(3 * s)))
        # hand on edge
        _ellipse(d, box(-70, 25, -40, 55), (*SKIN, 255))
        # right arm idle
        d.rounded_rectangle(box(58, 20, 82, 85), radius=int(12 * s), fill=(*COAT_DARK, 255))
        _ellipse(d, box(58, 78, 86, 102), (*SKIN, 255))
    elif gesture == "notebook":
        d.rounded_rectangle(box(55, 5, 145, 100), radius=int(10 * s), fill=(250, 252, 255, 255))
        d.line((x(65), y(28), x(135), y(28)), fill=(*ACCENT, 255), width=max(2, int(3 * s)))
        d.line((x(65), y(48), x(125), y(48)), fill=(210, 220, 235, 255), width=max(2, int(3 * s)))
        d.line((x(65), y(68), x(115), y(68)), fill=(210, 220, 235, 255), width=max(2, int(3 * s)))
        # arm
        d.rounded_rectangle(box(40, 15, 70, 50), radius=int(12 * s), fill=(*SKIN, 255))
        _ellipse(d, box(48, 35, 78, 62), (*SKIN, 255))
        d.rounded_rectangle(box(-82, 20, -58, 85), radius=int(12 * s), fill=(*COAT_DARK, 255))
        _ellipse(d, box(-90, 78, -58, 102), (*SKIN, 255))
    elif gesture == "point":
        d.rounded_rectangle(box(55, 8, 130, 32), radius=int(12 * s), fill=(*COAT_DARK, 255))
        _ellipse(d, box(118, -2, 152, 32), (*SKIN, 255))
        # pointing finger
        d.rounded_rectangle(box(145, 8, 175, 20), radius=int(6 * s), fill=(*SKIN, 255))
        d.rounded_rectangle(box(-82, 20, -58, 85), radius=int(12 * s), fill=(*COAT_DARK, 255))
        _ellipse(d, box(-90, 78, -58, 102), (*SKIN, 255))
    else:
        # idle arms at sides
        d.rounded_rectangle(box(-82, 18, -56, 90), radius=int(14 * s), fill=(*COAT_DARK, 255))
        d.rounded_rectangle(box(56, 18, 82, 90), radius=int(14 * s), fill=(*COAT_DARK, 255))
        _ellipse(d, box(-90, 82, -56, 108), (*SKIN, 255))
        _ellipse(d, box(56, 82, 90, 108), (*SKIN, 255))

    # soft blur edges a touch for less "robot"
    soft = layer.filter(ImageFilter.GaussianBlur(radius=0.6))
    base.alpha_composite(soft if soft.mode == "RGBA" else layer)
    # actually composite sharp on top of slight blur for clarity
    base.alpha_composite(layer)
    return base


def card(path: Path, title: str, subtitle: str, gesture: str, footer: str | None = None):
    img = bg().convert("RGBA")
    draw_atlas(img, W // 2, int(H * 0.40), scale=2.35, gesture=gesture)
    draw = ImageDraw.Draw(img)
    brand(draw)

    f_h = font(52, True)
    f_s = font(28, False)
    y = int(H * 0.70)
    for line in wrap(draw, title, f_h, W - 140):
        tw = draw.textlength(line, font=f_h)
        draw.text(((W - tw) / 2, y), line, font=f_h, fill=WHITE)
        y += 58
    y += 8
    draw.rectangle((W / 2 - 36, y, W / 2 + 36, y + 4), fill=ACCENT)
    y += 26
    for line in wrap(draw, subtitle, f_s, W - 160):
        tw = draw.textlength(line, font=f_s)
        draw.text(((W - tw) / 2, y), line, font=f_s, fill=SOFT)
        y += 34
    if footer:
        ff = font(22, False)
        tw = draw.textlength(footer, font=ff)
        draw.text(((W - tw) / 2, H - 120), footer, font=ff, fill=EMERALD)

    out = img.convert("RGB")
    path.parent.mkdir(parents=True, exist_ok=True)
    out.save(path, quality=95)
    print("wrote", path)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    sheet = bg().convert("RGBA")
    draw_atlas(sheet, 270, 980, scale=1.7, gesture="idle")
    draw_atlas(sheet, 540, 980, scale=1.7, gesture="notebook")
    draw_atlas(sheet, 810, 980, scale=1.7, gesture="checklist")
    d = ImageDraw.Draw(sheet)
    brand(d)
    f = font(34, True)
    t = "Atlas — illustrated (near-human)"
    d.text(((W - d.textlength(t, font=f)) / 2, 150), t, font=f, fill=WHITE)
    note = font(20, False)
    n = "Idle · Notebook · Checklist  ·  Still animated — not photoreal UGC"
    d.text(((W - d.textlength(n, font=note)) / 2, H - 130), n, font=note, fill=MUTED)
    sheet.convert("RGB").save(OUT / "atlas-character-sheet.png", quality=95)
    print("wrote", OUT / "atlas-character-sheet.png")

    card(OUT / "board-a-hook.png", "Before you trust online peptide claims", "Atlas questions the hype", "idle")
    card(
        OUT / "board-a-insight.png",
        "What BPC-157 research actually covers",
        "Evidence. Limits. Context.",
        "notebook",
        "Free guide → /research/bpc-157",
    )
    card(
        OUT / "board-b-checklist.png",
        "How researchers evaluate quality docs",
        "Testing · labeling · research-use notices",
        "checklist",
        "Education first — Swiss later on-page",
    )
    card(
        OUT / "board-c-limits.png",
        "Most claims outrun the evidence",
        "Mechanisms ≠ proven outcomes",
        "point",
        "Independent guide from GRW Research",
    )
    card(
        OUT / "board-end-cta.png",
        "Read the free research guide",
        "grwresearch.com/research/bpc-157",
        "point",
        "Not medical advice",
    )


if __name__ == "__main__":
    main()
