/** Plages horaires d'ouverture (h, min) */
const SLOTS_RANGES = [
  { open: [11, 30], close: [14, 30] },
  { open: [18, 30], close: [22, 30] },
];

function toMinutes(h: number, m: number) {
  return h * 60 + m;
}

function formatSlot(totalMin: number) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h${m === 0 ? "00" : m}`;
}

/** Génère les créneaux disponibles (toutes les 30 min, min +30 min par rapport à now) */
export function getPickupSlots(): string[] {
  const now = new Date();
  const nowMin = toMinutes(now.getHours(), now.getMinutes());
  const minPickup = nowMin + 30; // au moins 30 min dans le futur

  const slots: string[] = [];

  for (const range of SLOTS_RANGES) {
    const start = toMinutes(range.open[0], range.open[1]);
    const end = toMinutes(range.close[0], range.close[1]);

    // Premier créneau : le plus tôt entre start et minPickup, arrondi au prochain x:00 ou x:30
    let cursor = Math.max(start, Math.ceil(minPickup / 30) * 30);

    while (cursor <= end) {
      slots.push(formatSlot(cursor));
      cursor += 30;
    }
  }

  return slots;
}
