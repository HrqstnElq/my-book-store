/* eslint-disable eqeqeq */
import {addCategory, editCategory, getAllCategory} from "api/categoryApi";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

export default function CategoryForm(props: {setForm: Function}) {
	const [categories, setCategories] = useState([]);
	const user = useSelector((state: any) => state.user);
	const [update, setUpdate] = useState<any>();
	const newCategoryNameRef = useRef<HTMLInputElement>(null);
	const newCategoryKeywordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		getAllCategory().then((res) => {
			if (res.data.success) setCategories(res.data.payload.categories);
			else setCategories([]);
		});
	}, []);

	const UpdateCategoryHandler = (id: number) => {
		var name = document.getElementById(id.toString())?.querySelector<HTMLInputElement>(".name")?.value;
		var keyword = document.getElementById(id.toString())?.querySelector<HTMLInputElement>(".keyword")?.value;

		editCategory(
			id,
			{
				name: name,
				keyword: keyword,
			},
			user.current.token
		);
		setUpdate("");
	};

	const onSubmit = () => {
		if (newCategoryNameRef.current && newCategoryKeywordRef.current) {
			addCategory(user.current.token, {name: newCategoryNameRef.current.value, keyword: newCategoryKeywordRef.current?.value}).then(
				(result) => {
					if (result.data.success) {
						if (newCategoryNameRef.current && newCategoryKeywordRef.current) {
							newCategoryNameRef.current.value = "";
							newCategoryKeywordRef.current.value = "";
						}
					} else {
						alert("Lỗi ! Không thêm được");
					}
				}
			);
		}
	};

	const {setForm} = props;
	return (
		<div className="w-screen h-screen top-0 left-0 fixed bg-black bg-opacity-50 flex justify-center items-center z-20">
			<div className="bg-gray-100 lg:w-1/2 w-5/6  h-5/6 rounded-lg overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-gray-300 relative">
				<div onClick={() => setForm(null)} className="top-0 left-1 w-5 h-5 cursor-pointer absolute">
					<i className="fas fa-times text-lg"></i>
				</div>
				<div className=" mx-5">
					<div className="bg-white shadow-md rounded my-6">
						<table className="text-left w-full border-collapse">
							<thead>
								<tr>
									<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
										Name
									</th>
									<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
										Keywords
									</th>
									<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category: any, index: number) => (
									<tr id={category.id} key={index} className="hover:bg-grey-lighter">
										<td className="py-4 px-6 border-b border-grey-light">
											<input className="name" type="text" defaultValue={category.name} readOnly={!update == category.id} />
										</td>
										<td className="py-4 px-6 border-b border-grey-light">
											<input
												className="keyword"
												type="text"
												defaultValue={category.keyword}
												readOnly={!update == category.id}
											/>
										</td>
										<td className="py-4 px-6 border-b border-grey-light">
											{(category.id == update && (
												<button
													onClick={() => UpdateCategoryHandler(category.id)}
													className="font-bold py-1 w-12 rounded-lg text-xs bg-green-100 hover:bg-green-200">
													update
												</button>
											)) || (
												<button
													onClick={() => setUpdate(category.id)}
													className="font-bold py-1 w-12 rounded-lg text-xs bg-yellow-100 hover:bg-yellow-200">
													edit
												</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div>
						<div className="bg-white shadow-md rounded my-6 p-4 space-y-2">
							<div className="flex space-y-4 flex-col">
								<label className="font-bold" htmlFor="name">
									Category name
								</label>
								<input ref={newCategoryNameRef} name="name" type="text" id="name" className="border" />
							</div>
							<div className="flex space-y-4 flex-col">
								<label className="font-bold" htmlFor="name">
									Keywords
								</label>
								<input ref={newCategoryKeywordRef} name="keyword" type="text" id="keyword" className="border" />
							</div>
							<button onClick={onSubmit} className="rounded-md bg-green-200 hover:bg-green-300 px-4 font-bold py-1">
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
