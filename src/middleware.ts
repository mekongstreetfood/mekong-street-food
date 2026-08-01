import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Redirection maintenance désactivée — le site est en ligne.
 *  Pour réactiver : if (process.env.MAINTENANCE_MODE === "true") { ... rewrite /maintenance }
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
