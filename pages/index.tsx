import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Components
import Section from 'components/Sections/Section';
import Layout from 'components/Layout/Layout';
import Link from 'next/link';

export default function Index() {
  return (
    <Layout>
      <Section id="home">
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12}>
            <Box fontSize="1.4rem">Welcome to the home page</Box>

            <Box mt={3}>
              <Link href="/users">Go to Users Page</Link>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Layout>
  );
}
