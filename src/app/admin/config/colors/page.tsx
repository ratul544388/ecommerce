import { db } from "@/lib/db";
import { ColorsClient } from "./colors-client";

const ColorsPage = async () => {
  const colors = await db.color.findMany();
  return <ColorsClient colors={colors} />;
};

export default ColorsPage;
