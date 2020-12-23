export default function Message(props: {content: string; button: string; color: string; setMode: Function}) {
	const {content, button, color, setMode} = props;
	return (
		<div className="fixed top-0 right-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 z-50 ">
			<div className={`p-5 bg-white flex flex-col items-center space-y-4 border-t-4 border-${color}-600`}>
				<h3 className="text-xl font-bold">{content}</h3>
				<button onClick={() => setMode(button)} className={`px-8 py-2 rounded-md bg-${color}-500 hover:bg-${color}-600 text-white font-bold`}>
					{button}
				</button>
			</div>
		</div>
	);
}
