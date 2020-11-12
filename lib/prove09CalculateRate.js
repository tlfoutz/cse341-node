const rates = require('./prove09Rates')

const calculateRate = (req, res) => {
  const weight = req.query.weight
  const params = {}
  
  if (isNaN(weight) || weight <= 0) params.error = 'Invalid weight'
  else {
    const type = req.query.type

    const selectedRates = rates[type]
    const ratesObj = Object.keys(selectedRates)
    const weightClass = ratesObj.find((c) => weight <= c)

    if (weightClass) params.rate = selectedRates[weightClass]
    else params.error = "Too heavy"
  }

  res.render('pages/prove09Results', params)
}

module.exports = calculateRate