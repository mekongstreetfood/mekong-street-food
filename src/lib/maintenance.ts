/**
 * Local : MAINTENANCE_MODE=true pour activer.
 * Vercel : maintenance tant que SITE_LIVE n'est pas "true".
 * La page reste accessible sur /maintenance dans tous les cas.
 */
export function isMaintenanceMode(): boolean {
  if (process.env.VERCEL === "1") {
    return process.env.SITE_LIVE !== "true";
  }
  return process.env.MAINTENANCE_MODE === "true";
}
