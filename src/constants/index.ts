import {
  Cog,
  Layers3,
  LayoutDashboard,
  ListOrdered,
  Sliders,
} from "lucide-react";

export const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: ListOrdered,
    label: "Orders",
    href: "/admin/orders",
  },
  {
    icon: Layers3,
    label: "Products",
    href: "/admin/products",
  },
  {
    icon: Sliders,
    label: "Config",
    children: [
      {
        label: "Categories",
        href: "/admin/config/categories",
      },
      {
        label: "Colors",
        href: "/admin/config/colors",
      },
      {
        label: "Sizes",
        href: "/admin/config/sizes",
      },
    ],
  },
  {
    icon: Cog,
    label: "Settings",
    href: "/admin/settings",
  },
];

export const categories = [
  {
    title: "Man",
    subCategories: [
      { title: "T-Shirt" },
      { title: "Shirt" },
      { title: "Pants" },
      { title: "Jeans" },
    ],
  },
  {
    title: "Woman",
    subCategories: [
      { title: "Dresses" },
      { title: "Tops" },
      { title: "Skirts" },
      { title: "Jeans" },
    ],
  },
  {
    title: "Kid",
    subCategories: [
      { title: "Boys" },
      { title: "Girls" },
      { title: "Infants" },
    ],
  },
];

export const newarrivals = [
  {
    name: "Polo Tshirt",
    image: "/images/new-arrivals/photo-1.jpg",
  },
  {
    name: "Half-Sleeve T-shirt",
    image: "/images/new-arrivals/photo-2.jpg",
  },
  {
    name: "Designer Short Sleeve",
    image: "/images/new-arrivals/photo-3.jpg",
  },
  {
    name: "Sports T-shirt",
    image: "/images/new-arrivals/photo-4.jpg",
  },
  {
    name: "Half Sleeve Raglan",
    image: "/images/new-arrivals/photo-5.jpg",
  },
];
