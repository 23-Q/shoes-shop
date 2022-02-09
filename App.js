import './App.css';
import './detail.css';
import './wishlist.css';
import './cart.css';
import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import WishList from './WishList';
import Cart from './Cart';
import MainPage from './MainPage';

import {Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  let data = useSelector((data) => data);
  let history = useHistory();
  let dispatch = useDispatch();

  let [watchedOn,watchedOnSet] = useState(false);


  document.addEventListener('scroll', function() {  //top nav 스크롤 이벤트
    let topScroll = document.documentElement.scrollTop;
    if(topScroll > 10){
      document.querySelector(".top-nav").classList.add('scroll-mode');
    }else{
      document.querySelector(".top-nav").classList.remove('scroll-mode');
    }
  });

  useEffect(()=>{ //초기 로컬스트리지 값 로드
    var arr = localStorage.getItem('watched');
    if(arr == null) { arr = [] }
    else{ arr = JSON.parse(arr) }
    arr = new Set(arr);
    arr = [...arr];
    dispatch({
      type : 'watched',
      payload : arr
    })
        
  },[])

  console.log(data.watched)




  return (
    <div className="App">
      <body>
        <nav className="top-nav">
          <div className="logo" onClick={()=>{ history.push('/') }}></div>
          <div className="icon-area">
            <button className="btn-nav-like" onClick={()=>{ history.push('/wishlist') }}>
              {
                data.wish.length !== 0
              ? <div>{data.wish.length}</div>
              : null
              }
            </button>
            <button className="btn-nav-cart" onClick={()=>{ history.push('/cart') }}>
              {
                data.cart.length !== 0
              ? <div>{data.cart.length}</div>
              : null
              }
            </button>
          </div>
        </nav>
        {
          data.watched[0].length !== 0
          ? <Watched
          dataW={data.watched[0]}
          data={data.pro}
          dispatch={dispatch}
          history={history}
          watchedOn={watchedOn}
          watchedOnSet={watchedOnSet}
          />
          : null
        }
        <Switch>

          <Route exact path="/">
            <MainPage/>
          </Route>

          <Route path="/detail/:id">
            <Detail/>
          </Route>

          <Route path="/wishlist">
            <WishList/>
          </Route>

          <Route path="/cart">
            <Cart/>
          </Route>

        </Switch>
      </body>
    </div>
  );
}

function Watched(props){

  function watchedDel(){
    localStorage.setItem('watched', JSON.stringify([]) );
    props.dispatch({
      type : 'watched',
      payload : []
    });
    
    props.watchedOnSet(false);
  }


 return(
    <nav className={`right-nav ${props.watchedOn}`}>
      <div className="right-nav-top">최근 본 상품</div>
      <button className={`right-nav-button ${props.watchedOn}`}
        onClick={()=> props.watchedOnSet(!props.watchedOn)}></button>
      <div className="right-nav-area">
        {
          props.dataW.map((a,i)=>{
            return(
              <div className="watched-obj-img"
              style={{backgroundImage:`url(${require(""+props.data[a].img1+"")})`}}
              onClick={()=>{props.history.push(`/detail/${a}`)}}
              ></div>
            )
          })
        }
      </div>
      <div className="right-nav-bottom" onClick={watchedDel}>전체삭제</div>
    </nav>
 )
}

export default App;