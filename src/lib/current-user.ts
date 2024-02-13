import { auth } from "@clerk/nextjs";
import { db } from "./db";

export async function currentUser() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
}
