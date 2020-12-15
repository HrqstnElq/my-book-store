import Book from "./Book";

export default function GridBook(props: {books: any}) {
	const {books} = props;
	return (
		<div className="grid grid-auto-min-w-80 gap-6 lg:justify-between justify-center">
			{books.map(() => (
				<Book />
			))}
		</div>
	);
}
