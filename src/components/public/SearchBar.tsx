/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";

function SearchBar(props: {query?: any; setQuery?: Function}) {
	const history = useHistory<any>();
	const {query, setQuery} = props;
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current && history.location.state?.search) inputRef.current.value = history.location.state?.search;
		if (history.location.state?.search) {
			if (query && setQuery) {
				setQuery({
					...query,
					search: history.location.state?.search,
				});
			}
		}
	}, [history.location.state?.search]);

	const submitHandler = (event: any) => {
		event.preventDefault();

		if (history.location.pathname !== "/public/search") {
			history.push({
				pathname: "/public/search",
				state: {search: inputRef.current?.value},
			});
		}
		if (query && setQuery) {
			setQuery({
				...query,
				search: inputRef.current?.value,
			});
		}
	};

	return (
		<form className="relative w-ful" autoComplete="off" onSubmit={submitHandler}>
			<input
				ref={inputRef}
				className="w-full h-10 pl-10 pr-5 rounded-full bg-gray-100"
				type="text"
				name="search"
				placeholder="Tìm cuốn sách bạn yêu thích ..."
			/>
			<i className="fas fa-search absolute pos-center left-3 text-gray-700"></i>
		</form>
	);
}

export default React.memo(SearchBar);
