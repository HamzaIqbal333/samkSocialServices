/**
 * Helper to resolve image and asset URLs correctly both in local/dev
 * and when deployed to GitHub Pages subpath (e.g. /samkSocialServices/).
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // If path is already a full external URL or data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Vite's import.meta.env.BASE_URL is guaranteed to contain trailing slash (e.g. '/samkSocialServices/' or './' or '/')
  const base = import.meta.env.BASE_URL || './';

  // Normalize path removing leading slash if base is relative or has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}
