"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCheck, ChefHat, Clock, Trash2, UtensilsCrossed } from "lucide-react";
import {
  type KitchenOrder,
  type OrderStatus,
  clearDoneOrders,
  getOrders,
  updateOrderStatus,
} from "@/lib/orders";
import { supabase } from "@/lib/supabase";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; next: OrderStatus | null; nextLabel: string }
> = {
  new:       { label: "Nouvelle",      color: "border-accent/60 bg-accent/10",            next: "preparing", nextLabel: "→ En préparation" },
  preparing: { label: "En préparation", color: "border-accent-secondary/60 bg-accent-secondary/10", next: "ready", nextLabel: "→ Prête" },
  ready:     { label: "Prête",          color: "border-green-500/60 bg-green-500/10",      next: "done",     nextLabel: "✓ Terminée" },
  done:      { label: "Terminée",       color: "border-foreground/10 bg-foreground/[0.03]", next: null,       nextLabel: "" },
};

const COLUMNS: OrderStatus[] = ["new", "preparing", "ready"];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({ order, onUpdate }: { order: KitchenOrder; onUpdate: () => void }) {
  const cfg = STATUS_CONFIG[order.status];

  const advance = async () => {
    if (!cfg.next) return;
    await updateOrderStatus(order.id, cfg.next);
    onUpdate();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`rounded-2xl border p-4 ${cfg.color}`}
    >
      {/* En-tête */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg font-bold text-foreground">
            #{order.id.slice(-4).toUpperCase()}
          </p>
          <p className="text-xs text-muted">{order.userName}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3 w-3" />
            Commande à {formatTime(order.date)}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-sm font-bold text-foreground">
            <UtensilsCrossed className="h-3.5 w-3.5 text-accent-secondary" />
            Retrait {order.pickupTime}
          </div>
        </div>
      </div>

      {/* Plats */}
      <ul className="mt-3 space-y-1 border-t border-foreground/10 pt-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              <span className="font-bold text-accent-secondary">×{item.quantity}</span>{" "}
              {item.name}
              {item.isFree && (
                <span className="ml-1.5 rounded-full bg-accent-secondary/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-secondary">
                  Offert
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Note */}
      {order.note && (
        <p className="mt-3 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 text-xs italic text-muted">
          💬 {order.note}
        </p>
      )}

      {/* Total */}
      <p className="mt-3 text-right text-sm font-bold text-foreground">
        {order.total.toFixed(2).replace(".", ",")} €
      </p>

      {/* Action */}
      {cfg.next && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={advance}
          className={`mt-3 w-full rounded-xl py-2.5 text-sm font-bold transition-colors ${
            order.status === "new"
              ? "bg-accent text-white hover:bg-accent/90"
              : order.status === "preparing"
              ? "bg-accent-secondary text-background hover:bg-accent-secondary/90"
              : "bg-green-600 text-white hover:bg-green-500"
          }`}
        >
          {cfg.nextLabel}
        </motion.button>
      )}
    </motion.div>
  );
}

export function KitchenDashboard() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [newCount, setNewCount] = useState(0);

  const reload = async () => {
    const all = await getOrders();
    setOrders(all);
  };

  useEffect(() => {
    reload();
    // Abonnement temps réel Supabase
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        reload();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const n = orders.filter((o) => o.status === "new").length;
    setNewCount(n);
  }, [orders]);

  const active = orders.filter((o) => o.status !== "done");
  const done = orders.filter((o) => o.status === "done");

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChefHat className="h-8 w-8 text-accent-secondary" />
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Cuisine
            </h1>
            <p className="text-xs text-muted">
              {active.length} commande{active.length !== 1 ? "s" : ""} en cours · temps réel
            </p>
          </div>
          {newCount > 0 && (
            <motion.span
              key={newCount}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white"
            >
              <Bell className="h-3 w-3" />
              {newCount} nouvelle{newCount > 1 ? "s" : ""}
            </motion.span>
          )}
        </div>
        {done.length > 0 && (
          <button
            type="button"
            onClick={() => { clearDoneOrders(); reload(); }}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 px-3 py-2 text-xs font-semibold text-muted hover:border-red-500/40 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Supprimer les terminées ({done.length})
          </button>
        )}
      </div>

      {/* Colonnes */}
      {active.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <CheckCheck className="h-16 w-16 text-foreground/15" />
          <p className="font-display text-lg font-semibold text-muted">
            Aucune commande en attente
          </p>
          <p className="text-sm text-muted">Les nouvelles commandes apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {COLUMNS.map((status) => {
            const col = orders.filter((o) => o.status === status);
            const cfg = STATUS_CONFIG[status];
            return (
              <div key={status}>
                <div className="mb-4 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    status === "new" ? "bg-accent" :
                    status === "preparing" ? "bg-accent-secondary" :
                    "bg-green-500"
                  }`} />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    {cfg.label}
                  </h2>
                  <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-bold text-muted">
                    {col.length}
                  </span>
                </div>
                <div className="space-y-4">
                  <AnimatePresence>
                    {col.map((order) => (
                      <OrderCard key={order.id} order={order} onUpdate={reload} />
                    ))}
                  </AnimatePresence>
                  {col.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-foreground/10 py-8 text-center text-xs text-muted">
                      Aucune commande
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Terminées */}
      {done.length > 0 && (
        <div className="border-t border-foreground/10 pt-8">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-muted">
            Terminées ({done.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 opacity-50">
            <AnimatePresence>
              {done.slice(0, 6).map((order) => (
                <OrderCard key={order.id} order={order} onUpdate={reload} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
