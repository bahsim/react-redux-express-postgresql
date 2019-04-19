import React from 'react';
import createReactClass from 'create-react-class';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#ffe38d',
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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
  },
  button: {
		marginTop: 		'2%',
		marginBottom:	'1%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
};

const FuncPanelHistory = (props) => {
	const { classes } = props;
	const styleLabel = {
		fontSize:		'14px',
		fontWeight:	700,
	};
	return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<Paper className={classes.root} elevation={8}>
					<Grid container spacing={0}>
						<Grid item xs={2}></Grid>
						<Grid item xs={2}>
						</Grid>
						<Grid item xs={2}>
						</Grid>
						<Grid item xs={2}>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</MuiThemeProvider>
	);
}

export default withStyles(styles)(FuncPanelHistory);