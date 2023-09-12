export type UserTableValues = {
  id: string;
  name: string;
  joined: string;
  lastvisit: string;
  counter: number;
}

export type UserTableDTO = {
  id: string;
  name: string;
  joined: string;
  lastvisit: string;
  counter: number;
  password: string;
}

export type UserTableProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
