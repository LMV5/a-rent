import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
      role: session.user.role,
    };
  } catch (error) {
    console.error("Error fetching session user:", error);
    return null;
  }
};
