import BannerSlide from "components/public/BannerSlide";
import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import React from "react";

export default function HighLightPage() {
  const books = [{}, {}, {}, {}, {}, {}];

  return (
    <div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
      <SearchBar />
      <BannerSlide />
      <section className="w-full">
        <h3 className="text-indigo-900 text-2xl font-bold my-2">Danh mục</h3>
        <ul className="category w-full flex justify-between font-bold">
          <li>
            <button>Bán chạy theo tuần</button>
          </li>
          <li>
            <button>Bán chạy theo tháng</button>
          </li>
          <li>
            <button>Bán chạy của năm</button>
          </li>
          <li>Xem thêm ...</li>
        </ul>
        <GridBook books={books} />
      </section>
    </div>
  );
}
