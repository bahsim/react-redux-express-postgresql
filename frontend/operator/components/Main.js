import React, { Component } from 'react';
import { connect } from 'react-redux'

import { preLoading, fetchRegistry, fetchCheckBook } from '../actions/main';

import NavBar from './NavBar'
import FuncPanelRegistryFree from './FuncPanelRegistryFree'
import FuncPanelRegistryGivenout from './FuncPanelRegistryGivenout'
import FuncPanelCatalogs from './FuncPanelCatalogs'
import TableFree from './TableFree'
import TableGivenout from './TableGivenout'
import Catalogs from './Catalogs'
import Record from './Record'

class Main extends Component {
	state = {
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
	
	componentDidMount() {
		loaderInit.outerHTML = '';
		app.hidden = false;
		this.props.preLoading(`/books?status=${this.state.status}`);
	}
	
	componentDidUpdate() {
		const { appHasErrored, appIsLoading } = this.props
		
		document.body.style.backgroundColor = (
			appHasErrored === '' && appIsLoading == false ? 
				('#eeeeee') : ('#0093e7')
		);
		
		let registryTop = 0
		switch(this.state.tabIndex) {
			case 0: registryTop = this.registryFree.getBoundingClientRect().top; break;
			case 1: registryTop = this.registryGivenout.getBoundingClientRect().top; break;
		}
		if (this.state.registryTop !== registryTop) {
			this.setState({ registryTop })
		}
	}
	
	onClickTab = (e, tabIndex) => {
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
	}
	
	setFilterAuthor = (filterAuthor) => {
		this.setState({filterAuthor}, () =>{
			let query = `/books?status=${this.state.status}`
			if (filterAuthor !== '') query += `&authorId=${filterAuthor}`
			this.props.fetchRegistry(query)
		})
	}
	
	setFilterUser = (filterUser) => {
		this.setState({filterUser}, () => {
			let query = `/books?status=${this.state.status}`
			if (filterUser !== '') query += `&userId=${filterUser}`
			this.props.fetchRegistry(query)
		})
	}
	
	onClickRecord = (currentRec) => {
		this.setState({currentRec, modalIsOpen: true, currentUser: ''})
	}
	
	closeModal = () => {
		this.setState({modalIsOpen: false})
	}
	
	handleCheckBook = () => {
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
	}
	
	handleSelectUser = (event) => {
		this.setState({currentUser: event.target.value})
	}
	
	render() {
		const { appHasErrored, appIsLoading, registry, authors, users } = this.props
		
		const styleLoaderError = (
			appHasErrored !== '' ? {display:''} : {display:'none'}
		);
		const styleLoaderWait = (
			appHasErrored === '' && appIsLoading === true ? {display:''} : {display:'none'}
		);
		const styleWorkMode = (
			appHasErrored === '' && appIsLoading === false ? {display:''} : {display:'none'}
		);
		
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
					/>
					
					<br/>
					
					{this.state.tabIndex === 0 && 
						<div>
							<FuncPanelRegistryFree
								authors={authors}
								filterAuthor={this.state.filterAuthor}
								setFilterAuthor={this.setFilterAuthor}
							/>
							<div ref={(el) => this.registryFree = el }>
								<TableFree
									top={this.state.registryTop}
									registry={registry} 
									onClickRecord={this.onClickRecord} 									
								/>
							</div>
						</div>
					}
					{this.state.tabIndex === 1 &&
						<div>
							<FuncPanelRegistryGivenout
								users={users}
								filterUser={this.state.filterUser}
								setFilterUser={this.setFilterUser}
							/>
							<div ref={(el) => this.registryGivenout = el }>
								<TableGivenout
									top={this.state.registryTop}
									registry={registry} 
									onClickRecord={this.onClickRecord} 
								/>
							</div>
						</div>
					}
					{this.state.tabIndex === 2 &&
						<Catalogs />
					}
					
					<Record
						users={users}
						modalIsOpen={this.state.modalIsOpen}
						closeModal={this.closeModal}
						tabIndex={this.state.tabIndex}
						currentRec={this.state.currentRec}
						currentUser={this.state.currentUser}
						handleCheckBook={this.handleCheckBook}
						handleSelectUser={this.handleSelectUser}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	appHasErrored	: state.appHasErrored,
	appIsLoading	: state.appIsLoading,
	registry			:	state.registry,
	authors				:	state.authors,
	users					:	state.users,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  preLoading			: (url) => dispatch(preLoading(url)),
  fetchRegistry		: (url) => dispatch(fetchRegistry(url)),
  fetchCheckBook	: (params, callback) => dispatch(fetchCheckBook(params, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
