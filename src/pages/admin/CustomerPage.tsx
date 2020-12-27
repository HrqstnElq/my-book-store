import {GetAllUser} from "api/userApi";
import AccountTable from "components/admin/AccountTable";
import {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function CustomerPage() {
	const [accounts, setAccounts] = useState<any[]>([]);
	const [cloneAccounts, setCloneAccounts] = useState<any[]>([]);
	const user = useSelector((state: any) => state.user);
	const [filter, setFilter] = useState({search: "", isDelete: ""});

	useEffect(() => {
		if (user.current.token) {
			GetAllUser(user.current.token).then((res: any) => {
				if (res.data.success) {
					setAccounts(res.data.payload);
				} else {
					setAccounts([]);
				}
			});
		}
	}, [user]);

	useEffect(() => {
		setCloneAccounts(accounts);
	}, [accounts]);

	useEffect(() => {
		var tempAccounts = accounts.filter(
			(account) =>
				account.username.toUpperCase().includes(filter.search) ||
				account.fullName.toUpperCase().includes(filter.search) ||
				account.email.toUpperCase().includes(filter.search) ||
				account.phonenumber.toUpperCase().includes(filter.search)
		);

		if (filter.isDelete !== "") {
			tempAccounts = tempAccounts.filter((account) => account.isDelete.toString() === filter.isDelete);
		}
		setCloneAccounts(tempAccounts);
	}, [accounts, filter]);

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter({
			...filter,
			search: event.target.value.toUpperCase(),
		});
	};

	const statusHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		setFilter({
			...filter,
			isDelete: event.target.value,
		});
	};

	return (
		<div className="w-5/6 mt-4 m-auto flex flex-col lg:flex-row ">
			<div className="lg:w-1/6 w-full px-2 mb-4">
				<div className="flex flex-col">
					<label className="font-medium" htmlFor="search">
						Tìm kiếm
					</label>
					<input onChange={searchHandler} type="text" name="search" className="border focus:border-blue-300 px-2 py-1 rounded-md" />
				</div>
				<div className="flex flex-col">
					<label className="font-medium" htmlFor="search">
						Trạng thái
					</label>
					<select onChange={statusHandler} className="border focus:outline-none px-2 py-1 rounded-md" name="isDelete">
						<option value="">Tất cả</option>
						<option value="false">Hoạt động</option>
						<option value="true">Vô hiệu hóa</option>
					</select>
				</div>
			</div>
			<div className="w-5/6 px-2">
				<AccountTable accounts={cloneAccounts} />
			</div>
		</div>
	);
}
