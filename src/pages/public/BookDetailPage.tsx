import SearchBar from "components/public/SearchBar";
import Rating from "components/Rating";
import React from "react";
const VND = (price: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);


export default function BookDetailPage() {
  return (
    <div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
      <SearchBar />
      <div className="my-5 space-x-4 flex">
        <img
          className="w-1/3 block bg-gray-700 rounded-lg"
          src="https://i.pinimg.com/564x/ec/b5/f7/ecb5f7483c7bee6b64c32e7786d80b3e.jpg"
          alt=""
        />
        <div className="flex justify-between flex-col">
          <div className="space-y-2">
            <div className="space-x-4">
              <span className="font-bold text-3xl">Animals beautiful</span>
              <span className="text-gray-400 text-sm uppercase">Eren Yeager</span>
            </div>
            <Rating star={5} count={410} color="red" />
            <div className="space-x-2">
              <span className="font-bold">Số lượng còn lại:</span>
              <span>100</span>
            </div>
            <div className="space-x-2">
              <span className="font-bold">Danh mục:</span>
              <span>Văn học</span>
            </div>
            <div className="space-x-2">
              <span className="font-bold">Giá:</span>
              <span className="text-red-700 text-xl font-semibold flex-1">{VND(10000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
