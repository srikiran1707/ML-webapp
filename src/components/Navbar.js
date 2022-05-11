import { Outlet, Link } from 'react-router-dom'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SportsBasketballRoundedIcon from '@mui/icons-material/SportsBasketballRounded'
import { Typography } from '@mui/material'
import locale from '../utils/locale'

const pages = ['home', 'about', 'predictor', 'model comparision']

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SportsBasketballRoundedIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NBA
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            style={{ justifyContent: 'center' }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link as={Link} to={`/${locale(page)}`}>
                  {page}
                </Link>
              </Button>
            ))}
            <Outlet />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link as={Link} to='/aboutus'>
                About us
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
