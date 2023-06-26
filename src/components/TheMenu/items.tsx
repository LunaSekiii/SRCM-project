import React from "react";
import {
	LineChartOutlined,
	CalendarOutlined,
	FolderOutlined,
	TeamOutlined,
	ProjectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

function getNestedKey(parentKey: string, currentKey: string): string {
	return [parentKey, currentKey].join("/");
}

const items: MenuProps["items"] = [
	// 欢迎
	getItem("数据总览", "data", <LineChartOutlined />),
	// 会议
	getItem("会议日程", "conference", <CalendarOutlined />, [
		getItem("全部会议", getNestedKey("conference", "view")),
		getItem("创建会议", getNestedKey("conference", "create")),
	]),
	// 文件
	getItem("文件管理", "file", <FolderOutlined />, [
		getItem("我的文件", getNestedKey("file", "self")),
		// getItem("小组文件", getNestedKey("file", "group")),
		// getItem("项目文件", getNestedKey("file", "project"), null, [
		// 	getItem("项目1", getNestedKey(getNestedKey("file", "self"), "1")),
		// 	getItem("项目2", getNestedKey(getNestedKey("file", "self"), "2")),
		// ]),
	]),
	// 用户
	getItem("用户设置", "user", <TeamOutlined />, [
		getItem("用户列表", getNestedKey("user", "view")),
		getItem("创建用户", getNestedKey("user", "create")),
		// getItem("用户分组", getNestedKey("user", "group")),
	]),
	// // 项目
	// getItem("项目管理", "project", <ProjectOutlined />, [
	// 	getItem("我的项目", getNestedKey("project", "self")),
	// 	getItem("创建项目", getNestedKey("project", "create")),
	// ]),
	// { type: "divider" },
];

export default items;
