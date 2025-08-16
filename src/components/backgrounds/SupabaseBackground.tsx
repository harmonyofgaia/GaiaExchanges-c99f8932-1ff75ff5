import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import NeonTreeBackground from "@/components/backgrounds/NeonTreeBackground";

/**
 * SupabaseBackground
 * - Loads public images from a Supabase bucket (default: 'public-bucket')
 * - Rotates background images every 30s (configurable)
 * - Exposes the selected image via CSS var --gi-top-image (expects 'url("...")' value)
 * - Provides a gentle NeonTreeBackground overlay at low opacity (living roots)
 */
type Props = {
  children: React.ReactNode;
  bucket?: string;
  folderPrefix?: string;          // Optionally constrain to a prefix/folder like "green-investments/"
  rotateMs?: number;              // Rotation interval; set to 0 to disable
  preferredExtensions?: string[]; // e.g. ["jpg","jpeg","png","webp"]
};

const isImage = (name: string, exts: string[]) => {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return exts.includes(ext);
};

export default function SupabaseBackground({
  children,
  bucket = "public-bucket",
  folderPrefix = "",
  rotateMs = 30000,
  preferredExtensions = ["jpg", "jpeg", "png", "webp"],
}: Props) {
  const [urls, setUrls] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  // Load list of public image URLs from bucket
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .list(folderPrefix, { limit: 200, offset: 0 });
        if (error) throw error;

        const files = (data || []).filter(
          (f) => !!f.name && isImage(f.name, preferredExtensions),
        );

        const publicUrls = files
          .map((f) =>
            supabase.storage.from(bucket).getPublicUrl(
              folderPrefix ? `${folderPrefix.replace(/\/$/, "")}/${f.name}` : f.name,
            ).data.publicUrl,
          )
          .filter(Boolean);

        if (!cancelled) {
          setUrls(publicUrls);
          setIdx(0);
        }
      } catch (e) {
        console.warn("Failed to load Supabase public images:", e);
        // Fallback: keep CSS default defined in stylesheet
        if (!cancelled) setUrls([]);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [bucket, folderPrefix, preferredExtensions.join("|")]);

  // Rotate through images
  useEffect(() => {
    if (!rotateMs || urls.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % urls.length);
    }, rotateMs);
    return () => clearInterval(t);
  }, [rotateMs, urls]);

  const cssVarValue = useMemo(() => {
    if (!urls.length) return undefined; // use CSS fallback
    const current = urls[idx];
    return `url("${current}")`;
  }, [urls, idx]);

  return (
    <div
      className="page-green-investments relative min-h-[100svh]"
      style={
        cssVarValue
          ? ({ ["--gi-top-image" as any]: cssVarValue } as React.CSSProperties)
          : undefined
      }
    >
      {/* Living neon roots overlay (soft) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <NeonTreeBackground />
      </div>

      {/* Content above background */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}