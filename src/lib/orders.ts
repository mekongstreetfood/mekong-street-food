import type { CartItem } from "@/lib/cart";
import { supabase } from "@/lib/supabase";

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

export async function getOrders(): Promise<KitchenOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    date: row.created_at,
    pickupTime: row.pickup_time,
    note: row.note ?? "",
    userName: row.user_name ?? "Client",
    userEmail: row.user_email ?? "",
    items: row.items ?? [],
    total: row.total,
    status: row.status as OrderStatus,
  }));
}

export async function saveOrder(order: KitchenOrder): Promise<void> {
  await supabase.from("orders").insert({
    id: order.id,
    user_id: order.userEmail ? undefined : undefined,
    user_name: order.userName,
    user_email: order.userEmail,
    items: order.items,
    pickup_time: order.pickupTime,
    note: order.note,
    total: order.total,
    status: order.status,
  });
}

export async function saveOrderWithUserId(order: KitchenOrder, userId: string): Promise<void> {
  await supabase.from("orders").insert({
    id: order.id,
    user_id: userId,
    user_name: order.userName,
    user_email: order.userEmail,
    items: order.items,
    pickup_time: order.pickupTime,
    note: order.note,
    total: order.total,
    status: order.status,
  });
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await supabase.from("orders").update({ status }).eq("id", id);
}

export async function clearDoneOrders(): Promise<void> {
  await supabase.from("orders").delete().eq("status", "done");
}
