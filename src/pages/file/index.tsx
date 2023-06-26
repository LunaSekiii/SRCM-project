import { useState } from "react";
import { Card } from "antd";
import FileView from "./FileView";
import FileSpaceInfo from "./FileSpaceInfo";
import FileSpace from "./FileSpace";

import useLogin from "@/stores/useLogin";

export default function File() {
	const [currentFile, setCurrentFile] = useState("0-0");
	const selectFile = (key: string) => setCurrentFile(key);
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				padding: "3rem",
				display: "flex",
				gap: "1rem",
			}}
		>
			<Card
				title='文件目录'
				bordered={false}
				style={{
					width: "50%",
					height: "100%",
					overflowX: "hidden",
				}}
			>
				<FileView selectFile={selectFile} />
			</Card>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "50%",
					height: "100%",
					gap: "1rem",
				}}
			>
				<Card
					title='文件详情'
					bordered={false}
					style={{
						width: "100%",
						height: "50%",
						overflowX: "hidden",
					}}
				>
					<FileSpaceInfo fileKey={currentFile} />
				</Card>
				<Card
					title='储存空间'
					bordered={false}
					style={{
						width: "100%",
						height: "50%",
						overflow: "hidden",
					}}
				>
					<FileSpace />
				</Card>
			</div>
		</div>
	);
}
