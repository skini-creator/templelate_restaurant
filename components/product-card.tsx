"use client"

import { Minus, Plus } from "lucide-react"
import { type Product, formatFCFA, discountPercent } from "@/lib/data"
import { useCart } from "@/components/cart-context"

export function ProductCard({ product }: { product: Product }) {
  const { add, decrement, quantityOf } = useCart()
  const qty = quantityOf(product.id)
  const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0

  return (
    <article className="group flex w-44 shrink-0 flex-col gap-2 snap-start md:w-52">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
            -{discount}%
          </span>
        )}
        {discount === 0 && product.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-soft-foreground">
            {product.badge}
          </span>
        )}

        {/* Contrôles ajout */}
        <div className="absolute bottom-2 right-2">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product)}
              aria-label={`Ajouter ${product.name} au panier`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:scale-110 active:scale-95"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex items-center gap-0.5 rounded-full bg-primary p-0.5 text-primary-foreground shadow-md">
              <button
                type="button"
                onClick={() => decrement(product.id)}
                aria-label={`Retirer un ${product.name}`}
                className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/15 active:scale-95"
              >
                <Minus className="h-3 w-3" aria-hidden="true" />
              </button>
              <span className="min-w-4 text-center text-xs font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => add(product)}
                aria-label={`Ajouter un ${product.name}`}
                className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/15 active:scale-95"
              >
                <Plus className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-foreground">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-accent tabular-nums">
            {formatFCFA(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatFCFA(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
