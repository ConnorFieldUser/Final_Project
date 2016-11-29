var React = require('react');
var User= require('../models/user.js').User;
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var SignUpForm = React.createClass({
  getInitialState: function(){
    localStorage.clear();
    return{
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
  },
  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },
  handleSignUp: function(e){
    e.preventDefault();
    // var username= this.state.username;
    // var password= this.state.password;

    this.props.signUp(this.state);
    this.setState({username: '', password: ''});
  },
  render: function(){
    return(
      <div className="col-md-6">
        <h2>Need an Account? Sign Up!</h2>
        <form onSubmit={this.handleSignUp} id="signup">

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="username" id="username" type="username" placeholder="Username" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>

          <input className="signUpBtn btn btn-primary" type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
});


var SignInForm = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: ''
    }
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
    // console.log(this.state.username);
  },
  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },
  handleSignIn: function(e){
    e.preventDefault();
    this.props.signIn(this.state);
    this.setState({username: '', password: ''});
  },
  render: function(){
    return(
        <div className="col-md-6">
          <h2>Please Login</h2>
          <form onSubmit={this.handleSignIn} id="login">
            <div className="form-group">
              <label htmlFor="username-login">Username</label>
              <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="username" id="username-login" type="username" placeholder="Username" />
            </div>

            <div className="form-group">
              <label htmlFor="password-login">Password</label>
              <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
            </div>

            <input className="signInBtn btn btn-primary" type="submit" value="Log In" />
          </form>
        </div>
    )
  }
});



var LoginSignUpContainer = React.createClass({
  getInitialState: function(){
    var user = new User();
    var userData = localStorage.getItem('user');
    // console.log(userData);
    if(userData){
      user.set(JSON.parse(userData));
      // user.auth();
    }
    //
    return {
      user : user
    };
  },
  // componentWillMount: function(){
  //   var user = new User();
  //   return {
  //     user: user
  //   };
  // },
  signUp: function(userData){
    var self = this;
    // var user = this.state;
    // console.log(user);
    console.log(userData);
    User.signup(userData.username, userData.password, function(user){
      self.setState({user: user});
      Backbone.history.navigate('account/', {trigger:true});
    });
    console.log(userData);
  },
  signIn: function(userData){
    var self= this;
    // console.log('userdata', userData);
    User.signin(userData.username, userData.password, function(user){
      self.setState({user: user});
      Backbone.history.navigate('account/', {trigger:true});
      // console.log('USER', user)
    });
  },
  render: function(){
    return (
      <div className="container">
          <div className="row loginContainer">
            <div className="col-md-12 well mainLogin">
              <h1>Assistive Shopper {this.state.user.get('token') ? 'Logged in' : ''}</h1>
                <SignUpForm signUp={this.signUp} />
                <SignInForm signIn={this.signIn} />
                <a className="driverLink" href="email/">Interested in Becoming a Driver?</a>
                <a className="driverSignIn" href="login/">Driver Sign In</a>
            </div>
          </div>
      </div>
    );
  }
});

//CREATE A LOGIN LINK WITH THE URL:  login/
module.exports = {
  LoginSignUpContainer: LoginSignUpContainer
};
