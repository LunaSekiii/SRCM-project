import xf from ".";
import type { UserInfo, FileList } from "./conference";

export function login(username: string, password: string) {
	return xf(`user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `username=${username}&password=${password}`,
	}) as Promise<UserInfo>;
}

export function loginState() {
	return xf("uert/info");
}

export function logout() {
	return xf("user/logout");
}

/**
 * 获取用户列表
 */
export function getUserList() {
	return xf("user/list") as Promise<UserInfo[]>;
}

/**
 * 编辑用户信息参数（管理员）
 */
export interface UserInfo4Admin {
	userName?: string;
	password?: string;
	userInfoName?: string;
	studentId?: string;
	userRole?: number;
	grade?: string;
}

/**
 * 创建用户（管理员）
 */
export function saveUser(userInfo: UserInfo4Admin) {
	return xf("user/save", {
		method: "POST",
		body: JSON.stringify(userInfo),
		headers: { "Content-Type": "application/json" },
	});
}

/**
 * 用户信息参数
 */
export interface UserAllInfo {
	userInfo: UserInfo;
	fileList: FileList;
}

/**
 * 查询用户信息
 */
export function getUserInfo(id: number) {
	return xf(`/user/${id}`) as Promise<UserAllInfo>;
}

/**
 * 普通用户修改信息(只用于修改密码)
 */
export function updateUserInfo(userInfo: Object) {
	return xf("/user/update", {
		method: "POST",
		body: JSON.stringify(userInfo),
		headers: { "Content-Type": "application/json" },
	});
}

/**
 * 删除用户接口
 */
export function deleteUser(userId: number) {
	return xf(`user/del/${userId}`);
}
