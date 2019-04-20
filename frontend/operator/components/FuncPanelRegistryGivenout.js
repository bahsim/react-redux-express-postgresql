import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
  },
})

const FuncPanelRegistryGivenout = (props) => {
  const { classes, filterUser, setFilterUser, users } = props
  
	return (
		<Paper elevation={8}>
			<Grid container spacing={0}>
				<Grid item xs={2}></Grid>
				<Grid item xs={5}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="filter-user">
							{"Читатель"}
						</InputLabel>
						<Select
							value={filterUser}
							onChange={(event) => setFilterUser(event.target.value)}
							inputProps={{
								name: 'user',
								id: 'filter-user',
							}}
						>
							<MenuItem value={''}>
								{'Все'}
							</MenuItem>
							{users.map((item) => {
								return (
									<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
								)
							})}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
  )
}

FuncPanelRegistryGivenout.propTypes = {
  classes				: PropTypes.object.isRequired,
	filterUser		: PropTypes.string.isRequired, 
	setFilterUser	: PropTypes.func.isRequired, 
	users					: PropTypes.array.isRequired,
}

export default withStyles(styles)(FuncPanelRegistryGivenout)
