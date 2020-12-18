import GridBook from "components/public/GridBook";
import ImageSlider from "components/public/ImageSlide";
import SearchBar from "components/public/SearchBar";
import React from "react";

export default function CategoryPage() {
  const books = [{}, {}, {}, {}, {}, {}];
  return (
    <div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
      <SearchBar />
      <section className="w-full">
        <ImageSlider />
        <GridBook books={books} />
      </section>
    </div>
  );
}
