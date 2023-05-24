export interface UserTableValues {
  id: string;
  name: string;
  joined: string;
  lastvisit: string;
  counter: number;
}

export interface UserTableDTO {
  id: string;
  name: string;
  joined: string;
  lastvisit: string;
  counter: number;
  password: string;
}

export interface UserTableProps {
  isLoading: boolean;
  tableValues: UserTableValues[];
  username: string;
}
