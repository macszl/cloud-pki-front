import { CategoriesTableDTO } from "../TableCategories/TableCategories.types";
import { UserTableDTO } from "../TableUser/TableUser.types";

export type ItemsTableValues = {
  id: string;
  itemName: string;
  category: string;
  isItemReady: string;
  belongsTo: string;
}
  
export type ItemsTableDTO = {
  id: string;
  itemName: string;
  category: CategoriesTableDTO;
  isItemReady: boolean;
  belongsTo: UserTableDTO;
}
  
export type ItemsTableProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
  