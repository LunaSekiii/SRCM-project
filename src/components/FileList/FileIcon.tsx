import { memo } from "react";
import {
	FileOutlined,
	FolderOutlined,
	FileZipOutlined,
	FilePdfOutlined,
	FileWordOutlined,
	FilePptOutlined,
	FileExcelOutlined,
	FileMarkdownOutlined,
	FileJpgOutlined,
	FileGifOutlined,
	FileImageOutlined,
} from "@ant-design/icons";

const typeMap2Icon: { [type: string]: React.ReactNode } = {
	file: <FileOutlined />,
	folder: <FolderOutlined />,
	// compress
	zip: <FileZipOutlined />,
	rar: <FileZipOutlined />,
	"7z": <FileZipOutlined />,
	// doc
	pdf: <FilePdfOutlined />,
	doc: <FileWordOutlined />,
	docx: <FileWordOutlined />,
	ppt: <FilePptOutlined />,
	pptx: <FilePptOutlined />,
	xls: <FileExcelOutlined />,
	xlsx: <FileExcelOutlined />,
	csv: <FileExcelOutlined />,
	md: <FileMarkdownOutlined />,
	// image
	jpg: <FileJpgOutlined />,
	jpeg: <FileJpgOutlined />,
	gif: <FileGifOutlined />,
	png: <FileImageOutlined />,
	webp: <FileImageOutlined />,
};

const FileIcon = memo(function FileIcon({ type }: { type: string }) {
	return (
		<div style={{ fontSize: "2rem", margin: "-1rem" }}>
			{typeMap2Icon[type] || typeMap2Icon["file"]}
		</div>
	);
});

export default FileIcon;
