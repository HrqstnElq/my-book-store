/* eslint-disable react-hooks/exhaustive-deps */
import {getAllOrderAdmin} from "api/orderApi";
import {AxiosResponse} from "axios";
import OrderDetail from "components/OrderDetail";
import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const queryString = require("query-string");
const classNames = require("classnames");

const statuses = ["Đã đặt hàng", "Đã duyệt", "Đang giao", "Đã giao", "Hoàn trả"];
const labels = [
	"rounded bg-yellow-400 py-1 px-1 text-xs font-bold text-white",
	"rounded bg-green-400 py-1 px-1 text-xs font-bold text-white",
	"rounded bg-blue-400 py-1 px-1 text-xs font-bold text-white",
	"rounded bg-gray-400 py-1 px-1 text-xs font-bold text-white",
	"rounded bg-red-400 py-1 px-1 text-xs font-bold text-white",
];
const tdClass = "w-full lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static";
const thClass = "p-1 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell";
const spanClass = "lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase";

export default function OrderTable(props: any) {
	const status = queryString.parse(useHistory().location.search).status;
	const loadingRef = useRef<any>(null);

	const [mode, setMode] = useState<{type: string; data: any}>({
		type: "ALL",
		data: null,
	});
	const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState<String>(status ?? "");
	const [cloneOrder, setCloneOrder] = useState([...orders]);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState<String | undefined>("");
	const searchRef = useRef<HTMLInputElement>(null);

	const [size, setSize] = useState(10);

	const onHandleIsSuspend = (event: any) => setFilter(event.target.value);
	const onSizeChange = (event: any) => setSize(+event.target.value);
	const onSearchesChange = (event: any) => setSearch(searchRef.current?.value.toUpperCase());
	const onDetailClick = (event: any) => setMode({type: "DETAIL", data: JSON.parse(event.target.dataset.order)});
	const onExitClick = (event: any) =>
		event.target.classList.contains("exit") &&
		setMode({
			type: "ALL",
			data: null,
		});

	useEffect(() => {
		setCurrentPage(0);
	}, [filter]);

	useEffect(() => {
		loadingRef.current.staticStart();
		getAllOrderAdmin().then((res: AxiosResponse) => {
			if (res.data.success) setOrders(res.data.payload);
			if (loadingRef.current) loadingRef.current.complete();
		});
	}, [mode]);

	useEffect(() => {
		var newOrders = [];
		if (filter === "" && !search) newOrders = [...orders];
		else newOrders = [...orders.filter((order: any) => order.orderStatus === +filter)];

		newOrders = newOrders
			.filter(
				(order: any) =>
					order.fullName.toUpperCase().includes(search) ||
					order.userName.toUpperCase().includes(search) ||
					order.address.toUpperCase().includes(search) ||
					order.sdt.toUpperCase().includes(search) ||
					order.dateCreate.toUpperCase().includes(search)
			)
			.slice(currentPage * size, (currentPage + 1) * size);

		setCloneOrder(newOrders);
	}, [filter, orders, currentPage, size, search]);

	return (
		<div className="w-5/6 m-auto mt-4">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div className="action mb-4 flex justify-between flex-col lg:flex-row">
				<div className="flex items-center justify-between">
					<div onSubmit={onSearchesChange} className="relative mr-6 my-2 ">
						<input
							onChange={onSearchesChange}
							ref={searchRef}
							type="search"
							className="bg-purple-white shadow rounded border-0 p-3 focus:outline-none bg-gray-100"
							placeholder="Tìm kiếm . . . "
						/>
					</div>
					<div className={classNames("relative lg:mr-3 my-2", {hidden: status})}>
						<select className="bg-purple-white shadow rounded border-0 p-3 focus:outline-none bg-gray-100" onChange={onHandleIsSuspend}>
							<option value="">Tất cả</option>
							{statuses.map((status, index) => (
								<option key={index} value={index}>
									{status}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="mr-5">
						<select
							name="size"
							className="bg-purple-white shadow rounded border-0 p-2 focus:outline-none bg-gray-100"
							style={{width: "201px"}}
							onChange={onSizeChange}>
							{/* <option value="2">Hiển thị 2 đơn hàng</option> */}
							<option value="10">Hiển thị 10 đơn hàng</option>
							<option value="20">Hiển thị 20 đơn hàng</option>
							<option value="50">Hiển thị 50 đơn hàng</option>
							<option value="100">Hiển thị 100 đơn hàng</option>
						</select>
					</div>
					<div className="flex items-center">
						<div>
							{(currentPage > 0 && (
								<button
									className="rounded-md select-none p-2 mr-2 font-medium text-white focus:outline-none bg-green-500 active:bg-green-700"
									onClick={() => setCurrentPage(currentPage - 1)}>
									Quay lại
								</button>
							)) || (
								<span className="rounded-md select-none cursor-not-allowed p-2 mr-2 font-medium text-white focus:outline-none bg-green-400">
									Quay lại
								</span>
							)}
						</div>
						<div>
							{(currentPage <
								Math.ceil(
									(filter === "" ? orders.length : orders.filter((order: any) => order.orderStatus === +filter).length) / size
								) -
									1 && (
								<button
									className="rounded-md select-none p-2 font-medium text-white focus:outline-none bg-green-500 active:bg-green-700"
									onClick={() => setCurrentPage(currentPage + 1)}>
									Tiếp theo
								</button>
							)) || (
								<span className="rounded-md select-none cursor-not-allowed p-2 font-medium text-white focus:outline-none bg-green-400">
									Tiếp theo
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<table className="border-collapse w-full rounded-xl">
				<thead>
					<tr>
						<th className={thClass}>ID</th>
						<th className={thClass}>Tên</th>
						<th className={thClass}>SĐT</th>
						<th className={thClass}>Địa chỉ</th>
						<th className={thClass}>Ngày đặt hàng</th>
						<th className={thClass}>Trạng thái</th>
						<th className={thClass}>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{cloneOrder.map((order: any) => (
						<tr
							key={order.id}
							className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
							<td className={tdClass}>
								<span className={spanClass}>ID</span>
								{order.id}
							</td>
							<td className={tdClass}>
								<span className={spanClass}>Tên</span>
								{order.fullName}
							</td>
							<td className={tdClass}>
								<span className={spanClass}>SĐT</span>
								{order.sdt}
							</td>
							<td className={tdClass}>
								<span className={spanClass}>Địa chỉ</span>
								{order.address}
							</td>
							<td className={tdClass}>
								<span className={spanClass}>Ngày đặt hàng</span>
								<input className="shadow-sm" type="date" value={order.dateCreate.split("T")[0]} disabled />
							</td>
							<td className={tdClass}>
								<span className={spanClass}>Trạng thái</span>
								<span className={labels[order.orderStatus]}>{statuses[order.orderStatus]}</span>
							</td>
							<td className={tdClass}>
								<span className={spanClass}>Hành động</span>
								<button
									value={order.id}
									data-order={JSON.stringify(order)}
									onClick={onDetailClick}
									className="bg-green-400 hover:bg-green-500 focus:outline-none px-4 py-1 rounded-lg font-bold">
									Xử lí
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{mode.type === "DETAIL" && (
				<div
					onClick={onExitClick}
					className="exit w-screen h-screen bg-black fixed top-0 left-0 bg-opacity-60 flex justify-center items-center py-4">
					<OrderDetail admin={true} mode={mode} setMode={setMode} />
				</div>
			)}
		</div>
	);
}
