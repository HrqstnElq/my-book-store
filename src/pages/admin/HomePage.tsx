import React from "react";
import Chart from "components/admin/Chart";
import Summary from "components/admin/Summary";

export default function HomePage() {
	return (
		<div className=" w-5/6 m-auto mt-4">
			<Summary />
			<Chart />
		</div>
	);
}
