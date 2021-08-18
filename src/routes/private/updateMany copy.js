if (modelTarget.updatingProp) {
  req.body.updateInfo = { query: req.body.filter, update: req.body.body, options: {} }
  next()
}

const updateTarget // req.body.body.collection
const filterKeys = Object.keys(req.body.filter)
const filterVals = Object.values(req.body.filter)
const updateKeys = Object.keys(req.body.body)
const updateVals = Object.values(req.body.body)

const embeddedProps = [
  { model: 'Office', array: 'inventory', nested: false },
  { model: 'Client', array: 'contracts.products', nested: "products" }
]

const embedded = embeddedProps.find(i => i.model === updateTarget)
const filters = []
const updateProps = {}

for (const i in filterKeys) filters.push([{ [`${embedded.array}.${filterKeys[i]}`]: filterVals[i] }])

if (embedded.nested) for (const i in updateKeys) updateProps[`${embedded.nested}.$[arrayFilter].${updateKeys[i]}`] = updateVals[i]
else for (const i in updateKeys) updateProps[`${embedded.array}.$[arrayFilter].${updateKeys[i]}`] = updateVals[i]

const arrayFilters = [ { [`arrayFilter.${filterKey}`]: filters }]
if (embedded.nested) arrayFilters.push({ `nested.${embedded.nested}.filters`"contract.products.productName": props.originalName },)

const query = { $and: filters }
const update = { $set: updateProps }
const options = { arrayFilters }

const updateArgs = { query, update, options }
console.log(updateArgs)

const officeInventory = (props) => {
  return {
    query: { "inventory.productName": props.originalName },
    update: {
      $set: {
        "inventory.$[product].productType": props.productType,
        "inventory.$[product].productName": props.productName
      }
    },
    options: { arrayFilters: [ { "product.productName": props.originalName } ] }
  }
}

const clientContract = (props) => {
  return {
    query: { "contracts.products.productName": props.originalName },
    update: {
      $set: {
        "contracts.$[contract].products.$[product].productType": props.productType,
        "contracts.$[contract].products.$[product].productName": props.productName
      }
    },
    options: {
      arrayFilters: [
        { "contract.products.productName": props.originalName },
        { "product.productName": props.originalName }
      ]
    }
  }
}

module.exports = { officeInventory, clientContract }
