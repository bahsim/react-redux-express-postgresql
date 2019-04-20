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
    margin		: theme.spacing.unit,
    minWidth	: '100%',
  },
})

const FuncPanelRegistryFree = (props) => {
  const { classes, filterAuthor, setFilterAuthor, authors } = props
  
	return (
		<Paper elevation={8}>
			<Grid container spacing={0}>
				<Grid item xs={2}></Grid>
				<Grid item xs={5}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="filter-author">
							{"Автор"}
						</InputLabel>
						<Select
							value={filterAuthor}
							onChange={(event) => setFilterAuthor(event.target.value)}
							inputProps={{
								name: 'author',
								id: 'filter-author',
							}}
						>
							<MenuItem value={''}>
								{'Все'}
							</MenuItem>
							{authors.map((item) => {
								return (
									<MenuItem 
										key={item.id} 
										value={item.id}
									>
										{item.name}
									</MenuItem>
								)
							})}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
  )
}

FuncPanelRegistryFree.propTypes = {
  classes					: PropTypes.object.isRequired,
	filterAuthor		: PropTypes.string.isRequired, 
	setFilterAuthor	: PropTypes.func.isRequired, 
	authors					: PropTypes.array.isRequired,
}

export default withStyles(styles)(FuncPanelRegistryFree)
