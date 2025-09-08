import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import productList from "../data/ProductList";
import { FaRupeeSign, FaCartPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";  // ✅ yaha fa se import karo
import { FaSliders } from "react-icons/fa6"; // ✅ ye fa6 se hi aata hai
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../main.jsx";

const allCategories = ["All", ...new Set(productList.map((p) => p.category))];

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromHome = params.get("category");

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [weight, setWeight] = useState("All");
  const [organic, setOrganic] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState(""); // ✅ search state

  const { addToCart } = useContext(CartContext);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryFromHome && allCategories.includes(categoryFromHome)) {
      setCategory(categoryFromHome);
    }
  }, [categoryFromHome]);

  // ✅ Filtering logic with search
  const filtered = productList
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => brand === "All" || p.brand === brand)
    .filter((p) => weight === "All" || p.weight === weight)
    .filter((p) =>
      organic === "All" ? true : organic === "Yes" ? p.organic : !p.organic
    )
    .filter((p) => {
      if (priceRange === "all") return true;
      if (priceRange === "0-500") return p.price <= 500;
      if (priceRange === "501-1000") return p.price > 500 && p.price <= 1000;
      if (priceRange === "1001-2000") return p.price > 1000 && p.price <= 2000;
      if (priceRange === "2000+") return p.price > 2000;
      return true;
    })
    .filter((p) =>
      search.trim() === "" ? true : p.name.toLowerCase().includes(search.toLowerCase())
    ) // ✅ search filter
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = async (item) => {
    try {
      setLoadingProduct(item.name);

      const productId = item._id || item.id;
      if (!productId) {
        setLoadingProduct(null);
        toast.error("Product ID missing.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/cart`,
        {
          productId,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        addToCart(item);
        toast.success("Item added to cart!");
      }

      setTimeout(() => {
        setLoadingProduct(null);
        navigate("/cart");
      }, 400);
    } catch (err) {
      console.error("Add to cart API error:", err.response?.data || err.message);
      setLoadingProduct(null);

      if (err.response?.status === 401) {
        toast.error("Login first to add items to cart.");
        navigate("/login");
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    }
  };

  return (
    <div className="pb-12">
      <h1
        className="text-2xl md:text-3xl font-bold text-center my-6"
        style={{ fontFamily: "Playfair Display, serif", color: "#a97142" }}
      >
        Our Categories
      </h1>

      {/* Category Tabs */}
      <div className="overflow-x-auto px-4 scrollbar-hide">
        <div
          className="flex md:justify-center gap-6 text-base md:text-lg font-medium mb-4 min-w-max"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`pb-1 whitespace-nowrap transition ${
                category === cat
                  ? "border-b-2 border-amber-600 text-amber-700"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Filters + Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 md:px-12 mb-6 gap-4 relative">
        {/* ✅ Search box */}
        <div className="flex items-center w-full sm:w-1/2 md:w-1/3 border rounded-lg px-3 py-2 bg-white shadow-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 text-black font-medium border px-3 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaSliders size={16} /> Filters
          </button>

          {showFilter && (
            <div className="absolute top-14 left-4 bg-white border rounded shadow-md p-4 z-10 w-60">
              {/* TODO: Filter dropdowns */}
            </div>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-6 md:px-12">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        ) : (
          filtered.map((item, i) => {
            const discount = item.oldPrice
              ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
              : 0;

            return (
              <div
                key={i}
                className="bg-white rounded-lg border hover:shadow-lg transition p-3 sm:p-4 flex flex-col relative"
              >
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full font-semibold">
                    {discount}% OFF
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 sm:h-40 md:h-48 object-contain mx-auto mb-3"
                />
                <h3
                  className="text-xs sm:text-sm md:text-base mb-1 truncate"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {item.name}
                </h3>
                <div className="mb-3">
                  <p
                    className="text-sm sm:text-base md:text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <FaRupeeSign className="inline mr-1" />
                    {item.price}
                  </p>
                  {item.oldPrice && (
                    <p className="text-xs sm:text-sm text-gray-400 line-through">
                      ₹{item.oldPrice}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={loadingProduct === item.name}
                  className="mt-auto bg-black text-white py-2 sm:py-2.5 text-xs sm:text-sm md:text-base rounded flex items-center justify-center gap-2 hover:bg-gray-900 transition relative"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {loadingProduct === item.name ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <FaCartPlus size={14} /> Add To Cart
                    </>
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
