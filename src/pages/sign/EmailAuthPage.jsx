import { useNavigate } from "react-router-dom";

const EmailAuthPage = () => {
  const navigate = useNavigate();
  return (
    <div className="emailAuth">
      <h2 className="margin-bottom">이메일 인증 안내</h2>
      <div className="left">
        <p>이메일 인증이 완료되지 않았습니다.</p>
        <p>[사용자이메일]로 발송된 메일을 확인해주세요.</p>
      </div>
      <div className="left">
        <p>
          메일이 오지 않았을 경우, 스팸메일함을 확인하거나 [인증 메일 다시
          보내기] 버튼을 눌러주세요.
        </p>
      </div>
      <div className="margin-bottom">
        <button className="join-btn">인증 메일 다시 보내기</button>
      </div>
      <div className="margin-bottom">
        <button
          className="join-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default EmailAuthPage;
