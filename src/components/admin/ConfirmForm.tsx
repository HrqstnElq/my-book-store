import {deleteBook} from "api/productApi";
import {useRef} from "react";
import {useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function ConfirmForm(props: {bookAction: any; setBookAction: Function}) {
	const {bookAction, setBookAction} = props;
	const userState = useSelector((state: any) => state.user);
	const loadingRef = useRef<any>(null);

	const deleteHandler = () => {
		if (loadingRef.current) loadingRef.current.staticStart();
		deleteBook(bookAction.bookId, userState.current.token).then((res) => {
			if (res.data.success) {
				if (loadingRef.current) loadingRef.current.complete();
				setBookAction({bookId: 0, action: "ALL"});
			}
		});
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />

			<div className="bg-white rounded-lg p-8 space-y-7">
				<h1 className="text-xl font-medium">Chắc chắn xóa không ?</h1>
				<img className="block m-auto" src="https://www.flaticon.com/svg/static/icons/svg/595/595067.svg" alt="" style={{height: "100px"}} />
				<div className="flex justify-between mt-4 text-white">
					<button
						onClick={() => setBookAction({...bookAction, action: "ALL"})}
						className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-lg">
						Không
					</button>
					<button onClick={deleteHandler} className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-lg">
						Xóa đi
					</button>
				</div>
			</div>
		</div>
	);
}
