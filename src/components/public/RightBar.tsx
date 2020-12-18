import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookRightBar from "./BookRightBar";
const classNames = require("classnames");

export default function RightBar() {
  const [active, setActive] = useState(false);
  const books = [{}, {}, {}];

  return (
    <div className="right-bar pr-4 pt-4 sticky hidden xl:block top-0 w-80 h-screen">
      <div className="right-bar--user mb-4 float-right flex flex-row space-x-4">
        <div className="cart text-2xl relative">
          <i className="fal fa-shopping-cart font-medium text-gray-600"></i>
          <div className="absolute top-0 -right-2 bg-blue-500 w-4 h-4 rounded-full flex">
            <p className="text-xs m-auto text-white font-medium">4</p>
          </div>
        </div>
        <div className="alert text-2xl relative">
          <i className="fal fa-bell font-medium text-gray-600"></i>
          <div className="absolute top-0 -right-2 bg-blue-500 w-4 h-4 rounded-full flex">
            <p className="text-xs m-auto text-white font-medium">4</p>
          </div>
        </div>
        <div className="ml-3 relative">
          <div>
            <img
              onClick={() => setActive(!active)}
              className="h-9 w-9 rounded-full object-cover cursor-pointer"
              src="https://i.pinimg.com/originals/bb/59/c9/bb59c90c3062e5cced0be5bcdb3f8d6c.jpg"
              alt=""
            />
          </div>
          <div
            className={classNames(
              "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10",
              { hidden: !active }
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Hồ sơ
            </Link>
            <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
      <div className="clear-right"></div>
      <div className="right-bar--title">
        <h3 className="text-lg font-bold ">Sách nổi bật trong tuần</h3>
        <div className="h-1 w-full bg-blue-600 rounded-full"></div>
      </div>
      <div className="right-bar--books">
        {books.map((book, index) => (
          <BookRightBar key={index} />
        ))}
      </div>
    </div>
  );
}
