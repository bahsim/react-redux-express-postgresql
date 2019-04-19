import React from 'react';
import createReactClass from 'create-react-class';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Table from './TableGivenout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#e39b3d',
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Registry = createReactClass({
  render() {
		const { classes, top, registry, onClickRecord } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<Paper className={classes.root} elevation={8}>
						<Table 
							top={top}
							registry={registry} 
							onClickRecord={onClickRecord} 
						/>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
})

export default withStyles(styles)(Registry);
