import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vulnera App
          </Typography>
{/* //TODO: Gold plating investigate if routing can be improve into maintainable routing by loop instead of hardcoded */}
          <Link href="/pages/clients" passHref>
            <Button color="inherit">Clients</Button>
          </Link>
          <Link href="/pages/leads" passHref>
            <Button color="inherit">Leads</Button>
          </Link>
          <Link href="/pages/projects" passHref>
            <Button color="inherit">Projects</Button>
          </Link>
          <div className='ml-auto flex gap-2'>
            {session?.user ? (
              <>
                <p className='text-sky-600'>{session.user.name}</p>
                <button className='text-red-500' onClick={()=> signOut()}>Sign Out</button>
              </>
            ) : (
              <Button color="inherit" onClick={()=> signIn()}>SignIn</Button>
            )
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
