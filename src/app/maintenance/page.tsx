import type { Metadata } from "next";
import { MaintenanceScreen } from "@/components/maintenance/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Bientôt en ligne",
  description:
    "Mekong Street Food — le site est en cours de mise à jour. Ouverture prochaine à Davézieux.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
