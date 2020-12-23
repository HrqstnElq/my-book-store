import {useRef} from "react";

export default function SortBar(props: {query: any; setQuery: Function}) {
	const {query, setQuery} = props;
	const selectRef = useRef<HTMLSelectElement>(null);

	const selectHandler = (e: any) => {
		setQuery({
			...query,
			orderBy: selectRef?.current?.value,
			dsc: selectRef?.current?.selectedOptions[0].dataset.isdsc,
		});
	};
	return (
		<div className="flex space-x-4">
			<p className="font-medium">Sắp xếp theo</p>
			<select ref={selectRef} onChange={selectHandler} className="px-2 outline-none">
				<option value="name" data-isdsc="false">
					Tên A-Z
				</option>
				<option value="name" data-isdsc="true">
					Tên Z-A
				</option>
				<option value="price" data-isdsc="false">
					Giá tăng dần
				</option>
				<option value="price" data-isdsc="true">
					Giá giảm dần
				</option>
			</select>
		</div>
	);
}
