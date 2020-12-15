import Rating from "components/Rating";
const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);
export default function BookRightBar() {
	return (
		<div className="book-right-bar flex p-4 pl-0">
			<div className="book--image">
				<img
					className="block"
					src="https://sachsuthattphcm.com.vn/wp-content/uploads/2018/10/lsdbvndxmh.png"
					alt="book"
					style={{width: "100px", height: "146px", objectFit: "cover"}}
				/>
			</div>
			<div className="book--content ml-2 flex flex-col justify-between" style={{width: "150px"}}>
				<div>
					<h3 className="font-medium">Lịch sử đảng cộng sản VN</h3>
					<p className="font-thin text-xs">Eren Yeager</p>
					<Rating star={5} count={4} color="yellow" />
					<p className="text-red-700 text-xl font-semibold flex-1">{VND(10000)}</p>
				</div>
				<div className="space-x-2">
					<button className="px-5 py-1 bg-gray-800 text-white rounded-lg text-sm hover:shadow-md hover:bg-gray-900">
						<i className="fas fa-cart-plus"></i>
					</button>
					<button className="px-5 py-1 bg-gray-100 text-black rounded-lg text-sm hover:shadow-md hover:bg-gray-200">
						<i className="fas fa-info"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
