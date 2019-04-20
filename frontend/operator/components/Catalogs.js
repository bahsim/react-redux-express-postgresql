import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchBooks } from '../actions/main'

import FuncPanelCatalogs from './FuncPanelCatalogs'
import Authors from './Authors'
import Books from './Books'
import Users from './Users'
import BookNew from './BookNew'
import AuthorNew from './AuthorNew'
import UserNew from './UserNew'

class Catalogs extends Component {
	state = {
		tabIndex							: 0,
		registryTop						: 0,
		currentBookAuthor			: '',
		currentBookAuthorName	: '',
		newBookIsOpen					: false,
		newAuthorIsOpen				: false,
		newUserIsOpen					: false,
	}
	
	componentDidMount() {
		this.getRegistryTop()
	}
	
	componentDidUpdate() {
		this.getRegistryTop()
	}
	
	getRegistryTop() {
		const registryTop = this.registry.getBoundingClientRect().top;		
		if (this.state.registryTop !== registryTop) {
			this.setState({ registryTop })
		}
	}
	
	onClickTab = (e, tabIndex) => {
		this.setState({
			tabIndex, 
			currentBookAuthor: '',
		})
	}
	
	handleClickBookAuthor = (e, currentBookAuthor, currentBookAuthorName) => {
		this.setState({currentBookAuthor, currentBookAuthorName}, () => {
			this.props.fetchBooks(`/books?authorId=${this.state.currentBookAuthor}`)
		})
	}
	
	handlClickAdd = () => {
		switch (this.state.tabIndex) {
			case 0: this.setState({newAuthorIsOpen: true}); break;
			case 1: this.setState({newBookIsOpen: true}); break;
			case 2: this.setState({newUserIsOpen: true}); break;
		}
	}
	
	handleCloseBookNew = (refresh) => {
		this.setState({ newBookIsOpen: false})
		
		if (refresh) {
			this.props.fetchBooks(`/books?authorId=${this.state.currentBookAuthor}`)
		}
	}
	
	handleCloseAuthorNew = () => {
		this.setState({ newAuthorIsOpen: false})
	}
	handleCloseUserNew = () => {
		this.setState({ newUserIsOpen: false})
	}
	
	render() {
		const { authors, users, books } = this.props
		const { tabIndex, registryTop, currentBookAuthor, currentBookAuthorName } = this.state
		
		let btnAddVisible = true
		if (tabIndex === 1 && currentBookAuthor === '') {
			btnAddVisible = false
		}
		
		return (
			<div>
				<FuncPanelCatalogs
					tabIndex={tabIndex}
					onClickTab={this.onClickTab}
					btnAddVisible={btnAddVisible}
					onAddClick={this.handlClickAdd}
				/>
				<div ref={(el) => this.registry = el }>
					{tabIndex === 0 &&
						<Authors 
							list={authors}
							top={registryTop}
						/>
					}
					{tabIndex === 1 &&
						<Books 
							groups={authors}
							items={books}
							currentGroup={currentBookAuthor}
							top={registryTop}
							onClickGroup={this.handleClickBookAuthor}
						/>
					}
					{tabIndex === 2 &&
						<Users 
							list={users}
							top={registryTop}
						/>
					}
					<BookNew
						authorId={currentBookAuthor}
						authorName={currentBookAuthorName}
						isOpen={this.state.newBookIsOpen}
						close={this.handleCloseBookNew}
					/>
					<AuthorNew
						isOpen={this.state.newAuthorIsOpen}
						close={this.handleCloseAuthorNew}
					/>
					<UserNew
						isOpen={this.state.newUserIsOpen}
						close={this.handleCloseUserNew}
					/>
				</div>
			</div>
		)
	}
}

Catalogs.propTypes = {
	authors	: PropTypes.array.isRequired,
	users		: PropTypes.array.isRequired,
	books		: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
	authors	: state.authors,
	users		: state.users,
	books		: state.books,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBooks	: (url) => dispatch(fetchBooks(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalogs)
