"use client";

import { useState, useEffect } from "react";

function PropertyAddForm() {
  const [mounted, setMounted] = useState();
  const [fields, setFields] = useState({
    type: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      country: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    numGuests: "",
    square_metre: "",
    amenities: [],
    rates: {
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = [...fields.amenities];

    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    const updatedImages = [...fields.images];

    for (const file of files) {
      updatedImages.push(file);
    }

    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    mounted && (
      <form
        action="/api/properties"
        method="POST"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl text-center font-semibold my-6 text-gray">
          Add Property
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray font-bold mb-2">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartment">Apartment</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray font-bold mb-2">Listing Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:border-persianGreen"
            placeholder="eg. Horizon"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray font-bold mb-2">Location</label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:border-persianGreen"
            placeholder="Street"
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:border-persianGreen"
            placeholder="City"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="country"
            name="location.country"
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:border-persianGreen"
            placeholder="Country"
            required
            value={fields.location.country}
            onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:border-persianGreen"
            placeholder="Zipcode"
            value={fields.location.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
          <div className="w-full">
            <label htmlFor="beds" className="block text-gray font-bold my-2">
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              min="1"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
              required
              value={fields.beds}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="baths" className="block text-gray font-bold my-2">
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              min="1"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
              required
              value={fields.baths}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="square_metre"
              className="block text-gray font-bold my-2"
            >
              Square Metre
            </label>
            <input
              type="number"
              id="square_metre"
              name="square_metre"
              min="1"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
              required
              value={fields.square_metre}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="numGuests"
              className="block text-gray font-bold my-2"
            >
              Max number of guests
            </label>
            <input
              type="number"
              id="numGuests"
              name="numGuests"
              min="1"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
              required
              value={fields.numGuests}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray font-bold mb-2">Amenities</label>
          <div className="grid grid-cols-1 ssm:grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2 focus:border-persianGreen"
                checked={fields.amenities.includes("Wifi")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
                checked={fields.amenities.includes("Full Kitchen")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_kitchen">Full Kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
                checked={fields.amenities.includes("Washer & Dryer")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
                checked={fields.amenities.includes("Free Parking")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
                checked={fields.amenities.includes("Swimming Pool")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
                checked={fields.amenities.includes("Hot Tub")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
                checked={fields.amenities.includes("24/7 Security")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
                checked={fields.amenities.includes("Wheelchair Accessible")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
                checked={fields.amenities.includes("Elevator Access")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
                checked={fields.amenities.includes("Dishwasher")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
                checked={fields.amenities.includes("Gym/Fitness Center")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_gym_fitness_center">
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
                checked={fields.amenities.includes("Air Conditioning")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
                checked={fields.amenities.includes("Balcony/Patio")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
                checked={fields.amenities.includes("Smart TV")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
                checked={fields.amenities.includes("Coffee Maker")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray font-bold my-2">Rates</label>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              min="1"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
              value={fields.rates.nightly}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            placeholder="Name"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            placeholder="Email address"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            placeholder="Phone"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray font-bold mb-2">
            Images (Select up to 4 images)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:border-persianGreen"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button
            className="bg-persianGreen hover:bg-persianGreen hover:bg-opacity-75 text-gray font-bold mpy-2 px-4 mb-4 rounded-full w-full focus:shadow-outline focus:outline-none focus:border-persianGreen"
            type="submit"
          >
            Add Property
          </button>
        </div>
      </form>
    )
  );
}

export default PropertyAddForm;
