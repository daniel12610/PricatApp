import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartTotalQuantity: localStorage.getItem("cartTotalQuantity") ? JSON.parse(localStorage.getItem("cartTotalQuantity")): 0,
    cartTotalAmount: localStorage.getItem("cartTotalAmount") ? JSON.parse(localStorage.getItem("cartTotalAmount")): 0,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex( (item) => item.productId === action.payload.productId);

      // AGREGAR CANTIDAD A ITEM EXISTENTE
      if (itemIndex >= 0 && action.payload.quantity !== 0){
        state.cartItems[itemIndex].quantity += action.payload.quantity;
        state.cartTotalQuantity += action.payload.quantity;
        toast.success('Aumentada la cantidad del producto en el carrito', {position: toast.POSITION.BOTTOM_LEFT});

      }
      // AGREGAR ITEM NO EXISTENTE
      else if (itemIndex < 0  && action.payload.quantity !== 0){
        state.cartItems.push(action.payload);  
        state.cartTotalQuantity += action.payload.quantity;
        toast.success('Agregado el producto al carrito', {position: toast.POSITION.BOTTOM_LEFT});
      }else{
        toast.error('Aregue al menos una unidad del producto', {position: toast.POSITION.BOTTOM_LEFT});       
      }
      const precioTotal = state.cartItems.reduce((total, cartItem) => {
        const totalPrice = cartItem.price * cartItem.quantity;
        return total + totalPrice;
      }, 0);
    
      

      state.cartTotalAmount = precioTotal;
    

      localStorage.setItem("cartTotalAmount", precioTotal);
      localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action){
      const nextCarItems = state.cartItems.filter(
        cartItem => cartItem.productId !== action.payload.productId
      );

      state.cartItems = nextCarItems;
      toast.error('Producto eliminado del carrito', {position: toast.POSITION.BOTTOM_LEFT});

      state.cartTotalQuantity -= action.payload.quantity;
      
      const precioTotal = state.cartItems.reduce((total, cartItem) => {
        const totalPrice = cartItem.price * cartItem.quantity;
        return total + totalPrice;
      }, 0);

      localStorage.setItem("cartTotalAmount", precioTotal);
      localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action){
      const itemIndex = state.cartItems.findIndex( (item) => item.productId === action.payload.productId);      

      if (state.cartItems[itemIndex].quantity > 1){
        state.cartItems[itemIndex].quantity -= 1;
        state.cartTotalQuantity -= 1;
        toast.error('Retirado una unidad del carrito', {position: toast.POSITION.BOTTOM_LEFT});     
        
      }else if (state.cartItems[itemIndex].quantity === 1){
        state.cartTotalQuantity -= 1;
        const nextCarItems = state.cartItems.filter(
          cartItem => cartItem.productId !== action.payload.productId
        );
        state.cartItems = nextCarItems;
        toast.error('Retirado un elemento del carrito', {position: toast.POSITION.BOTTOM_LEFT});    
      }

      const precioTotal = state.cartItems.reduce((total, cartItem) => {
        const totalPrice = cartItem.price * cartItem.quantity;
        return total + totalPrice;
      }, 0);
      state.cartTotalAmount = precioTotal;

      localStorage.setItem("cartTotalAmount", precioTotal);

      localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action){
      const itemIndex = state.cartItems.findIndex( (item) => item.productId === action.payload.productId);      

        state.cartTotalQuantity += 1;
        state.cartItems[itemIndex].quantity += 1;
        toast.success('Añadido un elemento del carrito', {position: toast.POSITION.BOTTOM_LEFT});   

        const precioTotal = state.cartItems.reduce((total, cartItem) => {
          const totalPrice = cartItem.price * cartItem.quantity;
          return total + totalPrice;
        }, 0);

        state.cartTotalAmount = precioTotal;
        localStorage.setItem("cartTotalAmount", precioTotal);

        localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    clearCart(state, action){
      state.cartItems = []
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.success('Su carrito ha sido limpiado', {position: toast.POSITION.BOTTOM_LEFT});   
      localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, decreaseCart, increaseCart, clearCart, } = cartSlice.actions;

export default cartSlice.reducer;
