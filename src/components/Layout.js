import { Outlet, Link } from 'react-router-dom'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SportsBasketballRoundedIcon from '@mui/icons-material/SportsBasketballRounded'
const pages = ['home', 'about', 'predictor']

const Layout = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SportsBasketballRoundedIcon />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link as={Link} to={`/${page}`}>
                  {page}
                </Link>
              </Button>
            ))}
            <Outlet />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

// const Layout = () => {
//   return (
//     <>
//       <nav>
//         <ul>
//           <li>
//             <Link to='/'>Home</Link>
//           </li>
//           <li>
//             <Link to='/prediction'>Prediction</Link>
//           </li>
//         </ul>
//       </nav>

//       <Outlet />
//     </>
//   )
// }

export default Layout
