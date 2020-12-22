import SummaryCard from "./SummaryCard";
import customerIcon from "../../assets/images/admin/customer.png";
import productIcon from "../../assets/images/admin/product.png";
import orderIcon from "../../assets/images/admin/order.png";
import chartIcon from "../../assets/images/admin/graph.png";
import {useSelector} from "react-redux";

export default function Summary(props: {data: {user: number; product: number; order: number; newOrder: number}}) {
	const {data} = props;
	const user = useSelector((state: any) => state.user);
	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
			<SummaryCard color="yellow" icon={orderIcon} title="Đơn hàng mới" value={data.newOrder} link="/admin/order?status=0" />
			<SummaryCard color="blue" icon={chartIcon} title="Tổng đơn hàng" value={data.order} link="/admin/order" />
			<SummaryCard color="red" icon={productIcon} title="Sản phẩm" value={data.product} link="/admin/product" />
			{(user.current.role === "admin" && (
				<SummaryCard color="green" icon={customerIcon} title="Khách hàng" value={data.user} link="/admin/customer" />
			)) || <SummaryCard color="green" icon={customerIcon} title="Khách hàng" value={data.user} link="/admin" />}
		</div>
	);
}
