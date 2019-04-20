import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
  },
  tableCell: {
    fontSize: '14px'
  },
})

const TableBooks = (props) => {
	const { classes, groups, items, top, currentGroup, onClickGroup } = props
	
	const registryHeight = ( (window.innerHeight - top) - 35 ) + 'px'
	const styleMainDiv = {height: registryHeight, overflow: 'auto'}
	
	return (
		<Grid container>
			<Grid item xs={4}>
				<Paper style={styleMainDiv} className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableCell}>
									{"Автор"}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{groups.map(item => (
								<TableRow key={item.id} hover 
									onClick={(e) => onClickGroup(e, item.id, item.name)}
									selected={currentGroup === item.id}
								>
									<TableCell className={classes.tableCell}>
										{item.name}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</Grid>
			<Grid item xs={8}>
				<Paper style={styleMainDiv} className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableCell}>
									{"Наименование"}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{"Описание"}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map(item => (
								<TableRow key={item.id} hover>
									<TableCell className={classes.tableCell}>
										{item.name}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{item.description}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</Grid>
		</Grid>
	)
}

TableBooks.propTypes = {
	classes				: PropTypes.object.isRequired, 
	groups				: PropTypes.array.isRequired, 	
	items					: PropTypes.array.isRequired, 	
	top						: PropTypes.number.isRequired, 
	currentGroup	: PropTypes.string.isRequired,
	onClickGroup	: PropTypes.func.isRequired,
}

export default withStyles(styles)(TableBooks)
