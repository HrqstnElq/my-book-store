export default function SearchBar() {
	return (
		<form className="relative w-ful">
			<input
				className="w-full h-10 pl-10 pr-5 rounded-full bg-gray-100"
				type="text"
				name=""
				id=""
				placeholder="Tìm cuốn sách bạn yêu thích ..."
			/>
			<i className="fas fa-search absolute pos-center left-3 text-gray-700"></i>
		</form>
	);
}
