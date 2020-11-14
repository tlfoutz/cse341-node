const rates = require('./rates')

const calculateRate = (req, res) => {
  const weight = req.query.weight
  const params = {}
  
  if (isNaN(weight) || weight <= 0) params.error = 'Invalid weight'
  else {
    const type = req.query.mailType
    const zone = req.query.zone
    let selectedRates = ""

    if (type == "fcpsr") selectedRates = rates[type + zone]
    else selectedRates = rates[type]
    const ratesObj = Object.keys(selectedRates)
    const weightClass = ratesObj.find((c) => weight <= c)

    if (weightClass) params.rate = selectedRates[weightClass]
    else params.error = "Too heavy"
  }

  res.render('pages/w09/results', params)
}

module.exports = calculateRate