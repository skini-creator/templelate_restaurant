"use client"

import { SlidersHorizontal, Search } from "lucide-react"
import { RESTAURANT } from "@/lib/data"

type NavbarProps = {
  tableNumber?: string | null
}

export function Navbar({ tableNumber }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/30">
      <div className="mx-auto max-w-5xl px-5 pt-5 pb-4">
        {/* Ligne titre + table */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
              {RESTAURANT.name}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">{RESTAURANT.tagline}</p>
          </div>
          {tableNumber && (
            <span className="shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-900/30">
              🍽️ Table {tableNumber}
            </span>
          )}
        </div>

        {/* Barre de recherche + filtre moderne */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 bg-zinc-900/50 border border-zinc-800/50 rounded-full px-4 py-2.5">
            <Search className="h-4 w-4 text-zinc-500 shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Rechercher un plat..."
              aria-label="Rechercher un plat"
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none"
            />
          </div>
          <button
            type="button"
            aria-label="Filtrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
