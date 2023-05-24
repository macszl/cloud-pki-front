import { Grid, CircularProgress, Typography } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { UserTableProps } from './UserTable.types';

export function UserTable(props: UserTableProps) {
  const { isLoading, tableValues, username } = props;
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false, sortable: true },
    { field: 'name', headerName: 'Login', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'joined', headerName: 'Joined date', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'lastvisit', headerName: 'Last visit date', minWidth: 100, editable: false, sortable: true, flex: 1 },
    { field: 'counter', headerName: 'Visit counter', minWidth: 100, editable: false, sortable: true, flex: 1 },
  ];

  return (
    <Grid
      item
      width={'70%'}
      justifyContent={'center'}
      sx={{
        backgroundColor: '#f8f8f5',
      }}
    >
      <Typography>Welcome, {username} ! </Typography>
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
