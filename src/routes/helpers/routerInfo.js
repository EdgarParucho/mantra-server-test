const privateRoutes = [
  require('../private/create'),
  require('../private/delete'),
  require('../private/update'),
  require('../private/updateMany'),
  require('../public/create'),
  require('../public/read'),
  require('../public/delete'),
  require('../public/update')
]

module.exports = privateRoutes
