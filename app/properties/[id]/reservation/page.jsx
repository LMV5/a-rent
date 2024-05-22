"use client";

import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";
import { fetchProperty } from "@/utils/requests";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";

function Page() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        // console.log(id);
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

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <div className="my-10 ml-10 flex gap-10 text-slateBlue">
            <p className="text-3xl font-bold ">{property.name}</p>
            <p className="text-3xl font-bold">€{property.rates.nightly}</p>
          </div>
          <div className="col-start-1 col-end-7 rounded-lg shadow-lg bg-cosmicLatte ">
            <div className="flex justify-center gap-20">
              <DateSelector />
              <ReservationForm property={property} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Page;
