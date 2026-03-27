/**
 * MUI v5 Global Type Definitions
 * Targeting the UMD/CDN Bundle (window.MaterialUI)
 */

declare module "@mui/material" {
  // --- Core Types ---
  type SxProps = any;
  type ReactNode = any;
  type ResponsiveValue<T> =
    | T
    | Array<T | null>
    | { [key in "xs" | "sm" | "md" | "lg" | "xl"]?: T };

  interface BaseProps {
    children?: ReactNode;
    sx?: SxProps;
    className?: string;
    style?: React.CSSProperties;
    component?: any;
  }

  // --- Theme System ---
  interface Theme {
    palette: any;
    breakpoints: any;
    spacing: (value: number) => string;
  }

  function createTheme(options?: any): Theme;
  const ThemeProvider: React.FC<{ theme: Theme; children?: ReactNode }>;
  const CssBaseline: React.FC<{ enableColorScheme?: boolean }>;

  // --- Layout Components ---
  const Box: React.FC<BaseProps>;
  const Container: React.FC<
    BaseProps & { maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false }
  >;

  // Legacy Grid (v5)
  const Grid: React.FC<
    BaseProps & {
      container?: boolean;
      item?: boolean;
      spacing?: number;
      xs?: number | "auto";
      md?: number;
      lg?: number;
      alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
      justifyContent? = "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    }
  >;

  // Grid2 (The new CSS Grid-based layout)
  const Grid2: React.FC<
    BaseProps & {
      container?: boolean;
      spacing?: ResponsiveValue<number | string>;
      size?: ResponsiveValue<number | "grow" | "auto">;
      offset?: ResponsiveValue<number | "auto">;
      disableEqualOverflow?: boolean;
    }
  >;

  const Stack: React.FC<
    BaseProps & {
      direction?: ResponsiveValue<
        "row" | "row-reverse" | "column" | "column-reverse"
      >;
      justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
      spacing?: ResponsiveValue<number | string>;
    }
  >;

  // --- Input Components ---
  const Button: React.FC<
    BaseProps & {
      variant?: "text" | "outlined" | "contained";
      color?: string;
      size?: "small" | "medium" | "large";
      disabled?: boolean;
      onClick?: (e: any) => void;
      to?: string;
      fullWidth?: boolean;
      startIcon?: ReactNode;
    }
  >;
  const TextField: React.FC<
    BaseProps & {
      label?: string;
      value?: any;
      onChange?: (e: any) => void;
      variant?: "standard" | "filled" | "outlined";
      fullWidth?: boolean;
    }
  >;
  const Checkbox: React.FC<
    BaseProps & { checked?: boolean; onChange?: (e: any) => void }
  >;
  const Radio: React.FC<BaseProps & { checked?: boolean }>;
  const Select: React.FC<
    BaseProps & { value?: any; onChange?: (e: any) => void }
  >;
  const Switch: React.FC<BaseProps & { checked?: boolean }>;

  // --- Data Display ---
  const Typography: React.FC<
    BaseProps & {
      variant?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "caption"
        | "button"
        | "overline";
      align?: "left" | "center" | "right" | "justify";
      gutterBottom?: boolean;
      color?: string;
      display?: "initial" | "block" | "inline";
      textAlign?: "left" | "center" | "right" | "justify";
    }
  >;
  const AppBar: React.FC<
    BaseProps & {
      position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
      color?: string;
    }
  >;
  const Toolbar: React.FC<
    BaseProps & { variant?: "regular" | "dense"; disableGutters?: boolean }
  >;
  const Avatar: React.FC<BaseProps & { src?: string; alt?: string }>;
  const Badge: React.FC<
    BaseProps & { badgeContent?: ReactNode; color?: string }
  >;
  const Chip: React.FC<
    BaseProps & { label?: string; onDelete?: () => void; color?: string }
  >;
  const List: React.FC<BaseProps>;
  const ListItem: React.FC<BaseProps>;
  const ListItemText: React.FC<{ primary?: ReactNode; secondary?: ReactNode }>;
  const Tooltip: React.FC<{ title: ReactNode; children: React.ReactElement }>;

  // --- Feedback ---
  const Alert: React.FC<
    BaseProps & { severity?: "error" | "warning" | "info" | "success" }
  >;
  const CircularProgress: React.FC<
    BaseProps & { value?: number; variant?: "determinate" | "indeterminate" }
  >;
  const Snackbar: React.FC<
    BaseProps & { open: boolean; message?: string; autoHideDuration?: number }
  >;

  // --- Surfaces ---
  const Card: React.FC<BaseProps>;
  const CardContent: React.FC<BaseProps>;
  const CardActions: React.FC<BaseProps>;
  const Paper: React.FC<BaseProps & { elevation?: number; onClick?: (e: any) => void }>;
  const AppBar: React.FC<
    BaseProps & {
      position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
    }
  >;

  const colors: any;
  const SvgIcon: React.FC<BaseProps>;
  const Icon: React.FC<BaseProps>;
  const Link: React.FC<BaseProps & { href?: string; color?: string }>;
}

/**
 * Destructure the global window object for easy access
 */
declare const {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Grid2,
  Stack,
  TextField,
  Checkbox,
  Radio,
  Select,
  Switch,
  Avatar,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Alert,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Paper,
  AppBar,
  createTheme,
  ThemeProvider,
  CssBaseline,
}: typeof MaterialUI;
