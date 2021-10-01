import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@mui/material';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormTable from '../../FormTable';

import LeaseObjectService from '../../../services/LeaseObjectService';
import MaterialService from '../../../services/MaterialService';

function LeaseObjectForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [materialInForm, setMaterialInForm] = useState(-1);
  const [materialsInForm, setMaterialsInForm] = useState([]);
  let { selected, setSelected, refresh } = props;
  const [selectedLabel, setSelectedLabel] = useState();

  async function handleNewItem(e) {
    e.preventDefault();
    await LeaseObjectService.insert({ name, description, materials });
    clearFields();
    refresh();
  }

  async function handleEditItem(e) {
    e.preventDefault();
    await LeaseObjectService.edit(selected, { name, description, materials });
    clearFields();
    refresh();
  }

  function clearFields() {
    setName('');
    setDescription('');
    setMaterials([]);
    setQuantity(1);

    setSelectedLabel(-1);
    setSelected(-2);
  }

  async function handleAddMaterial(e) {
    e.preventDefault();
    if (materialInForm < 0) return;
    let m = materials;

    let already_inserted = materials.find(element=>element.id == materialInForm);

    if(already_inserted) {
      console.log(already_inserted);
      already_inserted.quantity = Number(quantity) + Number(already_inserted.quantity);
      const mapped_materials = materials.map(element=> element.id==materialInForm?already_inserted:element);
      setMaterials(mapped_materials);
      return;
    }

    let new_m = materialsInForm.find(element => element.id == materialInForm);
    new_m.quantity = Number(quantity);
    new_m.createdAt = null;
    new_m.updatedAt = null;
    m.push(new_m);
    console.log({m}
    )
    await setMaterials(m);
    refresh();
  }

  async function handleRemoveMaterial(id) {
    const new_materials = materials.filter(element => element.id != id);
    setMaterials(new_materials);
  }

  useEffect(() => {
    const fetch = async () => {
      if (selected < 0) return;
      const { id, name, description, materials } = await LeaseObjectService.findOne(selected);
      if (!id) {
        setSelected(-1);
        return;
      }
      setName(name);
      setDescription(description);
      let filteredMaterials = materials.filter(element => !Array.isArray(element));

      for (let element of filteredMaterials) {
        element.quantity = element.LeaseObjectMaterials.quantity != null ? element.LeaseObjectMaterials.quantity : 1;
        element.LeaseObjectMaterials = null;
        element.createdAt = null;
        element.updatedAt = null;

      }

      setMaterials(filteredMaterials);
      setSelected(id);
    }
    setSelectedLabel(selected);
    fetch();
  }, [selected]);

  useEffect(clearFields, []);
  useEffect(() => {
    const fetch = async () => {
      const { materials } = await MaterialService.list()
      if(materials && materials.length) setMaterialInForm(materials[0].id);

      setMaterialsInForm(materials);
    }
    fetch();
  }, []);

  return (
    <form onSubmit={selectedLabel >= 0 ? handleEditItem : handleNewItem}>
      <Container container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>

        <Grid item mt={5}>
          <Typography variant="h5" component="h2" align='center'>Cadastro de Objetos de Locação {selectedLabel >= 0 ? ` ID: ${selectedLabel}` : null}</Typography>
        </Grid>
        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >

          <Grid item >
            <Grid container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              spacing={2} >
              <Grid item xs>
                <TextField fullWidth label="Nome" name="nome" size="small" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  type="text"
                  size="big"
                  multiline
                  variant="outlined"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs>
                <Grid container
                  direction="column"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <InputLabel htmlFor="materialInForm-placeholder">
                      Material
                    </InputLabel>
                    <Select 
                      value={materialInForm}
                      onChange={e => setMaterialInForm(e.target.value)}
                      input={<Input name="materialInForm" id="materialInForm-placeholder" />}
                      displayEmpty
                      name="materialInForm"
                    >
                      <MenuItem value={-1}>
                        <em></em>
                      </MenuItem>
                      {
                        materialsInForm.map(material => (
                          <MenuItem
                            value={material.id}>
                            {material.name}
                          </MenuItem>
                        ))
                      }

                    </Select>
                  </Grid>
                  <Grid item>
                    <TextField

                      label="Quantidade"
                      name="descricao"
                      type="number"
                      size="small"
                      variant="outlined"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <FormHelperText>
                      <Button variant="outline" color="success" onClick={handleAddMaterial}>
                        Adicionar
                      </Button>
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item >
            <Grid container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              >
              <Grid item xs>
                <Typography variant="h6" component="h5" align='center'>Materiais</Typography>

              </Grid>
              <Grid item xs>
                <FormTable
                  tableData={materials}
                  tableHeaders={['id', 'name', 'description', 'quantity']}
                  deleteAction={(id) => handleRemoveMaterial(id)}
                  refreshTable={() => { }}
                  setSelected={() => { }}
                />
              </Grid>

            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={16} align='center'>
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
        <Grid item xs>
          <Button color="error" fullWidth onClick={() => clearFields()} >
            Limpar Campos
          </Button>
        </Grid>
      </Container>
    </form>
  )
}

export default LeaseObjectForm