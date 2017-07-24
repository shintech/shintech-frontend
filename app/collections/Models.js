import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  initialize: function (model, options) {
    const config = options.config

    this.config = options.config
    this.url = config.getConfig('url') + 'api/models?page=' + options.page
  },

  parse: function (response) {
    this.pageData = response.pageData

    return response.models
  }
})

export default Models
