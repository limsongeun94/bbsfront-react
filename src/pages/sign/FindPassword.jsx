import { useNavigate } from "react-router-dom";

const FindPWordPage = () => {
  const navigate = useNavigate();
  return (
    <div className="emailAuth">
      <h2 className="margin-bottom">비밀번호 찾기</h2>
      <div className="margin-bottom">
        <input
          id="user-find-email"
          type="email"
          placeholder="이메일"
          className="join-input"
        />
      </div>
      <div className="margin-bottom">
        <button className="join-btn">비밀번호 재설정 메일 보내기</button>
      </div>
    </div>
  );
};

export default FindPWordPage;
