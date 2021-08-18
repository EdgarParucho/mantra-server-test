// mongoDB functions arguments for embedded documents

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

const maintenanceInventory = (props) => {
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

const maintenanceClientInfo = (props) => {
  return {
    query: { "inventory.clientName": props.originalName },
    update: {
      $set: {
        "inventory.$[product].clientName": props.clientName,
        clientName: props.clientName
      }
    },
    options: { arrayFilters: [ { "product.clientName": props.originalName } ] }
  }
}

const maintenanceOfficeInfo = (props) => {
  return {
    query: { "inventory.officeName": props.originalName },
    update: {
      $set: {
        "inventory.$[product].officeName": props.officeName,
        "inventory.$[product].officeState": props.officeState,
        "inventory.$[product].officeRegion": props.officeRegion,
        officeName: props.officeName,
        officeState: props.officeState,
        officeRegion: props.officeRegion
      }
    },
    options: { arrayFilters: [ { "product.officeName": props.officeName } ] }
  }
}

module.exports = {
  officeInventory,
  clientContract,
  maintenanceInventory,
  maintenanceClientInfo,
  maintenanceOfficeInfo
}
