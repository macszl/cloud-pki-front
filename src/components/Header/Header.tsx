import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import { HeaderProps } from './Header.types';

export function Header(props: HeaderProps) {
  const { loggedIn, handleOpenLoginModal, handleOpenRegisterModal, handleLogout } = props;

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
              onClick={handleOpenRegisterModal}
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
              onClick={handleOpenLoginModal}
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
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
}
