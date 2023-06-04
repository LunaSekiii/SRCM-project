interface MarkdownModal {
	[modalName: string]: string;
}

const markdownModal: MarkdownModal = {
	conferenceDefault:
		"# 会议记录\n\n## 会议主题\n\n概括会议的主要内容\n\n## 会议目标\n\n- [x] 目标1\n- [ ] 目标2\n- [ ] 目标3\n\n## 会议流程\n\n### 1. 主持人讲话\n\n### 2. 参会人发言\n\n1. 参会人 1\n2. 参会人 2\n3. 参会人 3\n\n### 3. 会议总结\n\n## 会议总结\n\n会议的结果\n",
};

export default markdownModal;
