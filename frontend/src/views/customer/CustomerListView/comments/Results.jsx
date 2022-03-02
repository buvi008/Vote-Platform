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
  },
}));


const Results = ({ className, comments, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  console.log(comments)

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
                <TableCell align={'center'} style={{width: '15%'}}>
                  Имя
                </TableCell>
                <TableCell align={'center'} style={{width: '10%'}}>
                  Номер телефона
                </TableCell>
                <TableCell align={'center'} style={{width: '15%'}}>
                  Название проекта
                </TableCell>
                <TableCell align={'center'} style={{width: '50%'}}>
                  Отзыв
                </TableCell>
                <TableCell align={'center'} style={{width: '10%'}}>
                  Дата создания
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.slice(page*limit, (page*limit)+limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                >
                  <TableCell align={'center'}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.author.name}
                      </Typography>
                  </TableCell>
                  <TableCell align={'center'}>
                    {customer.author.phone}
                  </TableCell>
                  <TableCell align={'center'}>
                    {customer.to.nameVariant}
                  </TableCell>
                  <TableCell align={'center'} style={{wordBreak: 'break-all'}}>
                    {customer.message}
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
        count={comments.length}
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
  comments: PropTypes.array.isRequired
};

export default Results;
