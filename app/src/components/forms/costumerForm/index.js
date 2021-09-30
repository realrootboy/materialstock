import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@mui/material';
import api from '../../../services/api';

function EmployeeForm() {
  const[name, setName]= useState('');
  const[contact, setContact]= useState('');
  const[location, setLocation]= useState('');
  
  async function handleNewCostumer(e){
    e.preventDefault();
    try{
      await api.post('/costumer', {
        "name": name,
        "contact": contact,
        "location": location,
      });
      setName('');
      setContact('');
      setLocation('');
    }
    catch(err){

    }
  }
  return(
    <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleNewCostumer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h4" component="h2" mt={5} align='center'>Cadastro de clientes</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Nome" name="nome" size="small" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
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
                <Grid item xs={12}>
                  <TextField fullWidth label="locação" name="location" size="small" variant="outlined" value={location} onChange={e => setLocation(e.target.value)}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="secondary" fullWidth type="submit" variant="contained">
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
  )
}

export default EmployeeForm