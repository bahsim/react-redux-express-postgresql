import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    fontSize: '14px'
  },
})

const TableGivenout = (props) => {
	const { classes, registry, onClickRecord, top } = props;
	
	const registryHeight = ( (window.innerHeight - top) - 25 ) + 'px'
	const styleMainDiv = {height: registryHeight, overflow: 'auto'}
	
	return (
		<Paper style={styleMainDiv} className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableCell}>
							{"Дата и время"}
						</TableCell>
						<TableCell className={classes.tableCell}>
							{"Автор"}
						</TableCell>
						<TableCell className={classes.tableCell}>
							{"Наименование"}
						</TableCell>
						<TableCell className={classes.tableCell}>
							{"Читатель"}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{registry.map(item => (
						<TableRow 
							key={item.id} 
							hover 
							onClick={() => onClickRecord(item)}
						>
							<TableCell component="th" scope="row" className={classes.tableCell}>
								{moment(item.created).format('DD.MM.YYYY HH:mm')}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{item.authorname}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{item.name}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{item.username}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	)	
}

TableGivenout.propTypes = {
	classes				: PropTypes.object.isRequired, 
	registry			: PropTypes.array.isRequired, 
	onClickRecord	: PropTypes.func.isRequired, 
	top						: PropTypes.number.isRequired,
}

export default withStyles(styles)(TableGivenout)
