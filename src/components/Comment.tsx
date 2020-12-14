export default function Comment(props: {comment: any}) {
	const {comment} = props;
	return (
		<div className="bg-white rounded-lg p-3  flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
			<div className="flex flex-row justify-center mr-2">
				<img alt="avatar" width="48" height="48" className="rounded-full w-10 h-10 mr-4 shadow-lg mb-4" src={comment.avatar} />
				<h3 className="font-semibold text-lg text-center md:text-left ">{comment.username}</h3>
			</div>

			<p style={{width: "90%"}} className="text-gray-600 text-lg text-center md:text-left ">
				{comment.comment}
			</p>
		</div>
	);
}
