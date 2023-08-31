import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage0">
        <h2 className="margin-bottom">인증 완료</h2>
        <div className="margin-bottom left">인증되었습니다.</div>
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

export default AuthSuccessPage;
