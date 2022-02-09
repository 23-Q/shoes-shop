import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Detail(){

  let data = useSelector((data) => data)
  let dispatch = useDispatch()

  let [viewImage,viewImageSet] = useState(0); //이미지
  let [dtailCount,dtailCountSet] = useState(1); //수량
  let [selectSize,selectSizeSet] = useState('');  //선택된 사이즈
  let { id } = useParams();
  let history = useHistory();
  var size = [220,225,230,235,240,245,250,255,260,265,270,275,280,285,290];

  function countDown(){ //수량 -
    if(dtailCount > 1){ dtailCountSet(dtailCount-1) }
   }
  function countUp(){ //수량 +
    if(dtailCount < 10){ dtailCountSet(dtailCount+1) }
  }

  function sizeClick(a,i){  //선택된사이즈 불들어오게
    selectSizeSet(a)
    for(let e = 0; e < size.length; e++){
    document.getElementsByClassName( "btn-size" )[e].classList.remove('on');
    }
    document.getElementsByClassName( "btn-size" )[i].classList.add('on');
  }

  function likeToggle(){  //위시리스트 토글
    dispatch({
      type : 'likeToggle',
      payload : {
        id : data.pro[id].id,
        img : data.pro[id].img1,
        name : data.pro[id].name,
        price : data.pro[id].price,
        like : data.pro[id].like
      }
    });
  }

  function cartAdd(){
    if(selectSize == ''){
      document.querySelector( ".detail-need-size" ).style.display = "block"
    }else{
      document.querySelector( ".detail-need-size" ).style.display = "none"
      dispatch({
        type : 'cartAdd',
        payload : {
          id : data.pro[id].id,
          cartId : ""+data.pro[id].id+""+""+selectSize+"",
          img : data.pro[id].img1,
          name : data.pro[id].name,
          price : data.pro[id].price,
          size : selectSize,
          quan : dtailCount
        }
      })
    }
  }

  useEffect( ()=>{  //로컬스트리지에 최근 본 목록 추가
    var arr = localStorage.getItem('watched');
    if(arr == null) { arr = [] }
    else{ arr = JSON.parse(arr) }
    arr.unshift(id);
    arr = new Set(arr);
    arr = [...arr];

    localStorage.setItem('watched', JSON.stringify(arr) );

    dispatch({
      type : 'watched',
      payload : arr
    })

  },[] );

  

  return (
    <div className="detail-app">
      <div className="btn-back" onClick={()=>history.goBack()}><div></div>뒤로가기</div>
      <div className="detail-images">

        <ProductView data={data.pro} id={id} viewImage={viewImage}/>
        
        <div className="small-img-area">
          <div style={{backgroundImage:`url(${require(""+data.pro[id].img1+"")})`}}
            onClick={()=>{viewImageSet(0)}}></div>
          <div style={{backgroundImage:`url(${require(""+data.pro[id].img2+"")})`}}
            onClick={()=>{viewImageSet(1)}}></div>
          <div style={{backgroundImage:`url(${require(""+data.pro[id].img3+"")})`}}
            onClick={()=>{viewImageSet(2)}}></div>
          <div style={{backgroundImage:`url(${require(""+data.pro[id].img4+"")})`}}
            onClick={()=>{viewImageSet(3)}}></div>
        </div>
      </div>
      <div className="detail-console">
          <div className="detail-name">{data.pro[id].name}</div>
          <div className="detail-price">{data.pro[id].price}<span> 원</span></div>
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
            <div className="detail-quantity">{dtailCount}</div>
            <button className="btn-count-up" onClick={countUp}></button>
          </div>
          <div className="detail-bottom-area">
            <button className="detail-cart" onClick={cartAdd}>
              <div className="detail-need-size">사이즈를 선택해주세요</div> 장바구니 담기</button>
            <button className={`detail-like ${data.pro[id].like}`} onClick={likeToggle}></button>
          </div>
      </div>
    </div>
  )
}

function ProductView(props){  //제품 뷰 이미지 컴포런트
  if(props.viewImage === 0){
    return(
      <div className="product-view"
      style={{backgroundImage:`url(${require(""+props.data[props.id].img1+"")})`}}>
      </div>
    )
  }else if (props.viewImage === 1){
    return(
      <div className="product-view"
      style={{backgroundImage:`url(${require(""+props.data[props.id].img2+"")})`}}>
      </div>
    )
  } else if (props.viewImage === 2){
    return(
      <div className="product-view"
      style={{backgroundImage:`url(${require(""+props.data[props.id].img3+"")})`}}>
      </div>
    )
  } else if (props.viewImage === 3){
    return(
      <div className="product-view"
      style={{backgroundImage:`url(${require(""+props.data[props.id].img4+"")})`}}>
      </div>
    )
  }
}

export default Detail;