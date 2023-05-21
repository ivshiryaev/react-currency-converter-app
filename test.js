let fromCurrency
let toCurrency

let fromAmount
let toAmount

let currenciesSelect

let selectedFromCurrency

let selectedCurrency ={}

const testData ={
	AUDTest:1.4,
	USDTest:1,
	RUBTest:80,
	PLNTest:4.2
}

const propertyNames =[]
const propertyValues =[]

for(let i = 0; i < Object.entries(testData).length; i++){
	propertyNames.push(Object.entries(testData)[i][0])
}
for(let i = 0; i < Object.entries(testData).length; i++){
	propertyValues.push(Object.entries(testData)[i][1])
}
console.log(propertyNames)
console.log(propertyValues)




console.log('')

//UI logic
currenciesSelect = Object.entries(testData)

selectedFromCurrency = "PLNTest"
selectedToCurrency = "RUBTest"

fromAmount = 100

//From currency
currenciesSelect.forEach(item => {
	if(item[0] === selectedFromCurrency){
		fromCurrency = item
	}
})

//To currency
currenciesSelect.forEach(item => {
	if(item[0] === selectedToCurrency){
		toCurrency = item
	}
})

console.log(`fromCurrency is :`)
console.log(fromCurrency)
console.log('')

console.log('toCurrency is:')
console.log(toCurrency)
console.log('')

// currency[0] - USD
// currency[1] - rate

//Convertion logic
let result = fromAmount / fromCurrency[1] * toCurrency[1]
console.log(result)


