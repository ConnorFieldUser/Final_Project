var React = require('react');
var OrderItemCollection = require('../models/user.js').OrderItemCollection;

var OrderItem = React.createClass({
  render: function(){
    return (

    )
  }
});

var OrderContainer = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderItemCollection();
    return {
      orderCollection: orderCollection
    }
  },
  render: function(){
    return (
      <TemplateContainer>
        <div className="row">
          <
        </div>
      </TemplateContainer>

    )
  }
})


module.exports = {
  OrderItem: OrderItem,
};
