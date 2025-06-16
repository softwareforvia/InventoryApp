import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

const styles = {
  mystyle: {
    paddingTop: "40px",
  }
}

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © Zara Y '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                Via Software
              </Typography>
            </Box>
          </Box>
          <Box style={styles.mystyle}>
            <div>
              <Link color="text.secondary" variant="body2" href="/qb-reports">
                Thing one here
              </Link>
              <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" variant="body2" href="/qb-reports">
                Thing two here
              </Link>
              <Copyright />
            </div>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              paddingTop="8px"
              sx={{ justifyContent: 'left', color: 'text.secondary' }}
            >
              <IconButton
                color="inherit"
                size="small"
                href={''}
                aria-label="GitHub"
                sx={{ alignSelf: 'center' }}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
