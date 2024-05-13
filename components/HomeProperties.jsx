import PropertyCard from "@/components/PropertyCard";
import LinkButton from "./LinkButton";
import { fetchProperties } from "@/utils/requests";

const HomeProperties = async () => {
  const data = await fetchProperties();

  const recentProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-gray mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties === 0 ? (
              <p>No properties found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <LinkButton href="/properties" type="viewBtn">
          View All Properties
        </LinkButton>
      </section>
    </>
  );
};

export default HomeProperties;
