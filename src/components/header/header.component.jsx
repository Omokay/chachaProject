import React from 'react';
import {NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Open Sans\', sans-serif',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            padding: '10px',
            fontSize: '18px',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#1f0409',
        color: 'white',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: '#EFEFEF',
        minHeight: '100vh',
    },
    nested: {
        paddingLeft: theme.spacing(4),

    },
    navLink: {
        textDecoration: 'none',
        color: 'white',
    }
}));

const  DashHeader = (props, children) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <div
                    style={{
                        width: '90.41px',
                        height: '26.64px',
                        background: 'url(\'../../Assets/logo_color.png\')',
                    }}
                />
            </div>
            <Divider />
            <List component="nav"
                  aria-labelledby="nested-list-subheader">
                <NavLink className={classes.navLink} to='/homepage'>
                    <ListItem button>
                        <ListItemIcon><DashboardIcon style={{color: 'white'}} /></ListItemIcon>
                        <ListItemText primary='Dashboard' style={{fontSize: 16}} />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.navLink} to='/patients'>
                    <ListItem button>
                        <ListItemIcon><PeopleIcon style={{color: 'white'}} /></ListItemIcon>
                        <ListItemText primary='All Patients' style={{fontSize: 16}} />
                    </ListItem>
                </NavLink>
                <NavLink className={classes.navLink} to='/vaccines'>
                    <ListItem button >
                        <ListItemIcon><GroupAddIcon style={{color: 'white'}} /></ListItemIcon>
                        <ListItemText primary='Vaccines' style={{fontSize: 16}} />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.navLink} to='/login'>
                    <ListItem button>
                        <ListItemIcon>
                            <BuildIcon style={{color: 'white'}} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root} id='navwrapper'>
            <CssBaseline />
            <AppBar color='white' position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        {/* Should hold the  nav brand */}
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        ChaCha Clinic
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            {/* MAIN BODY STARTS HERE*/}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            </main>
        </div>
    );
}

// DashHeader.propTypes = {
//     window: PropTypes.func,
// };

export default DashHeader;
