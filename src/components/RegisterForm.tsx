import {Register} from "api/userApi";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import LoadingBar from "react-top-loading-bar";

export default function RegisterForm() {
	const {register, errors, handleSubmit} = useForm();
	const [err, setErr] = useState("");

	const loadingRef = useRef<any>(null);

	const onSubmit = (data: any) => {
		if (data.password !== data.confirmPassword) {
			setErr("Mật khẩu không khớp nhau");
		} else {
			setErr("");

			loadingRef.current.staticStart();
			Register(data).then((res: any) => {
				if (res.data.success) {
					window.location.href = "/login";
				} else {
					setErr(res.data.message);
				}
				loadingRef.current.complete();
			});
		}
	};
	return (
		<form className="login--form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div className="form--content">
				<div className="flex justify-between">
					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Tên đăng nhập
						</label>
						<input
							ref={register}
							required
							type="text"
							name="username"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>

					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Họ và tên
						</label>
						<input
							ref={register({
								required: {value: true, message: "Vui lòng nhập tên"},
								pattern: {value: /^[A-Za-z]+$/i, message: "Tên không được chứa số và kí tự đặc biệt"},
								minLength: {value: 6, message: "Tên phải dài hơn 6 kí tự"},
								maxLength: {value: 100, message: "Tên quá dài"},
							})}
							required
							type="text"
							name="fullName"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Ngày sinh
						</label>
						<input
							ref={register}
							required
							type="date"
							name="dob"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>

					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Giới tính
						</label>
						<div className=" flex items-center space-x-4 mt-1">
							<div className="flex items-center space-x-4">
								<label htmlFor="username" className="block font-bold">
									Nam
								</label>
								<input ref={register} required type="radio" name="isMale" value="true" />
							</div>
							<div className="flex items-center space-x-4">
								<label htmlFor="username" className="block font-bold">
									Nữ
								</label>
								<input ref={register} required type="radio" name="isMale" value="false" />
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Email
						</label>
						<input
							ref={register}
							required
							type="email"
							name="email"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>

					<div className="form-group my-2">
						<label htmlFor="username" className="block font-bold">
							Số điện thoại
						</label>
						<input
							ref={register({pattern: {value: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, message: "Số điện thoại không hợp lệ"}})}
							required
							type="tel"
							name="phoneNumber"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="form-group my-2">
					<label htmlFor="username" className="block font-bold">
						Địa chỉ
					</label>
					<input
						ref={register}
						required
						type="text"
						name="address"
						className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
					/>
				</div>

				<div className="flex justify-between">
					<div className="form-group my-2">
						<label htmlFor="password" className="font-bold">
							Mật khẩu
						</label>
						<input
							minLength={6}
							ref={register}
							required
							type="password"
							name="password"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>

					<div className="form-group my-2 space-y-1">
						<label htmlFor="password" className="font-bold">
							Nhập lại mật khẩu
						</label>
						<input
							minLength={6}
							ref={register}
							required
							type="password"
							name="confirmPassword"
							className="mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div className="h-10">
					<span className=" text-red-600 text-sm">{err} </span>
					<span className=" text-red-600 text-sm">{errors.phoneNumber?.message} </span>
					<span className=" text-red-600 text-sm">{errors.fullName?.message} </span>
				</div>
			</div>
			<button className="w-full mt-3 px-10 py-3 bg-pink-500 hover:bg-pink-600 focus:outline-none text-white font-medium rounded-xl mb-10">
				Đăng Kí
			</button>
		</form>
	);
}
