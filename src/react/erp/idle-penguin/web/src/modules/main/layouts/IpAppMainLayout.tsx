import IpAppBar from "../components/app-bar/IpAppBar.tsx";
import IpDrawer from "../components/drawers/IpDrawer.tsx";

export default function IpAppMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IpAppBar />
      <IpDrawer />
      {children}
    </>
  );
}
