export default function Question(props: {
	question: string;
	agree: {content: string; color: string};
	disagree: {content: string; color: string};
	setAnswer: Function;
}) {
	const {question, agree, setAnswer, disagree} = props;

	return (
		<div className="fixed top-0 right-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 z-50 ">
			<div className={`p-5 bg-white flex flex-col items-center space-y-4 border-t-4 border-${disagree.color}-600`}>
				<h3 className="text-xl font-bold">{question}</h3>
				<div className="flex space-x-4 justify-center">
					<button
						onClick={() => setAnswer(disagree.content)}
						className={`px-8 py-2 rounded-md bg-${disagree.color}-500 hover:bg-${disagree.color}-600 text-white font-bold`}>
						{disagree.content}
					</button>
					<button
						onClick={() => setAnswer(agree.content)}
						className={`px-8 py-2 rounded-md bg-${agree.color}-500 hover:bg-${agree.color}-600 text-white font-bold`}>
						{agree.content}
					</button>
				</div>
			</div>
		</div>
	);
}
