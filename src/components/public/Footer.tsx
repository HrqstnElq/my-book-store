import React from "react";

export default function Footer() {
	return (
		<div className="bg-gray-100 mt-10">
			<div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">Home</p>
					<p className="my-3 block">
						Services <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Products <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						About Us <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Pricing <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Partners <span className="text-teal-600 text-xs p-1">New</span>
					</p>
				</div>
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">User</p>
					<p className="my-3 block">
						Sign in <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						New Account <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Demo <span className="text-teal-600 text-xs p-1">New</span>
					</p>
					<p className="my-3 block">
						Career <span className="text-teal-600 text-xs p-1">We're hiring</span>
					</p>
					<p className="my-3 block">
						Surveys <span className="text-teal-600 text-xs p-1">New</span>
					</p>
				</div>
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">Resources</p>
					<p className="my-3 block">
						Documentation <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Tutorials <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Support <span className="text-teal-600 text-xs p-1">New</span>
					</p>
				</div>
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">Product</p>
					<p className="my-3 block">
						Our Products <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Great Deals <span className="text-teal-600 text-xs p-1">New</span>
					</p>
					<p className="my-3 block">
						Analytics <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Mobile <span className="text-teal-600 text-xs p-1"></span>
					</p>
				</div>
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">Support</p>
					<p className="my-3 block">
						Help Center <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
					</p>
					<p className="my-3 block">
						Conditions <span className="text-teal-600 text-xs p-1"></span>
					</p>
				</div>
				<div className="p-5 w-48 ">
					<p className="text-xs uppercase text-gray-500 font-medium">Contact us</p>
					<p className="my-3 block">
						anguyenbook@gmail.com<span className="text-teal-600 text-xs p-1"></span>
					</p>
				</div>
			</div>

			<div className="bg-gray-100 pt-2 ">
				<div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col md:flex-row max-w-6xl">
					<p className="mt-2">© Copyright 2020. All Rights Reserved.</p>
					<div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex"></div>
				</div>
			</div>
		</div>
	);
}
