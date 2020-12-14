export default function BookEdit(props: {setBookAction: Function; bookDetail: any}) {
	const {bookDetail, setBookAction} = props;
	console.log(bookDetail);

	return (
		<div className="bg-white w-11/12 rounded-lg overflow-y-scroll overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-gray-300">
			<div onClick={() => setBookAction({bookId: 0, action: "ALL"})} className="-top-1 w-5 h-5 cursor-pointer sticky">
				<i className="fas fa-times text-lg"></i>
			</div>
		</div>
	);
}
