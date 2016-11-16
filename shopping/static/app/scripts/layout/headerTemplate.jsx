var React = require('react');
var Backbone = require('backbone');


var TemplateContainer = React.createClass({
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
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
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
