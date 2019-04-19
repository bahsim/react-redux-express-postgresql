import React from 'react'

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#ffe38d',
    },
  },
})

const styles = {
  tabs: {
		marginLeft: 	0,
    marginRight: 	0,
  },
}

const FuncPanelCatalogs = (props) => {
	const { classes, onClickTab, tabIndex } = props;
	
	return (
		<MuiThemeProvider theme={theme}>
			<Paper elevation={8}>
				<Grid container spacing={0}>
					<Grid item xs={1}></Grid>
					<Grid item xs={6}>
						<Tabs className={classes.tabs}
							onChange={onClickTab}
							value={tabIndex} 
						>
							<Tab label="Авторы" />
							<Tab label="Книги" />
							<Tab label="Читатели" />
						</Tabs>
					</Grid>
				</Grid>
				<br/>
			</Paper>
		</MuiThemeProvider>
	);
}

export default withStyles(styles)(FuncPanelCatalogs)
