import {VND} from "common/function";
export default function Book(props: {book: any; setBookAction: Function}) {
	const {book, setBookAction} = props;

	return (
		<div className="book bg-gray-100 hover:shadow-md cursor-pointer relative transition-all rounded-sm">
			<div className="book-image">
				<img
					className="bg-blue-900 block m-auto"
					src={book.image}
					alt={book.name}
					style={{width: "120px", height: "180px", objectFit: "cover"}}
				/>
			</div>
			<div className="book-info p-1">
				<h1 className="book-info--title font-medium text-sm">{book.name}</h1>
				<h1 className="book-info--title text-sm">{book.category}</h1>
				<div className="flex justify-between">
					{(book.sale === 0 && <p className="text-sm">{VND(book.price)}</p>) || (
						<p className="text-sm text-yellow-500">{VND(book.price * (1 - book.sale))}</p>
					)}
					<p className="text-sm">SL: {book.available}</p>
				</div>
			</div>
			<div id="book-action" className="action flex flex-col absolute right-0 top-0">
				<button
					onClick={() => setBookAction({bookId: book.id, action: "DETAIL"})}
					className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full focus:outline-none">
					<i className="fal fa-info text-white block m-auto"></i>
				</button>
				<button
					onClick={() => setBookAction({bookId: book.id, action: "EDIT"})}
					className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 rounded-full focus:outline-none">
					<i className="fal fa-pen text-white block m-auto"></i>
				</button>
				<button
					onClick={() => setBookAction({bookId: book.id, action: "DELETE"})}
					className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full focus:outline-none">
					<i className="far fa-trash text-white block m-auto"></i>
				</button>
			</div>
		</div>
	);
}
