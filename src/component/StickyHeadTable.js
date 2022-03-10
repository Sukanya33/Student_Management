import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fontSize } from '@mui/system';

// const dispatch = useDispatch();

const columns = [
  { id: 'name', label: 'Name', minWidth: 50, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
  { id: 'age', label: 'Age', minWidth: 50, align: 'center' },
  { id: 'gender', label: 'Gender', minWidth: 50, align: 'center' },
  { id: 'class', label: 'Class', minWidth: 50, align: 'center' },
  { id: 'department', label: 'Department', minWidth: 50, align: 'center' },
  { id: 'location', label: 'Location', minWidth: 50, align: 'center' },
  { id: 'update', label: 'Update', minWidth: 50, align: 'center' },
  { id: 'remove', label: 'Remove', minWidth: 50, align: 'center' },
];

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = props.studentList;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: 20 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    var value;
                    const id = row['_id'];
                    var type;
                    if (column.id !== 'update' && column.id !== 'remove') {
                      value = row[column.id];
                      type = 'value';
                    } else if (column.id === 'update') {
                      type = 'update';
                    } else {
                      type = 'remove';
                    }

                    return (
                      <TableCell key={column.id} align={column.align} style={{ fontSize: 15 }}>
                        {type === 'update' && <Link to={`/edit/${id}`}> Update </Link>}
                        {type === 'remove' && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();

                              dispatch({ type: 'API_DELETE_STUDENT_CALL_REQUEST', id: id });
                            }}
                          >
                            Remove
                          </button>
                        )}
                        {type === 'value' && column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
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
