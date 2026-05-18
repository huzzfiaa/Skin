import { collection, addDoc, getDocs, doc, query, where, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const createOrder = async (userId, items, total, shippingInfo) => {
  const order = {
    userId,
    items: items.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      ml: product.ml,
      image: product.image || null,
      quantity,
    })),
    total,
    shippingInfo,
    status: "confirmed",
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "orders"), order);
  return { id: docRef.id, ...order };
};

export const getUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getAllOrders = async () => {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const changeOrderStatus = async (orderId, status) => {
  await updateDoc(doc(db, "orders", orderId), { status });
};