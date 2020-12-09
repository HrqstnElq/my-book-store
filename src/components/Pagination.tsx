import "./Pagination.css";
const classNames = require("classnames");

const classButton =
	"button w-8 h-8 bg-transparent border border-gray-800 rounded-full focus:outline-none hover:bg-gray-600 hover:text-white active:bg-gray-700 font-medium transition-colors duration-200";

export default function Pagination(props: {size: number; totalPage: number; query: {page: number}; setQuery: Function}) {
	const {totalPage, size, query, setQuery} = props;

	var Pages: any = [];
	const ButtonPage = (i: number, currentPage: number) => (
		<button
			onClick={() =>
				setQuery({
					...query,
					page: i,
				})
			}
			className={classNames(classButton, {"bg-gray-700 text-white": currentPage === i})}
			key={i}>
			{i}
		</button>
	);

	if (totalPage > 1) {
		for (let i = 1; i <= totalPage; i++) {
			if (query.page - Math.ceil(size / 2) <= 0) {
				if (i > 0 && i <= size) Pages = [...Pages, ButtonPage(i, query.page)];
				if (i === totalPage && totalPage > size) Pages = [...Pages, <div className="mx-2">. . .</div>];
			} else if (query.page + Math.ceil(size / 2) >= totalPage) {
				if (i === 1) Pages = [<div className="mx-2">. . .</div>, ...Pages];
				if (i > totalPage - size && i <= totalPage) Pages = [...Pages, ButtonPage(i, query.page)];
			} else {
				if (i === 1) Pages = [<div className="mx-2">. . .</div>, ...Pages];
				if (i > query.page - Math.ceil(size / 2) && i < query.page + Math.ceil(size / 2)) Pages = [...Pages, ButtonPage(i, query.page)];
				if (i === totalPage && totalPage > size) Pages = [...Pages, <div className="mx-2">. . .</div>];
			}
		}

		Pages = [
			<button
				key={0}
				disabled={query.page <= 1}
				onClick={() =>
					setQuery({
						...query,
						page: query.page - 1,
					})
				}
				className={classNames(classButton, {"cursor-default opacity-0": query.page <= 1})}>
				<i className="fas fa-angle-left"></i>
			</button>,
			...Pages,
			<button
				key={totalPage + 1}
				disabled={query.page >= totalPage}
				onClick={() =>
					setQuery({
						...query,
						page: query.page + 1,
					})
				}
				className={classNames(classButton, {"cursor-default opacity-0": query.page >= totalPage})}>
				<i className="fas fa-angle-right"></i>
			</button>,
		];
	}

	return <div className="flex flex-row justify-center m-auto mt-4">{Pages}</div>;
}
