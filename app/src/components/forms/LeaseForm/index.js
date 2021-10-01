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
import DateTimePicker from '@mui/lab/DateTimePicker';

import AddIcon from '@mui/icons-material/Add';

import FormTable from '../../FormTable';

import LeaseService from '../../../services/LeaseService';
import LeaseObjectService from '../../../services/LeaseObjectService';
import MaterialService from '../../../services/MaterialService';
import CostumerService from '../../../services/CostumerService';
import EmployeeService from '../../../services/EmployeeService';

function LeaseForm(props) {
    const [location, setLocation] = useState('');
    const [mountDay, setMountDay] = useState('');
    const [unmountDay, setUnmountDay] = useState('');
    const [leaseTime, setLeaseTime] = useState('');
    const [costumerId, setCostumerId] = useState(-1);

    const [materials, setMaterials] = useState([]);
    const [materialInForm, setMaterialInForm] = useState(-1);
    const [materialsInForm, setMaterialsInForm] = useState([]);
    const [quantity, setQuantity] = useState([]);

    const [employees, setEmployees] = useState([]);
    const [employeeInForm, setEmployeeInForm] = useState(-1);
    const [employeesInForm, setEmployeesInForm] = useState([]);

    const [costumers, setCostumers] = useState([]);
    const [costumerInForm, setCostumerInForm] = useState(-1);
    const [costumersInForm, setCostumersInForm] = useState([]);

    const [leaseObjectInForm, setLeaseObjectInForm] = useState(-1);
    const [leaseObjectsInForm, setLeaseObjectsInForm] = useState([]);

    const [action, setAction] = useState('montador');


    let { selected, setSelected, refresh } = props;
    const [selectedLabel, setSelectedLabel] = useState();

    function toDBDate(inputDate) {
        try {
            const dt = new Date(inputDate).toISOString();
            if (dt == 'Invalid Date') return null
            return dt;
        } catch (err) {
            return null;
        }
    }

    async function handleNewItem(e) {
        e.preventDefault();

        await LeaseService.insert({ location, mountDay: toDBDate(mountDay), unmountDay: toDBDate(unmountDay), leaseTime: toDBDate(leaseTime), materials, employees, costumer: { id: costumerId } })
        clearFields();
        refresh();
    }

    async function handleEditItem(e) {
        e.preventDefault();
        await LeaseService.edit(selected, { location, mountDay: toDBDate(mountDay), unmountDay: toDBDate(unmountDay), leaseTime: toDBDate(leaseTime), materials, employees, costumer: { id: costumerId } });
        clearFields();
        refresh();
    }

    function clearFields() {
        setLocation('');
        setMountDay('');
        setUnmountDay('');
        setLeaseTime('');
        setCostumerId(-1);
        setMaterials([]);
        setEmployees([]);

        setSelectedLabel(-1);
        setSelected(-2);
    }

    async function handleAddMaterial(e) {
        e.preventDefault();
        if (materialInForm < 0) return;
        let m = materials;

        let already_inserted = materials.find(element => element.id == materialInForm);

        if (already_inserted) {
            console.log(already_inserted);
            already_inserted.quantity = Number(quantity) + Number(already_inserted.quantity);
            const mapped_materials = materials.map(element => element.id == materialInForm ? already_inserted : element);
            setMaterials(mapped_materials);
            return;
        }

        let new_m = materialsInForm.find(element => element.id == materialInForm);
        new_m.quantity = Number(quantity);
        new_m.createdAt = null;
        new_m.updatedAt = null;
        m.push(new_m);
        console.log({ m }
        )
        await setMaterials(m);
        refresh();
    }

    async function handleAddLeaseObject(e) {
        e.preventDefault();
        console.log({ leaseObjectInForm });
        if (leaseObjectInForm < 0) return;
        let m_list = leaseObjectsInForm.find(element=>element.id  == leaseObjectInForm).materials;

        let m = materials;

        for (const mt of m_list) {
            const materialInForm_inside = mt.id;
            let already_inserted = materials.find(element => element.id == materialInForm_inside);

            if (already_inserted) {
                console.log(already_inserted);
                already_inserted.quantity = Number(already_inserted.quantity) + (mt.LeaseObjectMaterials.quantity?mt.LeaseObjectMaterials.quantity:1);
                const mapped_materials = materials.map(element => element.id == materialInForm_inside ? already_inserted : element);
                setMaterials(mapped_materials);
                continue;
            }

            let new_m = materialsInForm.find(element => element.id == materialInForm_inside);
            new_m.quantity = mt.LeaseObjectMaterials.quantity?mt.LeaseObjectMaterials.quantity:1;
            new_m.createdAt = null;
            new_m.updatedAt = null;

            m.push(new_m);
        
            
        }
        await setMaterials(m);
        refresh();
    }

    async function handleAddEmployee(e) {
        e.preventDefault();
        if (employeeInForm < 0) return;
        let m = employees;

        let already_inserted = employees.find(element => element.id == employeeInForm);

        if (already_inserted) return;

        let new_m = employeesInForm.find(element => element.id == employeeInForm);
        new_m.action = action;
        new_m.createdAt = null;
        new_m.updatedAt = null;
        new_m.contact = null;
        m.push(new_m);
        await setEmployees(m);
        refresh();
    }

    async function handleRemoveMaterial(id) {
        const new_materials = materials.filter(element => element.id != id);
        setMaterials(new_materials);
    }

    async function handleRemoveEmployee(id) {
        const new_employees = employees.filter(element => element.id != id);
        setEmployees(new_employees);
    }

    useEffect(() => {
        const fetch = async () => {
            if (selected < 0) return;
            const { id, location, mountDay, unmountDay, leaseTime, materials, employees, CostumerId } = await LeaseService.findOne(selected);
            if (!id) {
                setSelected(-1);
                return;
            }

            function pad(number) {
                number = Number(number);
                if (number <= 9) return '0' + number;
                else return number;
            }
            function fmtToInput(date) {
                return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes());
            }

            setLocation(location);
            setMountDay(fmtToInput(new Date(mountDay)));
            setUnmountDay(fmtToInput(new Date(unmountDay)));
            setLeaseTime(fmtToInput(new Date(leaseTime)));
            setCostumerId(CostumerId);

            let filteredMaterials = materials.filter(element => !Array.isArray(element));

            for (let element of filteredMaterials) {
                element.quantity = element.LeaseMaterials.quantity != null ? element.LeaseMaterials.quantity : 1;
                element.LeaseMaterials = null;
                element.createdAt = null;
                element.updatedAt = null;
            }

            let filteredEmployees = employees.filter(element => !Array.isArray(element));

            for (let element of filteredEmployees) {
                element.action = element.LeaseEmployees.action ? element.LeaseEmployees.action : 'montador';
                element.contact = null;
                element.LeaseEmployees = null;
                element.createdAt = null;
                element.updatedAt = null;
            }

            setEmployees(filteredEmployees);
            setMaterials(filteredMaterials);
            setSelected(id);
        }
        setSelectedLabel(selected);
        fetch();

    }, [selected]);

    useEffect(clearFields, []);
    useEffect(() => {
        const fetch = async () => {
            const { materials } = await MaterialService.list();
            if (materials && materials.length) setMaterialInForm(materials[0].id);
            setMaterialsInForm(materials);

            const { employees } = await EmployeeService.list();
            if (employees && employees.length) setEmployeeInForm(employees[0].id);
            setEmployeesInForm(employees);

            const { costumers } = await CostumerService.list();
            if (costumers && costumers.length) {
                setCostumerInForm(costumers[0].id);
                setCostumerId(costumers[0].id);
            }
            setCostumersInForm(costumers);

            const { leaseObjects } = await LeaseObjectService.list();
            if (leaseObjects && leaseObjects.length) setLeaseObjectInForm(leaseObjects[0].id);
            setLeaseObjectsInForm(leaseObjects);
          

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
                    <Typography variant="h5" component="h2" align='center'>Cadastro de Ordens de Serviço {selectedLabel >= 0 ? ` ID: ${selectedLabel}` : null}</Typography>
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
                                <TextField fullWidth label="Local" name="location" size="small" variant="outlined" multiline value={location} onChange={e => setLocation(e.target.value)} />
                            </Grid>
                            <Grid item xs>

                                <TextField fullWidth label="Dia de Montagem" name="mountDay"
                                    InputLabelProps={{ shrink: true }} type="datetime-local" size="small" variant="outlined" value={mountDay} onChange={e => setMountDay(e.target.value)} />

                            </Grid>
                            <Grid item xs>
                                <TextField fullWidth label="Tempo de Locação" name="leaseTime"
                                    InputLabelProps={{ shrink: true }} type="datetime-local" size="small" variant="outlined" value={leaseTime} onChange={e => setLeaseTime(e.target.value)} />
                            </Grid>
                            <Grid item xs>
                                <TextField fullWidth label="Dia da Desmontagem" name="unmountDay"
                                    InputLabelProps={{ shrink: true }} type="datetime-local" size="small" variant="outlined" value={unmountDay} onChange={e => setUnmountDay(e.target.value)} />
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
                                            <Button variant="contained" color="primary" onClick={handleAddMaterial}>
                                                <AddIcon />
                                            </Button>
                                        </FormHelperText>
                                    </Grid>



                                </Grid>



                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item mt={5}>
                        <Grid container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"

                        >
                            <Grid item xs>
                                <Grid container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}

                                >
                                    <Grid item>
                                        <InputLabel htmlFor="costumerInForm-placeholder">
                                            Cliente
                                        </InputLabel>
                                        <Select
                                            value={costumerInForm}
                                            onChange={e => setCostumerInForm(e.target.value)}
                                            input={<Input name="costumerInForm" id="costumerInForm-placeholder" />}
                                            displayEmpty
                                            name="costumerInForm"
                                        >
                                            <MenuItem value={-1}>
                                                <em></em>
                                            </MenuItem>
                                            {
                                                costumersInForm.map(costumer => (
                                                    <MenuItem
                                                        value={costumer.id}>
                                                        {costumer.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Grid>
                                    <Grid item>
                                        <InputLabel htmlFor="leaseObjectInForm-placeholder">
                                            Objetos
                                        </InputLabel>
                                        <Select
                                            value={leaseObjectInForm}
                                            onChange={e => setLeaseObjectInForm(e.target.value)}
                                            input={<Input name="leaseObjectInForm" id="leaseObjectInForm-placeholder" />}
                                            displayEmpty
                                            name="leaseObjectInForm"
                                        >
                                            <MenuItem value={-1}>
                                                <em></em>
                                            </MenuItem>
                                            {
                                                leaseObjectsInForm.map(costumer => (
                                                    <MenuItem
                                                        value={costumer.id}>
                                                        {costumer.name}
                                                    </MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </Grid>
                                    <Grid item>
                                        <FormHelperText>
                                            <Button variant="contained" onClick={handleAddLeaseObject}>
                                                <AddIcon />
                                            </Button>
                                        </FormHelperText>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs mt={2}>
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

                    <Grid item mt={5}>
                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                                <InputLabel htmlFor="materialInForm-placeholder">
                                    Funcionários
                                </InputLabel>
                                <Select
                                    value={employeeInForm}
                                    onChange={e => setEmployeeInForm(e.target.value)}
                                    input={<Input name="employeesInForm" id="employeesInForm-placeholder" />}
                                    displayEmpty
                                    name="employeesInForm"
                                >

                                    <MenuItem value={-1}>
                                        <em></em>
                                    </MenuItem>
                                    {
                                        employeesInForm.map(employees => (
                                            <MenuItem
                                                value={employees.id}>
                                                {employees.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel htmlFor="actionInForm-placeholder">
                                    Função
                                </InputLabel>
                                <Select value={action} onChange={e => setAction(e.target.value)}
                                    input={<Input name="actionInForm" id="actionInForm-placeholder" />}
                                    displayEmpty
                                    name="actionInForm">
                                    <MenuItem value={'motorista'}>Motorista</MenuItem>
                                    <MenuItem value={'montador'}>Montador</MenuItem>
                                </Select>

                            </Grid>
                            <Grid item>
                                <FormHelperText>
                                    <Button variant="contained" onClick={handleAddEmployee}>
                                        <AddIcon />
                                    </Button>
                                </FormHelperText>
                            </Grid>
                        </Grid>
                        <Grid container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                            mt={2}
                        >
                            <Grid item xs>
                                <Typography variant="h6" component="h5" align='center'>Funcionários Alocados</Typography>

                            </Grid>
                            <Grid item xs>
                                <FormTable
                                    tableData={employees}
                                    tableHeaders={['id', 'name', 'action']}
                                    deleteAction={(id) => handleRemoveEmployee(id)}
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
        </form >
    )

}

export default LeaseForm;