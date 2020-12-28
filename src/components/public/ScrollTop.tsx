export default function ScrollTop() {
	return (
		<button
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
			className="fixed bottom-4 right-4 w-12 h-12 bg-gray-400 hover:bg-gray-300 transition-colors bg-opacity-30 cursor-pointer rounded-full z-20">
			<i className="fal fa-angle-up"></i>
		</button>
	);
}
