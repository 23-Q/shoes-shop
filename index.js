import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import Data from './data';


let defaultData = Data  //상품데이터
let defaultWish = [];  //위시리스트목록
let defaultCart = []; //카트 목록
let defaultWatched = [[]];  //최근본상품

function pro(state = defaultData, action){  //위시리스트 버튼 토글(like : true false)
  let copy = [...state];
  if(action.type === 'likeToggle'){
    if(copy[action.payload.id].like === true){
      copy[action.payload.id].like = false
    }else{
      copy[action.payload.id].like = true
    }
    return copy

  }else if(action.type === 'wishDel'){  //위시리스트 삭제 버튼
    copy[action.payload.id].like = false
    return copy
  }
  
  else{ return state }
};

function wish(state = defaultWish, action){ //위시리스트 추가
  let copy = [...state];
  let found = state.findIndex((a)=>{ return a.id === action.payload.id}); 

  if(action.type === 'likeToggle'){
    if(action.payload.like === false){      //like가 false 일때만 추가
      copy.push(action.payload)
    }else{                                  //like가 true 일 경우 방금 전송 된 id 오브잭트 삭제
      copy.splice(found, 1)
    }
    return copy

  }else if(action.type === 'wishDel'){       //위시리스트 삭제 버튼
    copy.splice(found, 1)
    return copy
  }
  
  else{ return state }
};

function cart(state = defaultCart, action){  //카트
  let copy = [...state];
  let found = state.findIndex((a)=>{ return a.cartId === action.payload.cartId});
  
  if(action.type === 'cartAdd'){  //상품 추가
    if(found >= 0){
      copy[found].quan = copy[found].quan + action.payload.quan;
    }else{
      copy.push(action.payload)
    }
    return copy
  }
  
  else if(action.type === 'cartDel'){ //삭제
    copy.splice(found, 1)
    return copy
  }
  
  else{ return state }  
};

function watched(state = defaultWatched, action){
  let copy = [...state];
  if(action.type === 'watched'){
    copy = []
    copy.push(action.payload)
    return copy
  }else{
    return state
  }
}


let store = createStore( combineReducers({pro, wish, cart, watched}) );


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();