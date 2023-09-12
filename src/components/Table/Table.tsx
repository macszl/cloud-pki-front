/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteCell } from '../../common/cellService';
import { CellActions } from '../CellActions/CellActions';
import { TableProps } from './Table.types';

export function Table(props: TableProps) {
  const { isLoading, tableName, setIsLoading, setOpenStatusModal, setStatusModalMessage } = props;
  const apiUrl = String(import.meta.env.VITE_PROD_API_URL);

  const [columnsDefinitionArray, setColumnsDefinitionArray] = useState<GridColDef[]>([]);
  const [columnDefinitionsDoneFetching, setColumnDefinitionsDoneFetching] = useState<boolean>(false);
  const [tableValues, setTableValues] = useState<any>([]);

  const fetchAndParseValues = async () => {
    try {
      const tableValuesUrl = `${apiUrl}/executeSqlQuery`;
      const tableValuesResponse = await axios.post(tableValuesUrl, { sqlCommand: `SELECT * FROM ${tableName}` });
      const parsedTableValuesResponse = tableValuesResponse.data;
      setTableValues(parsedTableValuesResponse);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching and parsing values:', error);
      throw error;
    }
  };

  const handleDeleteItem = (id: number) => {
    deleteCell(`${apiUrl}/executeSqlQuery`, `${tableName}`, id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAndParseColumnDefinitions = async () => {
    try {
      setColumnDefinitionsDoneFetching(false);
      setIsLoading(false);
      const tableDefsUrl = `${apiUrl}/getTableDetails/${tableName}`;
      const tableDefsResponse = await axios.get(tableDefsUrl);
      const columnNamesAndTypes = tableDefsResponse.data.map((rawJsonArrayItem: any) => {
        return {
          name: rawJsonArrayItem.column_name,
          type: rawJsonArrayItem.data_type,
        };
      });

      const tempArray: GridColDef[] = columnNamesAndTypes.map((columnNamesAndTypesItem: any) => {
        const item: GridColDef = {
          field: columnNamesAndTypesItem.name,
          headerName: String(columnNamesAndTypesItem.name).toUpperCase(),
          sortable: true,
        };

        if (columnNamesAndTypesItem.name === 'id') {
          item.editable = false;
          item.width = 70;
        } else {
          item.editable = true;
          item.minWidth = 100;
          item.flex = 1;
        }
        return item;
      });

      tempArray.push({
        field: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        editable: false,
        sortable: false,
        flex: 1,
        renderCell: ({ id }) => {
          return (
            <CellActions
              handleDeleteItem={handleDeleteItem}
              id={Number(id)}
            ></CellActions>
          );
        },
      });

      setColumnsDefinitionArray(tempArray);
      setColumnDefinitionsDoneFetching(true);
    } catch (error) {
      console.error('Error fetching and parsing column definitions:', error);
      throw error;
    }
  };

  useEffect(() => {
    //open up a modal on error
    fetchAndParseColumnDefinitions().catch(() => {
      setOpenStatusModal(true);
      setStatusModalMessage('Error fetching and parsing column definitions');
    });
  }, [tableName]);

  useEffect(() => {
    if (columnDefinitionsDoneFetching) {
      //open up a modal on error
      fetchAndParseValues().catch(() => {
        setOpenStatusModal(true);
        setStatusModalMessage('Error fetching and parsing values');
      });
    }
  }, [columnDefinitionsDoneFetching]);

  return (
    <Grid
      item
      width={'70%'}
      justifyContent={'center'}
      sx={{
        backgroundColor: '#f8f8f5',
      }}
    >
      {!isLoading ? (
        <DataGrid
          rows={tableValues}
          columns={columnsDefinitionArray}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[15, 25, 40]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
