"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { MenuCategory } from "@/data/menu";
import { useAuth } from "@/lib/auth";

/* ─── Constantes ─── */
export const POINTS_PER_EURO = 1; // 1 pt par € dépensé

/* ─── Récompenses ─── */
export interface Reward {
  id: string;
  label: string;
  description: string;
  points: number;
  emoji: string;
}

export const REWARD_CATEGORY: Record<string, MenuCategory> = {
  soupe:    "Soupes & nouilles",
  wok:      "Riz & wok",
  sandwich: "Street sandwiches",
  dessert:  "Desserts & boissons",
};

export const REWARDS: Reward[] = [
  {
    id: "soupe",
    label: "Soupes & Nouilles",
    description: "Un plat Soupes & Nouilles au choix offert",
    points: 100,
    emoji: "🍜",
  },
  {
    id: "wok",
    label: "Riz & Wok",
    description: "Un plat Riz & Wok au choix offert",
    points: 100,
    emoji: "🍚",
  },
  {
    id: "sandwich",
    label: "Street Sandwich",
    description: "Un Street Sandwich au choix offert",
    points: 80,
    emoji: "🥖",
  },
  {
    id: "dessert",
    label: "Dessert & Boisson",
    description: "Un Dessert ou une Boisson au choix offert(e)",
    points: 50,
    emoji: "🧋",
  },
];

/* ─── Types ─── */
export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  points: number;
  pickupTime: string;
}

type LoyaltyState = {
  points: number;
  history: OrderRecord[];
};

type LoyaltyAction =
  | { type: "EARN"; order: OrderRecord }
  | { type: "REDEEM"; points: number }
  | { type: "HYDRATE"; state: LoyaltyState };

function reducer(state: LoyaltyState, action: LoyaltyAction): LoyaltyState {
  switch (action.type) {
    case "EARN":
      return {
        points: state.points + action.order.points,
        history: [action.order, ...state.history].slice(0, 50),
      };
    case "REDEEM":
      return { ...state, points: Math.max(0, state.points - action.points) };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

/* ─── Context ─── */
interface LoyaltyContextValue {
  points: number;
  history: OrderRecord[];
  earnOrder: (total: number, pickupTime: string) => void;
  redeemPoints: (pts: number) => void;
  availableRewards: Reward[];
}

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

function loyaltyKey(userId: string | null) {
  return userId ? `mekong_loyalty_${userId}` : null;
}

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(reducer, { points: 0, history: [] });

  // Re-hydrate whenever the logged-in user changes
  useEffect(() => {
    setHydrated(false);
    const key = loyaltyKey(userId);
    if (!key) {
      dispatch({ type: "HYDRATE", state: { points: 0, history: [] } });
      setHydrated(true);
      return;
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: LoyaltyState = JSON.parse(raw);
        dispatch({ type: "HYDRATE", state: parsed });
      } else {
        dispatch({ type: "HYDRATE", state: { points: 0, history: [] } });
      }
    } catch {
      dispatch({ type: "HYDRATE", state: { points: 0, history: [] } });
    }
    setHydrated(true);
  }, [userId]);

  useEffect(() => {
    if (!hydrated) return;
    const key = loyaltyKey(userId);
    if (!key) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [state, hydrated, userId]);

  const earnOrder = useCallback((total: number, pickupTime: string) => {
    const pts = Math.floor(total * POINTS_PER_EURO);
    const order: OrderRecord = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      total,
      points: pts,
      pickupTime,
    };
    dispatch({ type: "EARN", order });
  }, []);

  const redeemPoints = useCallback((pts: number) => {
    dispatch({ type: "REDEEM", points: pts });
  }, []);

  const availableRewards = useMemo(
    () => REWARDS.filter((r) => state.points >= r.points),
    [state.points]
  );

  return (
    <LoyaltyContext.Provider
      value={{
        points: state.points,
        history: state.history,
        earnOrder,
        redeemPoints,
        availableRewards,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error("useLoyalty must be inside <LoyaltyProvider>");
  return ctx;
}
