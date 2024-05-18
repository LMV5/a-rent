// "use client";

// import Image from "next/image";
// // import LinkButton from "@/components/LinkButton";
// import { useSession } from "next-auth/react";
// import profileDefault from "@/assets/images/profile.png";
// import { useState, useEffect } from "react";

// import { toast } from "react-toastify";

// export default function Page() {
//   const { data: session } = useSession();
//   const profileImage = session?.user?.image;
//   const profileName = session?.user?.name;
//   const profileEmail = session?.user?.email;

//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProperties = async (userId) => {
//       if (!userId) {
//         return;
//       }

//       try {
//         const res = await fetch(`/api/properties/user/${userId}`);

//         if (res.status === 200) {
//           const data = await res.json();
//           setProperties(data);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (session?.user?.id) {
//       fetchUserProperties(session.user.id);
//     }
//   }, [session]);

//   const handleDeleteProperty = async function (propertyId) {
//     const confirmed = window.confirm(
//       "Are you sure you want do delete this property?"
//     );

//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/properties/${propertyId}`, {
//         method: "DELETE",
//       });

//       if (res.status === 200) {
//         const updatedProperties = properties.filter(
//           (property) => property._id !== propertyId
//         );
//         setProperties(updatedProperties);
//         toast.success("Property Deleted");
//       } else {
//         toast.error("Failed to delete property");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to delete property");
//     }
//   };

//   return (
//     <section>
//       <div className="m-auto py-24">
//         <div className="px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
//           <h1 className="text-3xl font-bold mb-4 ml-8">Your Profile</h1>
//           <div className="flex flex-col">
//             <div className="flex justify-around md:justify-start">
//               <div className="mb-4">
//                 <Image
//                   className="h-24 w-24 md:h-24 md:w-424 rounded-full ml-8"
//                   src={profileImage || profileDefault}
//                   alt="photo of the user"
//                   width={200}
//                   height={200}
//                 />
//               </div>
//               <h2 className="text-base md:text-xl mb-4 ml-8">
//                 <span className="font-bold block">Name: </span> {profileName}
//               </h2>
//               <h2 className="text-base md:text-xl ml-8">
//                 <span className="font-bold block">Email: </span> {profileEmail}
//               </h2>
//             </div>
//             {/* <div className="mt-2 ml-8 w-48 rounded-md py-1">
//               <LinkButton href="/profile" style="menuItem">
//                 Your Profile
//               </LinkButton>
//               <LinkButton href="/profile/reservations" style="menuItem">
//                 Reservations
//               </LinkButton>
//               <LinkButton href="/properties/saved" style="menuItem">
//                 Saved Properties
//               </LinkButton>
//               <LinkButton href="/properties/listings" style="menuItem">
//                 Your Listings
//               </LinkButton>
//               <button
//                 onClick={() => {
//                   setIsProfileMenuOpen(false);
//                   signOut();
//                 }}
//                 href="#"
//                 className="block px-4 py-2 text-sm hover:text-gray hover:bg-cosmicLatte hover:bg-opacity-75"
//               >
//                 Sign Out
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

export default function Page() {
  return (
    <h2 className="m-auto text-xl font-semibold mb-4 mt-4">Welcome, Mar</h2>
  );
}
