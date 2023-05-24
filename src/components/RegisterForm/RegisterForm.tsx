import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Field, Formik, FormikHelpers } from 'formik';
import '@fontsource/roboto';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { RegisterFormDTO, RegisterFormErrors, RegisterFormValues } from './RegisterForm.types';
import { registerUser } from '../../common/authService';

export function RegisterForm() {
  const validate = (values: RegisterFormValues) => {
    const errors: RegisterFormErrors = {};
    const requiredFields = Object.keys(values) as (keyof RegisterFormValues)[];
    requiredFields
      .filter((field) => {
        return !values[field];
      })
      .forEach((field) => {
        errors[field] = `Field ${field} is required`;
      });
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords must match';
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
      initialValues={{ login: '', password: '', repeatPassword: '' }}
      onSubmit={(values: RegisterFormValues, { setSubmitting }: FormikHelpers<RegisterFormValues>) => {
        const dto: RegisterFormDTO = {
          login: values.login,
          password: values.password,
        };
        registerUser(dto)
          .then(() => {
            setSubmitting(false);
          })
          .catch((res) => {
            console.log(res);
          });
      }}
    >
      {({ isValid, handleSubmit, isSubmitting }) => {
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
              height={600}
            >
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                paddingTop={2}
                spacing={3}
              >
                <Grid
                  item
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                >
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
                    REGISTER
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
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                >
                  <PasswordInput
                    name='repeatPassword'
                    label='Repeat password'
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                ></Grid>
                <Grid
                  item
                  container
                  marginTop={2}
                  gap={2}
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
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
                    Register
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
