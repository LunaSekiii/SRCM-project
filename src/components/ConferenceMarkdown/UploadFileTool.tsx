import { useState } from "react";
import { DropdownToolbar } from "md-editor-rt";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../FileUpload";
import type { FileDTO } from "@/apis/conference";

export default function UploadFileTool({
	insertFileLink,
	meetingId,
}: {
	insertFileLink: (file: FileDTO) => void;
	meetingId?: number;
}) {
	const [visible, setVisible] = useState(false);
	const [isClick, setIsClick] = useState(false);
	const afterUpload = (files: Array<any>) => {
		const newFile = files[files.length - 1];
		if (!newFile) return;
		insertFileLink(newFile);
		console.log("newFile", newFile);
	};
	return (
		<span
			onClick={() => {
				setIsClick((e) => !e);
			}}
		>
			<DropdownToolbar
				title='文件上传'
				visible={visible}
				onChange={() => {
					if (isClick) return;
					setVisible((e) => !e);
				}}
				trigger={
					<span
						className='md-editor-icon'
						style={{ lineHeight: "100%" }}
					>
						<UploadOutlined style={{ verticalAlign: "middle" }} />
					</span>
				}
				overlay={
					<FileUpload
						afterUpload={afterUpload}
						meetingId={meetingId}
					/>
				}
			/>
		</span>
	);
}
