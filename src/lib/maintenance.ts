/** Mode maintenance désactivé — le vrai site est en ligne.
 *  La page reste accessible sur /maintenance.
 *  Pour réactiver le blocage du site : return process.env.MAINTENANCE_MODE === "true";
 */
export function isMaintenanceMode(): boolean {
  return false;
}
