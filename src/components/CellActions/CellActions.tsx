import { Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export interface CellActionsProps {
  handleDeleteItem: (id: number) => void;
  id: number;
}
export function CellActions(props: CellActionsProps) {
  const { handleDeleteItem, id } = props;
  //get the row data we're working with
  return (
    <Grid>
      <IconButton
        onClick={() => {
          handleDeleteItem(id);
        }}
      >
        <Delete></Delete>
      </IconButton>
    </Grid>
  );
}
