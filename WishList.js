import React, { useState } from 'react';
import {Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function WishList(){
  let data = useSelector((data) => data)
  let dispatch = useDispatch()
  let history = useHistory();

  let [modal,modalSet] = useState(false)
  let [modalData,modalDataSet] = useState(0)

  return(
    <>
    {
      modal === true
      ? <Modal modalSet={modalSet}
      data={data.pro}
      dispatch={dispatch}
      modalData={modalData}/>
      : null
    }
    <div className="wishlist">
      <div className="wishlist-inner">
        <div className="wishlist-top">위시리스트<span>({data.wish.length})</span></div>
        <div className="wish-product-area">
          {
            data.wish.length == 0
            ? <div className="wish-empty">위시리스트 상품이 없습니다.</div>
            : null
          }
          {
            data.wish.map((a,i)=>{
            return <WishProduct
                data={a} i={i} key={i}
                dispatch={dispatch}
                history={history}
                modalSet={modalSet}
                modalDataSet={modalDataSet}
              />
            })
          }
        </div>
      </div>
    </div>
    </>
  )
}

function WishProduct(props){

  function wishDel(){
    props.dispatch({ type : 'wishDel', payload : {id : props.data.id} });
  }

  return(
    <div className="wish-product">
      <button className="btn-wish-close" onClick={wishDel}></button>
        <div className="wish-image" 
          style={{backgroundImage:`url(${require(""+props.data.img+"")})`}}
          onClick={()=>{props.history.push(`/detail/${props.data.id}`)}}>
        </div>
      <div className="wish-name">{props.data.name}</div>
      <div className="wish-price">{props.data.price} <span>원</span></div>
      <button className="btn-wish-cart" onClick={()=>{
        props.modalSet(true);
        props.modalDataSet(props.data.id)}}
        >장바구니 담기</button>
      <button className="btn-mobile-page" onClick={()=>{props.history.push(`/detail/${props.data.id}`)}}>자세히 보기</button>
    </div>
  )
}

function Modal(props){  //모달창

  let [selectSize,selectSizeSet] = useState('');  //선택된 사이즈
  let [dtailCount,dtailCountSet] = useState(1); //수량
  var size = [220,225,230,235,240,245,250,255,260,265,270,275,280,285,290]

  function sizeClick(a,i){  //선택된사이즈 불들어오게
    selectSizeSet(a)
    for(let e = 0; e < size.length; e++){
    document.getElementsByClassName( "btn-size" )[e].classList.remove('on');
    }
    document.getElementsByClassName( "btn-size" )[i].classList.add('on');
  }

  function countDown(){ //수량 -
    if(dtailCount > 1){ dtailCountSet(dtailCount-1) }
   }
  function countUp(){ //수량 +
    if(dtailCount < 10){ dtailCountSet(dtailCount+1) }
  }

  function modalCart(){ //모달창 카트담기
    if(selectSize == ''){
      document.querySelector( ".need-size" ).style.display = "block"
    }else{
      document.querySelector( ".need-size" ).style.display = "none"
      props.dispatch({
        type : 'cartAdd',
        payload : {
          id : props.data[props.modalData].id,
          cartId : ""+props.data[props.modalData].id+""+""+selectSize+"",
          img : props.data[props.modalData].img1,
          name : props.data[props.modalData].name,
          price : props.data[props.modalData].price,
          size : selectSize,
          quan : dtailCount
        }
      })
    }
  }

  return(
    <div className="modal-background">
      <div className="modal">
      <div className="modal-product-view"
      style={{backgroundImage:`url(${require(""+props.data[props.modalData].img1+"")})`}}>
      </div>
        <div className="detail-name">{props.data[props.modalData].name}</div>
        <div className="detail-price">{props.data[props.modalData].price}<span> 원</span></div>
        <div className="size-area">
          <div className="text">사이즈 : {selectSize}</div>
          {
            size.map((a,i)=>{
               return <button className="btn-size" onClick={()=>{sizeClick(a,i)}}>{a}</button>
            })
          }
        </div>
        <div className="detail-quantity-area">
          <div className="text">수량</div>
          <button className="btn-count-down" onClick={countDown}></button>
          <div className="modal-quantity">{dtailCount}</div>
          <button className="btn-count-up" onClick={countUp}></button>
        </div>
        <button className="btn-modal-cart" onClick={modalCart}>장바구니</button>
        <div class="need-size">사이즈를 선택해주세요</div>
        <button className="btn-modal-close" onClick={()=>{props.modalSet(false)}}>닫기</button>
      </div>
    </div>
  )
}

export default WishList;