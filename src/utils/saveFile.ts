export default function saveFile(data: Blob, fileName: string) {
	// data为blob格式
	var blob = new Blob([data]);
	var downloadElement = document.createElement("a");
	var href = window.URL.createObjectURL(blob);
	downloadElement.href = href;
	downloadElement.download = fileName;
	document.body.appendChild(downloadElement);
	downloadElement.click();
	document.body.removeChild(downloadElement);
	window.URL.revokeObjectURL(href);
}
