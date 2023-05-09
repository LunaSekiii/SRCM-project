import { memo } from "react";
import items from "./items";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const TheMenu = memo(function TheMenu() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const onClick: MenuProps["onClick"] = (e) => {
		navigate(e.key);
	};
	return (
		<div>
			<Menu
				onClick={onClick}
				mode={"inline"}
				items={items}
				defaultSelectedKeys={[pathname.slice(1, pathname.length)]}
				// inlineCollapsed={true}
			/>
		</div>
	);
});
export default TheMenu;
