import React from 'react'

function CurrencyRow(props) {

	const { 
		text,
		amount,
		currencyOptions,
		selectedCurrency,
		onChangeCurrency,
		handleAmount } = props

	let selectedNumber;

	const currencyProps = []

	for(let i = 0; i < Object.entries(currencyOptions).length; i++){
		currencyProps.push(Object.entries(currencyOptions)[i][0])
	}

	return (
		<div className="CurrencyRow">
			<p>{text}</p>
			<div className="inputSelect">
				<input type="number" value={amount} onChange={handleAmount}/>
				<select value={selectedCurrency} onChange={onChangeCurrency}>
					{currencyProps.map(item => {	
						return <option key={item} value={item}>{item}</option>
					})}
				</select>
			</div>
		</div>
	)
}

export default CurrencyRow