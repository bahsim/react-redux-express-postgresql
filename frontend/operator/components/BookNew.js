import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import { fetchNewBook } from '../actions/main'

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#fdff00',
    },
  },
	typography: { 
		useNextVariants: true 
	},
});

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

class BookNew extends Component {
	state = {
		name: '',
		description: '',
	}
	
	componentDidUpdate(prevProps) {
		const { isOpen } = this.props
		if (prevProps.isOpen !== isOpen) {
			this.setState({ name: '', description: '' })
		}
	}
	
	handleClickSave = () => {
		const params = {
			name: this.state.name,
			description: this.state.description, 
			authorid: this.props.authorId, 
			authorname: this.props.authorName, 
		}
		this.props.fetchNewBook(params, () => {
			this.props.close(true)
		})
	}
	
	render() {
		const { classes, authorId, authorName, isOpen, close } = this.props
		const { name, description } = this.state
		
		return (
			<MuiThemeProvider theme={theme}>
				<Modal
					isOpen={isOpen}
					onRequestClose={close}
					style={modalStyle}
				>
					<Typography variant="h5">
						{'Новая книга'}
					</Typography>
					
					<br/>
					
					<FormControl fullWidth className={classes.formControl}>
						<TextField 
							label={"Автор"}
							value={authorName}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.formControl}>
						<TextField 
							label={"Наименование"}
							value={this.state.name}
							onChange={(e) => this.setState({ name: e.target.value})}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.formControl}>
						<TextField 
							label={"Описание"}
							value={this.state.description}
							onChange={(e) => this.setState({ description: e.target.value})}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					
					<br/><br/>
					
					<Button mini variant="text" color="primary" onClick={this.handleClickSave}>
						<SaveIcon/>
						<span className={classes.label}>{'ОК'}</span>
					</Button>
					
					&nbsp;&nbsp;&nbsp;
					
					<Button mini variant="text" color="primary" onClick={close}>
						<CancelIcon />
						<span className={classes.label}>{'Отмена'}</span>
					</Button>
				</Modal>	
			</MuiThemeProvider>
		)
	}
}

BookNew.propTypes = {
	classes			: PropTypes.object.isRequired, 
	authorId		: PropTypes.string.isRequired,
	authorName	: PropTypes.string.isRequired,
	isOpen			: PropTypes.bool.isRequired,
	close				: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
	//
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNewBook	: (url, callback) => dispatch(fetchNewBook(url, callback)),
})

export default withStyles(styles)(
	connect(mapStateToProps, mapDispatchToProps)(BookNew)
)
