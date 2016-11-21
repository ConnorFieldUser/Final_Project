var React = require('react');
var models = require('../models/items.js');
var OrderItemCollection = require('../models/user.js').OrderItemCollection;
//
// var Order = React.createClass({
//   componentWillReceiveProps: function(nextProps){
//     var cart = nextProps.cart;
//     // console.log(nextProps.cart.items);
//     this.setState({cart: cart});
//     console.log('CART', cart);
//     // var cart = this.props.cart['items'];
//   },
//   render: function(){
//     var cart = this.props.cart;
//     console.log('RENDER', cart);
//     // console.log(cart);
//     // var order = this.props.cart.items.map(function(item){
//     //   return (
//     //     <li key={item.id}>
//     //       {item.get('name')}
//     //     </li>
//     //   );
//     // });
//
//     return (
//       <div className="col-md-4">
//         <h2 className="orderHeading">Cart:</h2>
//         <ul>
//         </ul>
//         <div className="row">
//           <button className="btn btn-warning">Place Order</button>
//         </div>
//       </div>
//     )
//   }
// });
//
// var OrderContainer = React.createClass({
//   getInitialState: function(){
//     var cart = new models.Cart();
//     return {
//       cart: cart
//     }
//   },
//   componentWillMount: function(){
//     this.getOrder();
//   },
//   getOrder: function(){
//     var self = this;
//     var cart = this.state.cart;
//     cart.fetch().then(function(response){
//       // console.log(response)
//       var cart = response[0];
//       // console.log('CART', cart)
//       self.setState({cart: cart});
//     });
//   },
//   render: function(){
//     var cart = this.state.cart;
//     return (
//           <div className="col-md-4">
//             <Order cart={this.state.cart} />
//           </div>
//     )
//   }
// })
//
//
// module.exports = {
//   OrderContainer: OrderContainer,
// };
//
