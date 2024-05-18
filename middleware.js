export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/properties/add",
    "/profile",
    "/profile/saved",
    "/profile/reservations",
    "/profile/listings",
    "/messages",
  ],
};
