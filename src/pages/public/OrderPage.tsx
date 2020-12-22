import {VND} from "common/function";
import LoadingBar from "react-top-loading-bar";
import React, {useEffect, useRef, useState} from "react";
import {getAllOrderUser} from "api/orderApi";
import {useSelector} from "react-redux";
import OrderDetail from "components/public/OrderDetail";

const statuses = ["Đã đặt hàng", "Đã duyệt", "Đang giao", "Đã giao", "Hoàn trả"];
const labels = [
	"rounded bg-yellow-400 py-1 px-1 text-xs font-medium text-white",
	"rounded bg-green-400 py-1 px-1 text-xs font-medium text-white",
	"rounded bg-blue-400 py-1 px-1 text-xs font-medium text-white",
	"rounded bg-gray-400 py-1 px-1 text-xs font-medium text-white",
	"rounded bg-red-400 py-1 px-1 text-xs font-medium text-white",
];

export default function OrderPage() {
	const loadingRef = useRef<any>(null);
	const user = useSelector((state: any) => state.user);
	const [orders, setOrders] = useState([]);
	const [err, setErr] = useState("");
	const [detail, setDetail] = useState<any>();

	useEffect(() => {
		window.scrollTo(0, 0);

		getAllOrderUser(user.current.token).then((res: any) => {
			console.log(res.data);
			if (res.data.success) {
				setOrders(res.data.payload);
			} else {
				setErr(res.data.message);
			}
		});
	}, [user]);

	const showDetail = (order: any) => {
		setDetail(<OrderDetail order={order} setMode={setDetail} />);
	};

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 w-full max-w-screen-lg">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			{detail}
			{(orders.length > 0 && (
				<div className="w-full space-y-4">
					<header className="flex justify-between font-bold border-b-2 py-2">
						<p className="w-1/12 pr-2">MDH</p>
						<p className="w-1/3 px-2">Ngày đặt</p>
						<p className="w-1/6 px-2 hidden md:block">Trạng thái</p>
						<p className="w-1/3 px-2">Tổng tiền</p>
						<p className="w-1/12 pl-2"></p>
					</header>
					{orders.map((order: any, index: number) => (
						<div key={index} className="flex justify-between">
							<div className="w-1/12 pr-2 font-medium">DH-{order.id}</div>
							<div className="w-1/3 px-2">
								<input className="w-full md:text-base text-xs" type="date" value={order.dateCreate.split("T")[0]} disabled />
							</div>
							<div className="w-1/6 px-2 hidden md:block">
								<label className={labels[0]}>{statuses[0]}</label>
							</div>
							<div className="w-1/3 px-2 text-indigo-800">{VND(10000)}</div>
							<div className="w-1/12 pl-2 md:space-x-2">
								<button onClick={() => showDetail(order)} className="text-green-500">
									<i className="fal fa-exclamation-circle"></i>
								</button>
								{order.orderStatus === 0 && (
									<button className="text-red-500">
										<i className="fal fa-times-circle"></i>
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)) || <h1 className="text-center text-xl uppercase">{err || "Không tìm thấy đơn hàng nào "}</h1>}
		</div>
	);
}
