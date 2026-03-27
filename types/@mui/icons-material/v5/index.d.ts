import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

/**
 * Shared type for all Material Icons
 */
export type IconComponent = ComponentType<SvgIconProps>;

declare module "@mui/icons-material" {
  /**
   * 1. EXPLICIT DEFAULTS
   * Icons added here will appear in IDE autocomplete/suggestions.
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

  /**
   * 2. THE DYNAMIC FALLBACK
   * This index signature tells TS: "This module has any named export you want."
   * It eliminates the ts(2614) error for any icon not listed above.
   */
  // export const [key: string]: any;

  /**
   * 3. DEFAULT EXPORT
   * Supports: import Icons from "@mui/icons-material"
   */
  const Icons: Record<string, IconComponent>;
  export default Icons;
}

/**
 * Map the virtual SystemJS URL to the definitions above
 */
declare module "https://virtual-mui-icons-material" {
  export * from "@mui/icons-material";
  import * as AllIcons from "@mui/icons-material";
  export default AllIcons;
}