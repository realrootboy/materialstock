import React, { useState, useEffect } from 'react';

import Topbar from '../../components/topbar';
import Drawer from '../../components/drawer';
import MaterialForm from '../../components/forms/materialForm';
import LeaseObjectForm from '../../components/forms/LeaseObjectForm'
import EmployeeForm from '../../components/forms/employeeForm'
import CostumerForm from '../../components/forms/costumerForm'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MyTable from '../../components/Table';

import MaterialService from '../../services/MaterialService';
import EmployeeService from '../../services/EmployeeService';
import CostumerService from '../../services/CostumerService';


const MainApp = () => {
  const [page, setPage] = useState('material');
  const [activeReqs, setActiveReqs] = useState({});
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [selected, setSelected] = useState(-1);

  function handlePageLoad() {
    const f = async () => {
      let fetchData;
      switch (page) {
        case 'material':
          setActiveReqs({
            deleteAction: MaterialService.delete,
          });

          fetchData = async () => {
            const { materials, headers } = await MaterialService.list();
            setTableData(materials);
            setTableHeaders(headers);
          }
          break;
        case 'employee':
          setActiveReqs({
            deleteAction: EmployeeService.delete,
          });

          fetchData = async () => {
            const { employees, headers } = await EmployeeService.list();
            setTableData(employees);
            setTableHeaders(headers);
          }
          break;
        case 'costumer':
          setActiveReqs({
            deleteAction: CostumerService.delete,
          });

          fetchData = async () => {
            const { costumers, headers } = await CostumerService.list();
            setTableData(costumers);
            setTableHeaders(headers);
          }
          break;
        default:
          break;
      }

      fetchData();
    }
    f();
  }

  useEffect(() => {
    setSelected(-1);
    handlePageLoad()
  }, [page]);

  return (
    <Container fixed>
      <Topbar />
      {page === 'material' ?
        <MaterialForm setSelected={(id) => setSelected(id)} selected={selected} refresh={() => handlePageLoad()} /> : null}
      {page === 'leaseobject' ?
        <LeaseObjectForm setSelected={(id) => setSelected(id)} selected={selected} refresh={() => handlePageLoad()} /> : null}
      {page === 'employee' ?
        <EmployeeForm setSelected={(id) => setSelected(id)} selected={selected} refresh={() => handlePageLoad()} /> : null}
      {page === 'costumer' ?
        <CostumerForm setSelected={(id) => setSelected(id)} selected={selected} refresh={() => handlePageLoad()} /> : null}
      <Box display="flex">
        <Drawer setPage={setPage} />
      </Box>
      {/* Se passar a req pro componente acho q da pra reaproveitar a tabela*/}
      <MyTable
        reqs={activeReqs}
        tableData={tableData}
        tableHeaders={tableHeaders}
        deleteAction={activeReqs.deleteAction}
        refreshTable={() => handlePageLoad()}
        setSelected={(id) => setSelected(id)}
      />

    </Container>
  );
}

export default MainApp;
