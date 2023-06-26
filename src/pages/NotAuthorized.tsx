import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotAuthorized: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Result
			status='403'
			title='无权限访问'
			subTitle='你的账号没有权限访问当前页面'
			extra={
				<Button type='primary' onClick={() => navigate("/")}>
					回到主页
				</Button>
			}
		/>
	);
};
export default NotAuthorized;
