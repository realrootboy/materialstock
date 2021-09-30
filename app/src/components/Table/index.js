import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import api from '../../services/api'

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { editAction, deleteAction, listString } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          <IconButton edge="end" aria-label="edit" onClick={()=>editAction()}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton edge="end" aria-label="delete" onClick={()=>deleteAction(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Descrição
              </Typography> */}
              <Typography variant="caption">
                {listString=== '/material' ? row.description: row.contact} {/*terminar de fazer essa logica com o lease pronto */}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    descricao: PropTypes.string,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  const editAction = props.reqs.editAction;
  const deleteAction = props.reqs.deleteAction;

 
  const [rows, setRows] = useState([]);
  const id = 1;

  useEffect(()=>{  
    const listString = props.reqs.listAction;
    api.get(`${listString}`).then(response => {
        setRows(response.data)
      })
  }, [props.reqs.listAction,rows]); 

  async function handleDeleteIncident(deleteid){
    const id = deleteid;
    const listString = props.reqs.listAction;
    try{
        await api.delete(`${listString}/${id}`);
    
    setRows(rows.filter(row => row.id !== id))
    }
    catch(err){
        alert('erro ao deletar')

    }
  }



  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '40px' }} />
            <TableCell/> {/* pra ficar bonito */}
            <TableCell align="right" sx={{ width: '40px' }} />
            <TableCell align="right" sx={{ width: '40px' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} editAction={editAction} deleteAction={handleDeleteIncident} listString={props.reqs.listAction}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
