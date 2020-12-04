import {NavLink} from "react-router-dom";

export default function LeftBar() {
	return (
		<div className="left-bar bg-red-400 flex-none h-screen w-40 hidden md:block">
			<div className="navigation flex flex-col justify-between h-64 m-auto">
				<h1 className="font-bold text-3xl">LOGO</h1>
				<NavLink to="home">Trang chủ</NavLink>
				<NavLink to="highlight">Nổi bật</NavLink>
				<NavLink to="home">Trang chủ</NavLink>
				<NavLink to="home">Trang chủ</NavLink>
			</div>
		</div>
	);
}
