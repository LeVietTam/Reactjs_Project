let cart = JSON.parse(localStorage.getItem("Cart"))

let qtyCart = 0

if(cart != null){
  Object.keys(cart).map(key=>{
  qtyCart += cart[key]
})
}

const cartQty = (state = qtyCart, action) => {
  switch(action.type){
    case "INCREMENT":{
        state++;
        return state;
    }
    case "DECREMENT":{
        state--;
        return state;
    }
    case "DELETE":{
      state--;
      return state;
  }

    default : return state;

  }
}

export default cartQty





// let cart = JSON.parse(localStorage.getItem("Cart"))

// const cartQty = (state = cart,action) => {
//   switch(action.type){
//     case "INCREMENT":{
//         return state;
//     }
//     case "DECREMENT":{
//         return state;
//     }
//     case "DELETE":{
//       return state;
//   }

//     default : return state;

//   }
// }

// export default cartQty