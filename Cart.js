import React, { useState } from 'react';
import {Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Cart(){
  let data = useSelector((data) => data)
  let dispatch = useDispatch()
  let history = useHistory();
  let priceArray = [];  //카트에 담긴 모든 가격 배열
  let allPrice = 0;  //배열 합친 전체가격
  
  if(data.cart.length > 0){ //배열합치기
    for(let i = 0; i < data.cart.length; i++){
      priceArray.push(data.cart[i].price * data.cart[i].quan)
      allPrice += priceArray[i];
    }
  }

  return(
    <div className="cart">
      <div className="cart-inner">
       <div className="cart-top">장바구니<span>({data.cart.length})</span></div>
         <div className="cart-product-area">
         {
            data.cart.length == 0
            ? <div className="cart-empty">장바구니에 상품이 없습니다.</div>
            : null
          }
          {
            data.cart.map((a,i)=>{
            return <CartProduct data={a} i={i} key={i} dispatch={dispatch} history={history}/>
            })
          }
          {
            data.cart.length !== 0
            ? <Order allPrice={allPrice}/>
            : null
          }
         </div>
      </div>
    </div>
  )
}

function CartProduct(props){

  function cartDel(){
    props.dispatch({
      type : 'cartDel',
      payload : { cartId : props.data.cartId }
    });
  }
  
  return(
    <div className="cart-product">
      <button className="btn-cart-close" onClick={cartDel}></button>
      <div className="cart-image" 
          style={{backgroundImage:`url(${require(""+props.data.img+"")})`}}
          onClick={()=>{props.history.push(`/detail/${props.data.id}`)}}>
      </div>
      <div className="cart-info-area">
        <div className="cart-name">{props.data.name}</div>
        <div className="cart-size"><span>사이즈 : </span>{props.data.size}</div>
        <div className="cart-quan"><span>수량 : </span>{props.data.quan}</div>
        <div className="cart-price">
          {
            props.data.quan > 1
            ? <div className="price-sub">{props.data.price}원 * {props.data.quan}개</div>
            : null
          }
          <div className="price-main">
            {props.data.price*props.data.quan}<span> 원</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Order(props){

  return(
    <div className="order">
      <div className="order-title">주문예정금액</div>
      <div className="order-area">
        <div><span>총 결제금액 : </span>{props.allPrice} 원</div>
        <div><button>구매</button></div>
      </div>
    </div>
  )
}

export default Cart;