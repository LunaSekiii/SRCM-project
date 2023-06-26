import { useEffect, useState, useCallback } from "react";
import SideFileList from "@/components/FileList/SideFileList";
import SidePreviewFileList from "@/components/FileList/SidePriviewFileList";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { FileDTO } from "@/apis/conference";
import useEvents from "@/stores/useEvents";
import FileUpload from "@/components/FileUpload";

const defaultWidth = "calc(20vw + 150px)";

type FileBarProp = {
	fileList: Array<FileDTO>;
	preview?: boolean;
	meetingId?: number;
};

export default function FileBar({
	fileList,
	preview = false,
	meetingId = 1,
}: FileBarProp) {
	const [visible, setVisible] = useState(false);
	const [width, setWidth] = useState("0px");

	const fileBarVisibleHandle = (isShow = false) => {
		if (isShow) setWidth(defaultWidth);
		else setWidth("0px");
	};

	const fileBarSwitch = useCallback(() => {
		fileBarVisibleHandle(!visible);
		setVisible((v) => !v);
	}, [fileBarVisibleHandle]);

	const subEvent = useEvents((state) => state.subscribe);
	const unSubEvent = useEvents((state) => state.unSubscribe);

	useEffect(() => {
		subEvent("switchFileBar", fileBarSwitch);
		return () => {
			unSubEvent("switchFileBar", fileBarSwitch);
		};
	}, [fileBarSwitch]);

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
				transition: "all .2s",
			}}
		>
			{preview ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						overflowY: "hidden",
					}}
				>
					<SidePreviewFileList data={fileList} />
					<div style={{ height: "15%" }}>
						<FileUpload meetingId={meetingId} />
					</div>
				</div>
			) : (
				<SideFileList data={fileList} />
			)}
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
