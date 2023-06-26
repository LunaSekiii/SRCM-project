import { create } from "zustand";

interface ThemeData {
	theme: "light" | "dark";
}

const useTheme = create<ThemeData>((set, get) => ({
	theme: "dark",
}));

export default useTheme;
