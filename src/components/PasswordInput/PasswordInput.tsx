import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Field } from 'formik';
import styles from './PasswordInput.module.scss';
import { useState } from 'react';

export function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    return setShowPassword((currentState) => {
      return !currentState;
    });
  };
  const aria = 'Show password';
  return (
    <Field
      as={TextField}
      className={styles.input}
      sx={{
        width: 1,
        backgroundColor: 'white',
      }}
      type={showPassword ? 'text' : 'password'}
      required
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label={aria}
              onClick={toggleShowPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
