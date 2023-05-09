import { Tree } from "antd";
import {
	FolderOutlined,
	FolderOpenOutlined,
	FileZipOutlined,
} from "@ant-design/icons";
import type { DataNode, TreeProps } from "antd/es/tree";

const treeData: DataNode[] = [
	{
		title: "DFL资料",
		key: "0-0",
		// icon: <FolderOutlined />,
		// switcherIcon: <FolderOpenOutlined />,
		children: [
			{
				title: "蓝牙设备文档",
				key: "0-0-0",
				children: [
					{
						title: "安装教程.pdf",
						key: "0-0-0-0",
					},
					{
						title: "使用教程.pdf",
						key: "0-0-0-1",
					},
				],
			},
			{
				title: "模型数据集.zip",
				key: "0-0-1",
				icon: <FileZipOutlined />,
			},
		],
	},
];

export default function FileView({
	selectFile,
}: {
	selectFile: (v: string) => void;
}) {
	const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
		// console.log("selected", selectedKeys, info);
		selectFile(selectedKeys[0].toString());
	};

	const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
		// console.log("onCheck", checkedKeys, info);
	};
	return (
		<Tree
			checkable
			defaultExpandedKeys={["0-0-0", "0-0-1"]}
			defaultSelectedKeys={["0-0-0", "0-0-1"]}
			defaultCheckedKeys={["0-0-0", "0-0-1"]}
			onSelect={onSelect}
			onCheck={onCheck}
			treeData={treeData}
		/>
	);
}
