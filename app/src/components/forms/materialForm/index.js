import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@mui/material';


import MaterialService from '../../../services/MaterialService';

function MaterialForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  let { selected, setSelected, refresh } = props;
  const [selectedLabel, setSelectedLabel] = useState();

  async function handleNewItem(e) {
    e.preventDefault();
    await MaterialService.insert({ name, description, quantity });
    refresh();
  }

  async function handleEditItem(e) {
    e.preventDefault();
    await MaterialService.edit(selected, { name, description, quantity });
    clearFields();
    refresh();
  }

  function clearFields() {
    setName('');
    setDescription('');
    setQuantity(0);

    setSelectedLabel(-1);
    setSelected(-2);
  }

  useEffect(() => {
    const fetch = async () => {
      if (selected < 0) return;
      const { id, name, description, quantity } = await MaterialService.findOne(selected);
      if(!id) {
        setSelected(-1);
        return;
      }
      setName(name);
      setDescription(description);
      setQuantity(quantity);
      setSelected(id)
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
                <Typography variant="h5" component="h2" mt={5} align='center'>Cadastro de Materiais {selectedLabel >= 0 ? ` ID: ${selectedLabel}` : null}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Nome" name="name" size="small" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Descrição" name="description" size="big" variant="outlined" value={description} onChange={e => setDescription(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Quantidade" name="quantity" type="number" size="small" variant="outlined" value={quantity} onChange={e => setQuantity(e.target.value)} />
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

export default MaterialForm