import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import React from "react";

export default function SearchPage() {
  const books = [{}, {}, {}, {}, {}, {}];
  return (
    <div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
      <SearchBar />

      <GridBook books={books} />
    </div>
  );
}
