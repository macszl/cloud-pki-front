import { Grid, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteCell, editCell } from '../../common/cellService';
export function CellActions<T>() {
  return (
    <Grid>
      <IconButton
        onClick={() => {
          editCell<T>();
        }}
      >
        <Edit></Edit>
      </IconButton>
      <IconButton
        onClick={() => {
          deleteCell<T>();
        }}
      >
        <Delete></Delete>
      </IconButton>
    </Grid>
  );
}
