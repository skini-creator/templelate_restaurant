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
      className="sticky top-[96px] z-30 bg-background/95 backdrop-blur-md"
    >
      <ul className="no-scrollbar flex gap-6 overflow-x-auto px-5 border-b border-border">
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
                  "relative whitespace-nowrap py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.name}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-all",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
