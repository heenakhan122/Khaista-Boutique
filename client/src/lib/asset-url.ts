const BASE = import.meta.env.BASE_URL;

export function assetUrl(p?: string) {
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p)) return p;
  const withFolder = p.includes("/") ? p : `assets/${p}`;
  return BASE + withFolder.replace(/^\/+/, "");
}
