import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserTable } from '../components/UserTable/UserTable';
import { Header } from '../components/Header/Header';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { NonLoggedInContent } from '../templates/NonLoggedInContent/NonLoggedInContent';
import { UserTableDTO, UserTableValues } from '../components/UserTable/UserTable.types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../common/decodedToken.types';

export function ContentPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [tableValues, setTableValues] = useState<UserTableValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [statusModalMessage, setStatusModalMessage] = useState('');
  const [username, setUsername] = useState('');
  const usersURL = `${import.meta.env.VITE_PROD_API_URL}/users`;

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(usersURL, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        //create a new array with the data from the response
        //and the date from the response
        const tableValues: UserTableValues[] = response.data.map((responseRows: UserTableDTO) => {
          return {
            id: responseRows.id,
            name: responseRows.name,
            joined: responseRows.joined,
            lastVisit: responseRows.lastVisit,
            counter: responseRows.counter,
          } as UserTableValues;
        });
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const decodedToken: DecodedToken = jwt_decode(token);
        setUsername(decodedToken.name);
        setTableValues(tableValues);
        setLoggedIn(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled');
        } else {
          console.log(error);
          setLoggedIn(false);
          localStorage.removeItem('token');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

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
        <Header
          loggedIn={loggedIn}
          handleOpenLoginModal={handleOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
          handleLogout={handleLogout}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent={'center'}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {loggedIn ? (
          <UserTable
            isLoading={isLoading}
            tableValues={tableValues}
            username={username}
          />
        ) : (
          <NonLoggedInContent></NonLoggedInContent>
        )}
      </Grid>
      <Dialog
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <LoginForm
          setOpenStatusModal={setOpenStatusModal}
          setStatusModalMessage={setStatusModalMessage}
        />
      </Dialog>
      <Dialog
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <RegisterForm
          setOpenStatusModal={setOpenStatusModal}
          setStatusModalMessage={setStatusModalMessage}
        />
      </Dialog>
      <Dialog
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography textAlign={'center'}> {statusModalMessage}</Typography>
        </Box>
      </Dialog>
    </Grid>
  );
}
