import React from 'react'

import Paper from '@material-ui/core/Paper'

import Table from './TableFree'

const RegistryFree = (props) => {
	const { classes, top, registry, onClickRecord } = props
	
	return (
		<Paper elevation={8}>
			<Table 
				top={top}
				registry={registry} 
				onClickRecord={onClickRecord} 
			/>
		</Paper>
	)
}

export default RegistryFree
