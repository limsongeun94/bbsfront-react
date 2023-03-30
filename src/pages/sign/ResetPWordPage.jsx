import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const ResetPWordPage = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="emailAuth">
        <h2 className="margin-bottom">비밀번호 재설정</h2>
        <div className="margin-bottom">
          <input
            id="user-find-email"
            type="email"
            placeholder="새 비밀번호"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-find-email"
            type="email"
            placeholder="새 비밀번호 확인"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <button className="join-btn">비밀번호 재설정 메일 보내기</button>
        </div>
      </div>
    </div>
  );
};

const CompletePWordPage = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="emailAuth">
        <h2 className="margin-bottom">비밀번호 재설정 완료</h2>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => navigate("/landing/login")}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export { ResetPWordPage, CompletePWordPage };
