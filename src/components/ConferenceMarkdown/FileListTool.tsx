import { useState } from "react";
import { NormalToolbar } from "md-editor-rt";
import { FolderOpenOutlined } from "@ant-design/icons";
import useEvents from "@/stores/useEvents";

export default function FileListTool() {
	const pubEvent = useEvents((state) => state.publish);
	return (
		<NormalToolbar
			title='文件列表'
			onClick={() => {
				pubEvent("switchFileBar", []);
			}}
			trigger={
				<span className='md-editor-icon' style={{ lineHeight: "100%" }}>
					<FolderOpenOutlined style={{ verticalAlign: "middle" }} />
				</span>
			}
		/>
	);
}
