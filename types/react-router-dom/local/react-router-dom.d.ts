// typings/router.d.ts

declare module "react-router-dom" {
  import * as React from "react";

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export const HashRouter: React.FC<{ children?: React.ReactNode }>;
  export const Routes: React.FC<{ children?: React.ReactNode }>;
  export const Switch: React.FC<{ children?: React.ReactNode }>;
  export const Route: React.FC<{
    path?: string;
    index?: boolean;
    element?: React.ReactNode;
    children?: React.ReactNode;
    exact?: boolean;
    component?: React.ComponentType<any>;
  }>;
  export const Link: React.ForwardRefExoticComponent<LinkProps>;

  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  };
  export function useNavigate(): (
    to: string,
    options?: { replace?: boolean; state?: any },
  ) => void;
  export function useParams<T extends string = string>(): {
    [key in T]: string | undefined;
  };
}
