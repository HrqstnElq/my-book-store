export default function CategoryForm(props: {setForm: Function}) {
	const {setForm} = props;
	return (
		<div className="w-screen h-screen top-0 left-0 fixed bg-black bg-opacity-50 flex justify-center items-center z-20">
			<div className="bg-white w-11/12 h-5/6 rounded-lg overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-gray-300">
				<div onClick={() => setForm(null)} className="-top-1 w-5 h-5 cursor-pointer sticky">
					<i className="fas fa-times text-lg"></i>
				</div>
			</div>
		</div>
	);
}
