import { ReactNode, Component } from "react";
import { UserProvider, useFetchUser } from "../../utils/users";

export const MainLayout = ({ children }: { children: ReactNode }) => {
	const { user, loading } = useFetchUser();
	return <UserProvider value={{ user, loading }}>{children}</UserProvider>;
};
