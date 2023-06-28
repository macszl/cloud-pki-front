import { CategoriesTableDTO } from "../TableCategories/TableCategories.types";
import { UserTableDTO } from "../TableUser/TableUser.types";

export type ItemsTableValues = {
  id: string;
  name: string;
  category: string;
  isReady: string;
  belongsTo: string;
}
  
export type ItemsTableDTO = {
  id: string;
  name: string;
  category: CategoriesTableDTO;
  isReady: boolean;
  belongsTo: UserTableDTO;
}
  
export type ItemsTableProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
  