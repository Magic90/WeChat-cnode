const ENV = 'prod'

const config = {
  prod: {
    host: 'https://cnodejs.org/api/v1'
  }
}

function getConfig(env) {
  return config[env]
}

module.exports = getConfig(ENV)
