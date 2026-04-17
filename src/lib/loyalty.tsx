"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuCategory } from "@/data/menu";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

/* ─── Constantes ─── */
export const POINTS_PER_EURO = 1;

/* ─── Récompenses ─── */
export interface Reward {
  id: string;
  label: string;
  description: string;
  points: number;
  emoji: string;
}

export const REWARD_CATEGORY: Record<string, MenuCategory> = {
  soupe:    "Bowls & Nouilles",
  wok:      "Woks & Curry",
  sandwich: "Sandwichs Street Food",
  dessert:  "Desserts & Glaces",
};

export const REWARDS: Reward[] = [
  { id: "soupe",    label: "Bowls & Nouilles",    description: "Un plat Bowls & Nouilles au choix offert",        points: 100, emoji: "🍜" },
  { id: "wok",      label: "Woks & Curry",        description: "Un plat Woks & Curry au choix offert",            points: 100, emoji: "🍚" },
  { id: "sandwich", label: "Street Sandwich",     description: "Un Sandwich Street Food au choix offert",         points: 80,  emoji: "🥖" },
  { id: "dessert",  label: "Dessert & Glace",     description: "Un Dessert ou une Glace au choix offert(e)",      points: 50,  emoji: "🧋" },
];

/* ─── Types ─── */
export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  points: number;
  pickupTime: string;
}

interface LoyaltyContextValue {
  points: number;
  history: OrderRecord[];
  earnOrder: (total: number, pickupTime: string) => Promise<void>;
  redeemPoints: (pts: number) => Promise<void>;
  availableRewards: Reward[];
}

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);

  /* ─── Charge les points depuis Supabase quand l'utilisateur change ─── */
  useEffect(() => {
    if (!user) {
      setPoints(0);
      setHistory([]);
      return;
    }

    setLoading(true);
    supabase
      .from("loyalty")
      .select("points, history")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPoints(data.points ?? 0);
          setHistory(data.history ?? []);
        } else {
          setPoints(0);
          setHistory([]);
        }
        setLoading(false);
      });
  }, [user]);

  /* ─── Sauvegarde dans Supabase ─── */
  const save = useCallback(
    async (newPoints: number, newHistory: OrderRecord[]) => {
      if (!user) return;
      await supabase.from("loyalty").upsert(
        { user_id: user.id, points: newPoints, history: newHistory, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    },
    [user]
  );

  const earnOrder = useCallback(
    async (total: number, pickupTime: string) => {
      const pts = Math.floor(total * POINTS_PER_EURO);
      const order: OrderRecord = {
        id: `order-${Date.now()}`,
        date: new Date().toISOString(),
        total,
        points: pts,
        pickupTime,
      };
      const newPoints = points + pts;
      const newHistory = [order, ...history].slice(0, 50);
      setPoints(newPoints);
      setHistory(newHistory);
      await save(newPoints, newHistory);
    },
    [points, history, save]
  );

  const redeemPoints = useCallback(
    async (pts: number) => {
      const newPoints = Math.max(0, points - pts);
      setPoints(newPoints);
      await save(newPoints, history);
    },
    [points, history, save]
  );

  const availableRewards = useMemo(
    () => REWARDS.filter((r) => points >= r.points),
    [points]
  );

  return (
    <LoyaltyContext.Provider value={{ points, history, earnOrder, redeemPoints, availableRewards }}>
      {!loading && children}
      {loading && children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error("useLoyalty must be inside <LoyaltyProvider>");
  return ctx;
}
