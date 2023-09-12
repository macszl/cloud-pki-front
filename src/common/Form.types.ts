import { Dispatch, SetStateAction } from 'react';

export type FormProps = {
  setOpenStatusModal: Dispatch<SetStateAction<boolean>>;
  setStatusModalMessage: Dispatch<SetStateAction<string>>;
};
