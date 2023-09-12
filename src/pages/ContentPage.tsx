/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { NonLoggedInContent } from '../templates/NonLoggedInContent/NonLoggedInContent';
import { AuthenticationContext } from '../components/ContextAuthentication/ContextAuthenticationProvider';
import { fetchDatabaseData } from '../common/dbInfoService';
import { Table } from '../components/Table/Table';
import { AddRowForm } from '../components/AddRowForm/AddRowForm';
import { EditRowForm } from '../components/EditRowForm/EditRowForm';
import { SQLCommandBox } from '../components/SQLCommandBox/SQLCommandBox';

export function ContentPage() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [statusModalMessage, setStatusModalMessage] = useState('');

  const [databaseName, setDatabaseName] = useState('');
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [databaseInfoDoneFetching, setDatabaseInfoDoneFetching] = useState<boolean>(false);

  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('AuthenticationContext is null');
  }
  const { setName, isAuthenticated, setAuthenticated } = context;

  useEffect(() => {
    setDatabaseInfoDoneFetching(false);
    if (isAuthenticated) {
      fetchDatabaseData()
        .then((data) => {
          setDatabaseName(data.databaseName);
          setTableNames(data.tableList);
        })
        .catch((error) => {
          console.log(error);
        });
      setDatabaseInfoDoneFetching(true);
    }
  }, [isAuthenticated]);

  const [openLoginModal, setOpenLoginModal] = useState(isAuthenticated);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [SQLMode, setSQLMode] = useState(false);

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

  //this opens a modal called AddItem to add an item to the table
  const handleAddRow = () => {
    setEditMode(false);
    setSQLMode(false);
    setOpenDrawer(true);
  };

  const handleEditRow = () => {
    setEditMode(true);
    setSQLMode(false);
    setOpenDrawer(true);
  };

  const handleSQLQuery = () => {
    setSQLMode(true);
    setEditMode(false);
    setOpenDrawer(true);
  };

  const renderAddRowButton = () => {
    return (
      <Grid
        width={'100%'}
        display={'flex'}
        justifyContent={'space-around'}
      >
        <Button
          size='small'
          onClick={handleAddRow}
          sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
        >
          Add a row
        </Button>
        <Button
          size='small'
          onClick={handleEditRow}
          sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
        >
          Edit a row
        </Button>
        <Button
          size='small'
          onClick={handleSQLQuery}
          sx={{ marginTop: 2, marginBottom: 2, width: '6rem' }}
        >
          Send SQL query
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
  };

  const renderTable = () => {
    return (
      <Table
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        tableName={selectedTable}
        setOpenStatusModal={setOpenStatusModal}
        setStatusModalMessage={setStatusModalMessage}
      />
    );
  };

  const renderForm = () => {
    if (!editMode && !SQLMode) {
      return (
        <AddRowForm
          open={openDrawer}
          setOpen={setOpenDrawer}
          tableName={selectedTable}
          setOpenStatusModal={setOpenStatusModal}
          setStatusModalMessage={setStatusModalMessage}
        />
      );
    } else if (editMode && !SQLMode) {
      return (
        <EditRowForm
          open={openDrawer}
          setOpen={setOpenDrawer}
          tableName={selectedTable}
          setOpenStatusModal={setOpenStatusModal}
          setStatusModalMessage={setStatusModalMessage}
        />
      );
    } else {
      return (
        <SQLCommandBox
          open={openDrawer}
          setOpen={setOpenDrawer}
          setOpenStatusModal={setOpenStatusModal}
          setStatusModalMessage={setStatusModalMessage}
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
          handleChooseTable={setSelectedTable}
          tableNames={tableNames ? tableNames : []}
          databaseName={databaseName ? databaseName : 'Database not ready'}
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
        {isAuthenticated && databaseInfoDoneFetching && selectedTable !== '' && renderAddRowButton()}
        {isAuthenticated && databaseInfoDoneFetching && selectedTable !== '' && renderTable()}
        {isAuthenticated && databaseInfoDoneFetching && selectedTable === '' && <Typography textAlign={'center'}>No table selected</Typography>}
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
            minHeight: '10rem',
            minWidth: '20rem',
          }}
        >
          <Typography textAlign={'center'}> {statusModalMessage}</Typography>
        </Box>
      </Dialog>
      {isAuthenticated && databaseInfoDoneFetching && selectedTable !== '' && renderForm()}
    </Grid>
  );
}
