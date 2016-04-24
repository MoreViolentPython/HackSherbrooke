Router.route('/', function () {
  this.render('home');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/register', function () {
  this.render('register');
});

Router.route('/selection', function () {
  this.render('selection');
});

Router.route('/swipe', function () {
  this.render('swipe');
});

Router.route('/chat', function () {
  this.render('chat');
});
