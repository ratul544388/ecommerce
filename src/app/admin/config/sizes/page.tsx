import { db } from "@/lib/db";
import { SizesClient } from "./sizes-client";

const SizesPage = async () => {
  const sizes = await db.size.findMany();
  return <SizesClient sizes={sizes} />;
};

export default SizesPage;
