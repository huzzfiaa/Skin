import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { setUser, logout, setAuthReady } from "./features/m/auth/authSlice";
import { getUserDocument } from "./firebase/firestore";

import Login          from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard  from "./pages/UserDashboard";
import Unauthorized   from "./pages/Unauthorized";
import Home           from "./pages/Home";
import Products       from "./pages/Products";
import ProductDetail  from "./pages/ProductDetail";
import Checkout       from "./pages/Checkout";
import Contact from "./pages/Contact";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import RoleRoutes      from "./routes/RoleRoutes";
import PublicRoutes    from "./routes/PublicRoutes";

import Navbar     from "./components/navebar/Navbar";
import CartDrawer from "./components/cart/CartDrawer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getUserDocument(firebaseUser.uid);
          dispatch(setUser({
            uid:   firebaseUser.uid,
            email: firebaseUser.email,
            role:  userDoc?.role || "user",
          }));
        } catch (err) {
          console.error("Firestore error:", err.message);
          dispatch(setUser({
            uid:   firebaseUser.uid,
            email: firebaseUser.email,
            role:  "user",
          }));
        }
      } else {
        dispatch(logout());
      }
      dispatch(setAuthReady());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <Routes>
        {/* ── PUBLIC ── */}
        <Route path="/" element={<Home />} />

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/products"    element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/sales"       element={<Products />} />
        <Route path="/contact"     element={<Contact/>} />

        {/* ── PROTECTED ── */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/checkout"  element={<Checkout />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/cart"      element={<UserDashboard />} />
          <Route path="/orders"    element={<UserDashboard />} />
          <Route path="/profile"   element={<UserDashboard />} />

          <Route element={<RoleRoutes allowedRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* ── MISC ── */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={
          <h1 style={{ color: "#fff", textAlign: "center", marginTop: "20vh", fontFamily: "serif" }}>
            404 — Page Not Found
          </h1>
        } />
      </Routes>
    </>
  );
};

export default App;