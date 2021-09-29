import * as React from 'react';
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
          <IconButton edge ="end" aria-label="edit">
            <EditIcon/>
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Descrição
              </Typography> */}
              <Typography variant ="caption">
                {row.descricao}
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
    name: PropTypes.number.isRequired,
    descricao: PropTypes.string,
  }).isRequired,
};

const rows = [
  {
    id: 1,
    name: 'icaro',
    descricao: 'blablablablabla'
  },
  {
    id: 2,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 3,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 4,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 5,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 6,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 7,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 8,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 9,
    name: 'renao',
    descricao: 'blebelbel'
  },
  {
    id: 10,
    name: 'renao',
    descricao: 'blebelbel'
  },
]

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '40px'}}/>
            <TableCell /> {/*colocar nome na table aqui se quiser */}
            <TableCell align="right" sx={{width: '40px'}}/>
            <TableCell align="right" sx={{width: '40px'}}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
