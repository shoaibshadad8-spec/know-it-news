async function getCurrencyData(myCurrency){
    var currencyApiKey = '7ad3e55738f214282749ac16';
    var currencyApiUrl = `https://v6.exchangerate-api.com/v6/${currencyApiKey}/latest/${myCurrency}`
    var data = await fetch(currencyApiUrl)
    var result = await data.json()
    var currencyRow = document.createElement('div')
    currencyRow.classList.add('row')
    var currencyData = 
    `    
    <h4 class="col-6">${result.base_code}</h4>
    <h4 class="col-6">${result.conversion_rates.EGP}EGP</h4>  
      
    `
    
    currencyRow.innerHTML = currencyData
    document.querySelector('#currency').appendChild(currencyRow)  
      
    // console.log(result)    
}