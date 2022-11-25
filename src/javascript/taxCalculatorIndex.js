import { englishCalc } from './calculations.js'
import { quebecCalc } from './quebecCalc.js'

let globalFormParams;

// SECTION 1: Submitting the form

export const submitForm = (event) => {
    event.preventDefault()
    // console.log('submitForm')
    const form = document.getElementById('form');
    // received data from from using form id in html file and stored in a variable called form here
    const data = new FormData(form);
    // created a new object containing keys and values from the variable form and stored in an 
    // object called data
    const dataObject = {};
    // created a new object with the name data object
    for (const [key, value] of data.entries()) {
        // for each key and value of our data entry 
        // .entries() is built in method in js to return an 
        // array of keys and values for each index in an array)
        dataObject[key] = value;
        //for each key of the dataObject asign an value 
      };
    let grossIncome = dataObject.income;
    // console.log ('grossIncome:', dataObject.income )
    let province = dataObject.workingProvince;
    //   console.log ('province:', dataObject.workingProvince)

    // console.log(dataObject);
    // return dataObject;

    calculateTax(grossIncome, province);
    // console.log ('calculateTax:', grossIncome, province )
}


// SECTION 2A: Calculations from form

export const calculateTax = (grossIncome, province) => {

    let initialUiParams;
    if (province === 'Quebec') {
        initialUiParams = quebecCalc(grossIncome)
    } else {
        initialUiParams = englishCalc(province, grossIncome)
    }
    // console.log ('calculateTax:', grossIncome, province )
    
    // const provincialTax = provincialCalc(province, grossIncome)
    // const federalTax = calculateFederalTax(grossIncome);
    // // console.log("federalTax: ", federalTax)
    // const cppTax = calculateCPPTax (grossIncome);
    // // console.log("cppTax: ", cppTax)
    // const eiTax = calculateEITax(grossIncome);
    // // console.log("eiTax: ", eiTax)
    // const totalTax = calculateTotalTax(federalTax, provincialTax, cppTax, eiTax);
    // // console.log ('totalTax:', totalTax)
    // const netPay = calculateNetPay(grossIncome,totalTax);
    // const marginalRate = calculateMarginalTax (grossIncome);
    // const averageRate = calculateAverageTax (totalTax, grossIncome);

    // const quebecEI = calculateEIQuebec (grossIncome);
    // const quebecPension = calculateQPP (grossIncome);
    // const quebecInsurance = calculateQPIP (grossIncome);
    // const quebecTax = calculateQuebcTotalTax (federalTax, provincialTax,
    //     quebecEI, quebecPension, quebecInsurance)
    // const quebecNetPay =  calculateQuebecNetPay (grossIncome, totalTax)
    // const quebecAverageRate = calculateAverageTaxQuebec (totalTax, grossIncome)

    // const eiTaxForUI = province == 'Quebec' ? quebecEI : eiTax;

    // const qpipForUI = province == 'Quebec' ? quebecInsurance : 0

    // const qppForUI = province == 'Quebec' ? quebecPension : 0

    // const totalTaxForUI = province == 'Quebec' ? quebecTax : totalTax;

    // const netPayForUI = province == 'Quebec' ? quebecNetPay : netPay;
   
    // const averageRateForUI = province == 'Quebec' ? quebecAverageRate : averageRate;

    // const initialUiParams = {
    //     eiTax,
    //     totalTax,
    //     netPay,
    //     averageRate,
    //     quebecPension: 0, 
    //     quebecInsurance: 0,
    //     grossIncome: grossIncome,
    //     federalTax, 
    //     provincialTax, 
    //     cppTax, 
    //     marginalRate
    // //created an object that holds the keys and values of our calculations
    // };

   const deductableParams = {
    eiTax: initialUiParams.eiTax,
    totalTax: initialUiParams.totalTax,
    netPay: initialUiParams.netPay,
    quebecPension: initialUiParams.quebecPension,
    quebecInsurance: initialUiParams.quebecInsurance,
    grossIncome: initialUiParams.grossIncome,
    federalTax: initialUiParams.federalTax,
    provincialTax: initialUiParams.provincialTax,
    cppTax: initialUiParams.cppTax,
}; 
    // console.log ("deductableParams:", deductableParams)
    
    globalFormParams = deductableParams
    // console.log ("globalFormParams:", globalFormParams)


    // console.log ('globalFormParams:', globalFormParams)
    // globalFormParams = initialUiParams 

    updateDOM(initialUiParams);
    //passing through our object as a single parameter
}


// SECTION 2B: Calculations from buttons

const getUpdatedUiParams = (divisor) => {
    let updatedUiParams = {}
    Object.keys(globalFormParams).forEach(key => {
        updatedUiParams[key] = globalFormParams[key] / divisor
    })
    return updatedUiParams
}

export const timeFrame = (payPeriod) => {
    // console.log("HERE: ", payPeriod.target.name)

    let updatedUiParams;
    switch (payPeriod.target.name) {
        case 'year':
            updatedUiParams = getUpdatedUiParams(1)
            break;
        case 'month':
            updatedUiParams = getUpdatedUiParams(12)
            break;
        case 'biweekly':
            updatedUiParams = getUpdatedUiParams(26);
             // console.log ("biweekly:", payPeriodRate)
            break;         
        case 'week':
            updatedUiParams = getUpdatedUiParams(52);
            // console.log ("week:", payPeriodRate)
            break;
      
        case 'day':
            updatedUiParams = getUpdatedUiParams(260);
            // console.log ("day:", payPeriodRate)
            break;
        case 'hour':
            updatedUiParams = getUpdatedUiParams(1950);
            // console.log ("hour:", payPeriodRate)
            break;
    }
    updateDOM(updatedUiParams);
}

// SECTION 3: Updating UI
    // 1. Get element
    // 2. Look into how to set a value for the element

const updateDOM = (uiParams) => {
    Object.keys(uiParams).forEach(key => {
        if (key === "marginalRate" || key === "averageRate"){
            document.getElementById(key).textContent = `${Math.round(uiParams[key])}%`
            // console.log ("rates:", document.getElementById(key).textContent )

        }
        else {
            document.getElementById(key).textContent = `- $${Math.round(uiParams[key])}`
        }
    })
};