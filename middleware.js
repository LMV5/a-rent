export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/properties/add",
    "/properties/[id]/reservation",
    "/profile",
    "/profile/saved",
    "/profile/reservation",
    "/profile/listings",
    "/messages",
  ],
};
