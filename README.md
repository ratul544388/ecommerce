# ✨ Glamify – Modern E-commerce Platform for Fashion

**Glamify** is a sleek, full-stack fashion e-commerce platform designed to provide a high-end shopping experience. Built with the latest web technologies, Glamify allows users to browse, search, and purchase stylish products effortlessly. Admins have full control over inventory, categories, and order management via a powerful dashboard.

🔗 **Live Demo**: [ecommerce-ratul544388.vercel.app](https://ecommerce-ratul544388.vercel.app)  
📁 **Repository**: [GitHub – ratul544388/ecommerce](https://github.com/ratul544388/ecommerce)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Framework**: [Next.js 13+ (App Router)](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### 🔹 Backend & APIs
- **API Routes**: Next.js
- **ORM**: Prisma + PlanetScale (MySQL)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Media Management**: Cloudinary

### 🔹 Dev Tools
- TypeScript
- Zustand (state management)
- Vercel (deployment)

---

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ratul544388/ecommerce.git
cd ecommerce
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file and include the following:

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

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see it in action.

---

## 🧪 Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run start` – Start production server
* `npm run lint` – Run ESLint

---

## ✨ Features

### 👤 Customer Experience

* Modern, responsive UI for all devices
* Browse by categories, featured products, and filters
* Product variants (e.g. size, color)
* Add to cart & checkout via **Stripe**
* Order tracking and confirmation

### 🛠️ Admin Dashboard

* Create/update/delete categories and products
* Manage sizes, colors, and inventories
* View all orders with payment status
* Dashboard analytics

---

## 🛡️ Authentication

* Role-based access via **Clerk**
* Customers can browse and place orders without sign-in
* Admins must be logged in to access the dashboard

---

## 💳 Payments

* Integrated with **Stripe**
* Orders stored with secure payment status
* Fast, reliable, and scalable

---

## 🙌 Acknowledgements

* Thanks to the creators of open-source libraries and APIs used in this project.
* UI inspired by modern e-commerce trends.

---

## 📬 Contact

**Ratul Hossain**
📍 Dhaka, Bangladesh
📧 Email: [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/ratul-hossain-1310) • [GitHub](https://github.com/ratul544388)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
