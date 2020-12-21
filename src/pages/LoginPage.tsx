import LoginForm from "components/LoginForm";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
	const [form, setForm] = useState("LOGIN");
	const changeFormHandler = () => {
		if (form === "LOGIN") setForm("REGISTER");
		else if (form === "REGISTER") setForm("LOGIN");
	};

	return (
		<div>
			<div className="container flex-row flex">
				<section className="left relative w-2/5 p-20 min-h-screen hidden lg:block">
					<button onClick={() => (window.location.href = "/")} className="logo text-3xl font-bold hover:text-pink-500">
						Home
					</button>
					<h1>Nhà sách An Nguyên</h1>
					<div className="left--image"></div>
				</section>

				<section className="right flex justify-center items-center w-screen lg:w-3/5 h-screen">
					<div className="fixed right-2 top-1 flex lg:block justify-around w-11/12 lg:w-auto">
						<div className="logo text-3xl font-bold lg:hidden hover:text-pink-500">
							<Link to="/public">Music</Link>
						</div>
						<h3 className="mt-2 lg:mt-0 select-none">
							<span onClick={changeFormHandler} className="hover:underline text-blue-300 ml-2 cursor-pointer">
								{(form === "LOGIN" && "Đăng kí tài khoản") || "Đăng nhập "}
							</span>
						</h3>
					</div>
					<div className="login w-80">
						<div className="form--header mb-5">
							<h2 className="text-2xl font-semibold mb-5">Đăng nhập</h2>
							<button className="inline-block w-12 h-12 bg-red-500 hover:bg-red-600 focus:outline-none text-white font-medium rounded-xl mb-10  mr-2">
								<i className="fab fa-google"></i>
							</button>
							<button className="inline-block w-12 h-12 bg-blue-600  hover:bg-blue-700 focus:outline-none text-white font-medium rounded-xl mb-10 mr-2">
								<i className="fab fa-facebook-f"></i>
							</button>
							<button className="inline-block w-12 h-12 bg-blue-400 hover:bg-blue-500 focus:outline-none text-white font-medium rounded-xl mb-10">
								<i className="fab fa-twitter"></i>
							</button>
							<hr className="divider" />
						</div>
						{form === "LOGIN" && <LoginForm />}
					</div>
				</section>
			</div>
		</div>
	);
}
