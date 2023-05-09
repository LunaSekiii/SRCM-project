import React from "react";
import { blue } from "@ant-design/colors";

export default function TheTitle() {
	return (
		<div
			style={{
				height: "10rem",
				margin: 16,
				lineHeight: "2rem",
				fontSize: "1.3rem",
				fontWeight: "900",
				color: blue.primary,
				// whiteSpace: "nowrap",
				overflow: "hidden",
				// background: "rgba(255, 255, 255, 0.2)",
			}}
		>
			科研会议管理系统
		</div>
	);
}
