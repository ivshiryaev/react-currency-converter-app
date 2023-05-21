import React, { useState, useEffect} from 'react'

function useFetch(url,options) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=>{
		fetch(url,options)
		.then(response => {
			if(response.ok){
				return response.json()
			} else {
				throw new Error('Can\'t fetch data!')
			}
		})
		.then(data => {
			setIsLoading(false)
			setData(data)
		})
		.catch(err => {
			setError(err)
			console.log(err)
		})
	},[])

	return {data,isLoading,error}
}

export default useFetch