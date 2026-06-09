# 🌊 ShopWave

**ShopWave** is a modern, fully-featured E-Commerce platform built with **React**, **Vite**, and **Tailwind CSS**. It provides a seamless shopping experience with user authentication, dynamic product searches, a shopping cart, a wishlist, and secure checkout integration.

## 🚀 Live Demo

[Visit ShopWave](https://shop-wave-three-nu.vercel.app/login).

---

## ✨ Features

- **User Authentication:** Secure login, registration, and password recovery.
- **Product Discovery:** Search functionality, category filtering, and brand browsing.
- **Product Details:** Rich product pages featuring high-quality images, descriptions, and user ratings.
- **Shopping Cart & Checkout:** Seamless add-to-cart flows with Stripe payment integration.
- **Wishlist:** Save your favorite items for later.
- **Responsive Design:** A beautiful, mobile-friendly interface built with Tailwind CSS and Flowbite.
- **Optimized Performance:** Lightning-fast builds via Vite and optimized data fetching with React Query.

---

## 🛠️ Tech Stack

- **Framework:** React 18 & Vite
- **Styling:** Tailwind CSS & Flowbite
- **State Management:** React Context API
- **Data Fetching:** Axios & React Query (`@tanstack/react-query`)
- **Routing:** React Router DOM v6
- **Form Handling:** Formik & Yup (Validation)
- **UI Assets:** FontAwesome & React Slick (Carousels)

---

## 📂 Project Structure

```text
src/
├── assets/        # Static assets (logos, images, fonts)
├── components/    # Reusable UI components (Navbar, Footer, ProductItem, etc.)
├── context/       # React Context providers (Auth, Cart, Wishlist, Products)
├── pages/         # Route views (Home, Login, Register, Cart, Checkout, etc.)
├── App.jsx        # Main application routing and wrapper
└── main.jsx       # Entry point
```

---

## 💻 Local Development

Follow these steps to run **ShopWave** on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MahmoudMosTafa717/ShopWave.git
   cd ShopWave
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173/` to see the app in action!

---

## 🏗️ Building for Production

To create a production-ready build:
```bash
npm run build
```
The optimized output will be generated in the `dist` folder. You can test it locally by running:
```bash
npm run preview
```

---

## 👨‍💻 Author

**Mahmoud Mostafa**  
- **GitHub:** [@MahmoudMosTafa717](https://github.com/MahmoudMosTafa717)  
- **LinkedIn:** [Mahmoud Mostafa Saber](https://www.linkedin.com/in/mahmoud-mostafa-saber/)  
- **Email:** mhmodmostafa127@gmail.com
