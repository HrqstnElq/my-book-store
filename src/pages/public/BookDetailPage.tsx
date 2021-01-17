import {PostVote} from "api/RatingApi";
import Message from "components/public/Message";
import SearchBar from "components/public/SearchBar";
import Rating from "components/Rating";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";
import {AddItem} from "store/cartSlice";
import "./BookDetailPage.css";
import {VND} from "common/function";
import OrderForm from "components/public/OrderForm";
import {getBookDetailByUrl} from "api/productApi";
import {Helmet} from "react-helmet";

import {EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon} from "react-share";
const classNames = require("classnames");

export default function BookDetailPage(props: any) {
	const loadingRef = useRef<any>(null);
	const commentRef = useRef<HTMLTextAreaElement>(null);

	const [book, setBook] = useState<any>();
	const [star, setStar] = useState<number>(5);
	const [quantity, setQuantity] = useState(1);
	const [starAvg, setStarAvg] = useState(5);
	const [tab, setTab] = useState("DESC");
	const [mode, setMode] = useState("DEFAULT");
	const [message, setMessage] = useState<any>();
	const [orderForm, setOrderForm] = useState<any>();

	const user = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const url = window.location.href;

	useEffect(() => {
		if (book?.comments.length > 0) {
			let totalStar = 0;
			book?.comments.forEach((comment: any) => {
				totalStar += comment.rating;
			});

			setStarAvg(Math.ceil(totalStar / book?.comments.length));
		}
	}, [book, mode]);

	useEffect(() => {
		window.scrollTo(0, 0);

		loadingRef?.current?.staticStart();
		getBookDetailByUrl(props.match.params.url).then((res) => {
			if (res.data.success) setBook(res.data.payload.book);
			else setBook(null);
			loadingRef?.current?.complete();
		});
	}, [props.match.params.url, mode]);

	useEffect(() => {
		if (mode === "Login") window.location.href = `/login?return=public/book/${book.url}`;
	});

	const buyClickHandler = () => {
		if (user.current.token) {
			setOrderForm(<OrderForm books={[{bookId: book.id, quantity: quantity}]} setMode={setMode} />);
			setMode("ORDER");
		} else {
			setMessage(<Message content="Vui lòng đăng nhập trước khi mua hàng" button="Login" color="green" setMode={setMode} />);
			setMode("MESSAGE");
		}
	};

	const Vote = () => {
		if (user?.current?.token) {
			PostVote(user.current.token, {
				bookId: book.id,
				rating: star,
				comment: commentRef?.current?.value,
			}).then((res) => {
				if (res.data.success) {
					setMessage(<Message content={res.data.message} button="Ok" color="green" setMode={setMode} />);
					setMode("MESSAGE");
				} else {
					setMode("MESSAGE");
					setMessage(<Message content={res.data.message} button="Ok" color="red" setMode={setMode} />);
				}
			});
			if (commentRef?.current) commentRef.current.value = "";
		}
	};

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{book?.name || "Nhà sách An Nguyên"}</title>
				<meta name="keywords" content={book?.keyWord || "Sách hay"} />
			</Helmet>
			<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
				<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
				{mode === "MESSAGE" && message}
				{mode === "ORDER" && orderForm}
				<SearchBar />
				{(book && (
					<>
						<div className="space-x-4 flex flex-col md:flex-row w-full md:h-96 my-10">
							<img className="md:w-1/3 block bg-gray-700 rounded-lg m-auto md:m-0 w-2/3" src={book.image} alt={book.name} />
							<div className="flex justify-between flex-col">
								<div className="space-y-2">
									<div className="space-x-4">
										<span className="font-bold text-3xl uppercase">{book.name}</span>
										<span className="text-gray-600 text-sm uppercase">{book.author}</span>
									</div>
									<Rating star={starAvg} count={book.comments.length} color="red" />
									<div className="space-x-2">
										<span className="font-bold">Số lượng còn lại:</span>
										<span>{book.available}</span>
									</div>
									<div className="space-x-2">
										<span className="font-bold">Danh mục:</span>
										<span>{book.category}</span>
									</div>
									<div className="space-x-2">
										<span className="font-bold">Giá:</span>
										<span className="text-red-700 text-xl font-semibold flex-1">{VND(book.price - book.sale * book.price)}</span>
										<span className="text-gray-400 line-through flex-1">{VND(book.price)}</span>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<p className="font-bold">Chọn số lượng</p>
										<div className="flex flex-row h-10 rounded-lg relative bg-transparent w-32">
											<button
												onClick={() => quantity > 1 && setQuantity(quantity - 1)}
												className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
												-
											</button>
											<input
												className="text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
												onChange={(e: any) => e.target.value <= book.available && setQuantity(e.target.value)}
												value={quantity}
												min={1}
												max={book.available}
												type="number"
											/>
											<button
												onClick={() => book.available > quantity && setQuantity(quantity + 1)}
												className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
												+
											</button>
										</div>
									</div>
									<div className="space-x-4">
										<button
											onClick={() => {
												loadingRef?.current?.staticStart();
												dispatch(
													AddItem({
														bookId: book.id,
														bookName: book.name,
														bookImage: book.image,
														price: book.price,
														sale: book.sale,
														quantity: quantity,
														bookUrl: book.url,
													})
												);
												loadingRef?.current?.complete();
											}}
											className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-md text-white font-medium">
											Thêm vào giỏ
										</button>
										<button
											onClick={buyClickHandler}
											className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium">
											Mua ngay
										</button>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h3 className="font-medium">Chia sẻ</h3>
							<div className="space-x-2">
								<FacebookShareButton url={url} quote={book.title}>
									<FacebookIcon size={32} round={true} />
								</FacebookShareButton>
								<TwitterShareButton url={url} title={book.title}>
									<TwitterIcon size={32} round={true} />
								</TwitterShareButton>
								<EmailShareButton url={url}>
									<EmailIcon size={32} round={true} />
								</EmailShareButton>
							</div>
						</div>
						<div className="p-4 bg-gray-100 rounded-lg my-10">
							<div className="flex space-x-12 border-b-4 border-gray-200 px-4">
								<button
									onClick={() => setTab("DESC")}
									className={classNames("font-bold transition-all duration-300 py-4 top-1 relative border-b-4", {
										"border-indigo-500": tab === "DESC",
									})}>
									Thông tin + Mô tả
								</button>
								<button
									onClick={() => setTab("VOTE")}
									className={classNames("font-bold transition-all duration-300 py-4 top-1 relative border-b-4", {
										"border-indigo-500": tab === "VOTE",
									})}>
									Đánh giá ({book.comments.length})
								</button>
							</div>
							<div className="my-2 p-4 max-h-96 h-96 overflow-y-scroll">
								{(tab === "DESC" && <p>{book.description}</p>) || (
									<>
										<div className="flex flex-col md:flex-row ">
											<div className="m-4">
												<div onClick={() => setStar(5)} className="flex items-center space-x-2 cursor-pointer">
													<input className="cursor-pointer" type="radio" name="star" value="5" checked={star === 5} />
													<Rating star={5} count={5} color="yellow" />
												</div>
												<div onClick={() => setStar(4)} className="flex items-center space-x-2 cursor-pointer">
													<input className="cursor-pointer" type="radio" name="star" value="4" checked={star === 4} />
													<Rating star={4} count={4} color="yellow" />
												</div>
												<div onClick={() => setStar(3)} className="flex items-center space-x-2 cursor-pointer">
													<input className="cursor-pointer" type="radio" name="star" value="3" checked={star === 3} />
													<Rating star={3} count={3} color="yellow" />
												</div>
												<div onClick={() => setStar(2)} className="flex items-center space-x-2 cursor-pointer">
													<input className="cursor-pointer" type="radio" name="star" value="2" checked={star === 2} />
													<Rating star={2} count={2} color="yellow" />
												</div>
												<div onClick={() => setStar(1)} className="flex items-center space-x-2 cursor-pointer">
													<input className="cursor-pointer" type="radio" name="star" value="1" checked={star === 1} />
													<Rating star={1} count={1} color="yellow" />
												</div>
											</div>
											<div className="m-4 w-full">
												<textarea
													ref={commentRef}
													className="rounded-md w-full p-2 focus:outline-none border focus:border-blue-500"
													placeholder="Nhập đánh giá"
													name="comment"
													rows={5}
													disabled={!user?.current?.token}
												/>
												<button
													onClick={Vote}
													className="right-0 float-right clear-right px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold"
													disabled={!user?.current?.token}>
													<i className="far fa-paper-plane" /> Gửi
												</button>
											</div>
										</div>
										<div className="p-4">
											{book.comments.map((item: any) => (
												<div className="flex my-8  space-x-4">
													<div className="flex flex-col items-center">
														<img className="w-10 h-10 rounded-full block" src={item.avatar} alt="" />
														<p className="font-bold text-yellow-500">
															{item.rating} <i className="fas fa-star text-xs"></i>
														</p>
													</div>
													<div className="space-y-2">
														<h3 className="font-semibold mt-2">{item.username}</h3>
														<p>{item.comment}</p>
													</div>
												</div>
											))}
										</div>
									</>
								)}
							</div>
						</div>
					</>
				)) || <h1 className="my-4 text-xl uppercase text-center">Không tìm thấy cuốn sách này</h1>}
			</div>
		</>
	);
}
