import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional().or(z.literal("")),
  consent: z.literal(true),
});

/**
 * Placeholder email capture endpoint.
 * Replace with a real ESP integration later without changing the form contract.
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please provide a valid email and consent." },
        { status: 400 },
      );
    }

    // Intentionally no external provider in v1.
    console.info("[subscribe:placeholder]", {
      email: parsed.data.email,
      firstName: parsed.data.firstName || null,
      at: new Date().toISOString(),
    });

    return NextResponse.json({
      message:
        "Request received. This is a placeholder integration — no newsletter delivery is confirmed yet.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to process signup." },
      { status: 500 },
    );
  }
}
