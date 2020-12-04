import React, {useEffect, useState} from "react";
import Chart from "components/admin/Chart";
import Summary from "components/admin/Summary";
import {getSummary} from "api/Summary";
import {AxiosResponse} from "axios";

export default function HomePage() {
	const [data, setData] = useState({
		user: 0,
		product: 0,
		order: 0,
	});

	useEffect(() => {
		getSummary().then((res: AxiosResponse) => {
			if (res.data.success) {
				setData(res.data.payload);
			}
		});
	}, []);

	return (
		<div className=" w-5/6 m-auto mt-4">
			<Summary data={data} />
			<Chart />
		</div>
	);
}
