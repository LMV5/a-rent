import Hero from "@/components/Hero";
import LinkButton from "@/components/LinkButton";

export default function Page() {
  return (
    <>
      <Hero />
      <section className="m-auto max-w-lg my-10 px-6">
        <LinkButton href="/properties" style="viewBtn">
          View All Properties
        </LinkButton>
      </section>
    </>
  );
}
