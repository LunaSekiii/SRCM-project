import { useState } from "react";
import SideFileList from "@/components/FileList/SideFileList";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { FileDTO } from "@/apis/conference";

const defaultWidth = "calc(20vw + 150px)";

export default function FileBar({ fileList }: { fileList: Array<FileDTO> }) {
	const [visible, setVisible] = useState(false);
	const [width, setWidth] = useState("0px");

	const fileBarVisibleHandle = (isShow = false) => {
		if (isShow) setWidth(defaultWidth);
		else setWidth("0px");
	};

	const fileBarSwitch = () => {
		fileBarVisibleHandle(!visible);
		setVisible((v) => !v);
	};

	return (
		<div
			style={{
				position: "absolute",
				top: "0",
				right: "0",
				width,
				height: "100%",
				backgroundColor: "#fff",
				display: "flex",
				alignItems: "start",
				justifyContent: "center",
				boxShadow: "rgba(0, 0, 0, 0.08)	-12px  0px 48px 16px",
				// transform: visible ? "" : "scaleX(0)",
				transition: "all .2s",
			}}
		>
			<SideFileList data={fileList} />
			<Button
				type='primary'
				shape='circle'
				size='large'
				style={{
					position: "absolute",
					top: "50%",
					right: width,
					transform: visible
						? "translate(50%, -50%)"
						: "translate(0%, -50%)",
					transition: "all .2s",
				}}
				title='文件列表'
				onClick={fileBarSwitch}
			>
				<SideBarIcon right={visible} />
			</Button>
		</div>
	);
}

const SideBarIcon = ({ right = true }) => {
	return right ? <RightOutlined /> : <LeftOutlined />;
};
