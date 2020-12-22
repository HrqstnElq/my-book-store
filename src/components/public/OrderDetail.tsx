import {VND} from "common/function";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function OrderDetail(props: {order: any; setMode: Function; destroy?: boolean}) {
	const {setMode, order} = props;
	const {register, handleSubmit} = useForm();
	const [books, setBooks] = useState([]);
	const user = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);

	useEffect(() => {}, []);

	const onSubmit = (data: any) => {};

	return (
		<div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div className="w-3/4 h-3/4 bg-white rounded-lg flex flex-col lg:flex-row justify-between p-5 overflow-y-scroll">
				<div className="lg:w-1/2 w-full space-y-2">
					<header className="flex justify-between font-bold border-b-2 py-2">
						<p className="w-1/2">Tên sách</p>
						<p className="w-1/4">Sô lượng</p>
						<p className="w-1/4">Thành tiền</p>
					</header>

					{books?.map((book: any, index: number) => (
						<div key={index} className="flex justify-between">
							<p className="w-1/2 overflow-x-hidden overflow-ellipsis whitespace-nowrap">{book.bookName}</p>
							<p className="w-1/4">{book.quantity}</p>
							<p className="w-1/4">{VND(book.price * (1 - book.sale) * book.quantity)}</p>
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
					<form onSubmit={handleSubmit(onSubmit)} className="w-3/4 m-auto space-y-4">
						<h1 className="text-xl font-bold text-center">Thông tin giao hàng</h1>

						<div>
							<p className="font-medium">Tên người nhận </p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="text"
								name="name"
								defaultValue={user.current.fullName}
								ref={register}
								readOnly
							/>
						</div>

						<button className="w-full bg-green-500 hover:bg-green-600 p-2 rounded-md text-white font-bold" type="submit">
							Thoát
						</button>
						<button onClick={() => setMode(false)} className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-md text-white font-bold">
							Hủy
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
