import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SupportIcon from '@material-ui/icons/ContactSupport';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
};


const FuncPanelCurrent = (props) => {
	const styleLabel = {
		fontSize:		'14px',
		fontWeight:	700,
	};
  const { classes } = props;
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<Paper className={classes.root} elevation={8}>
					<Grid container spacing={0}>
						<Grid item xs={2}></Grid>
						<Grid item xs={5}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="record-status">
									{"Читатель"}
								</InputLabel>
								<Select
									value={props.filterUser}
									onChange={(event) => props.setFilterUser(event.target.value)}
									inputProps={{
										name: 'user',
										id: 'record-status',
									}}
								>
									<MenuItem value={''}>{'Все'}</MenuItem>
									{props.users.map((item) => {
										return (
											<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</MuiThemeProvider>
  );
}

FuncPanelCurrent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FuncPanelCurrent);