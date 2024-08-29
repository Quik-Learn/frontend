/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ButtonType = {
  text: string;
  icon?: any;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  alignSelf?: 'center' | 'flex-start' | 'flex-end';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  fontSize?: number;
  fontWeight?: number;
  px?: number;
  py?: number;
  color?: string;
  bg?: string;
  bgHover?: string;
  textHover?: string;
  border?: string;
  borderHover?: string;
  bgDisabled?: string;
  textDisabled?: string;
  borderDisabled?: string;
  type?: 'button' | 'submit' | 'reset';
  borderRadius?: number;
  width?: string | number | {};
  bgGradient?: string;
  fontFamily?: string;
};
