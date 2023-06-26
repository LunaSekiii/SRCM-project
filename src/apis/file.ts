import xf, { df } from ".";

export function uploadImg(fd: FormData) {
	return xf("/image/upload", {
		method: "POST",
		body: fd,
		// headers: { "Content-Type": "multipart/form-data" },
	});
}

export function getFileInfo(id: number) {
	return xf(`/file/${id}`);
}

export function downladFile(id: number) {
	return df("/file/download?fileId=" + id);
}

export function deleteFile(id: number) {
	return df("file/del/" + id);
}
