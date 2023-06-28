import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../AuthenticationContext/AuthenticationContextProvider';
import { DashboardItem, HeaderProps } from './Header.types';
import { Person, Category, Inventory, ChevronLeft, Menu } from '@mui/icons-material';
import { TableTypes } from '../../common/tableTypes';

export function Header(props: HeaderProps) {
  const { handleOpenLoginModal, handleOpenRegisterModal, handleLogout, handleChooseTable } = props;
  const [open, setOpen] = useState(false);

  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('AuthenticationContext is null');
  }
  const { isAuthenticated, name } = context;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerItems: DashboardItem[] = [];
  const drawerWidth = 240;

  drawerItems.push(
    {
      icon: Person,
      title: 'Users',
      state: TableTypes.USERS,
    },
    {
      icon: Category,
      title: 'Categories',
      state: TableTypes.CATEGORIES,
    },
    {
      icon: Inventory,
      title: 'Items',
      state: TableTypes.ITEMS,
    }
  );

  return (
    <AppBar
      position={'sticky'}
      sx={{
        width: '100%',
        paddingLeft: '0px',
        paddingRight: '0px',
        backgroundColor: '#388087',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!isAuthenticated ? (
        <Toolbar sx={{ paddingLeft: '0px', paddingRight: '0px', width: '100%', justifyContent: 'space-between' }}>
          <Grid item>
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
              onClick={handleOpenRegisterModal}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
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
        <Toolbar sx={{ paddingLeft: '0px', paddingRight: '0px', width: '100%', justifyContent: 'space-between' }}>
          <Grid>
            <IconButton
              color='inherit'
              onClick={handleDrawerOpen}
              size='large'
              edge='start'
              sx={{ ...(open && { display: 'none' }) }}
            >
              <Menu />
            </IconButton>
            <Drawer
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
                flexShrink: 0,
                width: drawerWidth,
              }}
              variant='persistent'
              anchor='left'
              open={open}
            >
              <Grid
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  paddingRight: '1rem',
                  paddingLeft: '1rem',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeft />
                </IconButton>
              </Grid>
              <Divider />
              <List>
                {drawerItems.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() => {
                          handleChooseTable(item.state);
                        }}
                      >
                        <ListItemIcon>
                          <SvgIcon
                            color={'inherit'}
                            component={item.icon}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>
          </Grid>
          <Grid>
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none', width: '6rem' }}
              
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
          <Grid>
            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}> Currently logged in as {name} </Typography>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
}
