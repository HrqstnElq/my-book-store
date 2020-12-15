import Rating from "../Rating";

const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);

export default function Book() {
	return (
		<div className="flex my-4">
			<img
				className="w-32 h-48 mr-4 object-cover transform hover:scale-110 duration-100"
				src="https://i2.wp.com/scarhoof.com/wp-content/uploads/2018/09/cropped-3d-render-book-transparent-background.png"
				alt=""
			/>
			<div className="flex flex-col justify-between py-4">
				<h3 className="text-xl font-semibold text-indigo-900">The Heart of Hell</h3>
				<p>Mitch Weiss</p>
				<Rating star={3} count={5} color="yellow" />
				<p className="text-red-700 text-xl font-semibold flex-1">{VND(10000)}</p>
				<div className="flex justify-between">
					<button className="shadow rounded-lg py-1 px-2 bg-gray-800 hover:bg-gray-900 text-white mr-2 duration-200 text-sm">
						Thêm vào giỏ
					</button>
					<button className="shadow rounded-lg py-1 px-2 bg-gray-100 hover:bg-gray-200 text-sm">Chi tiết</button>
				</div>
			</div>
		</div>
	);
}
