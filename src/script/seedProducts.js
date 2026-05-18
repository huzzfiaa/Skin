import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const products = [
  {
    name: "Radiance Serum No.1",
    category: "Serum",
    price: 4800,
    ml: "30ml",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
  },
  {
    name: "Velvet Moisturiser",
    category: "Moisturiser",
    price: 3600,
    ml: "50ml",
    tag: "New",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
  },
  {
    name: "Clarity Toner",
    category: "Toner",
    price: 2800,
    ml: "100ml",
    tag: null,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
  },
  {
    name: "Petal Eye Cream",
    category: "Eye Care",
    price: 5200,
    ml: "15ml",
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1616671276441-2f2c3f1f8b3a",
  },
  {
    name: "Dew Essence Mist",
    category: "Toner",
    price: 2200,
    ml: "120ml",
    tag: null,
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a",
  },
  {
    name: "Gold Repair Mask",
    category: "Mask",
    price: 6400,
    ml: "75ml",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1611930022247-8f85f6c9b4b6",
  },
  {
    name: "Barrier Cream SPF50",
    category: "Moisturiser",
    price: 3900,
    ml: "40ml",
    tag: null,
    image: "https://images.unsplash.com/photo-1612810436541-336d2f3b5d1a",
  },
  {
    name: "Retinol Night Serum",
    category: "Serum",
    price: 5600,
    ml: "30ml",
    tag: "New",
    image: "https://images.unsplash.com/photo-1611930022073-7c1f2a0b9d9a",
  },
];

export const seedProducts = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
    }
    console.log("✅ All products seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  }
};