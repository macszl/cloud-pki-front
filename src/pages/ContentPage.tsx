import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { UserTable } from '../components/TableUser/TableUser';
import { Header } from '../components/Header/Header';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { NonLoggedInContent } from '../templates/NonLoggedInContent/NonLoggedInContent';
import { AuthenticationContext } from '../components/AuthenticationContext/AuthenticationContextProvider';
import { TableTypes } from '../common/tableTypes';
import { ItemsTable } from '../components/TableItems/TableItems';
import { CategoriesTable } from '../components/TableCategories/TableCategories';
import { CategoryForm } from '../components/AddCategoryForm/CategoryForm';
import { ItemForm } from '../components/AddItemForm/ItemForm';
import { UserForm } from '../components/AddUserForm/UserForm';

export function ContentPage() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableType, setTableType] = useState<TableTypes>(TableTypes.USERS);
  const [statusModalMessage, setStatusModalMessage] = useState('');
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('AuthenticationContext is null');
  }
  const { setName, isAuthenticated, setAuthenticated } = context;

  const [openLoginModal, setOpenLoginModal] = useState(isAuthenticated);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    setName('');
    setAuthenticated(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  //this opens a modal called AddUserForm to add a user to the table
  const handleAddRowUser = () => {
    setEditMode(false);
    setOpenDrawer(true);
  };
  //this opens a modal called AddItemForm to add an item to the table
  const handleAddRowItems = () => {
    setEditMode(false);
    setOpenDrawer(true);
  };
  //this opens a modal called AddCategoryForm to add a category to the table
  const handleAddRowCategories = () => {
    setEditMode(false);
    setOpenDrawer(true);
  };

  const handleEditRowUser = () => {
    setEditMode(true);
    setOpenDrawer(true);
  };

  const handleEditRowItems = () => {
    setEditMode(true);
    setOpenDrawer(true);
  };

  const handleEditRowCategories = () => {
    setEditMode(true);
    setOpenDrawer(true);
  };

  const renderAddRowButton = () => {
    if (tableType === TableTypes.CATEGORIES) {
      return (
        <Grid
          width={'100%'}
          display={'flex'}
          justifyContent={'space-around'}
        >
          <Button
            size='small'
            onClick={handleAddRowCategories}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Add a row
          </Button>
          <Button
            size='small'
            onClick={handleEditRowCategories}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Edit a row
          </Button>
          <Button
            size='small'
            onClick={() => {
              window.location.reload();
            }}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Refresh
          </Button>
        </Grid>
      );
    } else if (tableType === TableTypes.ITEMS) {
      return (
        <Grid
          width={'100%'}
          display={'flex'}
          justifyContent={'space-around'}
        >
          <Button
            size='small'
            onClick={handleAddRowItems}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Add a row
          </Button>
          <Button
            size='small'
            onClick={handleEditRowItems}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Edit a row
          </Button>
          <Button
            size='small'
            onClick={() => {
              window.location.reload();
            }}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Refresh
          </Button>
        </Grid>
      );
    } else if (tableType === TableTypes.USERS) {
      return (
        <Grid
          width={'100%'}
          display={'flex'}
          justifyContent={'space-around'}
        >
          <Button
            size='small'
            onClick={handleAddRowUser}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Add a row
          </Button>
          <Button
            size='small'
            onClick={handleEditRowUser}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Edit a row
          </Button>
          <Button
            size='small'
            onClick={() => {
              window.location.reload();
            }}
            sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
          >
            Refresh
          </Button>
        </Grid>
      );
    } else {
      return null;
    }
  };

  const renderTable = () => {
    if (tableType === TableTypes.CATEGORIES) {
      return (
        <CategoriesTable
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    } else if (tableType === TableTypes.ITEMS) {
      return (
        <ItemsTable
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    } else if (tableType === TableTypes.USERS) {
      return (
        <UserTable
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    } else {
      return null;
    }
  };

  const renderAddForm = () => {
    if (tableType === TableTypes.CATEGORIES) {
      return (
        <CategoryForm
          open={openDrawer}
          setOpen={setOpenDrawer}
          isEditMode={editMode}
        />
      );
    } else if (tableType === TableTypes.ITEMS) {
      return (
        <ItemForm
          open={openDrawer}
          setOpen={setOpenDrawer}
          isEditMode={editMode}
        />
      );
    } else {
      return (
        <UserForm
          open={openDrawer}
          setOpen={setOpenDrawer}
          isEditMode={editMode}
        />
      );
    }
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
          handleOpenLoginModal={handleOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
          handleLogout={handleLogout}
          handleChooseTable={setTableType}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        columnSpacing={2}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {isAuthenticated && renderAddRowButton()}
        {isAuthenticated && renderTable()}
        {!isAuthenticated && <NonLoggedInContent />}
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
      {isAuthenticated && renderAddForm()}
    </Grid>
  );
}
