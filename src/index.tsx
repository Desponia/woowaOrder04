import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { StoreState } from "./types";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import App from "./App";

// const middleware = function(store) {
//   return function(next) {
//     return function(action) {
//       if(action.type == 'fetch user list') {
//         (new Promise(resolve, reject) => {
//           resolve([1,2,3]);

//         }).then(resp => {
//           store.dispatch({
//             type: 'receive user list',
//             payload: resp,
//           })
//         })
//       }
//     }
//   }
// }

const sagaMiddleware = createSagaMiddleware();
const store: StoreState = createStore(reducer, applyMiddleware(sagaMiddleware));
const rootElement: HTMLElement = document.getElementById("root");

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
