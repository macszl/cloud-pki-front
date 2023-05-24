import axios, { AxiosError } from 'axios';
import { LoginFormDTO } from '../components/LoginForm/LoginForm.types';
import { JWTResponse, RegisterFormDTO } from '../components/RegisterForm/RegisterForm.types';

export const registerUser = async (user: RegisterFormDTO) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_PROD_API_URL}/auth/register`, user);
    console.log(`registerUser responded!`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('Unknown error. Please try again later.', error);
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};

export const loginUser = async (user: LoginFormDTO) => {
  try {
    const { data } = await axios.post<JWTResponse>(`${import.meta.env.VITE_PROD_API_URL}/auth/login`, user);
    const token: string = data.token;
    localStorage.setItem('token', token);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error('Unknown error. Please try again later.', error);
      }
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};
