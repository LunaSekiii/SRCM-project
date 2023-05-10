import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<Result
			status="404"
			title="找不到页面"
			subTitle="请检查路径是否正确，或网络状态是否正常"
			extra={
				<Button type="primary" onClick={() => navigate("/")}>
					回到主页
				</Button>
			}
		/>
	);
}
