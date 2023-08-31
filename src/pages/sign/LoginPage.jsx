import { request } from "src/libs/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "src/store/user";
import Logo from "./Logo";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // if (user.id) {
  //   navigate("/");
  // }

  const doLogin = () => {
    const email = document.getElementById("user-login-email").value;
    const password = document.getElementById("user-login-password").value;

    if (email && password) {
      request
        .post("/user/authenticate", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(setUser(res.data.user));
          navigate("/");
        })
        .catch((error) => {
          alert("일치하는 이메일과 비밀번호가 없습니다.");
        });
    } else alert("이메일과 비밀번호를 입력해주세요");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      doLogin();
    }
  };

  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="loginpage">
        <h2 className="margin-bottom">로그인</h2>
        <div className="margin-bottom">
          <input
            id="user-login-email"
            type="email"
            placeholder="이메일"
            className="login-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-login-password"
            type="password"
            placeholder="비밀번호"
            className="login-input"
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <div className="margin-bottom">
          <button onClick={doLogin} className="login-btn">
            로그인
          </button>
        </div>
        <div className="login-link">
          <a
            onClick={() => {
              navigate("/landing/FindPWord");
            }}
          >
            비밀번호 찾기
          </a>
        </div>
        <div className="margin-bottom login-link">
          <a
            onClick={() => {
              navigate("/landing/join/0");
            }}
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
