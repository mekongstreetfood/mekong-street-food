import { PinGate } from "@/components/kitchen/PinGate";
import { KitchenDashboard } from "@/components/kitchen/KitchenDashboard";

// Page non indexée et absente de la navigation
export const metadata = {
  title: "Cuisine",
  robots: { index: false, follow: false },
};

export default function CuisinePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <PinGate>
        <KitchenDashboard />
      </PinGate>
    </div>
  );
}
