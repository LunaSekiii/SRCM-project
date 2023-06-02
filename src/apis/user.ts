import xf from ".";

export function login(username: string, password: string) {
	xf(`user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `username=${username}&password=${password}`,
	}).then();
}
