import { createContext, useContext } from "react";

export interface IpAppMainContextType {
  toggleSidebar: (value?: boolean) => void;
  sidebarOpen: boolean;
}

export const IpAppMainContext = createContext<IpAppMainContextType | null>(
  null,
);

export const useIpAppMainContext = () => {
  const context = useContext(IpAppMainContext);
  if (!context) {
    throw new Error(
      "useAppMainContext must be used within an AppMainContextProvider",
    );
  }
  return context;
};
