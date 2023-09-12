import { Dispatch, SetStateAction } from 'react';

export type TableProps = {
  isLoading: boolean;
  tableName: string;
  setIsLoading: (value: boolean) => void;
  setOpenStatusModal: Dispatch<SetStateAction<boolean>>;
  setStatusModalMessage: Dispatch<SetStateAction<string>>;
};
