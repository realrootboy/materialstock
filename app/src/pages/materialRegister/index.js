import React, {useState} from 'react';

import Topbar from '../../components/topbar/';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/forms/materialForm';
import LeaseObjectForm from '../../components/forms/LeaseObjectForm'
import EmployeeForm from '../../components/forms/employeeForm'
import CostumerForm from '../../components/forms/costumerForm'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '../../components/Table';



const MaterialRegister = () => {
  const[page, setPage] = useState('lease');
  
  console.log(page)
  return (
    <Container fixed>
      <Topbar/>
      {page === 'material' ? <MaterialForm/>:
      page === 'lease' ? <LeaseObjectForm/>:
      page === 'employee' ? <EmployeeForm/>:
      <CostumerForm/>}
      <Box display="flex">
        <Drawer setPage={setPage}/>
        {/* <List/>   */}
      </Box>
      {/* Se passar a req pro componente acho q da pra reaproveitar a tabela*/}
      <Table/>
    </Container>
  );
}

export default MaterialRegister;
