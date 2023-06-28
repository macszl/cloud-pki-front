import { SvgIconComponent } from "@mui/icons-material";
import { TableTypes } from "../../common/tableTypes";

export type HeaderProps = {
  handleOpenLoginModal: () => void;
  handleOpenRegisterModal: () => void;
  handleLogout: () => void;
  handleChooseTable: (table: TableTypes) => void;
}

export type DashboardItem = {
  icon: SvgIconComponent,
  title: string,
  state: TableTypes,
}