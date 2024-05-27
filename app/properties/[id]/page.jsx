"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import LinkButton from "@/components/LinkButton";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import SideBar from "@/components/SideBar";

export default function Page() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyImages images={property.images} />
          <div className="text-gray mx-5 lg:max-w-6xl lg:mx-auto">
            <LinkButton href="/properties" style="btnBack">
              <FaArrowLeft className="mr-2 mb-[0.5]" />
              Back to Properties
            </LinkButton>
          </div>

          <section className="mx-2 flex flex-col md:flex-row md:justify-between md:gap-5 lg:max-w-6xl lg:mx-auto">
            <PropertyDetails property={property} />
            <SideBar property={property} />
          </section>
        </>
      )}
    </>
  );
}
