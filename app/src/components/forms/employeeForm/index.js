import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@mui/material';


import EmployeeService from '../../../services/EmployeeService';

function EmployeeForm(props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  let { selected, setSelected, refresh } = props;
  const [selectedLabel, setSelectedLabel] = useState();

  async function handleNewItem(e) {
    e.preventDefault();
    await EmployeeService.insert({ name, contact });
    refresh();
  }

  async function handleEditItem(e) {
    e.preventDefault();
    await EmployeeService.edit(selected, { name, contact });
    clearFields();
    refresh();
  }

  function clearFields() {
    setName('');
    setContact('');

    setSelectedLabel(-1);
    setSelected(-2);
  }

  useEffect(() => {
    const fetch = async () => {
      if (selected < 0) return;
      const { id, name, contact } = await EmployeeService.findOne(selected);
      if(!id) {
        setSelected(-1);
        return;
      }
      setName(name);
      setContact(contact);
      setSelected(id);
    }
    setSelectedLabel(selected);
    fetch();
  }, [selected]);

  useEffect(clearFields,[]);

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={selectedLabel >= 0 ? handleEditItem : handleNewItem}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h2" mt={5} align='center'>Cadastro de empregados {selectedLabel >= 0 ? ` ID: ${selectedLabel}` : null}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Nome" name="nome" size="small" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contato"
                  name="contact"
                  size="small"
                  type="text"
                  variant="outlined"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {selectedLabel >= 0 ?
              <Button variant="contained" color="primary" fullWidth type="submit">
                Editar
              </Button>
              :
              <Button variant="contained" color="success" fullWidth type="submit">
                Cadastrar
              </Button>
            }
          </Grid>
          <Grid item xs={12}>
            <Button color="error" fullWidth onClick={() => clearFields()} >
              Limpar Campos
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default EmployeeForm