import { Button } from '@mui/material';
import React from 'react';
import { IProps } from './IProps';

const CustomButton = ({ type, title, backgroundColor, color, fullWidth, disabled, handleClick }: IProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: '130px',
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
