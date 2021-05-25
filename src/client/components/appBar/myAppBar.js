import React, { useEffect, useContext } from 'react';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GlobalState from "../../store/globalState"
import Logout from './logout';
//import '@fontsource/roboto';
import LetterAvatar from './letterAvatar'
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom'
import MyRouterBreadcrumbs from './myRouterBreadcrumbs'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  breadcrumb: {
    padding: 30
  },
  centerAdornment: {
    marginLeft: "50%" // or your relevant measure
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    color: 'inherit',
  },
  searchText: {
    //padding: theme.spacing(1, 1, 1, 0),
    //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // corretto per spostare il placeholder nella search box
    //paddingLeft: 100,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function PrimarySearchAppBar(props) {

  const classes = useStyles();
  const history = useHistory();

  const { globalState, globalDispatch } = useContext(GlobalState);
  console.log('GlobalState on myAppBar ', globalState)
  console.log('props on PrimarySearchAppBar', props)
  console.log('userName', props.currentUser.fullName)
  const userName = props.currentUser.fullName
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [settingsDialogVisibility, setSettingsDialogVisibility] = React.useState(null)
  const [loginFormVisibility, setLoginFormVisibility] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLoginFormOpen = Boolean(loginFormVisibility)


  const handleCloseLogin = (event) => {
    setLoginFormVisibility(false)
  }

  const handleLoginForm = (event) => {
    setLoginFormVisibility(true)
  }

  const handleOpenDialog = (event) => {
    setSettingsDialogVisibility(true)
  }
  const handleCloseDialog = (event) => {
    setSettingsDialogVisibility(false)
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickMenuItem = (currentTarget)=>{
    history.push('/'+currentTarget.id)
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
    >
      <MenuItem>
        <SettingsIcon />
          Settings
      </MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Close</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        id='homepage'
        label='Homepage'
        onClick={(e) => {
          handleClickMenuItem(e.currentTarget);
          handleOpenDialog();
          handleMenuClose();
        }}>
        <IconButton
          aria-label="homepage"
          color="inherit">
          <Badge badgeContent={null} color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>

      <MenuItem
        id='seasons'
        label='Stagioni'
        onClick={(e) => {
          handleClickMenuItem(e.currentTarget);
          handleOpenDialog()
          handleMenuClose()
        }}>
        <IconButton
          aria-label="seasons"
          color="inherit">
          <Badge badgeContent={null} color="secondary">
            <ListAltIcon />
          </Badge>
        </IconButton>
        <p>Stagioni</p>
      </MenuItem>

      <MenuItem onClick={(e) => {
        id = 'settings'
        label = 'Impostazioni'
        handleClickMenuItem(e.currentTarget);
        handleOpenDialog()
        handleMenuClose()
      }}
      >
        <IconButton aria-label="show settings" color="inherit">
          <Badge badgeContent={null} color="secondary">
            <SettingsIcon />
          </Badge>
        </IconButton>
        <p>Impostazioni</p>
      </MenuItem>


      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {renderMobileMenu}

          {renderMenu}

          <Typography className={classes.title} variant="h4" noWrap>
            {globalState.appSettings.title}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{inputRoot: classes.searchBox,
                inputInput:classes.searchText
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>    
            <LetterAvatar letter={props.currentUser.abbreviation} />
            {globalState.loggedIn && <Logout />}
          </div>
        </Toolbar>
        <MyRouterBreadcrumbs />
      </AppBar>
    </div>
  );
}