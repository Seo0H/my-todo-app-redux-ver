import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import authReducer from "./modules/auth";
import counterReducer from "./test/modules/counter";
import loadingReducer from './modules/loading';

const store = configureStore({
  reducer: { authReducer, counterReducer, loadingReducer },
  devTools: composeWithDevTools(),
});
console.log(store.getState());


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
