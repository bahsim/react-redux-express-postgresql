import React from 'react'
import Modal from 'react-modal'

import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/CheckCircle'

Modal.setAppElement('body')

const styles = {
	formControl: {
		paddingBottom:'10px',
	},
	label: {
		fontSize: '14px',
		fontWeight:	700,
	},
}

const modalStyle = {
  content : {
    width					: '450px',
		top           : '50%',
    left          : '50%',
    right         : 'auto',
    bottom        : 'auto',
    marginRight   : '-50%',
    transform     : 'translate(-50%, -50%)'
  }
}

const Record = (props) => {
	const { classes, modalIsOpen, closeModal, tabIndex, currentRec,
					users, currentUser, handleCheckBook, handleSelectUser } = props
					
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={modalStyle}
		>
			{tabIndex == 0 &&
				<Typography variant="h5">
					{'Выдача книги'}
				</Typography>
			}
			{tabIndex == 1 &&
				<Typography variant="h5">
					{'Возврат книги'}
				</Typography>
			}
			<br/>
			<FormControl fullWidth className={classes.formControl}>
				<TextField 
					label={"Автор"}
					value={currentRec.authorname}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FormControl>
			<FormControl fullWidth className={classes.formControl}>
				<TextField 
					label={"Наименование"}
					value={currentRec.name}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FormControl>
			<FormControl fullWidth className={classes.formControl}>
				<TextField 
					label={"Описание"}
					value={currentRec.description}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FormControl>
			{tabIndex === 1 &&
				<FormControl fullWidth className={classes.formControl}>
					<TextField 
						label={"Читатель"}
						value={currentRec.username}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</FormControl>
			}
			{tabIndex === 0 &&
				<FormControl fullWidth className={classes.formControl}>
					<InputLabel htmlFor="record-status">
						{"Читатель"}
					</InputLabel>
					<Select
						value={currentUser}
						onChange={handleSelectUser}
						inputProps={{
							name: 'author',
							id: 'record-status',
						}}
					>
						{users.map((item) => (
							<MenuItem 
								key={item.id} 
								value={item.id}
							>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			}
			
			<br/><br/>
			
			<Button mini variant="text" color="primary" onClick={handleCheckBook}>
				<SaveIcon />
				<span className={classes.label}>{'ОК'}</span>
			</Button>
			
			&nbsp;&nbsp;&nbsp;
			
			<Button mini variant="text" color="primary" onClick={closeModal}>
				<CancelIcon />
				<span className={classes.label}>{'Отмена'}</span>
			</Button>
		</Modal>	
	)
}

export default withStyles(styles)(Record)
