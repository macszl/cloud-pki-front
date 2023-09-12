export type LoginFormValues = {
  login: string;
  password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export type LoginFormDTO = LoginFormValues;
