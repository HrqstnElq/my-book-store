import React, {useEffect, useRef, useState} from "react";
import Chart from "components/admin/Chart";
import Summary from "components/admin/Summary";
import {getSummary} from "api/Summary";
import {AxiosResponse} from "axios";
import LoadingBar from "react-top-loading-bar";

export default function HomePage() {
	const loadingRef = useRef<any>(null);

	const [data, setData] = useState({
		user: 0,
		order: 0,
		newOrder: 0,
		product: 0,
	});

	useEffect(() => {
		loadingRef?.current?.staticStart();
		getSummary({id: 1, abc: null}).then((res: AxiosResponse) => {
			if (res.data.success) {
				setData(res.data.payload);
				if (loadingRef.current) loadingRef.current.complete();
			}
		});
	}, []);

	return (
		<div className=" w-5/6 m-auto mt-4">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<Summary data={data} />
			<Chart />
		</div>
	);
}
