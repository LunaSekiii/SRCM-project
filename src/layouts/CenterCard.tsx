import React from "react";
import { Card, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

/**
 * 表单等功能的Card外框
 * @param children
 * @returns
 */
export default function CenterCard({
	children,
	title,
	backPoint = false,
}: {
	children: React.ReactNode;
	title?: React.ReactNode;
	backPoint?: boolean;
}) {
	const navigate = useNavigate();
	return (
		<Card
			style={{
				padding: backPoint
					? "10px 30px 30px 0px"
					: "30px 30px 30px 0px",
			}}
			bordered={false}
			className='p-center'
			title={
				backPoint ? (
					<Space>
						<Button
							type='ghost'
							onClick={() => {
								navigate(-1);
							}}
						>
							<LeftOutlined />
						</Button>
						{title}
					</Space>
				) : null
			}
		>
			{children}
		</Card>
	);
}
