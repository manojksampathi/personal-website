/**
 * Server-component wrapper for the chat — fetches the signed-in user from
 * the session and passes it to the client. Middleware already guarantees
 * an authenticated session, so we treat `user` as required here.
 */
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import ChatClient from "./_components/ChatClient";

export default async function RetailChatPage() {
  const session = await auth();
  const username = session?.user?.name;

  // Belt-and-suspenders — middleware should have already gated this route
  if (!username) {
    redirect("/signin?callbackUrl=/analytics/retail/chat");
  }

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return <ChatClient username={username} signOutAction={signOutAction} />;
}
