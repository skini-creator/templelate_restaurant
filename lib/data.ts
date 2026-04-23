export type Category = {
  id: string
  name: string
  emoji: string
  description: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number // FCFA
  oldPrice?: number // prix barré (promo)
  image: string
  categoryId: string
  badge?: string
}

export const CATEGORIES: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    emoji: "🍕",
    description:
      "Nos pizzas sont préparées avec une pâte maison et des ingrédients frais, cuites au four à pierre pour une croûte parfaite.",
  },
  {
    id: "burgers",
    name: "Burgers",
    emoji: "🍔",
    description:
      "Pain brioché, viande fraîche et sauces maison : nos burgers sont un classique réinventé avec des produits de qualité.",
  },
  {
    id: "boissons",
    name: "Boissons",
    emoji: "🥤",
    description:
      "Jus pressés, boissons fraîches et spécialités maison pour accompagner parfaitement votre repas.",
  },
  {
    id: "desserts",
    name: "Desserts",
    emoji: "🍰",
    description:
      "Terminez votre repas en douceur avec nos créations sucrées préparées chaque jour par notre chef pâtissier.",
  },
]

export const PRODUCTS: Product[] = [
  // Pizzas
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    description: "Tomate, mozzarella fraîche, basilic",
    price: 3600,
    oldPrice: 4500,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop",
    categoryId: "pizzas",
    badge: "Populaire",
  },
  {
    id: "pizza-peperoni",
    name: "Pizza Pepperoni",
    description: "Pepperoni, mozzarella, sauce tomate",
    price: 5500,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop",
    categoryId: "pizzas",
  },
  {
    id: "pizza-4-fromages",
    name: "Pizza 4 Fromages",
    description: "Mozzarella, chèvre, gorgonzola, parmesan",
    price: 6000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    categoryId: "pizzas",
  },
  {
    id: "pizza-vege",
    name: "Pizza Végétarienne",
    description: "Poivrons, champignons, oignons, olives",
    price: 5000,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
    categoryId: "pizzas",
  },

  // Burgers
  {
    id: "burger-classique",
    name: "Burger Classique",
    description: "Bœuf, cheddar, salade, tomate, oignon",
    price: 2800,
    oldPrice: 3500,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    categoryId: "burgers",
    badge: "Best-seller",
  },
  {
    id: "burger-bacon",
    name: "Burger Bacon",
    description: "Double bœuf, bacon croustillant, cheddar",
    price: 4500,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
    categoryId: "burgers",
  },
  {
    id: "burger-poulet",
    name: "Burger Poulet Croustillant",
    description: "Poulet pané, sauce maison, crudités",
    price: 4000,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop",
    categoryId: "burgers",
  },
  {
    id: "burger-vege",
    name: "Burger Végé",
    description: "Galette de légumes, avocat, tomate",
    price: 3800,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop",
    categoryId: "burgers",
  },

  // Boissons
  {
    id: "coca-cola",
    name: "Coca-Cola",
    description: "Canette 33cl bien fraîche",
    price: 1000,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop",
    categoryId: "boissons",
  },
  {
    id: "jus-bissap",
    name: "Jus de Bissap",
    description: "Hibiscus maison, menthe fraîche",
    price: 1500,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
    categoryId: "boissons",
    badge: "Maison",
  },
  {
    id: "jus-gingembre",
    name: "Jus de Gingembre",
    description: "Gingembre frais, citron, miel",
    price: 1500,
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400&h=400&fit=crop",
    categoryId: "boissons",
  },
  {
    id: "eau-minerale",
    name: "Eau Minérale",
    description: "Bouteille 50cl",
    price: 500,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    categoryId: "boissons",
  },

  // Desserts
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Mascarpone, café, cacao",
    price: 2500,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
    categoryId: "desserts",
  },
  {
    id: "fondant-choco",
    name: "Fondant au Chocolat",
    description: "Cœur coulant, glace vanille",
    price: 2240,
    oldPrice: 2800,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=400&h=400&fit=crop",
    categoryId: "desserts",
    badge: "Chef",
  },
  {
    id: "cheesecake",
    name: "Cheesecake Fruits Rouges",
    description: "Biscuit, crème, coulis de fruits rouges",
    price: 2500,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop",
    categoryId: "desserts",
  },
  {
    id: "salade-fruits",
    name: "Salade de Fruits",
    description: "Fruits frais de saison",
    price: 2000,
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=400&fit=crop",
    categoryId: "desserts",
  },
]

export const RESTAURANT = {
  name: "Bogha Prod",
  tagline: "Cuisine du monde · Livraison rapide",
  whatsappNumber: "24174837443", // à remplacer par le vrai numéro international sans +
  address: "Abidjan, Côte d'Ivoire",
}

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

/** Pourcentage de réduction (arrondi) */
export function discountPercent(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}
