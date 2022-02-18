import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./layout/App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { history } from "./history/history";

const CustomRouter = (props: any) => {
  const { history } = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    console.log(history);
    history?.listen(setState);
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
