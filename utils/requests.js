const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

if (!apiDomain) {
  return [];
}

async function fetchProperties() {
  try {
    const res = await fetch(`${apiDomain}/properties`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      throw new Error("API domain is not defined");
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
