import {getBooksPaging, pagingQuery} from "api/productApi";
import {useEffect} from "react";

export default function ProductPage() {
	useEffect(() => {
		var query: pagingQuery = {
			page: 1,
			size: 10,
			orderBy: "name",
		};
		getBooksPaging(query).then((res) => {
			console.log(res);
		});
	}, []);

	return <div>ProductPage</div>;
}
