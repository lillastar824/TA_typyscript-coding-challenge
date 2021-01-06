import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout/Layout';
import {
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Section from '@components/Sections/Section';
import Link from 'next/link';
import useUsers from '@hooks/useUsers';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    let a = async () => {
      setLoading(true);
      try {
        let res = await useUsers();
        setUsers(res);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    a();
  }, []);

  return (
    <Layout>
      <Section id="users">
        <Grid item container spacing={5}>
          <Grid item xs={12}>
            {loading ? (
              <Grid container alignItems="center" justify="center" spacing={5}>
                <CircularProgress />
              </Grid>
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell align="right">First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Created</TableCell>
                      <TableCell align="right">Verified</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                          {idx + 1}
                        </TableCell>
                        <TableCell align="right">{row.firstName}</TableCell>
                        <TableCell align="right">{row.lastName}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {row.verified ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="center">
                          <Link href={'/users/' + row.id}>
                            <IconButton color="primary" aria-label="View info">
                              <Icon>preview</Icon>
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Section>
    </Layout>
  );
};

export default UsersPage;
