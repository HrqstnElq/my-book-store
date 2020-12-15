import {NavLink} from "react-router-dom";
import "./LeftBar.css";

export default function LeftBar() {
	return (
		<div className="left-bar flex-none h-screen w-44 hidden md:block mt-4 sticky top-4">
			<div className="navigation flex flex-col justify-between h-64 ml-5 font-bold">
				<h1 className="font-bold text-4xl ml-3">LOGO</h1>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/public/home">
					<i className="fas fa-home-alt mr-2"></i>
					Trang chủ
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/public/highlight">
					<i className="fas fa-fire mr-4"></i>
					Nổi bật
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/public/category">
					<i className="fas fa-list-alt mr-3"></i>Danh mục
				</NavLink>
				<NavLink className="hover:bg-blue-100 hover:text-blue-400 px-4 py-2 rounded-xl" to="/public/search">
					<i className="fas fa-search mr-3"></i>Khám phá
				</NavLink>
			</div>
		</div>
	);
}
