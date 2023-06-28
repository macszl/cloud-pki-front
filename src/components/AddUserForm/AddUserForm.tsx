import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

export type UserTableDTO = {
  id: string;
  name: string;
  joined: string;
  lastVisit: string;
  counter: number;
  password: string;
};

interface AddUserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: UserTableDTO) => void;
}

export function AddUserForm(props: AddUserFormProps) {
  const { open, onClose, onSave } = props;
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [joined, setJoined] = useState<string>('');
  const [lastVisit, setLastVisit] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    const formData: UserTableDTO = {
      id: id,
      name: name,
      joined: joined,
      lastVisit: lastVisit,
      counter: counter,
      password: password,
    };

    axios
      .post(`${import.meta.env.VITE_PROD_API_URL}/users`, formData)
      .then(() => {
        onSave(formData);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleJoinedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoined(event.target.value);
  };

  const handleLastVisitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastVisit(event.target.value);
  };

  const handleCounterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(Number(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            name='name'
            label='Name'
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='id'
            label='ID'
            value={id}
            onChange={handleIdChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='joined'
            label='Joined'
            value={joined}
            onChange={handleJoinedChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='lastVisit'
            label='Last Visit'
            value={lastVisit}
            onChange={handleLastVisitChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='counter'
            label='Counter'
            type='number'
            value={counter}
            onChange={handleCounterChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='password'
            label='Password'
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type='submit'
            disabled={!name}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
