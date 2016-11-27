var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');
require('react-bootstrap');



var DetailContainer = React.createClass({
  getInitialState: function(){
    return {
      foodCollection: new models.FoodItemCollection(),
    }
  },
  // componentWillMount: function(){
  //   var foodCollection = this.state.foodCollection;
  //   foodCollection.fetch().then(() => {
  //     this.setState({foodCollection: foodCollection})
  //   });
  // },
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(){
    // var detail =  this.props.foodCollection.map(function(item){
    //   return (
    //     <div className="foodListItem col-md-4" key={item.cid}>
    //       <div className="imageContainer">
    //         <img className="itemImage" src={item.get('ItemImage')} />
    //       </div>
    //       <span className="name">{item.get('Itemname')}</span>
    //       <span className="description">{item.get('Itemdescription')}</span>
    //       <span className="price">Price: $</span>
    //   </div>
    //   );
    // });

    return (
      <TemplateContainer>
        <h1>Item Detail</h1>
        <button onClick={this.handleClick} className="btn btn-success"><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Back to Listing</button>
      </TemplateContainer>
    )
  }
});




module.exports = {
  DetailContainer: DetailContainer
}
