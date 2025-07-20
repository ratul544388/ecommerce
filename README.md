```md
# ✨ Glamify – Modern E-commerce Platform for Fashion

**Glamify** is a sleek, full-stack fashion e-commerce platform designed to provide a high-end shopping experience. Built with the latest web technologies, Glamify allows users to browse, search, and purchase stylish products effortlessly. Admins have full control over inventory, categories, and order management via a powerful dashboard.

## 🖥️ Live Demo

👉 [Click here to view the Live Site](https://ecommerce-ratul544388.vercel.app)

---

## 🚀 Features

### 👤 Customer Experience
- Modern, responsive UI for all devices
- Browse by categories, featured products, and filters
- Product variants (e.g. size, color)
- Add to cart & checkout via **Stripe**
- Order tracking and confirmation

### 🛠️ Admin Dashboard
- Create/update/delete categories and products
- Manage sizes, colors, and inventories
- View all orders with payment status
- Dashboard analytics

---

## ⚙️ Tech Stack

### Frontend
- **Next.js 13+ (App Router)**
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for form validation
- **Framer Motion** for animations

### Backend
- **Next.js API Routes**
- **Prisma** + **PlanetScale** (MySQL)
- **Clerk** for authentication
- **Stripe** for secure payments
- **Cloudinary** for image uploads

### Dev Tools
- TypeScript
- Vercel (hosting)
- Zustand (state management)

---

## 📂 Project Structure

```

/app             → App directory (pages, routes)
/components      → Reusable components
/libs            → Stripe, Cloudinary, Clerk, etc.
/prisma          → Prisma schema and DB config
/public          → Static assets
/utils           → Helper functions

````

---

## 🛡️ Authentication

Glamify uses **Clerk** for secure, role-based authentication.

- Customers can browse and place orders without sign-in
- Admins must be logged in to access the dashboard

---

## 💳 Payments

- Stripe integration for checkout
- Orders stored in the database with payment status
- Secure and scalable

---

## 📦 Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/ratul544388/ecommerce.git
   cd ecommerce
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file and add the following:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   DATABASE_URL=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET=
   FRONTEND_STORE_URL=http://localhost:3000
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

---

## 📌 Deployment

This app is **deployed on Vercel**:
[https://ecommerce-ratul544388.vercel.app](https://ecommerce-ratul544388.vercel.app)

---

## 🙋‍♂️ Author

**Ratul Hossain**
Full-Stack Web Developer
📧 [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
🌐 [LinkedIn](https://www.linkedin.com/in/ratul-hossain-1310) | [GitHub](https://github.com/ratul544388)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

```
