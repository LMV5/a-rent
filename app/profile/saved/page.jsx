"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

export default function Page() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  return (
    <div className="m-auto text-xl text-gray font-semibold mb-4 mt-4">
      <h1 className="text-xl font-semibold mb-4">Saved Properties</h1>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="m-auto mb-4 mt-4">
          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (
              <p>No saved properties</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
