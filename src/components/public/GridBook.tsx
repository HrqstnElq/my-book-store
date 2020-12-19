import Book from "./Book";

export default function GridBook(props: {books: any}) {
	const {books} = props;
	return (
		<>
			{books.length === 0 && <p className="text-xl text-gray-700 uppercase my-5 mb-40">Không có cuốn sách nào </p>}
			<div className="grid grid-auto-min-w-80 gap-6 lg:justify-between justify-center">
				{books.length > 0 && books.map((book: any, index: any) => <Book key={index} book={book} />)}
			</div>
		</>
	);
}
