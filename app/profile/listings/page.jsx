"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { toast } from "react-toastify";

export default function Page() {
  const { data: session } = useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async function (propertyId) {
    const confirmed = window.confirm(
      "Are you sure you want do delete this property?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <>
      <div className="m-auto text-gray text-xl font-semibold mb-4 mt-4">
        {/* <div className="md:w-3/4 md:pl-4"> */}
        <h2 className="m-auto  mb-4">Your Listings</h2>
        {!loading && properties.length === 0 && <p>You have no listings</p>}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          properties.map((property) => (
            <div
              key={property._id}
              className="mb-10 grid grid-cols-1 border rounded-lg md:grid-cols-2"
            >
              <Link href={`/properties/${property._id}`}>
                <Image
                  className="h-32 rounded-md object-cover"
                  src={property.images[0]}
                  alt="image of the property"
                  width={1000}
                  height={100}
                  priority={true}
                />
              </Link>

              <div className="flex justify-between mt-2 ml-4">
                <div>
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-persianGreen text-sm">
                    Address: {property.location.street}
                    {", "}
                    {property.location.city}
                    {", "}
                    {property.location.country}
                  </p>
                </div>

                <div className="mt-2 flex flex-col">
                  <Link
                    href={`/properties/${property._id}/edit`}
                    className="px-3 py-2 rounded-md mt-2"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteProperty(property._id)}
                    className="px-3 py-2 rounded-md mt-2 text-red"
                    type="button"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {/* </div> */}
      </div>
    </>
  );
}
