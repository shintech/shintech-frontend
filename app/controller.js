import Marionette from 'marionette'
import Model from './models/Model'
import Models from './collections/Models'
import TableView from 'backbone_table_view'
import FormView from 'backbone_form_view'
import Config from 'shintech-config'
import config from './_config'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
    this.config = new Config(config)
  },

  index: function () {
    console.log('index')
  },

  page: function (page) {
    const app = this.app

    const models = new Models([], { page: page, config: this.config })

    this.models = models

    models.fetch({
      success: function (data) {
        app.view.showChildView('main', new TableView({
          collection: models,
          pageData: data.pageData,
          panelHeading: 'Panel Heading',
          template: require('./templates/table-view-template.html'),
          tableItemTemplate: require('./templates/model-view-template.html'),
          modalViewTemplate: require('./templates/model-modal-view-template.html')
        }))
      },

      error: function (err) {
        console.log(err)
      }
    })
  },

  formRoute: function () {
    const model = new Model({url: this.config.getConfig('url')})

    const formView = new FormView({
      formTemplate: require('./templates/form-view-template.html'),
      model: model

    })

    this.app.view.showChildView('main', formView)
  }
})

export default Controller
