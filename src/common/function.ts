const AES = require("crypto-js/aes");
const Utf8 = require("crypto-js/enc-utf8");
const key = "AnNguyenBook";

export const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);

export const Encrypt = (data: string) => {
	return AES.encrypt(data, key)?.toString() || "";
};

export const Decrypt = (encrypted: string) => {
	var decrypted = AES.decrypt(encrypted, key)?.toString(Utf8) || "[]";
	return decrypted;
};
