import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  Paper,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from '@mui/material'
import { Terminal, Info, Home, RateReview, Menu } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const navItems = [
  { icon: <Home />, title: 'Hem', linkPath: '/' },
  { icon: <Info />, title: 'Om mig', linkPath: '/information' },
  { icon: <Terminal />, title: 'Projekt', linkPath: '/projects' },
  { icon: <RateReview />, title: 'Kontakt', linkPath: '/contact' },
]

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setOpenDrawer((current) => !current)
  }

  const handleClick = (path: string) => {
    navigate(path)
  }

  const drawer = (
    <Paper
      elevation={0}
      sx={{ maxWidth: 256, height: '100vh', borderRadius: 0 }}
    >
      <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
        <Grid item xs={12} sx={{ padding: 1 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 4 }}
          >{`Marcus Richardson`}</Typography>
        </Grid>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,0.8)' }}
                onClick={() => handleClick(item.linkPath)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 'medium',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )

  return (
    <Box>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { sm: '100%' },
            justifyContent: { sm: 'center' },
          }}
        >
          {navItems.map((item, index) => (
            <Button key={index} onClick={() => handleClick(item.linkPath)}>
              {item.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={openDrawer}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}
export default Navbar
