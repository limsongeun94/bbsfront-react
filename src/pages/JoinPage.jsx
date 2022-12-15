import Page from "src/components/Page";
import { useNavigate } from "react-router-dom";

const JoinPage0 = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="joinpage0">
        <h2 className="margin-bottom">회원가입</h2>
        <div className="margin-bottom left">
          <input
            id="user-join-all-agree"
            type="checkbox"
            className="join-agree-input"
          />
          <label for="user-join-all-agree">전체동의</label>
        </div>
        <div className="margin-bottom">
          <div className="left">
            <input
              id="user-join-service-agree"
              type="checkbox"
              className="join-agree-input"
            />
            <label for="user-join-service-agree"> 이용약관</label>
          </div>
          <div>
            <textarea className="join-textarea"></textarea>
          </div>
        </div>
        <div className="margin-bottom">
          <div className="left">
            <input
              id="user-join-info-agree"
              type="checkbox"
              className="join-agree-input"
            />
            <label for="user-join-info-agree"> 개인정보처리방침</label>
          </div>
          <div>
            <textarea className="join-textarea"></textarea>
          </div>
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              navigate("/landing/join1");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </Page>
  );
};

const JoinPage1 = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="joinpage1">
        <h2 className="margin-bottom">회원가입</h2>
        <p className="left">* 필수입력</p>
        <div className="margin-bottom">
          <input
            id="user-join-email"
            type="email"
            placeholder="이메일"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-nickname"
            placeholder="닉네임"
            className="join-nickname-input"
          />
          <button className="join-nickname-btn">중복확인</button>
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-password"
            type="password"
            placeholder="비밀번호"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-password-check"
            type="password"
            placeholder="비밀번호 확인"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              navigate("/landing/join2");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </Page>
  );
};

const JoinPage2 = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="joinpage2">
        <h2 className="margin-bottom">회원가입</h2>
        <p className="left">* 선택입력</p>
        <div className="margin-bottom">
          <input
            id="user-join-name"
            placeholder="이름"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-phone"
            placeholder="전화번호"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-postcode"
            placeholder="우편번호"
            className="join-postcode-input"
          />
          <button className="join-postcode-btn">검색</button>
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-adress"
            placeholder="주소"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-adress-detail"
            placeholder="상세주소"
            className="join-input"
          />
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              navigate("/landing/join3");
            }}
          >
            완료
          </button>
        </div>
      </div>
    </Page>
  );
};

const JoinPage3 = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="joinpage3">
        <h2 className="margin-bottom">가입완료</h2>
        <div className="left">
          <p>[사용자이름]님 가입해주셔서 감사합니다.</p>
          <p>[사용자이메일]로 가입인증 메일을 발송했습니다.</p>
          <p>메일에 포함된 링크를 클릭하여 가입을 완료해주세요.</p>
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
    </Page>
  );
};

const EmailAuth = () => {
  const navigate = useNavigate();
  return (
    <Page>
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
    </Page>
  );
};

const FindPWord = () => {
  const navigate = useNavigate();
  return (
    <Page>
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
    </Page>
  );
};

export { JoinPage0, JoinPage1, JoinPage2, JoinPage3, EmailAuth, FindPWord };
