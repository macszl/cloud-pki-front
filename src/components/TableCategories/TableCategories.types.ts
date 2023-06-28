export type CategoriesTableValues = {
  id: string;
  name: string;
}
    
export type CategoriesTableDTO = {
  id: string;
  name: string;  
}
    
export type CategoriesTableProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
    