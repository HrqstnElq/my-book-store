import {DeleteAccount, ResetPassword, RestoreAccount} from "api/userApi";
import {AxiosResponse} from "axios";
import {useRef} from "react";
import {useSelector} from "react-redux";

export default function AccountDetail(props: {account: any; setDetail: Function}) {
	const {account, setDetail} = props;
	const user = useSelector((state: any) => state.user);
	const passwordRef = useRef<HTMLInputElement>(null);

	const accountDeleteHandler = (accountId: string) => {
		var result = window.confirm("Are you sure you want to delete this account ?");
		if (result) {
			DeleteAccount(user.current.token, accountId).then((res: AxiosResponse) => {
				if (res.data.success) {
					alert("Xóa thành công !");
				} else {
					alert("Thất bại !");
				}
			});
		}
	};

	const accountRestoreHandler = (accountId: string) => {
		var result = window.confirm("Are you sure you want to restore this account ?");
		if (result) {
			RestoreAccount(user.current.token, accountId).then((res: AxiosResponse) => {
				if (res.data.success) {
					alert("Khôi phục thành công !");
				} else {
					alert("Thất bại !");
				}
			});
		}
	};

	const resetPassword = () => {
		if (passwordRef.current?.value) {
			ResetPassword(user.current.token, account.id, passwordRef.current.value).then((res: AxiosResponse) => {
				alert(res.data.message);
			});
		}
	};

	return (
		<section className="py-40 fixed top-0 left-0 bg-black bg-opacity-50 h-screen w-screen flex justify-center items-center z-20">
			<div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
				<div className="bg-gray-100 p-4 border-t-2 border-indigo-400 rounded-t flex justify-between">
					<div className="max-w-sm mx-auto md:w-full md:mx-0">
						<div className="inline-flex items-center space-x-4">
							<img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src={account.avatar} />

							<h1 className="text-gray-600">{account.fullName}</h1>
						</div>
					</div>
					<i onClick={() => setDetail(null)} className="fas fa-times cursor-pointer"></i>
				</div>
				<div className="bg-white space-y-2">
					<div className="md:inline-flex space-y-2 md:space-y-0 w-full p-4 text-gray-500 items-center">
						<h2 className="md:w-1/3 max-w-sm mx-auto">Tài khoản</h2>
						<div className="md:w-2/3 max-w-sm mx-auto">
							<div>
								<div>
									<label className="text-sm text-gray-400">Username</label>
									<div className="w-full inline-flex border">
										<div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
											<svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
										<input
											type="email"
											defaultValue={account.username}
											className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
											readOnly
										/>
									</div>
								</div>

								<div>
									<label className="text-sm text-gray-400">Email</label>
									<div className="w-full inline-flex border">
										<div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
											<svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<input
											type="email"
											defaultValue={account.email}
											className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
											readOnly
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<hr />
					<div className="md:inline-flex  space-y-2 md:space-y-0  w-full p-4 text-gray-500 items-center">
						<h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
						<div className="md:w-2/3 mx-auto max-w-sm space-y-2">
							<div>
								<label className="text-sm text-gray-400">Address</label>
								<div className="w-full inline-flex border">
									<div className="w-1/12 pt-2 bg-gray-100">
										<svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
									<input
										type="text"
										defaultValue={account.address}
										className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
									/>
								</div>
							</div>
							<div>
								<label className="text-sm text-gray-400">Phone number</label>
								<div className="w-full inline-flex border">
									<div className="pt-2 w-1/12 bg-gray-100">
										<svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<input
										type="text"
										defaultValue={account.phonenumber}
										className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
										readOnly
									/>
								</div>
							</div>
						</div>
					</div>

					<hr />
					<div className="md:inline-flex w-full space-y-2 md:space-y-0 p-8 text-gray-500 items-center">
						<h2 className="md:w-4/12 max-w-sm mx-auto">Change password</h2>

						<div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-2 md:inline-flex pl-2">
							<div className="w-full inline-flex border-b">
								<div className="w-1/12 pt-2">
									<svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									ref={passwordRef}
									type="password"
									className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
									placeholder="New"
								/>
							</div>
						</div>

						<div className="md:w-3/12 text-center md:pl-6">
							<button
								onClick={resetPassword}
								className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
								<svg fill="none" className="w-4 text-white mr-2" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								Update
							</button>
						</div>
					</div>

					<hr />
					<div className="w-full p-4 text-right text-gray-500">
						{(account.isDelete && (
							<button onClick={() => accountRestoreHandler(account.id)} className="inline-flex items-center focus:outline-none mr-4">
								<svg fill="none" className="w-4 mr-2" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								Restore account
							</button>
						)) || (
							<button onClick={() => accountDeleteHandler(account.id)} className="inline-flex items-center focus:outline-none mr-4">
								<svg fill="none" className="w-4 mr-2" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
								Delete account
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
