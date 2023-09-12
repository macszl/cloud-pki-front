/* eslint-disable @typescript-eslint/no-magic-numbers */
import { AppBar, Toolbar, Button, Grid, Typography, Drawer, List, Divider, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../ContextAuthentication/ContextAuthenticationProvider';
import { DashboardItem, HeaderProps } from './Header.types';
import { ChevronLeft, Menu } from '@mui/icons-material';

export function Header(props: HeaderProps) {
  const { handleOpenLoginModal, handleOpenRegisterModal, handleLogout, handleChooseTable, tableNames, databaseName } = props;
  const [open, setOpen] = useState(false);
  const [drawerItems, setDrawerItems] = useState<DashboardItem[]>([]); // ['Table1', 'Table2', 'Table3'
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

  const drawerWidth = 240;

  useEffect(() => {
    // Whenever tableNames changes, update drawerItems accordingly.
    if (tableNames && tableNames.length > 0) {
      const newDrawerItems = tableNames.map((tableName) => {
        return { title: tableName };
      });
      setDrawerItems(newDrawerItems);
    } else {
      // Handle the case when tableNames is empty or not available.
      setDrawerItems([]);
    }
  }, [tableNames]);

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
                          handleChooseTable(item.title);
                        }}
                      >
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
            {name !== null && (
              <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}>
                {`Currently logged in as ${name}, browsing through database ${databaseName}`}
              </Typography>
            )}
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
}
