import {Bar, Line} from "react-chartjs-2";

export default function Chart() {
	return (
		<div className="chart flex justify-around flex-col lg:flex-row">
			<div className="bg-white p-5 mt-5 w-full lg:w-5/12 shadow-md">
				<Bar
					data={{
						labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
						datasets: [
							{
								label: "đơn hàng",
								backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
								data: [1010, 1012, 1013, 1010],
							},
						],
					}}
					options={{
						legend: {display: false},
						title: {
							display: true,
							text: "Số đơn hàng trong năm 1970",
						},
					}}
				/>
			</div>
			<div className="bg-white p-5 mt-5 w-full lg:w-5/12 shadow-md">
				<Line
					data={{
						labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11"],
						datasets: [
							{
								data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478, 2474],
								label: "5 sao",
								borderColor: "#3e95cd",
								fill: false,
							},
							{
								data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267, 5280],
								label: "4 sao",
								borderColor: "#8e5ea2",
								fill: false,
							},
							{
								data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734, 769],
								label: "3 sao",
								borderColor: "#3cba9f",
								fill: false,
							},
							{
								data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784, 798],
								label: "2 sao",
								borderColor: "#e8c3b9",
								fill: false,
							},
							{
								data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433, 798],
								label: "1 sao",
								borderColor: "#c45850",
								fill: false,
							},
						],
					}}
					options={{
						title: {
							display: true,
							text: "Tỉ lệ đánh giá trong năm 1970",
						},
						legend: {
							display: true,
							position: "bottom",
						},
					}}
				/>
			</div>
		</div>
	);
}
