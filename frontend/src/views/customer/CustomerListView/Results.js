/* eslint-disable */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CircularIndeterminate from "./loader";

import AddButton from "./AddButton";


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  loader: {
    height: '300px'
  },
  textarea: {
    minWidth: '100%',
    minHeight: '150px',
    maxWidth: '100%',
    maxHeight: '450px',
    overflow: 'auto!important',
    fontSize: '1.3rem',
    padding: '8px',
  }
}));


const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);



  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };



  return (
  <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={'center'} style={{width: '10%'}}>
                  ID
                </TableCell>
                <TableCell align={'center'} style={{width: '25%'}}>
                  Название проекта
                </TableCell>
                <TableCell align={'center'} style={{width: '25%'}}>
                  Адрес
                </TableCell>
                <TableCell align={'center'} style={{width: '20%'}}>
                  Количество вариантов
                </TableCell>
                <TableCell align={'center'} style={{width: '20%'}}>
                  Дата создания
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { customers.length > 0 ? false :<TableRow className={classes.loader}><td colSpan={5}><CircularIndeterminate/></td></TableRow> }
              {customers.slice(page*limit, (page*limit)+limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                >
                  <TableCell align={'center'}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.id}
                      </Typography>
                  </TableCell>
                  <TableCell align={'center'}>
                    {customer.name}
                  </TableCell>
                  <TableCell align={'center'}>
                    {customer.adrProject}
                  </TableCell>
                  <TableCell align={'center'}>
                    <span style={{paddingRight: '8px',
                      fontSize: '1.5rem',
                      verticalAlign: 'middle',
                    }}>{customer.variantId.length}</span>


                    <AddButton props={customer._id}/>

                  </TableCell>
                  <TableCell align={'center'}>
                    {customer.createdAt.split('T')[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
