/* eslint-disable react-hooks/exhaustive-deps */
import {getAllCategory} from "api/category";
import {FormEvent, useEffect, useRef, useState} from "react";

export default function FilterBar(props: {query: any; setQuery: Function}) {
	const {query, setQuery} = props;
	const [categories, setCategory] = useState([]);
	const searchRef = useRef<HTMLInputElement>(null);
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

	return (
		<form autoComplete="off" className="" onSubmit={SubmitHandler}>
			<div className="flex flex-col">
				<label className="font-semibold" htmlFor="search">
					Tìm kiếm
				</label>
				<input ref={searchRef} name="category" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md" placeholder="Tìm kiếm . . ." />
			</div>

			<div className="mt-4 flex flex-col">
				<label className="font-semibold" htmlFor="category">
					Danh mục
				</label>
				<select onChange={onCategoryChange} name="category" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md">
					<option value="">Tất cả</option>
					{categories.map((category: any, index: number) => (
						<option key={index} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className="mt-4 flex flex-col">
				<label className="font-semibold" htmlFor="size  ">
					Số lượng hiển thị
				</label>
				<select onChange={onSizeChange} name="size" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md">
					<option value="2">2</option>
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
				<select onChange={onSortChange} name="sort" className="w-52 mt-2 p-1 px-2 focus:outline-none rounded-md">
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
