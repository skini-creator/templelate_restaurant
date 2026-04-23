"use client"

import { createContext, useContext, useMemo, useReducer, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/data"

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: Record<string, CartItem>
}

type Action =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "DECREMENT"; productId: string }
  | { type: "CLEAR" }

const initial: CartState = { items: {} }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items[action.product.id]
      return {
        items: {
          ...state.items,
          [action.product.id]: {
            product: action.product,
            quantity: (existing?.quantity ?? 0) + 1,
          },
        },
      }
    }
    case "DECREMENT": {
      const existing = state.items[action.productId]
      if (!existing) return state
      if (existing.quantity <= 1) {
        const { [action.productId]: _, ...rest } = state.items
        return { items: rest }
      }
      return {
        items: {
          ...state.items,
          [action.productId]: { ...existing, quantity: existing.quantity - 1 },
        },
      }
    }
    case "REMOVE": {
      const { [action.productId]: _, ...rest } = state.items
      return { items: rest }
    }
    case "CLEAR":
      return initial
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  add: (product: Product) => void
  decrement: (productId: string) => void
  remove: (productId: string) => void
  clear: () => void
  quantityOf: (productId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial)

  const items = useMemo(() => Object.values(state.items), [state.items])
  const totalItems = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])
  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity * it.product.price, 0),
    [items],
  )

  const add = useCallback((product: Product) => dispatch({ type: "ADD", product }), [])
  const decrement = useCallback((productId: string) => dispatch({ type: "DECREMENT", productId }), [])
  const remove = useCallback((productId: string) => dispatch({ type: "REMOVE", productId }), [])
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), [])
  const quantityOf = useCallback(
    (productId: string) => state.items[productId]?.quantity ?? 0,
    [state.items],
  )

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    add,
    decrement,
    remove,
    clear,
    quantityOf,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>")
  return ctx
}
