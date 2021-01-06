import React from 'react';
import Link from 'next/link';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

interface Props {
  size: number;
  dark?: boolean;
}

const Logo: React.FC<Props> = (props) => {
  const { size, dark = false } = props;
  const color: string = React.useMemo(() => (dark ? '#000' : '#fff'), [dark]);
  return (
    <Grid container justify="center">
      <Box fontSize={size} fontWeight="fontWeightBold" color={color}>
        <Link href="/">
          <a
            href="/"
            style={{
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Neddaxs Code Test
          </a>
        </Link>
      </Box>
    </Grid>
  );
};

export default Logo;
