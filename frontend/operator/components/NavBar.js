import React from 'react';
import PropTypes from 'prop-types'

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/NoteAdd'
import DoneIcon from '@material-ui/icons/DoneAll'
import DeleteIcon from '@material-ui/icons/Delete'
import Unarchive from '@material-ui/icons/Unarchive'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#fdff00',
    },
  },
	typography: {
		useNextVariants: true
	},
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
  },
	logoBox: {
		color:'white',
		display:'inline-flex',
		verticalAlign:'middle'
	},
  logo: {
    marginLeft: 	30,
    marginRight: 	0,
  },
  tabs: {
		marginLeft: 	0,
    marginRight: 	0,
  },
  button: {
    marginLeft: 	0,
    marginRight: 	0,
		marginTop: 		'2%',
		marginBottom:	'2%',
  },
};

const NavBar = (props) => {
  const { classes, tabIndex, onClickTab } = props
  
	return (
		<MuiThemeProvider theme={theme}>
			<AppBar position="static" elevation={8}>
				<Toolbar>
					<Grid container spacing={8}>
						<Grid item xs={2}>
							<span className={classes.logoBox}>
								<img src="/logo.png" alt="" className={classes.logo} width="130" height="60" />
							</span>
						</Grid>
						<Grid item xs={10}>
							<Tabs className={classes.tabs}
								onChange={onClickTab}
								value={tabIndex} centered
							>
								<Tab label="Доступные" />
								<Tab label="Выданные" />
								<Tab label="Справочники" />
							</Tabs>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</MuiThemeProvider>
  )
}

NavBar.propTypes = {
  classes			: PropTypes.object.isRequired,
	tabIndex		: PropTypes.number.isRequired, 
	onClickTab	: PropTypes.func.isRequired,
}

export default withStyles(styles)(NavBar)
