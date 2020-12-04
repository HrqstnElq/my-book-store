import SummaryCard from "./SummaryCard";
import customerIcon from "../../assets/images/admin/customer.png";
import productIcon from "../../assets/images/admin/product.png";
import orderIcon from "../../assets/images/admin/order.png";
import chartIcon from "../../assets/images/admin/graph.png";

export default function Summary() {
	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
			<SummaryCard color="blue" icon={orderIcon} title="Đơn hàng" value={321} link="/admin/order" />
			<SummaryCard color="red" icon={productIcon} title="Sản phẩm" value={114} link="/admin/product" />
			<SummaryCard color="green" icon={customerIcon} title="Khách hàng" value={321} link="/admin/customer" />
			<SummaryCard color="yellow" icon={chartIcon} title="Tổng doanh thu" value={321} link="/admin/customer" />
		</div>
	);
}
