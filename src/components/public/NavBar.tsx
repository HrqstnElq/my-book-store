import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import "./NavBar.css";
const classNames = require("classnames");

export default function NavBar() {
	const [active, setActive] = useState(false);

	const user = useSelector((state: any) => state.user);

	return (
		<>
			<div className="md:hidden">
				<img className="block m-auto mt-2" style={{height: "30px"}} src="/images/logo.png" alt="" />
			</div>
			<nav className="bg-white px-8 pt-2 shadow-sm sticky -top-1 z-50 md:hidden">
				<div className="-mb-px flex justify-between">
					<div className="flex">
						<NavLink
							to="/public/home"
							className="no-underline text-teal-dark border-b-2 uppercase border-transparent tracking-wide font-bold text-xs py-3 mr-8">
							Trang chủ
						</NavLink>
						<NavLink
							to="/public/highlight"
							className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8">
							Nổi bật
						</NavLink>
						<NavLink
							to="/public/category"
							className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8">
							Danh mục
						</NavLink>
					</div>

					<div className="ml-3 relative">
						<div>
							{(user.current.id && (
								<img
									onClick={() => setActive(!active)}
									className="h-10 w-10 rounded-full object-cover cursor-pointer select-none"
									src={user.current.avatar}
									alt=""
								/>
							)) || (
								<button onClick={() => setActive(!active)} className="h-10 w-5">
									<i className="far fa-user"></i>
								</button>
							)}
						</div>
						<div
							className={classNames(
								"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10",
								{hidden: !active}
							)}
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu">
							<Link to="/public/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
								Giỏ hàng
							</Link>
							{(user.current.token && (
								<>
									<Link to="/public/order" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
										Đơn hàng
									</Link>
									<Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
										Hồ sơ
									</Link>
									<Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
										Đăng xuất
									</Link>
								</>
							)) || (
								<>
									<button
										onClick={() => (window.location.href = "/login")}
										className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem">
										Đăng nhập
									</button>
									<button
										onClick={() => (window.location.href = "/login?register")}
										className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem">
										Đăng kí
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
