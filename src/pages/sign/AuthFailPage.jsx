import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const AuthFailPage = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage0">
        <h2 className="margin-bottom">인증 실패</h2>
        <div className="margin-bottom left">
          <p>인증키가 만료되었습니다.</p>
          <p>로그인 후 인증메일을 다시 발송해주세요.</p>
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              navigate("/landing/login");
            }}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthFailPage;
