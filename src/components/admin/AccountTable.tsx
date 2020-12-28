import {DeleteAccount, RestoreAccount} from "api/userApi";
import {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AccountDetail from "./AccountDetail";
import "./AccountTable.css";

export default function AccountTable(props: {accounts: any[]; reload: Function}) {
	const {accounts, reload} = props;
	const [detail, setDetail] = useState<any>(null);
	const [selectedAccount, setSelectedAccount] = useState<any>(null);
	const user = useSelector((state: any) => state.user);

	const accountDeleteHandler = (accountId: string) => {
		var result = window.confirm("Are you sure you want to delete this account ?");
		if (result) {
			DeleteAccount(user.current.token, accountId).then((res: AxiosResponse) => {
				if (res.data.success) {
					alert("Xóa thành công !");
					reload(accountId + "delete");
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
					reload(accountId + "restore");
				} else {
					alert("Thất bại !");
				}
			});
		}
	};

	useEffect(() => {
		if (selectedAccount) {
			setDetail(<AccountDetail account={selectedAccount} setDetail={setDetail} />);
		}
	}, [selectedAccount]);

	useEffect(() => {
		if (detail === null) setSelectedAccount(null);
	}, [detail]);

	return (
		<>
			{detail}
			<table className="min-w-full leading-normal mt-4">
				<thead>
					<tr>
						<th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Tài khoản
						</th>
						<th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Số điện thoại
						</th>
						<th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Email
						</th>
						<th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Trạng thái
						</th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account, index) => (
						<tr key={index}>
							<td className="px-4 py-2 border-b border-gray-200 bg-white text-sm">
								<div className="flex items-center">
									<div className="flex-shrink-0 w-10 h-10">
										<img className="w-full h-full rounded-full" src={account.avatar} alt="" />
									</div>
									<div className="ml-3">
										<p className="text-gray-900 whitespace-no-wrap">{account.fullName}</p>
									</div>
								</div>
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p className="text-gray-900 whitespace-no-wrap">{account.phonenumber}</p>
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p className="text-gray-900 whitespace-no-wrap">{account.email}</p>
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-between">
								{(account.isDelete && (
									<span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
										<span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
										<span className="relative">delete</span>
									</span>
								)) || (
									<span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
										<span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
										<span className="relative">active</span>
									</span>
								)}
								<div className="account-detail relative">
									<button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200">
										<i title="Chi tiết" className="fas fa-ellipsis-v "></i>
									</button>
									<ul className="account-menu absolute w-28 bg-white shadow-sm border rounded-lg p-2 left-1/2 transform -translate-x-1/2 space-y-2 z-10">
										<li onClick={() => setSelectedAccount(account)} className="cursor-pointer hover:text-red-400">
											Chi tiết
										</li>
										{(account.isDelete && (
											<li onClick={() => accountRestoreHandler(account.id)} className="cursor-pointer hover:text-red-400">
												Khôi phục
											</li>
										)) || (
											<li onClick={() => accountDeleteHandler(account.id)} className="cursor-pointer hover:text-red-400">
												Xóa account
											</li>
										)}
									</ul>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
