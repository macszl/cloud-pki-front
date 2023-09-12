import axios from 'axios';

export const fetchDatabaseData = async () => {
  const apiUrl = String(import.meta.env.VITE_PROD_API_URL);

  // Get database name
  const databaseNameQueryResult = await axios.get<{ name: string }>(`${apiUrl}/getDbName`);

  // Get table list
  const tableListQueryResult = await axios.get<{ tableNames: string[] }>(`${apiUrl}/getTableNames`);

  return {
    tableList: tableListQueryResult.data.tableNames,
    databaseName: databaseNameQueryResult.data.name,
  };
};
