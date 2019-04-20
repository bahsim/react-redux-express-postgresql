import React from 'react'
import PropTypes from 'prop-types'

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/AddCircleOutline'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#ffe38d',
    },
  },
	typography: {
		useNextVariants: true
	},
})

const styles = theme => ({
  tabs: {
		marginLeft	:	0,
    marginRight	:	0,
  },
	label: {
		marginLeft: theme.spacing.unit,
		fontSize: '14px',
		fontWeight:	700,
	},
	button: {
    marginLeft: 	0,
    marginRight: 	0,
		marginTop: 		theme.spacing.unit,
	},
	paper: {
		paddingBottom: theme.spacing.unit,
	}
})

const FuncPanelCatalogs = (props) => {
	const { classes, onClickTab, tabIndex, btnAddVisible, onAddClick } = props
	
	return (
		<MuiThemeProvider theme={theme}>
			<Paper className={classes.paper} elevation={8}>
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
					<Grid item xs={3} align="center">
						{btnAddVisible &&
							<Button mini variant="text" color="primary" 
								className={classes.button} onClick={onAddClick}
							>
								<AddIcon/>
								<span className={classes.label}>{'Добавить'}</span>
							</Button>
						}
					</Grid>
				</Grid>
			</Paper>
		</MuiThemeProvider>
	)
}

FuncPanelCatalogs.propTypes = {
	classes				: PropTypes.object.isRequired,
	onClickTab		: PropTypes.func.isRequired,
	tabIndex			: PropTypes.number.isRequired,
	btnAddVisible	: PropTypes.bool.isRequired,
	onAddClick		: PropTypes.func.isRequired,
}

export default withStyles(styles)(FuncPanelCatalogs)
