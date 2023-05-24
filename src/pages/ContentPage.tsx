import { Grid } from '@mui/material';
import { useState } from 'react';
import { CustomTable } from '../components/CustomTable/CustomTable';
import { Header } from '../components/Header/Header';
import { NonLoggedInContent } from '../templates/NonLoggedInContent/NonLoggedInContent';

export function ContentPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Grid
      container
      minHeight={'100vh'}
      height={'auto'}
      sx={{ backgroundColor: '#f6f6f2' }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Header loggedIn={loggedIn} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {loggedIn ? <CustomTable></CustomTable> : <NonLoggedInContent></NonLoggedInContent>}
      </Grid>
    </Grid>
  );
}
