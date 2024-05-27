import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import LinkButton from "./LinkButton";
import { FaArrowLeft } from "react-icons/fa";

function PropertyImages({ images }) {
  return (
    <>
      <Gallery>
        <section className="p-4">
          <div className="max-w-6xl mx-auto">
            {images.length === 1 ? (
              <Item
                original={images[0]}
                thumbnail={images[0]}
                width="1000"
                height="600"
              >
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={images[0]}
                    alt="image of the property"
                    className="object-cover h-[400px] mx-auto rounded-xl"
                    width={1800}
                    height={400}
                    priority={true}
                  />
                )}
              </Item>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 ">
                {images.map((image, index) => (
                  <div key={index} className={"flex"}>
                    <Item
                      original={image}
                      thumbnail={image}
                      width="1000"
                      height="600"
                    >
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={image}
                          alt="image of the property"
                          className="object-cover h-28 ssm:h-36 md:h-72 w-full rounded-xl"
                          width={0}
                          height={0}
                          sizes="100vw"
                          priority={true}
                        />
                      )}
                    </Item>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </Gallery>
      <div className="text-gray mx-5 flex justify-start">
        <LinkButton href="/properties" style="btnBack">
          <FaArrowLeft className="mr-2 mb-[0.5]" />
          Back to Properties
        </LinkButton>
      </div>
    </>
  );
}

export default PropertyImages;
