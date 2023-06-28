import axios, { AxiosError } from "axios";

export const editCell = async <T>(cell: T, editUrl: string, id: number) => {
    try {
        await axios.put<T>(`${import.meta.env.VITE_PROD_API_URL}${editUrl}/${id}`, cell);        
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            throw new Error('Unknown error. Please try again later.', error);
          }
        } else {
          throw new Error('Unknown error. Please try again later.');
        }
      }
}

export const deleteCell = async <T>(deleteUrl: string, id: number) => {
  try {
      await axios.delete<T>(`${import.meta.env.VITE_PROD_API_URL}${deleteUrl}/${id}`);        
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          throw new Error('Unknown error. Please try again later.', error);
        }
      } else {
        throw new Error('Unknown error. Please try again later.');
      }
    }
}
export const addItem = async <T>(cell: T, addUrl: string) => {
  try {
    await axios.post<T>(`${import.meta.env.VITE_PROD_API_URL}${addUrl}`, cell)
  }
  catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error('Unknown error. Please try again later.', error);
      }
    } else {
      throw new Error('Unknown error. Please try again later.');
    }
  }
};