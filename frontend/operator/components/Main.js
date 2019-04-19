import React from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux'
import Modal from 'react-modal';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/CheckCircle';

import { preLoading, fetchRegistry, fetchCheckBook } from '../actions/main';

import NavBar from './NavBar'
import FuncPanelRegistryFree from './FuncPanelRegistryFree'
import FuncPanelRegistryGivenout from './FuncPanelRegistryGivenout'
import FuncPanelCatalogs from './FuncPanelCatalogs'
import RegistryFree from './RegistryFree'
import RegistryGivenout from './RegistryGivenout'

const customStyles = {
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

Modal.setAppElement('body')

const Main = createReactClass({
	getInitialState() {
		return {
			appMode			: 'registry',
			tabIndex		: 0,
			registryTop	: 0,
			status			: 'free',
			filterAuthor: '',
			filterUser	: '',
			currentRec	:	{},
			currentUser	: '',
			modalIsOpen	: false,
		}
	},
	componentDidMount() {
		loaderInit.outerHTML = '';
		app.hidden = false;
		this.props.preLoading(`/books?status=${this.state.status}`);
	},
	
	componentDidUpdate() {
		const { appHasErrored, appIsLoading } = this.props
		document.body.style.backgroundColor = (
			appHasErrored === '' && appIsLoading == false ? 
				('#eeeeee') : ('#0093e7')
		);
		switch(this.state.tabIndex) {
			case 0: {
				const registryTop = this.registryFree.getBoundingClientRect().top
				if (this.state.registryTop !== registryTop) {
					this.setState({
						registryTop: this.registryFree.getBoundingClientRect().top
					})
				}
				break;
			}
			case 1: {
				const registryTop = this.registryGivenout.getBoundingClientRect().top
				if (this.state.registryTop !== registryTop) {
					this.setState({
						registryTop: this.registryGivenout.getBoundingClientRect().top
					})
				}
				break;
			}
			case 2: {
				const registryTop = this.registryCatalogs.getBoundingClientRect().top
				if (this.state.registryTop !== registryTop) {
					this.setState({
						registryTop: this.registryCatalogs.getBoundingClientRect().top
					})
				}
				break;
			}
		}
	},
	
	getRegistry() {
		switch (this.state.tabIndex) {
			case 0: this.props.fetchRegistry(`/books?status=${this.state.status}`); break
			case 1: this.props.fetchRegistry(`/books?status=${this.state.status}`); break
		}
	},
	
	displayMe(value) {
		return (
			this.state.appMode === value ? {display:''} : {display:'none'}
		)
	},
	displayTab(value) {
		return (
			this.state.tabIndex === value ? {display:''} : {display:'none'}
		)
	},	
	onClickTab(e,tabIndex) {
		let status = ''
		switch (tabIndex) {
			case 0: status = 'free'; break
			case 1: status = 'givenout'; break
		}
		
		this.setState({ tabIndex, status }, () => {
			let query = `/books?status=${this.state.status}`
			switch (this.state.tabIndex) {
				case 0: {
					const { filterAuthor } = this.state
					if (filterAuthor !== '') query += `&authorId=${filterAuthor}`
					this.props.fetchRegistry(query)
					break
				}
				case 1: {
					const { filterUser } = this.state
					if (filterUser !== '') query += `&userId=${filterUser}`
					this.props.fetchRegistry(query)
					break
				}				
			}
		})
	},
	
	setFilterAuthor(filterAuthor) {
		this.setState({filterAuthor}, () =>{
			let query = `/books?status=${this.state.status}`
			if (filterAuthor !== '') query += `&authorId=${filterAuthor}`
			this.props.fetchRegistry(query)
		})
	},
	
	setFilterUser(filterUser) {
		this.setState({filterUser}, () => {
			let query = `/books?status=${this.state.status}`
			if (filterUser !== '') query += `&userId=${filterUser}`
			this.props.fetchRegistry(query)
		})
	},
	
	onClickRecord(currentRec) {
		this.setState({currentRec, modalIsOpen: true, currentUser: ''})
	},
	
	closeModal() {
		this.setState({modalIsOpen: false})
	},
	
	handleCheckBook() {
		if (this.state.tabIndex === 0 && this.state.currentUser === '') return
		
		this.setState({modalIsOpen: false}, () => {
			const params = {
				bookid: this.state.currentRec.id,
				userid: this.state.currentUser,
				username: '',
				available: false,
			}
			switch (this.state.tabIndex) {
				case 0: 
					this.props.users.forEach((item) => {
						if (item.id === params.userid) {
							params.username = item.name
						}
					})
					this.props.fetchCheckBook(params, () => {
						let query = `/books?status=${this.state.status}`
						const { filterAuthor } = this.state
						if (filterAuthor !== '') query += `&authorId=${filterAuthor}`
						this.props.fetchRegistry(query)
					}) 
					break;
				case 1:
					params.available = true
					this.props.fetchCheckBook(params, () => {
						let query = `/books?status=${this.state.status}`
						const { filterUser } = this.state
						if (filterUser !== '') query += `&userId=${filterUser}`
						this.props.fetchRegistry(query)
					}) 
					break;
			}			
		})
	},
	
	render() {
		const { 
			appHasErrored, appIsLoading, registry, authors, users
		} = this.props
		const styleLoaderError = (
			appHasErrored !== '' ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleLoaderWait = (
			appHasErrored === '' && appIsLoading === true ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleWorkMode = (
			appHasErrored === '' && appIsLoading === false ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleFormControl = {
			paddingBottom:'10px',
		}
		const styleLabel = {
			fontSize:		'14px',
			fontWeight:	700,
		};
		
		return (
			<div className="container" tabIndex="-1" style={{outline: 0}}>
				<div className="loader" style={styleLoaderError}>
					<img src="/logo.png" width="200vw" height="100vw" alt="" />
					<h2>{appHasErrored}</h2>
				</div>
				
				<div className="loader" style={styleLoaderWait}>
					<img src="/logo.png" width="200vw" height="100vw" alt="" />
				</div>
				
				<div style={styleWorkMode}>
					<NavBar 
						onClickTab={this.onClickTab}
						tabIndex={this.state.tabIndex}
						displayMe={this.displayMe}
					/>
					
					<br/>
					
					<div style={this.displayMe('registry')}>
						<div style={this.displayTab(0)}>
							<FuncPanelRegistryFree
								authors={authors}
								filterAuthor={this.state.filterAuthor}
								setFilterAuthor={this.setFilterAuthor}
							/>
							<div ref={(el) => this.registryFree = el }>
								<RegistryFree
									top={this.state.registryTop}
									registry={registry} 
									onClickRecord={this.onClickRecord} 									
								/>
							</div>
						</div>
						<div style={this.displayTab(1)}>
							<FuncPanelRegistryGivenout
								users={users}
								filterUser={this.state.filterUser}
								setFilterUser={this.setFilterUser}
							/>
							<div ref={(el) => this.registryGivenout = el }>
								<RegistryGivenout
									top={this.state.registryTop}
									registry={registry} 
									onClickRecord={this.onClickRecord} 
								/>
							</div>
						</div>
						<div style={this.displayTab(2)}>
							<FuncPanelCatalogs/>
							<div ref={(el) => this.registryCatalogs = el }>
								<RegistryFree
									top={this.state.registryTop}
									registry={registry} 
									onClickRecord={this.onClickRecord} 
								/>
							</div>
						</div>
					</div>
					
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Example Modal"
					>
						{this.state.tabIndex == 0 &&
							<Typography variant="headline">
								{'Выдача книги'}
							</Typography>
						}
						{this.state.tabIndex == 1 &&
							<Typography variant="headline">
								{'Возврат книги'}
							</Typography>
						}
						<br/>
						<FormControl fullWidth style={styleFormControl}>
							<TextField 
								label={"Автор"}
								value={this.state.currentRec.authorname}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
						<FormControl fullWidth style={styleFormControl}>
							<TextField 
								label={"Наименование"}
								value={this.state.currentRec.name}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
						<FormControl fullWidth style={styleFormControl}>
							<TextField 
								label={"Описание"}
								value={this.state.currentRec.description}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
						{this.state.tabIndex === 1 &&
							<FormControl fullWidth style={styleFormControl}>
								<TextField 
									label={"Читатель"}
									value={this.state.currentRec.username}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</FormControl>
						}
						{this.state.tabIndex === 0 &&
							<FormControl fullWidth style={styleFormControl}>
								<InputLabel htmlFor="record-status">
									{"Читатель"}
								</InputLabel>
								<Select
									value={this.state.currentUser}
									onChange={(event) => this.setState({currentUser: event.target.value})}
									inputProps={{
										name: 'author',
										id: 'record-status',
									}}
								>
									{users.map((item) => {
										return (
											<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						}
						
						<br/><br/>
						
						<Button mini variant="flat" color="primary" 
							onClick={() => this.handleCheckBook()}
						>
							<SaveIcon />
							<span style={styleLabel}>{'ОК'}</span>
						</Button>
						&nbsp;&nbsp;&nbsp;
						<Button mini variant="flat" color="primary" 
							onClick={() => this.closeModal()}
						>
							<CancelIcon />
							<span style={styleLabel}>{'Отмена'}</span>
						</Button>
					</Modal>
					
				</div>
			</div>
		)
	}
});

const mapStateToProps = (state, ownProps) => ({
	appHasErrored: 	state.appHasErrored,
	appIsLoading: 	state.appIsLoading,
	registry:				state.registry,
	authors:				state.authors,
	users:					state.users,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  preLoading: (url) => dispatch(preLoading(url)),
  fetchRegistry: (url) => dispatch(fetchRegistry(url)),
  fetchCheckBook: (params, callback) => dispatch(fetchCheckBook(params, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
