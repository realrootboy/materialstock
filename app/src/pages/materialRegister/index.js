import React from 'react';

import Topbar from '../../components/topbar/';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/materialForm'
import List from '../../components/grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Table from '../../components/Table'


const MaterialRegister = () => {

  

  return (
    <Container fixed>
      <Topbar/>
        <MaterialForm/>
      <Box display="flex">
        <Drawer/>
        {/* <List/>   */}
      </Box>
      <Table/>
    </Container>
  );
}

export default MaterialRegister;
