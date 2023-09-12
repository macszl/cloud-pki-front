export type HeaderProps = {
  handleOpenLoginModal: () => void;
  handleOpenRegisterModal: () => void;
  handleLogout: () => void;
  handleChooseTable: (tableName: string) => void;
  tableNames: string[];
  databaseName: string;
};

export type DashboardItem = {
  title: string;
};
