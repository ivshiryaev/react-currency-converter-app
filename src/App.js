import {useEffect, useState} from 'react'
import CurrencyRow from './CurrencyRow'
import useFetch from './useFetch'
import './style.css'
import Info from './Info'


const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest'
const options = {
	method:'GET',
	headers:{
		'apikey':'1U3h2GCIDWsjt85BWkJYt88umtlANkpZMXAkW9cQ'
	}
}


function App() {

	const [fromCurrency, setFromCurrency] = useState({
		name:'From Currency...',
		rate:1
	})
	const [toCurrency, setToCurrency] = useState({
		name:'To currency...',
		rate:1
	})

	const [fromCurrencyAmount,setFromCurrencyAmount] = useState(0)
	const [toCurrencyAmount,setToCurrencyAmount] = useState(0)

	const [currencyOptions,setCurrencyOptions] = useState([])
	const [isFromCurrency,setIsFromCurrency] = useState(true)



	//Fetching data from API
	const {data,isLoading,error} = useFetch(BASE_URL,options)

	//When data changes - do this
	useEffect(()=>{
		if(data){
			setCurrencyOptions(data.data)

			setFromCurrency({
				name:Object.entries(data.data)[0][0],
				rate:Object.entries(data.data)[0][1]
			})
			setToCurrency({
				name:Object.entries(data.data)[2][0],
				rate:Object.entries(data.data)[2][1]
			})
		}
	},[data])



	function convertionLogic(amount,rate1,rate2){
		let result = (amount / rate1) * rate2
		return result
	}
	useEffect(()=>{
		if(isFromCurrency){
			setToCurrencyAmount(convertionLogic(fromCurrencyAmount,fromCurrency.rate,toCurrency.rate))
		} else {
			setFromCurrencyAmount(convertionLogic(toCurrencyAmount,toCurrency.rate,fromCurrency.rate))
		}
	},[fromCurrencyAmount,toCurrencyAmount])



	function handleFromCurrency(e){
		let objEntries = Object.entries(data.data)
		let selected = e.target.value

		for(let i = 0; i < objEntries.length; i++){
			if(selected == objEntries[i][0]){
				setFromCurrency({
					name : objEntries[i][0].toString(),
					rate : objEntries[i][1]
				})
				return
			}
		}
	}
	function handleToCurrency(e){
		let objEntries = Object.entries(data.data)
		let selected = e.target.value

		for(let i = 0; i < objEntries.length; i++){
			if(selected == objEntries[i][0]){
				setToCurrency({
					name : objEntries[i][0].toString(),
					rate : objEntries[i][1]
				})
				return
			}
		}
	}



	function handleFromAmount(e){
		setFromCurrencyAmount(parseInt(e.target.value))
		setIsFromCurrency(true)
	}
	function handleToAmount(e){
		setToCurrencyAmount(e.target.value)
		setIsFromCurrency(false)
	}



	return (
		<>
			<div className="App">

			{(error && <div>Error!</div>)}

			{(isLoading && <div>Loading...</div>)}

			{(!isLoading && 
				<div className="formWrapper">
						<svg>
							<path d="M 0 24 H 400" stroke="white"></path>
						</svg>

					<form>
						<h1>Converter</h1>

						<CurrencyRow
							text = {'From'}
							currencyOptions = {currencyOptions}
							selectedCurrency = {fromCurrency.name}
							amount={fromCurrencyAmount}
							handleAmount = {handleFromAmount}
							onChangeCurrency = {handleFromCurrency}
						/>
						<CurrencyRow
							text = {'To'}
							currencyOptions = {currencyOptions}
							selectedCurrency = {toCurrency.name}
							amount={toCurrencyAmount}
							handleAmount = {handleToAmount}
							onChangeCurrency = {handleToCurrency}
						/>
					</form>
				</div>
			)}

			</div>

			<Info/>
		</>
	);
}

export default App;
