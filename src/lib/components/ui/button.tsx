import { Button as ChakraButton } from '@chakra-ui/react';

import type { ButtonType } from '~/lib/types/button';

const Button = (props: ButtonType) => {
  const {
    text: textProp,
    icon,
    iconPosition = 'left',
    size = 'lg',
    variant = 'solid',
    isDisabled,
    isLoading,
    onClick,
    fontSize = '16px',
    fontWeight = 600,
    color: text = variant === 'solid' ? 'white' : '#0065FF',
    bg = variant === 'solid' ? '#FF8C00' : 'white',
    border = '#FF8C00',
    type = 'button',
    borderRadius = '4px',
    width = '100%',
    px,
    py,
    bgGradient,
    fontFamily = 'body',
    alignSelf,
  } = props;

  return (
    <ChakraButton
      size={size}
      variant={variant}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      color={text}
      alignSelf={alignSelf}
      bg={bg}
      bgGradient={bgGradient}
      leftIcon={icon && iconPosition === 'left' && icon}
      rightIcon={icon && iconPosition === 'right' && icon}
      borderWidth={variant === 'outline' ? '1px' : '0px'}
      borderColor={border}
      borderRadius={borderRadius}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all 0.2s ease-in-out',
      }}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      type={type}
      width={width}
      px={px}
      py={py}
    >
      {textProp}
    </ChakraButton>
  );
};

export default Button;
