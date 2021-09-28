import React from 'react';

import Topbar from '../../components/topbar/';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/materialForm'
import List from '../../components/grid'
import Container from '@material-ui/core/Container'


const MaterialRegister = () => {

  

  return (
    <Container>
      <Topbar/>
      <Drawer/>
      <MaterialForm/>
      <List/>  
    </Container>
  );
}

export default MaterialRegister;
