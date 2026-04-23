"use client"

import { useEffect, useRef, useState } from "react"
import { CATEGORIES, getProductsByCategory } from "@/lib/data"
import { CategoryTabs } from "@/components/category-tabs"
import { ProductCard } from "@/components/product-card"

export function MenuSection() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id)
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  // Observer pour surligner le tab actif pendant le scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          const id = visible.target.id.replace("section-", "")
          setActiveId(id)
        }
      },
      { rootMargin: "-180px 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <CategoryTabs activeId={activeId} onChange={setActiveId} />

      <div className="pb-40 pt-2">
        {CATEGORIES.map((cat) => {
          const products = getProductsByCategory(cat.id)
          if (products.length === 0) return null
          const isOffers = cat.id === "offres"

          return (
            <section
              key={cat.id}
              id={`section-${cat.id}`}
              ref={(el) => {
                sectionsRef.current[cat.id] = el
              }}
              aria-labelledby={`title-${cat.id}`}
              className="scroll-mt-40 pt-8"
            >
              <div className="px-5">
                <h2
                  id={`title-${cat.id}`}
                  className={`font-serif text-2xl font-semibold tracking-tight ${
                    isOffers ? "text-primary" : "text-foreground"
                  }`}
                >
                  {cat.name}
                </h2>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {cat.description}
                </p>
              </div>

              <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
