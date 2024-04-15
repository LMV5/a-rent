"use client";

import InfoBox from "./InfoBox";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            backgroundColor="bg-blue-100"
            heading="For Renters"
            href="/properties"
            type="btnForRenters"
            text="Browse Properties"
          >
            Find your dream rental property. Bookmark properties and contact
            owners
          </InfoBox>

          <InfoBox
            heading="For Owners"
            backgroundColor="bg-blue-200"
            href="/properties/add"
            type="btnForOwners"
            text="Add Property"
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;
