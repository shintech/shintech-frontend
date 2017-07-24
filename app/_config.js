const config = {}

config.development = {
  url: 'http://' + (window.location.hostname) + '/'
}

config.production = {
  url: 'https://' + (window.location.hostname) + '/'
}

export default config
