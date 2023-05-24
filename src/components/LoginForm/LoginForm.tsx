import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { Formik, FormikHelpers, Field } from 'formik';
import { loginUser } from '../../common/authService';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { LoginFormErrors, LoginFormValues, LoginFormDTO } from './LoginForm.types';

export function LoginForm() {
  const minLength = 1;
  const validate = (values: { login: string; password: string }) => {
    const errors: LoginFormErrors = {};
    if (values.login.length < minLength) {
      errors.login = "login can't be empty";
    }
    if (values.password.length < minLength) {
      errors.password = "Password can't be empty";
    }
    return errors;
  };

  return (
    <Formik
      enableReinitialize
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
      validate={validate}
      initialValues={{ login: '', password: '' }}
      onSubmit={(values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
        const dto: LoginFormDTO = {
          login: values.login,
          password: values.password,
        };
        loginUser(dto)
          .then(() => {
            window.location.reload();
          })
          .catch((res) => {
            console.log(res);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isValid, isSubmitting, handleSubmit }) => {
        return (
          <form
            style={{ maxWidth: 300 }}
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <Box
              padding={0}
              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
              width={300}
              borderRadius='10px'
              bgcolor={'#EEF9EB'}
              height={400}
            >
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                paddingTop={2}
                spacing={3}
              >
                <Grid item>
                  <Typography
                    align='center'
                    style={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      fontSize: 14,
                      lineHeight: '36px',
                      letterSpacing: '1.25px',
                    }}
                  >
                    SIGN IN
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                >
                  <Field
                    as={TextField}
                    label='Login'
                    sx={{
                      width: 1,
                      backgroundColor: 'white',
                    }}
                    type='login'
                    name='login'
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                >
                  <PasswordInput
                    name='password'
                    label='Password'
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                  container
                  gap={2}
                >
                  <Button
                    variant='contained'
                    color='secondary'
                    type='submit'
                    sx={{
                      padding: 1,
                      width: 1,
                    }}
                    disabled={!isValid || isSubmitting}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
}
