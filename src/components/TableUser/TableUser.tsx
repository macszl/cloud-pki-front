import { Grid, CircularProgress} from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteCell } from '../../common/cellService';
import { CellActions } from '../CellActions/CellActions';
import { UserTableDTO, UserTableProps, UserTableValues } from './TableUser.types';

export function UserTable(props: UserTableProps) {
  const { isLoading, setIsLoading } = props;
  const [tableValues, setTableValues] = useState<UserTableValues[]>([]);
  const usersURL = `${import.meta.env.VITE_PROD_API_URL}/users`;

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(usersURL);
    const tableValues: UserTableValues[] = response.data.map((responseRows: UserTableDTO) => {
      return {
        id: responseRows.id,
        name: responseRows.name,
        joined: responseRows.joined,
        lastvisit: responseRows.lastvisit,
        counter: responseRows.counter,
      } as UserTableValues;
    });
    setTableValues(tableValues);
    setIsLoading(false);
  };

  const handleDeleteItem = async (id: number) => {
    deleteCell('/users', id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false, sortable: true },
    { field: 'name', headerName: 'Login', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'joined', headerName: 'Joined date', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'lastvisit', headerName: 'Last visit date', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'counter', headerName: 'Visit counter', minWidth: 100, editable: false, sortable: true, flex: 1 },
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
    fetchData();
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

  