"use client"

import { useEffect, useState } from "react"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/components/cart-context"
import { RESTAURANT, formatFCFA } from "@/lib/data"
import { cn } from "@/lib/utils"

type CartSheetProps = {
  tableNumber?: string | null
}

export function CartSheet({ tableNumber }: CartSheetProps) {
  const { items, totalItems, totalPrice, add, decrement, remove, clear } = useCart()
  const [bounce, setBounce] = useState(false)

  // Petite animation quand on ajoute un article
  useEffect(() => {
    if (totalItems === 0) return
    setBounce(true)
    const t = setTimeout(() => setBounce(false), 600)
    return () => clearTimeout(t)
  }, [totalItems])

  const whatsappHref = buildWhatsAppLink({
    items,
    totalPrice,
    tableNumber: tableNumber ?? undefined,
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Ouvrir le panier (${totalItems} article${totalItems > 1 ? "s" : ""})`}
          className={cn(
            "fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl shadow-orange-900/40 ring-4 ring-zinc-950 transition hover:scale-105 active:scale-95",
            bounce && "cart-bounce",
          )}
        >
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white text-orange-600 px-1.5 text-xs font-bold ring-2 ring-zinc-950 tabular-nums">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 flex flex-col bg-zinc-950 border-t border-zinc-800">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-zinc-800">
          <SheetTitle className="text-xl text-white">Votre panier</SheetTitle>
          <SheetDescription className="text-zinc-400">
            {totalItems === 0
              ? "Ajoutez vos plats préférés pour commencer."
              : `${totalItems} article${totalItems > 1 ? "s" : ""} · ${formatFCFA(totalPrice)}`}
          </SheetDescription>
        </SheetHeader>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-xl object-cover bg-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-bold text-white">{product.name}</h3>
                    <p className="text-xs text-zinc-500">{formatFCFA(product.price)}</p>
                    <div className="mt-2 flex items-center gap-1 w-fit rounded-full bg-zinc-900 border border-zinc-800 p-1">
                      <button
                        type="button"
                        onClick={() => decrement(product.id)}
                        aria-label={`Retirer un ${product.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold tabular-nums text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => add(product)}
                        aria-label={`Ajouter un ${product.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent tabular-nums">
                      {formatFCFA(product.price * quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={`Supprimer ${product.name}`}
                      className="text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer : total + commander */}
        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 border-t border-zinc-800 bg-zinc-950 px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-zinc-400">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent tabular-nums">
                {formatFCFA(totalPrice)}
              </span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110 active:scale-[0.98]"
            >
              <WhatsappIcon className="h-5 w-5" />
              Commander sur WhatsApp
            </a>

            <button
              type="button"
              onClick={clear}
              className="w-full text-xs font-medium text-zinc-600 hover:text-red-500 transition-colors"
            >
              Vider le panier
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
        <ShoppingBag className="h-7 w-7 text-zinc-500" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-white">Votre panier est vide</h3>
      <p className="max-w-xs text-sm text-zinc-500 text-pretty">
        Parcourez notre menu et ajoutez vos plats préférés pour passer commande.
      </p>
    </div>
  )
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.02 0C5.4 0 .05 5.35.05 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62a11.96 11.96 0 0 0 5.82 1.48h.01c6.62 0 11.97-5.35 11.97-11.97 0-3.2-1.25-6.2-3.48-8.41ZM12.03 21.8h-.01a9.83 9.83 0 0 1-5-1.37l-.36-.21-3.68.97.98-3.59-.24-.37a9.82 9.82 0 0 1-1.51-5.26c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.03 6.96 2.89a9.8 9.8 0 0 1 2.89 6.96c0 5.43-4.42 9.83-9.88 9.83Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34Z" />
    </svg>
  )
}

function buildWhatsAppLink({
  items,
  totalPrice,
  tableNumber,
}: {
  items: { product: { name: string; price: number }; quantity: number }[]
  totalPrice: number
  tableNumber?: string
}): string {
  if (items.length === 0) return `https://wa.me/${RESTAURANT.whatsappNumber}`

  const lines: string[] = []
  lines.push(`Bonjour ${RESTAURANT.name} 👋`)
  lines.push("Je souhaite passer la commande suivante :")
  lines.push("")

  for (const { product, quantity } of items) {
    const subtotal = product.price * quantity
    lines.push(`• ${quantity} × ${product.name} — ${formatFCFA(subtotal)}`)
  }

  lines.push("")
  lines.push(`*Total : ${formatFCFA(totalPrice)}*`)

  if (tableNumber) {
    lines.push(`Table : ${tableNumber}`)
  }

  lines.push("")
  lines.push("Merci ! 🙏")

  const message = encodeURIComponent(lines.join("\n"))
  return `https://wa.me/${RESTAURANT.whatsappNumber}?text=${message}`
}
