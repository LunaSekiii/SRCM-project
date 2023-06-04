import xf from ".";

export function uploadImg(fd: FormData) {
	return xf("/image/upload", {
		method: "POST",
		body: fd,
		// headers: { "Content-Type": "multipart/form-data" },
	});
}
