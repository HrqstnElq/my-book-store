import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Decrement, Increment, RemoveItem} from "store/cartSlice";
import LoadingBar from "react-top-loading-bar";
import {removeCart, syncCart} from "api/cartApi";
import OrderForm from "components/public/OrderForm";
import {VND} from "common/function";

export default function CartPage() {
	const dispatch = useDispatch();
	const cart = useSelector((state: any) => state.cart);
	const user = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isOrder, setIsOrder] = useState(false);

	useEffect(() => {
		loadingRef?.current?.staticStart();
		let totalPrice = 0;
		cart?.forEach((book: any) => {
			totalPrice += book.price * (1 - book.sale) * book.quantity;
		});
		setTotalPrice(totalPrice);

		if (user.current.token) {
			syncCart(user.current.token, true, cart).then((res) => {
				if (res.data.success) {
					loadingRef?.current?.complete();
				}
			});
		} else {
			loadingRef?.current?.complete();
		}
	}, [cart, user]);

	const removeItemHandler = (bookId: number) => {
		dispatch(RemoveItem({bookId: bookId}));
		if (user.current.token) {
			removeCart(user.current.token, bookId);
		}
	};

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			{isOrder && <OrderForm books={cart} setMode={setIsOrder} />}
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			{(cart.length > 0 && (
				<>
					<div className="flex justify-between my-4 w-full font-bold">
						<p className="w-2/5">Sách</p>
						<p className="w-1/5">Giá</p>
						<p className="w-1/5">Số lượng</p>
						<p className="w-1/5">Thành tiền</p>
					</div>
					<div className="border-b-4 border-gray-200" />
					{cart.map((book: any, index: number) => (
						<div key={index} className="flex justify-between my-4">
							<div className="w-2/5 flex space-x-4">
								<img src={book.bookImage} alt="" style={{height: "100px"}} />
								<Link to={`/book-store/book/${book.bookId}`} className="font-medium">
									{book.bookName}
								</Link>
							</div>
							<div className="w-1/5">
								<p className="font-medium text-red-500">{VND(book.price - book.sale * book.price)}</p>
								{book.sale !== 0 && <p className="text-sm line-through">{VND(book.price)}</p>}
							</div>
							<div className="w-1/5">
								<div className="flex">
									<button onClick={() => dispatch(Decrement({bookId: book.bookId}))} className="px-2 bg-gray-200 font-bold">
										-
									</button>
									<input className="w-12 text-center bg-gray-200 px-2 py-1" type="number" value={book.quantity} readOnly />
									<button onClick={() => dispatch(Increment({bookId: book.bookId}))} className="px-2 bg-gray-200 font-bold">
										+
									</button>
								</div>
							</div>
							<div className="w-1/5 flex justify-between relative">
								<p>{VND(book.price * (1 - book.sale) * book.quantity)}</p>
								<button
									onClick={() => removeItemHandler(book.bookId)}
									className="w-8 h-8 rounded-full hover:bg-red-100 text-red-400 relative -top-1">
									<i className="fal fa-times-circle"></i>
								</button>
							</div>
						</div>
					))}
					<div className="float-right p-4 mt-5 w-96 bg-gray-100 shadow-sm space-y-4">
						<div className="flex w-full justify-between">
							<label className="font-medium">Tổng tiền</label>
							<label className="">{VND(totalPrice)}</label>
						</div>
						{(user.current.id && (
							<button
								onClick={() => setIsOrder(true)}
								className="w-full text-white font-medium py-1 rounded-sm bg-blue-600 hover:bg-blue-700">
								Đặt hàng
							</button>
						)) || (
							<div className="w-full flex items-center flex-col space-y-2 rounded-md">
								<h3 className="font-bold text-md uppercase">Vui lòng đăng nhập để đặt hàng</h3>
								<Link to="/login" className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700 font-medium text-white">
									Đăng nhập
								</Link>
							</div>
						)}
					</div>
				</>
			)) || <h1 className="text-xl text-center uppercase">Giỏ hàng rỗng</h1>}
		</div>
	);
}
