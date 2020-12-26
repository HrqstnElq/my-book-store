import {ChangePasswordAPI} from "api/userApi";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import lockImage from "../assets/images/padlock.png";

export default function ChangePassword(props: {setForm: Function}) {
	const {setForm} = props;
	const {register, errors, handleSubmit, watch} = useForm();
	const newPassword = useRef();
	newPassword.current = watch("newPassword", "");
	const [err, setErr] = useState("");

	const user = useSelector((state: any) => state.user);

	const onSubmit = (data: any) => {
		alert(JSON.stringify(data));
		ChangePasswordAPI(user.current.token, data).then((res: any) => {
			if (res.data.success) {
				setForm(null);
			} else {
				setErr("Mật khẩu cũ không chính xác");
			}
		});
	};

	return (
		<div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center">
			<div className="w-1/3 h-4/5 bg-white relative p-4 flex items-center justify-center flex-col space-y-3">
				<div onClick={() => setForm(null)} id="exit" className="absolute top-1 left-2 cursor-pointer">
					<i className="fas fa-times block text-2xl text-gray-800"></i>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="w-4/5 flex flex-col justify-center items-center">
					<div className="w-full flex flex-col">
						<div className="flex justify-between">
							<label className="font-medium" htmlFor="oldPassword">
								Mật khẩu hiện tại
							</label>
							<Link to="#" className="text-sm text-blue-400">
								Quên mật khẩu
							</Link>
						</div>
						<input
							ref={register({required: {value: true, message: "Vui lòng nhập mật khẩu hiện tại"}})}
							className="border p-1 rounded-md focus:border-blue-300"
							type="password"
							name="oldPassword"
						/>
						{(err && <span className="h-6 text-sm text-red-400">{err}</span>) || (
							<span className="h-6 text-sm text-red-400">{errors.oldPassword?.message}</span>
						)}
					</div>
					<div className="w-full flex flex-col">
						<label className="font-medium" htmlFor="newPassword">
							Mật khẩu mới
						</label>
						<input
							ref={register({
								required: {value: true, message: "Vui lòng nhập mật khẩu mới"},
								minLength: {value: 6, message: "Mật khẩu phải dài hơn 5 kí tự"},
							})}
							className="border p-1 rounded-md focus:border-blue-300"
							type="password"
							name="newPassword"
						/>
						<span className="h-6 text-sm text-red-400">{errors.newPassword?.message}</span>
					</div>
					<div className="w-full flex flex-col">
						<label className="font-medium" htmlFor="confirmPassword">
							Nhập lại mật khẩu mới
						</label>
						<input
							ref={register({
								required: {value: true, message: "Vui lòng nhập mật lại khẩu mới"},
								validate: (value) => value === newPassword?.current || "Mật khẩu không khớp",
							})}
							className="border p-1 rounded-md focus:border-blue-300"
							type="password"
							name="confirmPassword"
						/>
						<span className="h-6 text-sm text-red-400">{errors.confirmPassword?.message}</span>
					</div>
					<div>
						<img style={{width: "150px"}} src={lockImage} alt="" />
					</div>
					<button className="mt-5 border transition-colors border-green-400 text-green-400 hover:text-white hover:bg-green-400 px-4 py-1 rounded-md">
						Lưu thay đổi
					</button>
				</form>
			</div>
		</div>
	);
}
