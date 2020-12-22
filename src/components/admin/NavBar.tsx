import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, NavLink, useRouteMatch} from "react-router-dom";
import "./NavBar.css";
const classNames = require("classnames");

export default function NavBar() {
	const userState = useSelector((state: any) => state.user);

	//show hidden  sub menu profile
	const [profile, setProfile] = useState(false);

	const match = useRouteMatch();
	const [active, setActive] = useState(false);

	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-expanded="false"
							onClick={() => setActive(!active)}>
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>

							<svg
								className="hidden h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex-shrink-0 flex items-center">
							<img
								className="block lg:hidden h-8 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
								alt="Workflow"
							/>
							<img
								className="hidden lg:block h-8 w-auto"
								src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
								alt="Workflow"
							/>
						</div>
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								<NavLink to={`${match.url}/home`} className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">
									Dashboard
								</NavLink>
								<NavLink to={`${match.url}/order`} className=" text-white px-3 py-2 rounded-md text-sm font-medium">
									Đơn hàng
								</NavLink>
								<NavLink to={`${match.url}/product`} className="text-white px-3 py-2 rounded-md text-sm font-medium">
									Sản phẩm
								</NavLink>

								{userState.current.role === "admin" && (
									<>
										<NavLink to={`${match.url}/customer`} className="text-white px-3 py-2 rounded-md text-sm font-medium">
											Khách hàng
										</NavLink>
										<NavLink to={`${match.url}/sales`} className="text-white px-3 py-2 rounded-md text-sm font-medium">
											Nhân viên
										</NavLink>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<span className="sr-only">View notifications</span>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>

						<div className="ml-3 relative">
							<div>
								<button
									onClick={() => setProfile(!profile)}
									className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
									id="user-menu"
									aria-haspopup="true">
									<img className="h-8 w-8 rounded-full" src={userState.current.avatar} alt="" />
								</button>
							</div>
							<div
								className={classNames(
									"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10",
									{hidden: !profile}
								)}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu">
								<Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
									Hồ sơ
								</Link>
								<Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
									Cài đặt
								</Link>
								<Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
									Đăng xuất
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={classNames("sm:hidden", {hidden: !active})}>
				<div className="px-2 pt-2 pb-3 space-y-1">
					<NavLink to={`${match.url}/home`} className="text-white block px-3 py-2 rounded-md text-base font-medium">
						Dashboard
					</NavLink>
					<NavLink
						to={`${match.url}/order`}
						className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
						Đơn hàng
					</NavLink>
					<NavLink
						to={`${match.url}/product`}
						className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
						Sản phẩm
					</NavLink>

					{userState.current.role === "admin" && (
						<>
							<NavLink
								to={`${match.url}/customer`}
								className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
								Khách hàng
							</NavLink>
							<NavLink
								to={`${match.url}/sales`}
								className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
								Nhân viên
							</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
