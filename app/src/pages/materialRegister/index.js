import React, {useState, useEffect} from 'react';

import Topbar from '../../components/topbar/';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/forms/materialForm';
import LeaseObjectForm from '../../components/forms/LeaseObjectForm'
import EmployeeForm from '../../components/forms/employeeForm'
import CostumerForm from '../../components/forms/costumerForm'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '../../components/Table';
import api from '../../services/api'


const MaterialRegister = () => {
  const[page, setPage] = useState('lease');
  const[activeReqs, setActiveReqs] = useState({});
  useEffect(()=> {
    switch(page) {
      case 'material':
        setActiveReqs({
          listAction: '/material' ,
          editAction: () => { console.log("Função de editar aqui"); },
          deleteAction: () => { console.log("Função de deletar aqui");}
        });
      break;

      case 'costumer':
        setActiveReqs({
          listAction: '/costumer',
          editAction: () => { console.log("Função de editar aqui"); },
          deleteAction: () => { console.log("Função de deletar aqui");}
        });
      break;

      case 'employee':
        setActiveReqs({
          listAction: '/employee',
          editAction: () => { console.log("Função de editar aqui"); },
          deleteAction: () => { console.log("Função de deletar aqui");}
        });
      break;

      case 'lease':
        setActiveReqs({
          listAction: '/lease',
          editAction: () => { console.log("Função de editar aqui"); },
          deleteAction: () => { console.log("Função de deletar aqui");}
        });
      break;

      default:
        break;
    }
  }, [page]);
  
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
      <Table reqs={activeReqs} />
    </Container>
  );
}

export default MaterialRegister;
