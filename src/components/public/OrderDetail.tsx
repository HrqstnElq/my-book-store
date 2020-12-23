import {deleteOrder, getOrderDetails} from "api/orderApi";
import {VND} from "common/function";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Message from "./Message";
import Question from "./Question";

export default function OrderDetail(props: {order: any; setMode: Function; destroy?: boolean; isDelete?: boolean}) {
	const {setMode, order, isDelete} = props;
	const [books, setBooks] = useState([]);
	const user = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);
	const [message, setMessage] = useState<any>(null);

	useEffect(() => {
		if (user.current.token) {
			getOrderDetails(order.id, user.current.token).then((res: any) => {
				if (res.data.success) {
					setBooks(res.data.payload);
				} else {
					setBooks([]);
				}
			});

			setBooks([]);
		}
	}, [order.id, user]);

	const onDelete = () => {
		//moi dat hang thi se huy duoc
		if (order.orderStatus < 1)
			setMessage(
				<Question
					question="Bạn có muốn xóa đơn hàng này không ?"
					agree={{content: "OK", color: "red"}}
					disagree={{content: "Cancel", color: "green"}}
					setAnswer={setMessage}
				/>
			);
		else setMessage(<Message content="Đã hết thời hạn hủy đơn hàng" button="Cancel" setMode={setMessage} color="yellow" />);
	};

	useEffect(() => {
		if (message === "OK") {
			if (user.current.token)
				deleteOrder(user.current.token, order.id).then(() => {
					setMode(null);
				});
		}
		if (message === "Cancel") {
			setMessage(null);
		}
	}, [message, order.id, setMode, user]);

	return (
		<div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			{message}
			<div className="w-3/4 h-5/6 bg-white flex flex-col lg:flex-row justify-between p-5 overflow-y-scroll">
				<div className="lg:w-1/2 w-full space-y-2">
					<header className="flex justify-between font-bold border-b-2 py-2">
						<p className="w-1/2">Tên sách</p>
						<p className="w-1/4">Sô lượng</p>
						<p className="w-1/4">Thành tiền</p>
					</header>

					{books?.map((book: any, index: number) => (
						<div key={index} className="flex justify-between">
							<Link
								to={`/public/book/${book.bookId}`}
								className="w-1/2 overflow-x-hidden overflow-ellipsis whitespace-nowrap font-medium hover:text-indigo-800">
								{book.bookName}
							</Link>
							<p className="w-1/4">{book.quantity}</p>
							<p className="w-1/4">{VND(book.totalPrice)}</p>
						</div>
					))}

					{books?.length > 0 && (
						<footer className="flex justify-between font-medium py-2">
							<p className="w-3/4">Tổng tiền</p>
							<p className="w-1/4">{VND(order.totalPrice)}</p>
						</footer>
					)}
				</div>

				<div className="lg:w-5/12 w-full mt-4 lg:mt-0">
					<div className="w-3/4 m-auto space-y-4">
						<h1 className="text-xl font-bold text-center">Thông tin đơn hàng</h1>

						<div>
							<p className="font-medium">Tên người nhận </p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="text"
								name="name"
								defaultValue={order.fullName}
								readOnly
							/>
						</div>

						<div>
							<p className="font-medium">Email</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="email"
								name="name"
								defaultValue={order.email}
								readOnly
							/>
						</div>

						<div>
							<p className="font-medium">Số điện thoại</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="email"
								name="name"
								defaultValue={order.sdt}
								readOnly
							/>
						</div>

						<div>
							<p className="font-medium">Ngày đăt hàng</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="date"
								name="name"
								defaultValue={order.dateCreate?.split("T")[0]}
								readOnly
							/>
						</div>

						{order.orderStatus > 0 && (
							<div>
								<p className="font-medium">Ngày nhận hàng</p>
								<input
									className="border-gray-400 border p-1 w-full rounded-md"
									type="date"
									name="name"
									defaultValue={order.dateReceive?.split("T")[0]}
									readOnly
								/>
							</div>
						)}

						<div>
							<p className="font-medium">Địa chỉ</p>
							<textarea className="border-gray-400 border p-1 w-full rounded-md" name="name" defaultValue={order.address} readOnly />
						</div>

						<button
							onClick={() => setMode(false)}
							className="w-full bg-green-500 hover:bg-green-600 p-2 rounded-md text-white font-bold"
							type="submit">
							Thoát
						</button>
						{!isDelete && (
							<button onClick={onDelete} className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-md text-white font-bold">
								Hủy đơn hàng
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
