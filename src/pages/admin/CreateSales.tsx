import RegisterForm from "components/RegisterForm";
import React from "react";

export default function CreateSales(props: {setForm: Function}) {
	const {setForm} = props;
	return (
		<div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-20">
			<div className="bg-white p-10 rounded-md relative" style={{width: "480px"}}>
				<RegisterForm isSale={true} setForm={setForm} />
				<button onClick={() => setForm(null)} className="fas fa-times absolute top-1 right-1"></button>
			</div>
		</div>
	);
}
