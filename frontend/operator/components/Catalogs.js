import React, { Component} from 'react'
import createReactClass from 'create-react-class'
import { connect } from 'react-redux'

// import { preLoading } from '../actions/main'

import FuncPanelCatalogs from './FuncPanelCatalogs'

class Catalogs extends Component {
	state = {
		tabIndex: 0,
	}
	
	componentDidMount() {}
	
	componentDidUpdate() {
		const registryTop = this.registryCatalogs.getBoundingClientRect().top
		if (this.state.registryTop !== registryTop) {
			this.setState({
				registryTop: this.registryCatalogs.getBoundingClientRect().top
			})
		}
	}
	
	onClickTab = (e, tabIndex) => {
		this.setState({tabIndex})
	}
	
	render() {
		const { authors, users } = this.props
		const { tabIndex } = this.state
		
		return (
			<div>
				<FuncPanelCatalogs
					tabIndex={tabIndex}
					onClickTab={this.onClickTab}
				/>
				<div ref={(el) => this.registryCatalogs = el }>
					{tabIndex === 0 &&
						<div/>
					}
					{tabIndex === 1 &&
						<div/>
					}
					{tabIndex === 2 &&
						<div/>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	authors:	state.authors,
	users:		state.users,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // preLoading: (url) => dispatch(preLoading(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalogs)
