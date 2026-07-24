import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_PINTEREST_TAG_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_GSC_VERIFICATION: z.string().optional(),
  AFFILIATE_LINKS_ENABLED: z.enum(["true", "false"]).optional(),
  AFFILIATE_SWISS_CHEMS_BASE_URL: z.string().url().optional(),
  AFFILIATE_SWISS_CHEMS_REF: z.string().optional(),
  AFFILIATE_DEFAULT_CAMPAIGN: z.string().optional(),
});

export type PublicEnv = z.infer<typeof envSchema>;

export function getEnv(): PublicEnv {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    NEXT_PUBLIC_PINTEREST_TAG_ID: process.env.NEXT_PUBLIC_PINTEREST_TAG_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NEXT_PUBLIC_GSC_VERIFICATION: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    AFFILIATE_LINKS_ENABLED: process.env.AFFILIATE_LINKS_ENABLED,
    AFFILIATE_SWISS_CHEMS_BASE_URL: process.env.AFFILIATE_SWISS_CHEMS_BASE_URL,
    AFFILIATE_SWISS_CHEMS_REF: process.env.AFFILIATE_SWISS_CHEMS_REF,
    AFFILIATE_DEFAULT_CAMPAIGN: process.env.AFFILIATE_DEFAULT_CAMPAIGN,
  });

  if (!parsed.success) {
    console.warn(
      "[env] Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    return {};
  }

  return parsed.data;
}

export function getAnalyticsIds() {
  const env = getEnv();
  return {
    ga4: env.NEXT_PUBLIC_GA4_ID || null,
    metaPixel: env.NEXT_PUBLIC_META_PIXEL_ID || null,
    pinterest: env.NEXT_PUBLIC_PINTEREST_TAG_ID || null,
    clarity: env.NEXT_PUBLIC_CLARITY_ID || null,
    gscVerification: env.NEXT_PUBLIC_GSC_VERIFICATION || null,
  };
}
