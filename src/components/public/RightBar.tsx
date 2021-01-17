import {syncCart} from "api/cartApi";
import {getTopBooks} from "api/productApi";
import {Decrypt} from "common/function";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import BookRightBar from "./BookRightBar";
const classNames = require("classnames");

export default function RightBar() {
	const [active, setActive] = useState(false);
	const [books, setBooks] = useState([]);
	const user = useSelector((state: any) => state.user);

	const cart = useSelector((state: any) => state.cart);

	useEffect(() => {
		getTopBooks("week", 1, 3).then((res) => {
			if (res.data.success) setBooks(res.data.payload.books);
		});
	}, []);

	const ClickHandler = () => {
		const carts = JSON.parse(Decrypt(localStorage.getItem("cart") || "") || "[]");
		syncCart(user?.current?.token, true, carts);
	};

	return (
		<div className="right-bar pr-4 pt-4 sticky hidden xl:block top-0 w-80 h-screen">
			<div className="right-bar--user mb-4 float-right flex flex-row space-x-4">
				<Link to="/book-store/cart" className="cart text-2xl relative">
					<i className="fal fa-shopping-cart font-medium text-gray-600"></i>
					<div className="absolute top-0 -right-2 bg-indigo-500 w-4 h-4 rounded-full flex">
						<p className="text-xs m-auto text-white font-medium">{cart.length}</p>
					</div>
				</Link>

				{(user.current.id && (
					<>
						<button onClick={ClickHandler} className="alert text-2xl relative">
							<i className="fal fa-bell font-medium text-gray-600"></i>
							<div className="absolute top-0 -right-2 bg-indigo-500 w-4 h-4 rounded-full flex">
								<p className="text-xs m-auto text-white font-medium">4</p>
							</div>
						</button>
						<div className="ml-3 relative">
							<div>
								<img
									onClick={() => setActive(!active)}
									className="h-9 w-9 rounded-full object-cover cursor-pointer"
									src={user.current.avatar}
									alt=""
									title={user.current.fullName}
								/>
							</div>
							<div
								className={classNames(
									"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10",
									{hidden: !active}
								)}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu">
								<Link
									to="/book-store/order"
									onClick={() => setActive(false)}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem">
									Đơn hàng
								</Link>
								<Link
									to="/book-store/account"
									onClick={() => setActive(false)}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem">
									Hồ sơ
								</Link>
								<Link
									to="/logout"
									onClick={() => setActive(false)}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem">
									Đăng xuất
								</Link>
							</div>
						</div>
					</>
				)) || (
					<div className="space-x-2 pl-5">
						<button
							onClick={() => (window.location.href = "/login")}
							className="px-3 py-2 bg-gray-700 hover:bg-gray-800 rounded-md text-white">
							Đăng nhập
						</button>
						<button
							onClick={() => (window.location.href = "/login?register")}
							className="px-3 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white">
							Đăng kí
						</button>
					</div>
				)}
			</div>
			<div className="clear-right"></div>
			<div className="right-bar--title">
				<h3 className="text-lg font-bold ">Sách nổi bật trong tuần</h3>
				<div className="h-1 w-full bg-indigo-900 rounded-full"></div>
			</div>
			<div className="right-bar--books">
				{books.map((book, index) => (
					<BookRightBar book={book} key={index} />
				))}
			</div>
		</div>
	);
}
