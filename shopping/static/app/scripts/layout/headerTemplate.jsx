var React = require('react');
var Backbone = require('backbone');


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
  handleLogout: function(e){
    e.preventDefault();
    localStorage.clear();
    Backbone.history.navigate('', {trigger:true});
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
            <nav className="navbar navbar-light bg-faded">
              <ul className="nav navbar-nav">
                <li className="nav-item active">
                  <a onClick={this.navHome} className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navAccountInfo} className="nav-link" href="#">Account Information</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navItems} className="nav-link" href="#">Grocery Items</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.navCart} className="nav-link" href="#">Cart</a>
                </li>
                <li className="nav-item">
                <button onClick={this.handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
        </div>



        {this.props.children}


        <div className="row footer">
          <div className="col-md-12">
            <h2>Contact Information</h2>
            <span>Name</span>
            <span>Address</span>
            <span>Email</span>
            <span>Phone</span>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = {
  TemplateContainer: TemplateContainer
}
