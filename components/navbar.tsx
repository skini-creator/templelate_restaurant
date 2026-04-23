"use client"

import { SlidersHorizontal, Search } from "lucide-react"
import { RESTAURANT } from "@/lib/data"

type NavbarProps = {
  tableNumber?: string | null
}

export function Navbar({ tableNumber }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-5 pt-5 pb-3">
        {/* Ligne titre + table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-pretty">
            {RESTAURANT.name}
          </h1>
          {tableNumber && (
            <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Table {tableNumber}
            </span>
          )}
        </div>

        {/* Barre de recherche + filtre */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 border-b border-border pb-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Rechercher"
              aria-label="Rechercher un plat"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button
            type="button"
            aria-label="Filtrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-secondary transition"
          >
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
