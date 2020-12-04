import {Link} from "react-router-dom";

export default function SummaryCard(props: {color: string; icon: any; title: string; value: number; link: string}) {
	const {color, icon, title, value, link} = props;
	return (
		<Link
			to={link}
			className={`flex flex-row bg-white shadow-sm hover:shadow-lg rounded p-4 max-w-xs w-72 m-auto cursor-pointer card hover:bg-${color}-100 transition-colors duration-300`}>
			<div className={`flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-${color}-100`}>
				<img className="w-6 h-6" src={icon} alt="customer" />
			</div>
			<div className="flex flex-col flex-grow ml-4">
				<div className={`text-sm text-${color}-500 font-medium`}>{title}</div>
				<div className="font-bold text-lg">{value}</div>
			</div>
		</Link>
	);
}
