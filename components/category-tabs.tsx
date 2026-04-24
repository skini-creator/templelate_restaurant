"use client"

import { CATEGORIES } from "@/lib/data"
import { cn } from "@/lib/utils"

type CategoryTabsProps = {
  activeId: string
  onChange: (id: string) => void
}

export function CategoryTabs({ activeId, onChange }: CategoryTabsProps) {
  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-[96px] z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50"
    >
      <ul className="no-scrollbar flex gap-3 overflow-x-auto px-5 py-4">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeId
          return (
            <li key={cat.id} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  onChange(cat.id)
                  // scroll doux vers la section correspondante
                  const el = document.getElementById(`section-${cat.id}`)
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 160
                    window.scrollTo({ top: y, behavior: "smooth" })
                  }
                }}
                aria-pressed={isActive}
                className={cn(
                  "relative whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-900/30"
                    : "text-zinc-400 bg-zinc-900/50 hover:text-white hover:bg-zinc-800/50 border border-zinc-800/50",
                )}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.name}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
