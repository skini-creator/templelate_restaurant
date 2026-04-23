import { Navbar } from "@/components/navbar"
import { MenuSection } from "@/components/menu-section"
import { CartSheet } from "@/components/cart-sheet"
import { CartProvider } from "@/components/cart-context"

type PageProps = {
  searchParams: Promise<{ table?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const { table } = await searchParams
  const tableNumber = table ?? null

  return (
    <CartProvider>
      <div className="min-h-dvh bg-background">
        <Navbar tableNumber={tableNumber} />

        <main className="mx-auto max-w-5xl">
          <MenuSection />
        </main>

        <CartSheet tableNumber={tableNumber} />
      </div>
    </CartProvider>
  )
}
