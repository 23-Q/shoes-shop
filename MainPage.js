import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//메인페이지
function MainPage(){

  let data = useSelector((data) => data)
  let dispatch = useDispatch()

  let [modal,modalSet] = useState(false) //모달 여닫
  let [modalData,modalDataSet] = useState(0) //모달에 뜨는 데이터

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
    <div className="banner">
      <div className="main-image"></div>
      <div className="main-title">
        <p>Nike</p>
        <p>Shoes</p>
        <p>Market</p>
      </div>
    </div>
    <div className="product-area">
      {
        data.pro.map((a,i)=>{
        return <Product
            data={a} i={i} key={i}
            dispatch={dispatch}
            modalSet={modalSet}
            modalDataSet={modalDataSet}
          />
        })
      }
    </div>
    </>
  )
}
//제품목록
function Product(props){

  function likeToggle(){  //위시리스트 토글
    props.dispatch({
      type : 'likeToggle',
      payload : {
        id : props.data.id,
        img : props.data.img1,
        name : props.data.name,
        price : props.data.price,
        like : props.data.like
      }
    });
  }

  return(
    <div className="product">
      <Link to={`/detail/${props.data.id}`}>
        <div className="product-thmb"
        style={{backgroundImage:`url(${require(""+props.data.img1+"")})`}}>
        </div>
      </Link>
      <div className="product-info">
        <div className="name">{props.data.name}</div>
        <div className="price">{props.data.price}<span> 원</span></div>
      </div>
      <button className={`btn-like ${props.data.like}`} onClick={likeToggle}></button>
      <button className="btn-cart" onClick={()=>{
        props.modalSet(true);
        props.modalDataSet(props.data.id)}}></button>
    </div>
  )
};

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

export default MainPage;