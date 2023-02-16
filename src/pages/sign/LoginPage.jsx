import { request } from "src/libs/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "src/store/user";
import Page from "src/components/Page";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (user.id) {
    navigate("/");
  }

  const doLogin = () => {
    const email = document.getElementById("user-login-email").value;
    const password = document.getElementById("user-login-password").value;

    request
      .post("/user/authenticate", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch((error) => alert("오류가 발생했습니다."));
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      doLogin();
    }
  };

  return (
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
  );
};

export default LoginPage;
