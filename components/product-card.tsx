"use client"

import { Minus, Plus } from "lucide-react"
import { type Product, formatFCFA, discountPercent } from "@/lib/data"
import { useCart } from "@/components/cart-context"

export function ProductCard({ product }: { product: Product }) {
  const { add, decrement, quantityOf } = useCart()
  const qty = quantityOf(product.id)
  const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0

  return (
    <article className="group flex w-44 shrink-0 flex-col gap-3 snap-start md:w-52">
      {/* Carte avec effet glass et bordures dorées */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-orange-500/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge promo - Style néon */}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-orange-500/40 animate-pulse">
            -{discount}%
          </span>
        )}
        {discount === 0 && product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1 text-[10px] font-bold text-zinc-950 shadow-lg shadow-amber-500/30">
            {product.badge}
          </span>
        )}

        {/* Bouton ajouter flottant avec dégradé */}
        <div className="absolute bottom-3 right-3">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product)}
              aria-label={`Ajouter ${product.name} au panier`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-900/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-orange-600/40 active:scale-95"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-1.5 shadow-lg shadow-black/40 border border-zinc-700/50">
              <button
                type="button"
                onClick={() => decrement(product.id)}
                aria-label={`Retirer un ${product.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-300 transition-all hover:bg-orange-500/80 hover:text-white active:scale-90"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="min-w-6 text-center text-sm font-bold tabular-nums text-white">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => add(product)}
                aria-label={`Ajouter un ${product.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-300 transition-all hover:bg-orange-500/80 hover:text-white active:scale-90"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Infos produit */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="truncate text-sm font-semibold text-white">{product.name}</h3>
        <p className="truncate text-xs text-zinc-500">{product.description}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent tabular-nums">
            {formatFCFA(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-zinc-600 line-through tabular-nums">
              {formatFCFA(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
