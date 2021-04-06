import React, { useState, useEffect } from "react";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import GuidePage from "./pages/GuidePage";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import ContentPage from "./pages/ContentPage";
import MyPage from "./pages/MyPage";
import PayPage from "./pages/PayPage";
import TestPage from "./pages/TestPage";
import axios from "axios";

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const getAccessTokenGoogle = async (authorizationCode: string) => {
    console.log("abc");
    await axios
      .post("http://localhost:5000/googlelogin", {
        authorizationCode,
      })
      .then(res => {
        setIsLogin(true);
        setAccessToken(res.data.accessToken);
        console.log("abcde");
      })
      .catch(err => console.log(err));
  };

  const getAccessTokenKakao = async (authorizationCode: string) => {
    console.log("abc");
    await axios
      .post("http://localhost:5000/kakaologin", {
        authorizationCode,
      })
      .then(res => {
        setIsLogin(true);
        setAccessToken(res.data.accessToken);
        console.log("abcde");
        console.log("res check:", res.data.accessToken);
        console.log("before:", accessToken);
      })
      .catch(err => console.log(err));
  };

  const googleLogout = async () => {
    await axios
      .post("http://localhost:5000/googlelogout", {
        access_token: accessToken,
      })
      .then(res => {
        console.log("로그아웃 res:", res.data);
      })
      .catch(err => console.log(err));
  }

  const kakaoLogout = async () => {
    await axios
      .post("http://localhost:5000/kakaologout", {
        access_token: accessToken,
      })
      .then(res => {
        console.log("로그아웃 res:", res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (accessToken === "") {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        getAccessTokenGoogle(authorizationCode);
        getAccessTokenKakao(authorizationCode);
      }
      console.log(authorizationCode);
    }
  });

  return (
    <div className='App'>
      <button onClick={kakaoLogout}>로그아웃</button>
      <button onClick={googleLogout}>구글 로그아웃</button>
      <Switch>
        <Route exact path='/'>
          <GuidePage />
        </Route>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/test'>
          <TestPage />
        </Route>
        <Route exact path='/list'>
          <ListPage />
        </Route>
        <Route exact path='/content'>
          <ContentPage />
        </Route>
        <Route exact path='/mypage'>
          <MyPage />
        </Route>
        <Route exact path='/pay'>
          <PayPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
