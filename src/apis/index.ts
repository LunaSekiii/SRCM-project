import { message } from "antd";

interface ApiArr {
	[PropName: string]: string;
}

const URLs: ApiArr = {
	mock: "https://mock.apifox.cn/m1/2691571-0-default",
	backEnd: "http://192.168.123.234",
	localProxy: "",
};
const ports: ApiArr = { https: ":8080", local: "/local" };

const baseURL: string = URLs.localProxy;
const basePort: string = ports.local;
const headers = new Headers();
headers.append("Accept", "*/*");
headers.append("with-credentials", "true");
const baseOption: RequestInit = {
	// 携带Cookie
	credentials: "include",
};

interface XResponse<T> {
	statue: {
		code: number;
		msg: string;
	};
	result: T;
}

/**
 * fetch封装
 */
const xf = (path = "", option?: RequestInit) => {
	return new Promise((resolve) => {
		fetch(baseURL + basePort + "/" + path, {
			...baseOption,
			...option,
		})
			.then(async (res) => {
				if (res?.status != 200) {
					try {
						const json = await res.json();
						const msg = json.status.msg;
						if (msg === "无权限:请登录") {
							message.error("未登录");
						} else message.error(json.status.msg);
					} catch (error) {
						message.error("网络异常", 5);
						console.error(error);
					}
				} else
					res.json().then((json) => {
						resolve(json.result);
					});
			})
			.catch((error) => {
				message.error("网络错误", 5);
				console.error(error);
			});
	});
};

/**
 * fetch封装
 */
export const df = (path = "", option?: RequestInit) => {
	return new Promise((resolve) => {
		fetch(baseURL + basePort + "/" + path, {
			...baseOption,
			...option,
		})
			.then(async (res) => {
				if (res?.status != 200) {
					try {
						const json = await res.json();
						const msg = json.status.msg;
						if (msg === "无权限:请登录") {
							message.error("未登录");
						} else message.error(json.status.msg);
					} catch (error) {
						message.error("网络异常", 5);
						console.error(error);
					}
				} else
					res.blob().then((blob) => {
						resolve(blob);
					});
			})
			.catch((error) => {
				message.error("网络错误", 5);
				console.error(error);
			});
	});
};

export default xf;
