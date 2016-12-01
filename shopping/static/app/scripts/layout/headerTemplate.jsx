var React = require('react');
var Backbone = require('backbone');
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;


var TemplateContainer = React.createClass({
  navHome: function(e){
    e.preventDefault();
    Backbone.history.navigate('home/', {trigger:true});
  },
  navItems: function(e){
    e.preventDefault();
    Backbone.history.navigate('items/', {trigger:true});
  },
  navAccountInfo: function(e){
    e.preventDefault();
    Backbone.history.navigate('account/', {trigger:true});
  },
  navCart: function(e){
    e.preventDefault();
    Backbone.history.navigate('cart/', {trigger:true});
  },
  navMap: function(e){
    e.preventDefault();
    Backbone.history.navigate('map/', {trigger:true});
  },
  handleLogout: function(e){
    e.preventDefault();
    localStorage.clear();
    Backbone.history.navigate('', {trigger:true});
  },
  render: function(){
    return (
      <div>
      <div className="container">
        <div className="row">
            <nav className="navbar navbar-light bg-faded well">
              <ul className="nav navbar-nav">
                <li className="nav-item active">
                  <a onClick={this.navAccountInfo} className="nav-link" href="#">Account Information<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navHome}className="nav-link" href="#">Welcome</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navMap} className="nav-link" href="#">Map</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navItems} className="nav-link" href="#">Grocery Items</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navCart} className="nav-link" href="#">Cart</a>
                </li>
                <li className="nav-item welcome">
                <span className="userWelcome nav-item">Welcome, {localStorage.getItem('USERNAME')}!</span>
                </li>
                <NavDropdown id="nav-dropdown">
                  <MenuItem className="logout"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </MenuItem>
                </NavDropdown>
                <li className="nav-item prof">
                  <div className="profilePicture"><img src={localStorage.getItem('image')} /></div>
                </li>
              </ul>
            </nav>
        </div>


        {this.props.children}

      </div>


        <div className="row">
          <div className="col-md-12 footer">
            <h2>Contact Information</h2>
              <span className="glyphicon glyphicon-home" aria-hidden="true"></span><span className="info">123 Main St Greenville, SC</span>
              <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span><span className="info">assistiveshopper@gmail.com</span>
              <span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span><span className="info">(888)123-4567</span>
                <div>
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = {
  TemplateContainer: TemplateContainer
}

// <li>
//   <button className="btn btn-success logoutBtn" onClick={this.handleLogout}>Logout</button>
// </li>
