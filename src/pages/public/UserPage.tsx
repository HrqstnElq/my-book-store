import {ChangePasswordAPI, UpdateAccount} from "api/userApi";
import ChangePassword from "components/ChangePassword";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";

const classNames = require("classnames");
export default function UserPage() {
	const loadingRef = useRef<any>(null);
	const {register, errors, handleSubmit} = useForm();
	const [isEdit, setEdit] = useState(false);
	const [image, setImage] = useState<any>("https://i.pinimg.com/564x/ef/1b/d3/ef1bd3461661721596af7f859c6e1340.jpg");
	const user = useSelector((state: any) => state.user);
	const [changePasswordForm, setChangePasswordForm] = useState<any>();

	const reader = new FileReader();
	reader.onload = () => {
		setImage(reader.result);
	};

	const imageSelectHandler = (event: any) => {
		if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
	};

	const onSaveHandler = (data: any) => {
		loadingRef?.current?.staticStart();
		UpdateAccount(user.current.token, data).then((res: any) => {
			if (res.data.screen) {
				setEdit(false);
				loadingRef?.current?.complete();
			}
		});
	};

	document.querySelector("#form")?.addEventListener("reset", function () {
		setEdit(false);
	});

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			{changePasswordForm}
			<form id="form" onSubmit={handleSubmit(onSaveHandler)}>
				<div className="flex flex-col items-center space-y-2">
					<label
						className={classNames("relative border-4 rounded-full shadow-sm", {"cursor-pointer": isEdit})}
						style={{height: "160px", width: "160px"}}>
						<img
							className="rounded-full object-top pointer-events-none"
							src={image}
							alt=""
							style={{height: "150px", width: "150px", objectFit: "cover"}}
						/>
						{isEdit && (
							<>
								<input className="hidden" type="file" accept="image/*" name="bookImage" onChange={imageSelectHandler} />
								<div
									className="bg-black bg-opacity-30 absolute rounded-full top-0 flex justify-center items-center pointer-events-none"
									style={{height: "150px", width: "150px"}}>
									<i className="fas fa-camera text-white text-2xl"></i>
								</div>{" "}
							</>
						)}
					</label>
					<div
						className="cursor-pointer"
						onClick={() => {
							setEdit(!isEdit);
							isEdit && handleSubmit(onSaveHandler);
						}}>
						{(isEdit && <i className="fas fa-save block text-green-600 hover:text-green-700 text-xl"></i>) || (
								<i className="fas fa-user-edit block text-yellow-600 hover:text-yellow-700 text-xl"></i>
							) || <i className="fas fa-save block text-green-600 hover:text-green-700 text-xl"></i>}
					</div>
				</div>
				<div className="mt-4 flex space-y-4 items-center flex-col">
					<div className="space-x-2 flex justify-between w-80">
						<label className="font-medium" htmlFor="username">
							Tền đăng nhập :
						</label>
						<input
							className="bg-gray-100 px-2 py-1 rounded-sm w-48"
							type="text"
							name="username"
							defaultValue={user.current.username}
							readOnly
						/>
					</div>

					<div className="form-group">
						<div className="space-x-2 flex justify-between w-80">
							<label className="font-medium" htmlFor="w-48">
								Họ và tên :
							</label>
							<input
								ref={register({
									required: {value: true, message: "Vui lòng nhập tên"},
									pattern: {value: /^[A-Za-z]+$/i, message: "Tên không được chứa số và kí tự đặc biệt"},
									minLength: {value: 6, message: "Tên phải dài hơn 6 kí tự"},
									maxLength: {value: 100, message: "Tên quá dài"},
								})}
								className="bg-gray-100 px-2 py-1 rounded-sm w-48"
								type="text"
								name="fullName"
								defaultValue={user.current.fullName}
								readOnly={!isEdit}
							/>
						</div>
						<span className="text-red-400 text-sm float-right">{errors.fullName?.message}</span>
					</div>

					<div className="form-group">
						<div className="space-x-2 flex justify-between w-80">
							<label className="font-medium" htmlFor="isMale">
								Giới tính :
							</label>
							<select
								className="bg-gray-100 outline-none px-2 py-1 rounded-sm w-48"
								name="isMale"
								defaultValue={user.current.isMale}
								disabled={!isEdit}>
								<option value="true">Nam</option>
								<option value="false">Nữ</option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<div className="space-x-2 flex justify-between w-80">
							<label className="font-medium" htmlFor="email">
								Email :
							</label>
							<input
								ref={register({
									required: {value: true, message: "Vui lòng nhập email"},
									pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email không hợp lệ"},
								})}
								className="bg-gray-100 px-2 py-1 rounded-sm w-48"
								type="text"
								name="email"
								defaultValue={user.current.email}
								readOnly={!isEdit}
							/>
						</div>
						<span className="text-red-400 text-sm float-right">{errors.email?.message}</span>
					</div>

					<div className="form-group">
						<div className="space-x-2 flex justify-between w-80">
							<label className="font-medium" htmlFor="address">
								Địa chỉ :
							</label>
							<textarea
								ref={register({
									required: {value: true, message: "Vui lòng nhập địa chỉ"},
								})}
								className="bg-gray-100 px-2 py-1 rounded-sm w-48 outline-none"
								name="address"
								defaultValue={user.current.address}
								readOnly={!isEdit}
							/>
						</div>
						<span className="text-red-400 text-sm float-right">{errors.address?.message}</span>
					</div>

					<div className="form-group">
						<div className="space-x-2 flex justify-between w-80">
							<label className="font-medium" htmlFor="phoneNumber">
								Số điện thoại :
							</label>
							<input
								ref={register({
									required: {value: true, message: "Vui lòng nhập email"},
									pattern: {value: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, message: "Số điện thoại không hợp lệ"},
								})}
								className="bg-gray-100 px-2 py-1 rounded-sm w-48"
								type="number"
								name="phoneNumber"
								defaultValue={user.current.phonenumber}
								readOnly={!isEdit}
							/>
						</div>
						<span className="text-red-400 text-sm float-right">{errors.phoneNumber?.message}</span>
					</div>

					{(isEdit && (
						<div className="space-x-4">
							<button
								className="mt-4 py-1 px-4 rounded-sm font-medium text-white hover:bg-yellow-400 hover:shadow-md bg-yellow-300"
								type="reset">
								Hủy
							</button>
							<button
								className="mt-4 py-1 px-4 rounded-sm font-medium text-white hover:bg-green-600 hover:shadow-md bg-green-500"
								type="submit">
								Lưu thông tin
							</button>
						</div>
					)) || (
						<span
							onClick={() => setChangePasswordForm(<ChangePassword setForm={setChangePasswordForm} />)}
							className="mt-4 py-1 px-4 rounded-sm select-none cursor-pointer font-medium hover:bg-gray-200 hover:shadow-md bg-gray-300">
							Đổi mật khẩu
						</span>
					)}
				</div>
			</form>
		</div>
	);
}
