import {getAllCategory} from "api/categoryApi";
import {editBook, addBook} from "api/productApi";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function BookEdit(props: {bookAction: any; setBookAction: Function; bookDetail: any}) {
	const {bookDetail, bookAction, setBookAction} = props;
	const [image, setImage] = useState<any>("");
	const userState = useSelector((state: any) => state.user);
	const [categories, setCategory] = useState([]);
	const [book, setBook] = useState<any>({});
	const loadingRef = useRef<any>(null);

	useEffect(() => {
		getAllCategory().then((res) => {
			if (res.data.success) {
				setCategory(res.data.payload.categories);
			}
		});
	}, []);

	useEffect(() => {
		setImage(bookDetail.image);
		setBook(bookDetail);
	}, [bookDetail]);

	///reader image
	const reader = new FileReader();
	reader.onload = () => {
		setImage(reader.result);
	};

	//react-form-hook
	const {register, errors, handleSubmit} = useForm();
	const onSubmit = (book: any) => {
		if (loadingRef.current) loadingRef.current.staticStart();
		if (bookAction.action === "EDIT") {
			editBook(bookAction.bookId, book, userState.current.token).then((res) => {
				if (loadingRef.current) loadingRef.current.complete();
				if (res.data.success) {
					alert("Cập nhật thành công");
					setBookAction({...bookAction, action: "ALL"});
				} else {
					alert("không thay đổi");
				}
			});
		} else {
			addBook(book, userState.current.token).then((res) => {
				if (loadingRef.current) loadingRef.current.complete();
				if (res.data.success) {
					alert("Thêm thành công");
					setBookAction({...bookAction, action: "ALL"});
				} else {
					alert("Thêm không thành công");
				}
			});
		}
	};

	const fileSelectHandler = (event: any) => {
		if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
	};

	return (
		<div className="bg-white w-11/12 rounded-lg overflow-y-scroll overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-gray-300">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div onClick={() => setBookAction({bookId: 0, action: "ALL"})} className="-top-1 w-5 h-5 cursor-pointer sticky">
				<i className="fas fa-times text-lg"></i>
			</div>
			<div className="p-4 flex space-x-4 flex-col lg:flex-row">
				<div className="w-full lg:w-2/5">
					<label className="cursor-pointer relative block m-auto bg-gray-500 rounded-lg" style={{width: "256px", height: "384px"}}>
						{image && (
							<img style={{width: "256px", height: "384px"}} className="rounded-lg bg-gray-500 block object-cover" src={image} alt="" />
						)}
						<input className="hidden" type="file" accept="image/*" name="bookImage" onChange={fileSelectHandler} />
						<div
							className="absolute top-0 bg-black bg-opacity-30 rounded-lg flex justify-center items-center opacity-0 hover:opacity-100"
							style={{width: "256px", height: "384px"}}>
							<div className="text-white text-center">
								<i className="fas fa-cloud-upload-alt text-3xl "></i>
								<p>Tải ảnh lên</p>
							</div>
						</div>
					</label>
				</div>
				<div className="w-full px-5">
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
						<div className="flex flex-row justify-between w-full space-x-8">
							<div className="w-full">
								<div className="flex justify-between">
									<label className="block font-medium" htmlFor="name">
										Tên sách
									</label>
									{errors.name && <span className="text-red-500">{errors.name && "Tên sách không được để trống"}</span>}
								</div>
								<input
									ref={register({required: true, maxLength: 500})}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									type="text"
									name="name"
									defaultValue={book.name}
								/>
							</div>
							<div className="w-full">
								<div className="flex justify-between">
									<label className="block font-medium" htmlFor="author">
										Tác giả
									</label>
									{errors.author && <span className="text-red-500">{errors.name && "Tên tác giả không được để trống"}</span>}
								</div>
								<input
									ref={register({required: true, maxLength: 200})}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									type="text"
									name="author"
									defaultValue={book.author}
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between w-full space-x-8">
							<div className="w-full">
								<div className="flex justify-between">
									<label className="block font-medium" htmlFor="price">
										Giá
									</label>
									{errors.price && <span className="text-red-500">{errors.name && "Giá không được để trống"}</span>}
								</div>

								<input
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									ref={register({required: true, min: 0})}
									type="number"
									min="0"
									step="1000"
									name="price"
									defaultValue={book.price}
								/>
							</div>
							<div className="w-full">
								<label className="block font-medium" htmlFor="sale">
									Giảm giá (0.00 ~ 1.00)
								</label>
								<input
									ref={register}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									min="0"
									max="1"
									step="0.01"
									type="number"
									name="sale"
									defaultValue={book.sale}
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between w-full space-x-8">
							<div className="w-full">
								<label className="block font-medium" htmlFor="categoryId">
									Danh mục
								</label>
								<select
									defaultValue={book.categoryId}
									ref={register}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500 focus:outline-none"
									name="categoryId">
									{categories.map((category: any, index: number) => (
										<option key={index} value={category.id} selected={category.id === book.categoryId}>
											{category.name}
										</option>
									))}
								</select>
							</div>
							<div className="w-full">
								<div className="flex justify-between">
									<label className="block font-medium" htmlFor="available">
										Số lượng
									</label>
									{errors.available && <span className="text-red-500">{errors.name && "Số lượng không được để trống"}</span>}
								</div>

								<input
									ref={register({required: true, min: 0})}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									type="number"
									min="0"
									name="available"
									defaultValue={book.available}
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between w-full space-x-8">
							<div className="w-full">
								<label className="block font-medium" htmlFor="keyword">
									Từ khóa (VD: abc, Abc, Xyz, ...)
								</label>
								<input
									defaultValue={book.keyWord}
									ref={register}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500"
									type="text"
									name="keyword"
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between w-full space-x-8">
							<div className="w-full">
								<label className="block font-medium" htmlFor="descripton">
									Mô tả
								</label>
								<textarea
									ref={register}
									className="w-full border border-gray-700 rounded-md px-2 py-1 focus:border-blue-500 focus:outline-none"
									name="descripton"
									rows={10}
									style={{resize: "vertical"}}
									defaultValue={book.description}
								/>
							</div>
						</div>
						{bookDetail.image !== image && <input ref={register} type="hidden" name="imageBase64" value={image} readOnly />}
						<div className="space-x-4">
							<button className="px-4 py-1 bg-green-400 rounded-sm text-white font-bold" type="submit">
								Submit
							</button>
							<button className="px-4 py-1 bg-red-400 rounded-sm text-white font-bold" type="reset">
								Reset
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
