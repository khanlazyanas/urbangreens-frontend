// CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { AuthContext } from "./Authcontext.jsx"; // ✅ import AuthContext

export const CartContext = createContext();

const getKey = (x) => String(x?.productId ?? x?.id);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext); // ✅ get current logged-in user

  useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem("token"); // fresh token
    if (!user || !token) {
      setCartItems([]);
      return;
    }
    try {
      const res = await axios.get(`${BACKEND_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setCartItems(res.data.items || []); // backend me jo cart hai use set karo
      }
    } catch (err) {
      console.error("Fetch cart error:", err.response?.data || err.message);
    }
  };

  fetchCart();
}, [user]); // ✅ user change pe refetch

  const addToCart = (item) => {
    const key = getKey(item);
    setCartItems((prev) => {
      const exist = prev.find((p) => getKey(p) === key);
      if (exist) {
        return prev.map((p) =>
          getKey(p) === key ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [
          ...prev,
          {
            ...item,
            productId: item.productId ?? item.id,
            quantity: item.quantity ?? 1,
          },
        ];
      }
    });
  };

  const increaseQty = (item) => {
    const key = getKey(item);
    setCartItems((prev) =>
      prev.map((p) =>
        getKey(p) === key ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQty = (item) => {
    const key = getKey(item);
    setCartItems((prev) =>
      prev
        .map((p) =>
          getKey(p) === key ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (item) => {
    const key = getKey(item);
    setCartItems((prev) => prev.filter((p) => getKey(p) !== key));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
