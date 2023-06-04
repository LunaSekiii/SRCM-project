import { useState } from "react";
import { NormalToolbar } from "md-editor-rt";
import { FolderOpenOutlined } from "@ant-design/icons";

export default function FileListTool() {
	return (
		<NormalToolbar
			title='文件列表'
			onClick={() => {
				alert("open");
				// TODO:文件列表
			}}
			trigger={
				<span className='md-editor-icon' style={{ lineHeight: "100%" }}>
					<FolderOpenOutlined style={{ verticalAlign: "middle" }} />
				</span>
			}
		/>
	);
}
