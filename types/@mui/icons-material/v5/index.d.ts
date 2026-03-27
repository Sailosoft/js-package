import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

declare module "https://virtual-mui-icons-material" {
  export type IconComponent = ComponentType<SvgIconProps>;

  /**
   * 1. EXPLICIT DEFAULTS
   * Add icons here to get IDE recommendations/autocomplete.
   */
  export const Add: IconComponent;
  export const Close: IconComponent;
  export const Delete: IconComponent;
  export const Edit: IconComponent;
  export const Favorite: IconComponent;
  export const Security: IconComponent;
  export const FlashOn: IconComponent;
  export const SportsEsports: IconComponent;
  export const AddCircle: IconComponent;
  export const DeleteSweep: IconComponent;
  export const Style: IconComponent;

  // Allows: import Icons from "@mui/icons-material"
  const Icons: Record<string, IconComponent>;
  export default Icons;
}

// Map the package name to the virtual URL
declare module "@mui/icons-material" {
  export * from "https://virtual-mui-icons-material";
  
  // This line is the "magic" that allows any string import 
  // from @mui/icons-material specifically.
  import * as AllIcons from "https://virtual-mui-icons-material";
  export default AllIcons;
}