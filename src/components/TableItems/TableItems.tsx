import { Grid, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteCell } from '../../common/cellService';
import { CellActions } from '../CellActions/CellActions';
import { ItemsTableValues, ItemsTableDTO, ItemsTableProps } from './TableItems.types';

export function ItemsTable(props: ItemsTableProps) {
  const { isLoading, setIsLoading } = props;
  const [tableValues, setTableValues] = useState<ItemsTableValues[]>([]);
  const usersURL = `${import.meta.env.VITE_PROD_API_URL}/items`;

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(usersURL);
    const tableValues: ItemsTableValues[] = response.data.map((responseRows: ItemsTableDTO) => {
      return {
        id: responseRows.id,
        itemName: responseRows.itemName,
        belongsTo: responseRows.belongsTo ? responseRows.belongsTo.name : 'Nobody',
        category: responseRows.category ? responseRows.category.name : 'No category',
        isItemReady: responseRows.isItemReady ? 'Yes' : 'No',
      } as ItemsTableValues;
    });
    setTableValues(tableValues);
    setIsLoading(false);
  };

  const handleDeleteItem = async (id: number) => {
    deleteCell('/items', id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false, sortable: true },
    { field: 'itemName', headerName: 'Item name', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'belongsTo', headerName: 'Belongs to?', minWidth: 150, editable: false, sortable: true, flex: 1 },
    { field: 'category', headerName: 'Item category', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'isItemReady', headerName: 'Ready for ordering?', minWidth: 100, editable: false, sortable: true, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: ({ id }) => (
        <CellActions
          handleDeleteItem={handleDeleteItem}
          id={Number(id)}
        ></CellActions>
      ),
    },
  ];

  useEffect(() => {
    //create a new array with the data from the response
    //and the date from the response
    const controller = new AbortController();

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Grid
      item
      width={'70%'}
      minHeight={'70vh'}
      justifyContent={'center'}
      sx={{
        backgroundColor: '#f8f8f5',
      }}
    >
      {!isLoading ? (
        <DataGrid
          rows={tableValues}
          columns={columns}
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
