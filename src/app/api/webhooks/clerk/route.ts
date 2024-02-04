import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log("triggered");

  if (eventType === "user.created") {
    console.log("triggered");
    await db.user.create({
      data: {
        userId: payload.data.id,
        name: `${payload.data.first_name} ${payload.data.last_name}`,
        email: payload.data.email_addresses[0].email_address,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        userId: payload.data.id,
      },
      data: {
        name: `${payload.data.first_name} ${payload.data.last_name}`,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        userId: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
