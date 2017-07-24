const LoginView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'panel panel-primary',
  template: require('../templates/login-view-template.html')
})

export default LoginView
