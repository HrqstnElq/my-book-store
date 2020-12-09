import "./Pagination.css";
const classNames = require("classnames");

const classButton =
	"button w-8 h-8 bg-white border border-gray-800 rounded-full focus:outline-none hover:bg-gray-600 hover:text-white active:bg-gray-700 font-medium transition-colors duration-100";

export default function Pagination(props: {totalPage: number; query: any; setQuery: Function}) {
	const {totalPage, query, setQuery} = props;

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
			if (query.page - 4 <= 0) {
				if (i > 0 && i < 9) Pages = [...Pages, ButtonPage(i, query.page)];
				if (i === totalPage && totalPage >= 9) Pages = [...Pages, <div>. . .</div>];
			} else if (query.page + 4 >= totalPage) {
				if (i === 1) Pages = [<div>. . .</div>, ...Pages];
				if (i > totalPage - 8 && i <= totalPage) Pages = [...Pages, ButtonPage(i, query.page)];
			} else {
				if (i === 1) Pages = [<div>. . .</div>, ...Pages];
				if (i > query.page - 4 && i < query.page + 4) Pages = [...Pages, ButtonPage(i, query.page)];
				if (i === totalPage && totalPage >= 9) Pages = [...Pages, <div>. . .</div>];
			}
		}
	}

	return <div className="flex flex-row justify-center w-80 m-auto mt-4">{Pages}</div>;
}
