import { useState } from "react";
import {
  IpAppMainContext,
  IpAppMainContextType,
} from "../../contexts/IpAppMainContext.ts";
export default function IpAppMainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (value?: boolean) => {
    setSidebarOpen(value ?? !sidebarOpen);
  };

  const contextValue: IpAppMainContextType = {
    toggleSidebar,
    sidebarOpen,
  };

  return (
    <IpAppMainContext.Provider value={contextValue}>
      {children}
    </IpAppMainContext.Provider>
  );
}
