/* eslint-disable react-hooks/exhaustive-deps */
import {getOrderDetails, Order, updateOrder} from "api/orderApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const statuses = ["Duyệt", "Đang giao", "Đã giao", "Hoàn trả"];
const buttons = [
	"w-full bg-green-400 shadow-lg text-white px-4 py-2 hover:bg-green-500 mt-8 text-center font-semibold focus:outline-none rounded-lg",
	"w-full bg-blue-400 shadow-lg text-white px-4 py-2 hover:bg-blue-500 mt-8 text-center font-semibold focus:outline-none rounded-lg",
	"w-full bg-gray-400 shadow-lg text-white px-4 py-2 hover:bg-gray-500 mt-8 text-center font-semibold focus:outline-none rounded-lg",
	"w-full bg-red-400 shadow-lg text-white px-4 py-2 hover:bg-red-500 mt-8 text-center font-semibold focus:outline-none rounded-lg",
];
const tdClass = "w-full lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static";
const thClass = "p-1 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell";
const spanClass = "lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase";

export default function OrderDetail(props: {admin: boolean; mode: {type: string; data: any}; setMode: Function}) {
	const {admin, mode, setMode} = props;
	const [orderDetail, setOrderDetail] = useState([]);
	const user = useSelector((state: any) => state.user);

	useEffect(() => {
		getOrderDetails(mode.data.id, user?.current?.token).then((res) => {
			if (res.data.success) setOrderDetail(res.data.payload);
		});
	}, []);

	const getCurrentDate = () => {
		var today = new Date();
		return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	};

	const changeStatusHandler = (event: any) => {
		var confirm = window.confirm("Xác nhận thao tác !");
		if (confirm.valueOf()) {
			var dateReceive = null;
			var dateReturn = null;
			//TODO doi thanh ngay hoan tra cho mode 3
			if (mode.data.orderStatus === 2) dateReceive = getCurrentDate();
			if (mode.data.orderStatus === 3) dateReturn = getCurrentDate();
			var nextOrderStatus = mode.data.orderStatus < 4 ? mode.data.orderStatus + 1 : mode.data.orderStatus;

			setMode({
				...mode,
				data: {
					...mode.data,
					orderStatus: nextOrderStatus,
					dateReceive: dateReceive,
					dateReturn: dateReturn,
				},
			});

			var orderPost: Order = {
				userId: mode.data.userId,
				address: mode.data.address,
				dateReceive: dateReceive,
				dateReturn: dateReturn,
				orderStatus: nextOrderStatus,
			};

			updateOrder(mode.data.id, orderPost, user?.current.token).then((res) => {});
		}
	};

	return (
		<div className="w-4/5 h-full bg-gray-100 p-2 rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 relative">
			<div className="-top-1 w-5 h-5 cursor-pointer sticky" onClick={() => setMode({type: "MAIN", data: null})}>
				<i className="fas fa-times text-lg"></i>
			</div>
			<div className="flex justify-between flex-col-reverse lg:flex-row my-5 mx-4">
				<div className="lg:mr-2">
					<div className="card bg-white max-w-md p-10 mx-auto lg:w-80">
						<div className="title">
							<h1 className="font-bold text-center">Thông tin đơn hàng</h1>
						</div>

						<div className="form mt-4">
							<div className="flex flex-col text-sm  mt-2">
								<label htmlFor="fullName" className="font-bold mb-2">
									Tên
								</label>
								<input
									name="fullName"
									className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
									type="text"
									value={mode.data.fullName}
									readOnly
								/>
							</div>

							<div className="flex flex-col text-sm  mt-2">
								<label htmlFor="sdt" className="font-bold mb-2">
									SĐT
								</label>
								<input
									name="sdt"
									className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
									type="text"
									value={mode.data.sdt}
									readOnly
								/>
							</div>

							<div className="flex flex-col text-sm  mt-2">
								<label htmlFor="email" className="font-bold mb-2">
									Email
								</label>
								<input
									name="email"
									className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
									type="text"
									value={mode.data.email}
									readOnly
								/>
							</div>

							<div className="flex flex-col text-sm  mt-2">
								<label htmlFor="dateCreate" className="font-bold mb-2">
									Ngày đặt hàng
								</label>
								<input
									name="dateCreate"
									className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
									type="date"
									value={mode.data.dateCreate.split("T")[0]}
									readOnly
								/>
							</div>

							{mode.data.orderStatus === 3 && (
								<div className="flex flex-col text-sm  mt-2">
									<label htmlFor="dateCreate" className="font-bold mb-2">
										Ngày giao
									</label>
									<input
										name="dateCreate"
										className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
										type="date"
										value={mode.data.dateReceive.split("T")[0]}
										readOnly
									/>
								</div>
							)}

							{/* TODO thêm một cột ngày trả vào database + đổi thành ngày hoàn trả */}
							{mode.data.orderStatus === 4 && (
								<div className="flex flex-col text-sm  mt-2">
									<label htmlFor="dateCreate" className="font-bold mb-2">
										Ngày hoàn trả
									</label>
									<input
										name="dateCreate"
										className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
										type="date"
										value={mode.data.dateReturn?.split("T")[0]}
										readOnly
									/>
								</div>
							)}

							<div className="flex flex-col text-sm mt-2">
								<label htmlFor="address" className="font-bold mb-2">
									Địa chỉ
								</label>
								<textarea
									name="address"
									className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
									value={mode.data.address}
									readOnly
								/>
							</div>
						</div>

						{admin && (
							<div className="submit">
								{mode.data.orderStatus !== 4 && (
									<button onClick={changeStatusHandler} className={buttons[mode.data.orderStatus]}>
										{statuses[mode.data.orderStatus]}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
				<table className="border-collapse w-3/4 mx-auto">
					<thead>
						<tr>
							<th className={thClass}>Hình ảnh</th>
							<th className={thClass}>Tên sách</th>
							<th className={thClass}>Số lượng</th>
							<th className={thClass}>Thành tiền</th>
						</tr>
					</thead>
					<tbody>
						{orderDetail.map((order: any, index) => (
							<tr
								key={index}
								className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
								<td className={tdClass}>
									<span className={spanClass}>Hình ảnh</span>
									<img className="h-16 m-auto block bg-gray-300" src={order.bookImageUrl} alt={order.id} />
								</td>
								<td className={tdClass}>
									<span className={spanClass}>Tên sách</span>
									{order.bookName}
								</td>
								<td className={tdClass}>
									<span className={spanClass}>Số lượng</span>
									{order.quantity}
								</td>
								<td className={tdClass}>
									<span className={spanClass}>Thành tiền</span>
									{order.totalPrice}
								</td>
							</tr>
						))}
						<tr className="bg-gray-200 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
							<td
								className="w-full lg:w-auto p-1 text-gray-800 font-bold text-center border border-b block lg:table-cell relative lg:static"
								colSpan={3}>
								Tổng tiền
							</td>
							<td className="w-full lg:w-auto p-1 text-gray-800 font-bold text-center border border-b block lg:table-cell relative lg:static">
								{mode.data.totalPrice}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
