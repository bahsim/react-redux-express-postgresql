import React from 'react';
import createReactClass from 'create-react-class';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
});

const TableView = createReactClass({
  getRowStyle(flag) {
		return (
			flag ? {textDecoration: 'line-through'} : {}
		)
	},
	render() {
		const { classes } = this.props;
		const registryHeight = ( (window.innerHeight - this.props.top) - 25 ) + 'px';
		const styleMainDiv = {height: registryHeight, overflow: 'auto'}
		return (
			<Paper 
				style={styleMainDiv}
				ref={(el) => this.registry = el} 
				className={classes.root}>
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
						{this.props.registry.map(item => {
							return (
								<TableRow 
									style={this.getRowStyle(item.deleted)}
									key={item.id} 
									hover 
									onClick={() => this.props.onClickRecord(item)}
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
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		)
	}
});

export default withStyles(styles)(TableView);