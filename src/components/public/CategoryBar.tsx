/* eslint-disable eqeqeq */
import React from "react";
import {Link} from "react-router-dom";

const classNames = require("classnames");

export default function CategoryBar(props: {categories: any; current: any; setCurrent: Function}) {
	const {current, setCurrent, categories} = props;

	const categoryClickHandler = (e: any) => {
		setCurrent(e.target.value);
	};

	return (
		<div className="w-full">
			<div className="flex justify-between font-bold my-4">
				<h3 className="text-2xl  text-indigo-900">Danh mục</h3>
				<Link to="/public/category">Tất cả</Link>
			</div>
			<ul className="category w-full flex justify-between">
				{categories.slice(0, 4).map((category: any) => (
					<li key={category.id}>
						<button
							onClick={categoryClickHandler}
							value={category.id}
							className={classNames("uppercase font-medium mb-5 hover:text-blue-700", {
								"border-b-2 border-blue-700 text-blue-700": current == category.id,
							})}>
							{category.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
