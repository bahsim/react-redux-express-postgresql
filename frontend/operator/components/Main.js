import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
	render() {
		return (
			<div className="container" tabIndex="-1" style={{outline: 0}}>
				<div className="loader">
					<img src="/logo.png" width="200vw" height="100vw" alt="" />
				</div>
			</div>
		)
	}
});
