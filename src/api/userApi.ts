export const userApi = {
	getMe: () => {
		return new Promise((resolve: any, reject: any) => {
			reject(new Error("Login false !"));
			// setTimeout(() => {
			// 	resolve({
			// 		id: "1234560",
			// 		name: "John",
			// 		email: "test@gmail.com",
			// 		photoUrl: "https://www.flaticon.com/svg/static/icons/svg/619/619034.svg",
			// 	});
			// }, 500);
		});
	},
};
