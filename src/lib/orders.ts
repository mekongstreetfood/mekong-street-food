import type { CartItem } from "@/lib/cart";

export type OrderStatus = "new" | "preparing" | "ready" | "done";

export interface KitchenOrder {
  id: string;
  date: string;
  pickupTime: string;
  note: string;
  userName: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

const ORDERS_KEY = "mekong_kitchen_orders";

export function getOrders(): KitchenOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: KitchenOrder): void {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders().map((o) =>
    o.id === id ? { ...o, status } : o
  );
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function clearDoneOrders(): void {
  const orders = getOrders().filter((o) => o.status !== "done");
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
