import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { TablePagination } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles({

    table: {
        minWidth: 650,
        height: 500,
    },

});

const MyTable = (props) => {
    const rows = props.tableData || [];
    const columns = props.tableHeaders;
    const setSelected = props.setSelected || undefined;
    const  deleteAction  = props.deleteAction;
    const refreshTable = props.refreshTable;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = async (id, f) => {
        if (f) {
            await f(id);
            refreshTable();
        } else {
            console.log("not defined function");
        }
    }
    console.log(rows);


    const classes = useStyles();
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}   >
                <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell>{column}</TableCell>
                            ))}
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            const values = Object.values(row).slice(0, -2);

                            return (
                                <TableRow key={row.id} >
                                    {
                                        values.map((value) => (
                                            <TableCell component="th" scope="row">
                                                {value}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleClick(row.id, setSelected)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleClick(row.id, deleteAction)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default MyTable;