import { Grid, Modal } from '@mui/material';
import { useState } from 'react';
import { CustomTable } from '../components/CustomTable/CustomTable';
import { Header } from '../components/Header/Header';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { NonLoggedInContent } from '../templates/NonLoggedInContent/NonLoggedInContent';

export function ContentPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
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
        />
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
      <Modal
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
        <LoginForm />
      </Modal>
      <Modal
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
        <RegisterForm />
      </Modal>
    </Grid>
  );
}
