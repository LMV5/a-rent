"use client";

import FadeLoader from "react-spinners/FadeLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

export default function Page({ loading }) {
  return (
    <FadeLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
    />
  );
}
