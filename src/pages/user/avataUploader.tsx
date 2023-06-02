import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("只能够上传 JPG/PNG 文件！");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("图片必须小于 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const AvatarUploader = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const handleChange: UploadProps["onChange"] = (
		info: UploadChangeParam<UploadFile>
	) => {
		// if (info.file.status === "uploading") {
		// 	setLoading(true);
		// 	return;
		// }
		// if (info.file.status === "done") {
		// Get this url from response in real world.
		getBase64(info.file.originFileObj as RcFile, (url) => {
			setLoading(false);
			setImageUrl(url);
		});
		// }
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>上传</div>
		</div>
	);

	return (
		<ImgCrop rotationSlider cropShape="round">
			<Upload
				name="avatar"
				listType="picture-circle"
				className="avatar-uploader"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="avatar"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: "50%",
						}}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</ImgCrop>
	);
};

export default AvatarUploader;
