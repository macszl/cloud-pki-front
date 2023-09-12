import { Grid, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteCell } from '../../common/cellService';
import { CellActions } from '../CellActions/CellActions';
import { CategoriesTableValues, CategoriesTableDTO, CategoriesTableProps } from './TableCategories.types';

export function CategoriesTable(props: CategoriesTableProps) {
  const { isLoading, setIsLoading } = props;
  const [tableValues, setTableValues] = useState<CategoriesTableValues[]>([]);
  const usersURL = `${import.meta.env.VITE_PROD_API_URL}/categories`;

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(usersURL);
    const tableValues: CategoriesTableValues[] = response.data.map((responseRows: CategoriesTableDTO) => {
      return {
        id: responseRows.id,
        name: responseRows.name,
      } as CategoriesTableValues;
    });
    setTableValues(tableValues);
    setIsLoading(false);
  };

  const handleDeleteItem = async (id: number) => {
    deleteCell('/categories', id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false, sortable: true },
    { field: 'name', headerName: 'Category name', minWidth: 100, editable: true, sortable: true, flex: 1 },
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
