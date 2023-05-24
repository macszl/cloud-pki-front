import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import { HeaderProps } from './Header.types';

export function Header(props: HeaderProps) {
  const { loggedIn } = props;

  return (
    <AppBar
      position={'sticky'}
      sx={{ backgroundColor: '#388087', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      {!loggedIn ? (
        <Toolbar>
          <Grid
            item
            sx={{ margin: '0 25px' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Register
            </Button>
          </Grid>
          <Grid
            item
            sx={{ margin: '0 25px' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Login
            </Button>
          </Grid>
        </Toolbar>
      ) : (
        <Toolbar>
          <Grid sx={{ margin: '0 25px' }}>
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Logout
            </Button>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
}
