import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import ScrollToTop from "./app/layout/scrollToTop";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { loadEvents } from "./features/events/eventActions";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./app/store/configureStore";

const store = configureStore();
store.dispatch(loadEvents());
const rootElm = document.getElementById("root");

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>,
    rootElm
  );
}

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", function () {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();
