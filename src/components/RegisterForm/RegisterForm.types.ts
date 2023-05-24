export type RegisterFormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

export type RegisterFormDTO = Omit<RegisterFormValues, 'repeatPassword'>;

export type JWTResponse = {
  message: string;
  token: string;
};
