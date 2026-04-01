"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number;
  quantity: number;
  collection: string;
  capacity: string;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { slug: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER"; payload: boolean }
  | { type: "HYDRATE"; payload: CartItem[] };

const MAX_QTY = 5;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.slug === action.payload.slug);
      if (existing) {
        return {
          ...state,
          isDrawerOpen: true,
          items: state.items.map((i) =>
            i.slug === action.payload.slug
              ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QTY) }
              : i
          ),
        };
      }
      return {
        ...state,
        isDrawerOpen: true,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.slug !== action.payload),
      };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.slug !== action.payload.slug),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === action.payload.slug
            ? { ...i, quantity: Math.min(action.payload.quantity, MAX_QTY) }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: action.payload };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
  cartTotal: number;
  cartCount: number;
  savings: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "everwood-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isDrawerOpen: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );
  const removeItem = useCallback(
    (slug: string) => dispatch({ type: "REMOVE_ITEM", payload: slug }),
    []
  );
  const updateQuantity = useCallback(
    (slug: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { slug, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openDrawer = useCallback(
    () => dispatch({ type: "TOGGLE_DRAWER", payload: true }),
    []
  );
  const closeDrawer = useCallback(
    () => dispatch({ type: "TOGGLE_DRAWER", payload: false }),
    []
  );

  const cartTotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const savings = state.items.reduce(
    (sum, i) => sum + (i.compareAtPrice - i.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        isDrawerOpen: state.isDrawerOpen,
        cartTotal,
        cartCount,
        savings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
