import React from "react";
import {Link, NavLink} from "react-router-dom";
import "./LeftBar.css";

export default function LeftBar() {
	return (
		<div className="left-bar flex-none h-screen w-44 hidden md:block pt-4 sticky top-0">
			<div className="navigation flex flex-col justify-between ml-5 font-bold space-y-5">
				<div className="ml-3">
					<Link to="/">
						<img className="block m-auto select-none" src="/images/logo.png" alt="" style={{width: "150px", objectFit: "contain"}} />
					</Link>
				</div>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/book-store/home">
					<i className="fas fa-home-alt mr-2"></i>
					Trang chủ
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/book-store/highlight">
					<i className="fas fa-fire mr-4"></i>
					Nổi bật
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/book-store/category">
					<i className="fas fa-list-alt mr-3"></i>Danh mục
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/book-store/search">
					<i className="fas fa-search mr-3"></i>Khám phá
				</NavLink>
			</div>
		</div>
	);
}
