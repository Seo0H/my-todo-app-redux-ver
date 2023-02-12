import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todoSlice from "./modules/todo";
import authSlice from './modules/auth';

const store = configureStore({
  reducer: { auth: authSlice.reducer, todo: todoSlice.reducer,  },
  devTools: composeWithDevTools(),
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
