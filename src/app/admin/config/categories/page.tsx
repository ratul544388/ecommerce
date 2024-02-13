import { getCategories } from "@/actions/category-action";
import { CategoryClient } from "./category-client";

const CategoriesPage = async () => {
  const categories = await getCategories();
  return <CategoryClient categories={categories} />;
};

export default CategoriesPage;
