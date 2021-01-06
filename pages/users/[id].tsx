import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout/Layout';
import {
  Box,
  CircularProgress,
  Grid,
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
import { useRouter } from 'next/router';
import { getUserInfo } from '@hooks/useUsers';
import Link from 'next/link';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserPage = ({ history }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    let a = async () => {
      const id = router.query.id;
      console.log(id);
      if (!id) return;
      try {
        setLoading(true);

        let res = await getUserInfo(id);
        setUser(res);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
      setLoading(false);
    };
    a();
  }, [router]);

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
              <>
                {user ? (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Character</TableCell>
                          <TableCell align="center">Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            First Name
                          </TableCell>
                          <TableCell>{user.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Last Name
                          </TableCell>
                          <TableCell>{user.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Email
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Role
                          </TableCell>
                          <TableCell>{user.roleId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Verified
                          </TableCell>
                          <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Created
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Updated
                          </TableCell>
                          <TableCell>
                            {new Date(user.updatedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Grid>Could not get user info</Grid>
                )}
                <Box mt={3}>
                  <Link href="/users">Back to List</Link>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Section>
    </Layout>
  );
};

export default UserPage;
