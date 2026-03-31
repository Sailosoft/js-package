import React from "react";

export interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  label?: string;
}

