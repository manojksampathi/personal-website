/**
 * NextAuth REST handler — exposes /api/auth/* endpoints used internally by
 * useSession / signIn / signOut / providers.
 */
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
