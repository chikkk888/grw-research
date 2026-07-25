#!/usr/bin/env python3
"""Render GRW Research Meta video ads (1080x1920, ~15s, 30fps).

Usage (from repo root):
  .venv-ads/bin/python ads/meta/render_meta_ads.py
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from imageio_ffmpeg import write_frames

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = Path(__file__).resolve().parent / "output"

W, H = 1080, 1920
FPS = 30
DURATION = 15
TOTAL = FPS * DURATION

INK = (15, 23, 42)
INK_DEEP = (8, 12, 24)
WHITE = (248, 250, 252)
SOFT = (203, 213, 225)
MUTED = (148, 163, 184)
ACCENT = (56, 189, 248)
EMERALD = (52, 211, 153)
LINE = (51, 65, 85)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def bg(frame_i: int) -> Image.Image:
    # vertical gradient via numpy (fast)
    y = np.linspace(0, 1, H, dtype=np.float32)[:, None]
    r = (INK_DEEP[0] + (INK[0] - INK_DEEP[0]) * y).astype(np.uint8)
    g = (INK_DEEP[1] + (INK[1] - INK_DEEP[1]) * y).astype(np.uint8)
    b = (INK_DEEP[2] + ((INK[2] + 10) - INK_DEEP[2]) * y).astype(np.uint8)
    arr = np.concatenate([r, g, b], axis=1)
    arr = np.broadcast_to(arr[:, None, :], (H, W, 3)).copy()
    img = Image.fromarray(arr)

    draw = ImageDraw.Draw(img, "RGBA")
    phase = frame_i / TOTAL
    for i in range(18):
        x = 80 + (i * 97) % (W - 160)
        ydot = 120 + (i * 173) % (H - 240)
        alpha = 28 + int(18 * math.sin(phase * math.pi * 2 + i))
        draw.ellipse((x - 3, ydot - 3, x + 3, ydot + 3), fill=(*ACCENT, alpha))

    draw.arc(
        (W - 520, H - 780, W + 180, H - 80),
        start=200,
        end=330,
        fill=(*ACCENT, 55),
        width=3,
    )
    draw.arc(
        (W - 480, H - 740, W + 140, H - 40),
        start=210,
        end=320,
        fill=(*EMERALD, 35),
        width=2,
    )
    return img.convert("RGB")


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font_obj, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        test = f"{cur} {word}".strip()
        if draw.textlength(test, font=font_obj) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_brand(draw: ImageDraw.ImageDraw, y: int = 96) -> None:
    f_brand = font(42, bold=True)
    f_sub = font(18, bold=False)
    label = "GRW"
    tw = draw.textlength(label, font=f_brand)
    x = (W - tw) / 2
    draw.text((x, y), label, font=f_brand, fill=WHITE)
    sub = "RESEARCH"
    sw = draw.textlength(sub, font=f_sub)
    draw.text(((W - sw) / 2, y + 52), sub, font=f_sub, fill=ACCENT)


def draw_centered_lines(
    draw: ImageDraw.ImageDraw,
    lines: list[str],
    y: int,
    font_obj,
    fill,
    line_gap: int = 18,
) -> int:
    for line in lines:
        tw = draw.textlength(line, font=font_obj)
        draw.text(((W - tw) / 2, y), line, font=font_obj, fill=fill)
        bbox = font_obj.getbbox(line)
        y += (bbox[3] - bbox[1]) + line_gap
    return y


def scene_card(
    frame_i: int,
    headline: str,
    sub: str | None = None,
    footer: str | None = None,
    accent_line: bool = True,
    cta_mode: bool = False,
) -> np.ndarray:
    img = bg(frame_i)
    draw = ImageDraw.Draw(img)
    draw_brand(draw)

    f_h = font(72 if not cta_mode else 64, bold=True)
    f_s = font(34, bold=False)
    f_f = font(24, bold=False)

    # fade-in
    # (Pillow can't alpha text easily on RGB; opacity simulated by delayed start in timeline)

    lines = wrap_text(draw, headline, f_h, W - 160)
    y = 640 if not cta_mode else 700
    y = draw_centered_lines(draw, lines, y, f_h, WHITE, line_gap=14)

    if accent_line:
        y += 18
        draw.rectangle((W / 2 - 40, y, W / 2 + 40, y + 4), fill=ACCENT)
        y += 36

    if sub:
        sub_lines = []
        for part in sub.split("\n"):
            sub_lines.extend(wrap_text(draw, part, f_s, W - 180))
        draw_centered_lines(draw, sub_lines, y, f_s, EMERALD if cta_mode else SOFT, line_gap=10)

    if footer:
        fw = draw.textlength(footer, font=f_f)
        draw.text(((W - fw) / 2, H - 160), footer, font=f_f, fill=MUTED)

    if cta_mode:
        disc = "Educational. Research-use context. Not medical advice."
        dw = draw.textlength(disc, font=f_f)
        draw.text(((W - dw) / 2, H - 110), disc, font=f_f, fill=MUTED)

    return np.asarray(img)


CREATIVES = {
    # Do not overwrite meta-bpc-overview-15s.mp4 — that file is the kept stock cut.
    "meta-bpc-overview-direct-15s": [
        (0, 4, "Before you trust online peptide claims", "Independent research framing", None, False),
        (4, 9, "What BPC-157 research actually covers", "Evidence. Limits. Quality questions.", None, False),
        (9, 12.5, "Research-use product information", "Review testing docs before sourcing", None, False),
        (12.5, 15, "Swiss Chems BPC-157", "Review product details\nAffiliate link · ref fox888", "swisschems.is", True),
    ],
    "meta-bpc-coa-15s": [
        (0, 4, "How researchers evaluate peptide quality", "A practical documentation checklist", None, False),
        (4, 9, "Look for testing transparency", "COAs, labeling, research-use notices", None, False),
        (9, 12.5, "Ask clearer quality questions", "Before you open any merchant listing", None, False),
        (12.5, 15, "Swiss Chems BPC-157", "Review product + testing info\nAffiliate link · ref fox888", "swisschems.is", True),
    ],
    "meta-bpc-evidence-15s": [
        (0, 4, "Most BPC-157 claims outrun the evidence", "Separate signal from noise", None, False),
        (4, 9, "What studies discuss — and what they don’t", "Mechanisms ≠ human outcomes", None, False),
        (9, 12.5, "Stay cautious. Stay literate.", "Education first. Commerce second.", None, False),
        (12.5, 15, "Swiss Chems BPC-157", "Review research-use listing\nAffiliate link · ref fox888", "swisschems.is", True),
    ],
}


def pick_scene(script: list[tuple], t: float):
    for start, end, headline, sub, footer, cta in script:
        if start <= t < end or (end == DURATION and t <= end):
            return headline, sub, footer, cta
    return script[-1][2], script[-1][3], script[-1][4], script[-1][5]


def render_one(name: str, script: list[tuple]) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / f"{name}.mp4"
    writer = write_frames(
        str(path),
        (W, H),
        fps=FPS,
        quality=8,
        bitrate="2500k",
        codec="libx264",
        macro_block_size=1,
        pix_fmt_in="rgb24",
        pix_fmt_out="yuv420p",
        output_params=["-movflags", "+faststart"],
    )
    writer.send(None)

    for i in range(TOTAL):
        t = i / FPS
        headline, sub, footer, cta = pick_scene(script, t)
        # slight entrance: for first 0.35s of each scene, keep same card (no partial text)
        frame = scene_card(i, headline, sub, footer, accent_line=True, cta_mode=cta)
        writer.send(frame)

    writer.close()
    return path


def main() -> None:
    for name, script in CREATIVES.items():
        out = render_one(name, script)
        print(f"wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
