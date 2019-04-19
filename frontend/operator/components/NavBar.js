import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/NoteAdd';
import DoneIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import Unarchive from '@material-ui/icons/Unarchive';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#fdff00',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
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

function NavBar(props) {
	const styleLabel = {
		fontSize:		'14px',
		fontWeight:	700,
	};
  const { 
		classes, 
		tabIndex,
		onClickTab,
	} = props;
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar position="static" elevation={8}>
					<Toolbar>
						<Grid container spacing={8}>
							<Grid item xs={2}>
								<span style={{color:'white',display:'inline-flex',verticalAlign:'middle'}}>
									<img src="/logo.png" alt="" className={classes.logo} width="130" height="60" />
								</span>
							</Grid>
							<Grid item xs={10}>
								<div style={props.displayMe('registry')}>
									<Tabs className={classes.tabs}
										onChange={onClickTab}
										value={tabIndex} centered
									>
										<Tab label="Доступные" />
										<Tab label="Выданные" />
										<Tab label="Справочники" />
									</Tabs>
								</div>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
  );
}

export default withStyles(styles)(NavBar);