"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import type { MenuItem } from "@/data/menu";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  imageSrc: string;
  imageAlt: string;
  quantity: number;
  isFree?: boolean;
  pointsCost?: number;
}

type CartState = { items: CartItem[]; open: boolean; note: string; pickupTime: string };

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; id: string }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "CLEAR" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_NOTE"; note: string }
  | { type: "SET_PICKUP"; pickupTime: string }
  | { type: "HYDRATE"; items: CartItem[] };

function parsePrice(raw: string): number {
  return parseFloat(raw.replace(",", ".").replace(/[^\d.]/g, "")) || 0;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          open: true,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        open: true,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { ...state, items: [], note: "", pickupTime: "" };
    case "SET_OPEN":
      return { ...state, open: action.open };
    case "SET_NOTE":
      return { ...state, note: action.note };
    case "SET_PICKUP":
      return { ...state, pickupTime: action.pickupTime };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  open: boolean;
  note: string;
  pickupTime: string;
  totalItems: number;
  totalPrice: number;
  addItem: (menuItem: MenuItem, options?: { isFree?: boolean; pointsCost?: number }) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  setNote: (note: string) => void;
  setPickupTime: (t: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(reducer, { items: [], open: false, note: "", pickupTime: "" });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mekong-cart");
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("mekong-cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items, hydrated]);

  const addItem = useCallback(
    (menuItem: MenuItem, options?: { isFree?: boolean; pointsCost?: number }) =>
      dispatch({
        type: "ADD",
        item: {
          id: options?.isFree ? `${menuItem.id}-free` : menuItem.id,
          name: menuItem.name,
          price: options?.isFree ? "Offert" : menuItem.price,
          priceNum: options?.isFree ? 0 : parsePrice(menuItem.price),
          imageSrc: menuItem.imageSrc,
          imageAlt: menuItem.imageAlt,
          isFree: options?.isFree,
          pointsCost: options?.pointsCost,
        },
      }),
    []
  );
  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE", id }),
    []
  );
  const increment = useCallback(
    (id: string) => dispatch({ type: "INCREMENT", id }),
    []
  );
  const decrement = useCallback(
    (id: string) => dispatch({ type: "DECREMENT", id }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const setOpen = useCallback(
    (open: boolean) => dispatch({ type: "SET_OPEN", open }),
    []
  );
  const setNote = useCallback(
    (note: string) => dispatch({ type: "SET_NOTE", note }),
    []
  );
  const setPickupTime = useCallback(
    (pickupTime: string) => dispatch({ type: "SET_PICKUP", pickupTime }),
    []
  );

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (s, i) => s + i.priceNum * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        open: state.open,
        note: state.note,
        pickupTime: state.pickupTime,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        setOpen,
        setNote,
        setPickupTime,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
