import {unwrapResult} from "@reduxjs/toolkit";
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {Login} from "store/userSlice";

export default function LoginForm() {
	const userState = useSelector((state: any) => state.user);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	if (userState.current.role === "admin" || userState.current.role === "sales") {
		return <Redirect to="/admin"></Redirect>;
	}
	if (userState.current.role === "user") {
		return <Redirect to="public"></Redirect>;
	}

	const onSubmitHandler = async (event: any) => {
		event.preventDefault();
		if (passwordRef.current && usernameRef.current) {
			dispatch(
				Login({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
				})
			);
		}
	};

	return (
		<form className="login--form" autoComplete="off" onSubmit={onSubmitHandler}>
			<div className="form--content">
				<div className="form-group my-5">
					<label htmlFor="username" className="block font-bold">
						Tên đăng nhập
					</label>
					<input
						ref={usernameRef}
						required
						type="text"
						id="username"
						name="username"
						className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
					/>
				</div>
				<div className="form-group my-5">
					<div className="flex justify-between">
						<label htmlFor="password" className="font-bold">
							Mật khẩu
						</label>
						<div className="text-blue-400">
							<Link to="#">Quên mật khẩu</Link>
						</div>
					</div>
					<input
						ref={passwordRef}
						required
						type="password"
						id="password"
						name="password"
						className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<button className="w-full mt-3 px-10 py-3 bg-pink-500 hover:bg-pink-600 focus:outline-none text-white font-medium rounded-xl mb-10">
				Đăng nhập
			</button>
		</form>
	);
}
