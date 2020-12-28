/* eslint-disable react-hooks/exhaustive-deps */
import {getAllCategory} from "api/categoryApi";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import CategoryForm from "./CategoryForm";

export default function FilterBar(props: {query: any; setQuery: Function; categoryId: number}) {
	const {query, setQuery, categoryId} = props;
	const [categories, setCategory] = useState([]);
	const searchRef = useRef<HTMLInputElement>(null);
	const [optionState, setOptionState] = useState(categoryId);
	const [categoryFor, setCategoryFrom] = useState<any>();

	const [dsc, setDsc] = useState(false);
	const [isSuspend, setIsSuspend] = useState(false);

	useEffect(() => {
		getAllCategory().then((res) => {
			if (res.data.success) {
				setCategory(res.data.payload.categories);
			}
		});
	}, []);

	useEffect(() => {
		setQuery({
			...query,
			dsc: dsc,
			isSuspend: isSuspend,
		});
	}, [dsc, isSuspend]);

	useEffect(() => {
		setOptionState(categoryId);
	}, [categoryId]);

	const SubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current) {
			setQuery({
				...query,
				search: searchRef.current.value,
			});
		}
	};
	const onCategoryChange = (e: any) => {
		setOptionState(e.target.value);
		setQuery({
			...query,
			categoryId: e.target.value,
		});
	};
	const onSizeChange = (e: any) => {
		setQuery({
			...query,
			size: e.target.value,
			page: 1,
		});
	};
	const onSortChange = (e: any) => {
		setQuery({
			...query,
			orderBy: e.target.value,
		});
	};

	const categorieClickHandler = (e: any) => {
		setCategoryFrom(<CategoryForm setForm={setCategoryFrom} />);
	};

	return (
		<form autoComplete="off" className="" onSubmit={SubmitHandler}>
			{categoryFor}
			<div className="flex flex-col">
				<label className="font-semibold" htmlFor="search">
					Tìm kiếm
				</label>
				<input
					ref={searchRef}
					name="category"
					className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md bg-gray-100"
					placeholder="Tìm kiếm . . ."
				/>
			</div>

			<div className="mt-4 flex flex-col">
				<label className="font-semibold" htmlFor="category">
					Danh mục
				</label>
				<select
					value={optionState}
					id="category"
					onChange={onCategoryChange}
					name="category"
					className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md bg-gray-100">
					<option value="">Tất cả</option>
					{categories.map((category: any, index: number) => (
						<option key={index} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<button onClick={categorieClickHandler} className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md bg-gray-100">
					Quản lí danh mục
				</button>
			</div>

			<div className="mt-4 flex flex-col">
				<label className="font-semibold" htmlFor="size  ">
					Số lượng hiển thị
				</label>
				<select onChange={onSizeChange} name="size" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md bg-gray-100">
					{/* <option value="2">2</option> */}
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>

			<div className="mt-4 flex flex-col">
				<label className="font-semibold" htmlFor="sort">
					Sắp xếp theo
				</label>
				<select onChange={onSortChange} name="sort" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md bg-gray-100">
					<option value="id">Số thứ tự</option>
					<option value="name">Tên</option>
					<option value="price">Giá</option>
					<option value="sale">Giảm giá</option>
					<option value="yearScore">Bán chạy</option>
					<option value="available">Số lượng</option>
				</select>
			</div>

			<div className="mt-4 select-none w-32 flex justify-between items-center">
				<label className="font-semibold" htmlFor="dsc">
					Giảm dần
				</label>
				<input className="ml-4" type="checkbox" name="dsc" id="dsc" onChange={() => setDsc(!dsc)} />
			</div>

			<div className="mt-4 select-none w-32 flex justify-between items-center">
				<label className="font-semibold" htmlFor="isSuspend">
					Sách đã hết
				</label>
				<input onChange={() => setIsSuspend(!isSuspend)} className="ml-4" type="checkbox" name="isSuspend" id="isSuspend" />
			</div>
		</form>
	);
}
