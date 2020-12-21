import {unwrapResult} from "@reduxjs/toolkit";
import {Cart, getCart, syncCart} from "api/cartApi";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {Login} from "store/userSlice";

export default function LoginForm() {
	const userState = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const [err, setErr] = useState<String>("");

	if (userState.current.role === "admin" || userState.current.role === "sales") {
		window.location.href = "/admin";
		// return <Redirect to="/admin"></Redirect>;
	}
	if (userState.current.role === "user") {
		var cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
		if (cart.length > 0) {
			var listCart: Cart[] = [];
			cart.forEach((book: any) => {
				listCart.push({bookId: book.bookId, quantity: book.quantity});
			});

			syncCart(userState.current.token, false, listCart).then((res: any) => {
				if (res.data.success) {
					const result = res.data.payload;
					console.log(result);
					window.localStorage.setItem("cart", JSON.stringify(result));
				}
				window.location.href = "/";
			});
		} else {
			getCart(userState.current.token).then((res: any) => {
				if (res.data.success) {
					const result = res.data.payload;
					console.log(result);
					window.localStorage.setItem("cart", JSON.stringify(result));
				}
				window.location.href = "/";
			});
		}
		// return <Redirect to="public"></Redirect>;
	}

	const onSubmitHandler = async (event: any) => {
		event.preventDefault();
		if (passwordRef.current && usernameRef.current) {
			loadingRef.current.staticStart();
			const actionResult = await dispatch(
				Login({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
				})
			);
			try {
				const result = unwrapResult(actionResult as any);
				console.log(result);
			} catch (err) {
				console.log(err.error);
				setErr(err.error);
				if (loadingRef.current) loadingRef.current.complete();
			}
		}
	};

	return (
		<form className="login--form" autoComplete="off" onSubmit={onSubmitHandler}>
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
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
							<Link tabIndex={-1} to="#">
								Quên mật khẩu
							</Link>
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
				<span className=" text-red-600">{err}</span>
			</div>
			<button className="w-full mt-3 px-10 py-3 bg-pink-500 hover:bg-pink-600 focus:outline-none text-white font-medium rounded-xl mb-10">
				Đăng nhập
			</button>
		</form>
	);
}
