import { useState } from "react";
import { DropdownToolbar } from "md-editor-rt";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../FileUpload";

export default function UploadFileTool({
	insertFileLink,
}: {
	insertFileLink: (fileName: string, fileId: number) => void;
}) {
	const [visible, setVisible] = useState(false);
	const [isClick, setIsClick] = useState(false);
	const afterUpload = (files: Array<any>) => {
		const newFile = files[files.length - 1];
		if (!newFile) return;
		insertFileLink(newFile.fileName, newFile.fileId);
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
				overlay={<FileUpload afterUpload={afterUpload} />}
			/>
		</span>
	);
}
