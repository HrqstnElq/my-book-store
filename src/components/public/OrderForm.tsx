import {clearCart} from "api/cartApi";
import {addOrder, createOrder} from "api/orderApi";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";
import {Clear} from "store/cartSlice";

const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);

export default function OrderForm(props: {books?: any[]; setMode: Function}) {
	const {books, setMode} = props;
	const [order, setOrder] = useState({products: [], totalPrice: 0});
	const {register, handleSubmit} = useForm();
	const user = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		createOrder(books).then((res: any) => {
			if (res.data.success) {
				setOrder(res.data.payload);
			} else {
				setOrder({products: [], totalPrice: 0});
			}
		});
	}, [books]);

	const onSubmit = (data: any) => {
		console.log(data);
		loadingRef?.current?.staticStart();
		if (user.current.token) {
			addOrder(user.current.token, {
				listCartRequest: {
					cartRequests: order.products,
				},
				orderRequest: data,
			}).then((res: any) => {
				if (res.data.success) {
					//NOTE : dispatch clear
					dispatch(Clear());
					clearCart(user.current.token);

					loadingRef?.current?.complete();
					setMode(false);
				} else {
					alert("Đặt hàng không thành công !");
					loadingRef?.current?.complete();
					setMode(false);
				}
			});
		}
	};

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

					{order.products?.map((book: any, index: number) => (
						<div key={index} className="flex justify-between">
							<p className="w-1/2 overflow-x-hidden overflow-ellipsis whitespace-nowrap">{book.bookName}</p>
							<p className="w-1/4">{book.quantity}</p>
							<p className="w-1/4">{VND(book.price * (1 - book.sale) * book.quantity)}</p>
						</div>
					))}

					{order?.products.length > 0 && (
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
						<div>
							<p className="font-medium">Địa chỉ giao hàng</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="text"
								name="address"
								defaultValue={user.current.address}
								ref={register}
							/>
						</div>
						<div>
							<p className="font-medium">Số điện thoại</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="text"
								name="phonenumber"
								defaultValue={user.current.phonenumber}
								ref={register}
								readOnly
							/>
						</div>
						<div>
							<p className="font-medium">Email</p>
							<input
								className="border-gray-400 border p-1 w-full rounded-md"
								type="text"
								name="email"
								defaultValue={user.current.email}
								ref={register}
								readOnly
							/>
						</div>
						<button className="w-full bg-green-500 hover:bg-green-600 p-2 rounded-md text-white font-bold" type="submit">
							Đặt hàng
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
