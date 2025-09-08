// src/data/ProductList.jsx
import basmati from "../assets/basmati.jpg.png";
import Wheat from "../assets/wheat.jpg.png";
import toordal from "../assets/toordal.jpg.png";
import chanadal from "../assets/chanadal.png";
import moongdal from "../assets/moongdal.png";
import toothpaste from "../assets/colgate.jpg.jpg";
import banana from "../assets/banana.png"
import apple from "../assets/apple.png"
import orange from "../assets/orange.jpg"
import grapes from "../assets/grapes.jpg"
import mango from "../assets/mangoes.jpg"


const productList = [
  { id: 1,  name: "Basmati Rice (5kg)",      category: "Grains",        price: 550, oldPrice: 650, image: basmati },
  { id: 2,  name: "Wheat Flour (10kg)",      category: "Grains",        price: 400, oldPrice: 480, image: Wheat },
  { id: 3,  name: "Toor Dal (2kg)",          category: "Pulses",        price: 350, oldPrice: 420, image: toordal },
  { id: 4,  name: "Chana Dal (1kg)",         category: "Pulses",        price: 120, oldPrice: 150, image: chanadal },
  { id: 5,  name: "Moong Dal (1kg)",         category: "Pulses",        price: 130, oldPrice: 160, image: moongdal },
  { id: 6,  name: "Masoor Dal (1kg)",        category: "Pulses",        price: 140, oldPrice: 170, image: "https://i.ibb.co/6XfYtF9/masoor-dal.png" },
  { id: 7,  name: "Sugar (1kg)",             category: "Essentials",    price: 50,  oldPrice: 65,  image: "https://i.ibb.co/2MZHpf4/sugar.png" },
  { id: 8,  name: "Salt (1kg)",              category: "Essentials",    price: 20,  oldPrice: 25,  image: "https://i.ibb.co/jZGj7hr/salt.png" },
  { id: 9,  name: "Jaggery (500g)",          category: "Essentials",    price: 45,  oldPrice: 55,  image: "https://i.ibb.co/Q6Qk6zP/jaggery.png" },
  { id:10,  name: "Milk (1L)",               category: "Dairy",         price: 60,  oldPrice: 70,  image: "https://i.ibb.co/Ntj9hPt/milk.png" },
  { id:11,  name: "Curd (500g)",             category: "Dairy",         price: 35,  oldPrice: 45,  image: "https://i.ibb.co/HgYNj1P/curd.png" },
  { id:12,  name: "Paneer (200g)",           category: "Dairy",         price: 80,  oldPrice: 100, image: "https://i.ibb.co/fGmzQyr/paneer.png" },
  { id:13,  name: "Cheese (200g)",           category: "Dairy",         price: 110, oldPrice: 140, image: "https://i.ibb.co/5LfjqHv/cheese.png" },
  { id:14,  name: "Butter (100g)",           category: "Dairy",         price: 50,  oldPrice: 65,  image: "https://i.ibb.co/fk2xYHf/butter.png" },
  { id:15,  name: "Cream (200ml)",           category: "Dairy",         price: 75,  oldPrice: 95,  image: "https://i.ibb.co/10V6Qzj/cream.png" },
  { id:16,  name: "Eggs (6 pcs)",            category: "Protein",       price: 65,  oldPrice: 80,  image: "https://i.ibb.co/BqkTb1B/eggs.png" },
  { id:17,  name: "Chicken (1kg)",           category: "Protein",       price: 220, oldPrice: 260, image: "https://i.ibb.co/q09qYqf/chicken.png" },
  { id:18,  name: "Mutton (1kg)",            category: "Protein",       price: 650, oldPrice: 780, image: "https://i.ibb.co/5W1vFNt/mutton.png" },
  { id:19,  name: "Fish (1kg)",              category: "Protein",       price: 280, oldPrice: 340, image: "https://i.ibb.co/NLDP7XB/fish.png" },
  { id:20,  name: "Apple (1kg)",             category: "Fruits",        price: 150, oldPrice: 215, image: apple },
  { id:21,  name: "Banana (1 dozen)",        category: "Fruits",        price: 49,  oldPrice: 70,  image: banana },
  { id:22,  name: "Orange (1kg)",            category: "Fruits",        price: 50,  oldPrice: 71, image: orange},
  { id:23,  name: "Mango (1kg)",             category: "Fruits",        price: 85, oldPrice: 122, image: mango },
  { id:24,  name: "Grapes (500g)",           category: "Fruits",        price: 56,  oldPrice: 80,  image: grapes },
  { id:25,  name: "Onion (1kg)",             category: "Vegetables",    price: 40,  oldPrice: 55,  image: "https://i.ibb.co/mBchshB/onion.png" },
  { id:26,  name: "Potato (1kg)",            category: "Vegetables",    price: 30,  oldPrice: 40,  image: "https://i.ibb.co/g6dpDrP/potato.png" },
  { id:27,  name: "Tomato (1kg)",            category: "Vegetables",    price: 35,  oldPrice: 45,  image: "https://i.ibb.co/TBD5H6D/tomato.png" },
  { id:28,  name: "Carrot (500g)",           category: "Vegetables",    price: 30,  oldPrice: 40,  image: "https://i.ibb.co/PzrfcYj/carrot.png" },
  { id:29,  name: "Cabbage (1kg)",           category: "Vegetables",    price: 25,  oldPrice: 35,  image: "https://i.ibb.co/09zhr79/cabbage.png" },
  { id:30,  name: "Spinach (bunch)",         category: "Vegetables",    price: 20,  oldPrice: 30,  image: "https://i.ibb.co/KGBG7M3/spinach.png" },
  { id:31,  name: "Oil - Mustard (1L)",      category: "Cooking Oil",   price: 150, oldPrice: 180, image: "https://i.ibb.co/sbKKjP8/mustard-oil.png" },
  { id:32,  name: "Oil - Sunflower (1L)",    category: "Cooking Oil",   price: 130, oldPrice: 160, image: "https://i.ibb.co/XLCWCDs/sunflower-oil.png" },
  { id:33,  name: "Tea (500g)",              category: "Beverages",     price: 200, oldPrice: 260, image: "https://i.ibb.co/bNygrNd/tea.png" },
  { id:34,  name: "Coffee (200g)",           category: "Beverages",     price: 150, oldPrice: 200, image: "https://i.ibb.co/pzTGtbY/coffee.png" },
  { id:35,  name: "Bread (loaf)",            category: "Bakery",        price: 40,  oldPrice: 50,  image: "https://i.ibb.co/Krb3S74/bread.png" },
  { id:36,  name: "Buns (4 pcs)",            category: "Bakery",        price: 30,  oldPrice: 40,  image: "https://i.ibb.co/gj9WbJK/buns.png" },
  { id:37,  name: "Cake (500g)",             category: "Bakery",        price: 150, oldPrice: 200, image: "https://i.ibb.co/mGkCGx6/cake.png" },
  { id:38,  name: "Garlic (250g)",           category: "Vegetables",    price: 25,  oldPrice: 35,  image: "https://i.ibb.co/4RWJ3zG/garlic.png" },
  { id:39,  name: "Ginger (250g)",           category: "Vegetables",    price: 30,  oldPrice: 40,  image: "https://i.ibb.co/VWxPQ5F/ginger.png" },
  { id:40,  name: "Toothpaste (200g)",       category: "Personal Care", price: 90,  oldPrice: 110, image: toothpaste },
  { id:41,  name: "Shampoo (180ml)",         category: "Personal Care", price: 120, oldPrice: 160, image: "https://i.ibb.co/JstnZTy/shampoo.png" },
  { id:42,  name: "Soap (100g)",             category: "Personal Care", price: 30,  oldPrice: 40,  image: "https://i.ibb.co/tHsLf8k/soap.png" },
  { id:43,  name: "Toilet Cleaner (500ml)",  category: "Cleaning",      price: 75,  oldPrice: 95,  image: "https://i.ibb.co/Zc7jcy2/toilet-cleaner.png" },
  { id:44,  name: "Floor Cleaner (1L)",      category: "Cleaning",      price: 90,  oldPrice: 120, image: "https://i.ibb.co/S6MNnWn/floor-cleaner.png" },
  { id:45,  name: "Biscuits (Pack)",         category: "Snacks",        price: 20,  oldPrice: 30,  image: "https://i.ibb.co/yfr4cRj/biscuits.png" },
  { id:46,  name: "Namkeen (500g)",          category: "Snacks",        price: 60,  oldPrice: 80,  image: "https://i.ibb.co/Zmt0bqP/namkeen.png" },
  { id:47,  name: "Chips (Pack)",            category: "Snacks",        price: 30,  oldPrice: 40,  image: "https://i.ibb.co/vmH5z5j/chips.png" },
  { id:48,  name: "Ketchup (500g)",          category: "Condiments",    price: 70,  oldPrice: 90,  image: "https://i.ibb.co/K9Th2w0/ketchup.png" },
  { id:49,  name: "Jam (250g)",              category: "Condiments",    price: 80,  oldPrice: 110, image: "https://i.ibb.co/jrFqgrk/jam.png" },
  { id:50,  name: "Pickle (500g)",           category: "Condiments",    price: 90,  oldPrice: 120, image: "https://i.ibb.co/YTD3vMB/pickle.png" }
];

export default productList;



