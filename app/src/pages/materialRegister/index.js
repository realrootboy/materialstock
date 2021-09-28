import React from 'react';

import Topbar from '../../components/topbar/';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/materialForm'
import List from '../../components/grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'


const MaterialRegister = () => {

  

  return (
    <Container>
      <Topbar/>
        <MaterialForm/>
      <Box display="flex">
        <Drawer/>
        <List/>  
      </Box>
    </Container>
  );
}

export default MaterialRegister;
