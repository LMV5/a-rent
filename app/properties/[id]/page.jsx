"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import LinkButton from "@/components/LinkButton";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import SideBar from "@/components/SideBar";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";

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
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6">
              <LinkButton href="/properties" style="btnBack">
                <FaArrowLeft className="mr-2" />
                Back to Properties
              </LinkButton>
            </div>
          </section>
          <section className="max-w-4xl m-auto py-10 grid grid-cols-70-30">
            <PropertyDetails property={property} />
            <SideBar property={property} />
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}
