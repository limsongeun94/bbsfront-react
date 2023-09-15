import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { request } from "src/libs/request";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmail,
  createNick,
  createPWord,
  createName,
  createPhone,
  createZipcode,
  createAdr,
  createDeAdr,
  createTerm,
  removeInfo,
} from "src/store/regi_user";
import Logo from "./Logo";

const JoinPage0 = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.regi_user;
  });

  const [serviceTermsId, setServiceTermsId] = useState(0);
  const [serviceAgree, setServiceAgree] = useState("");
  const [infoTermsId, setInfoTermsId] = useState(0);
  const [infoAgree, setInfoAgree] = useState("");
  const [checkItem, setCheckItem] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItem([...checkItem, id]);
      dispatch(createTerm(id));
    } else {
      setCheckItem(checkItem.filter((el) => el != id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckItem([serviceTermsId, infoTermsId]);
      // setCheckItem(["user-join-service-agree", "user-join-info-agree"]);
      dispatch(createTerm(serviceTermsId));
      dispatch(createTerm(infoTermsId));
    }
  };

  useEffect(() => {
    request.get("/terms/service").then((response) => {
      setServiceAgree(response.data.content);
      setServiceTermsId(response.data.id);
    });
    request.get("/terms/privacy").then((response) => {
      setInfoAgree(response.data.content);
      setInfoTermsId(response.data.id);
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage0">
        <h2 className="margin-bottom">회원가입</h2>
        <div className="margin-bottom left">
          <input
            id="user-join-all-agree"
            type="checkbox"
            className="join-agree-input"
            onChange={(e) => {
              handleAllCheck(e.target.checked);
            }}
            checked={checkItem.length === 2 ? true : false}
          />
          <label for="user-join-all-agree">전체동의</label>
        </div>
        <div className="margin-bottom">
          <div className="left">
            <input
              id="user-join-service-agree"
              type="checkbox"
              className="join-agree-input"
              onChange={(e) => {
                handleSingleCheck(e.target.checked, serviceTermsId); // "user-join-service-agree");
              }}
              checked={
                checkItem.includes(serviceTermsId /*"user-join-service-agree"*/)
                  ? true
                  : false
              }
            />
            <label for="user-join-service-agree"> 이용약관</label>
          </div>
          <div>
            <div className="join-div">{serviceAgree}</div>
          </div>
        </div>
        <div className="margin-bottom">
          <div className="left">
            <input
              id="user-join-info-agree"
              type="checkbox"
              className="join-agree-input"
              onChange={(e) => {
                handleSingleCheck(e.target.checked, infoTermsId); //"user-join-info-agree");
              }}
              checked={
                checkItem.includes(infoTermsId /*"user-join-info-agree" */)
                  ? true
                  : false
              }
            />
            <label for="user-join-info-agree"> 개인정보처리방침</label>
          </div>
          <div>
            <div className="join-div">{infoAgree}</div>
          </div>
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              checkItem.length === 2
                ? navigate("/landing/join/1")
                : alert("모두 동의하세요.");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

const JoinPage1 = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.regi_user;
  });

  const [pwordCheck, setPwordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [emailcheck, setEmailCheck] = useState(false);
  const [nickDup, setNickDup] = useState(null);
  const [nickCount, setNickCount] = useState(0);

  const checkEmail = () => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email)) {
      setEmailCheck(true);
      dispatch(createEmail(email));
    } else setEmailCheck(false);
  };

  useEffect(() => {
    checkEmail();
  }, [email]);

  const onChangeNickNmae = (e) => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    regex.test(e.target.value) == true
      ? dispatch(createNick(e.target.value))
      : dispatch(createNick(""));
    if (e.target.value == "") {
      setNickCount(0);
    }
  };

  const dbCheck = () => {
    setNickCount(nickCount + 1);
    request
      .get("/user/available", {
        params: {
          nick: user.nick,
        },
      })
      .then((response) => {
        if (response.data) {
          setNickDup(true);
        } else {
          setNickDup(false);
        }
      });
  };

  const onChangePWord = (e) => {
    dispatch(createPWord(e.target.value));
  };

  const onChangePWordCheck = (e) => {
    setPwordCheck(e.target.value);
  };

  const onClickNext = (e) => {
    user.email == "" ||
    user.nick == "" ||
    user.password == "" ||
    pwordCheck == ""
      ? alert("빈칸을 전부 입력하세요.")
      : nickCount == 0
      ? alert("닉네임 중복확인이 되어있지 않습니다.")
      : nickDup == false
      ? e.stopPropagation()
      : user.password != pwordCheck
      ? alert("비밀번호가 일치하지 않습니다.")
      : navigate("/landing/join/2");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickNext();
    }
  };

  const red = {
    color: "red",
  };

  const green = {
    color: "green",
  };

  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage1">
        <h2 className="margin-bottom">회원가입</h2>
        <p className="left">* 필수입력</p>
        <div className="margin-bottom">
          <input
            id="user-join-email"
            type="email"
            placeholder="이메일"
            className="join-input"
            maxLength={50}
            // value={user.email}
            // onChange={onChangeEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onBlur={checkEmail}
            autoFocus
          />
          {emailcheck ? (
            <p className="nick-style" style={green}>
              유효한 이메일입니다.
            </p>
          ) : (
            <p className="nick-style" style={red}>
              이메일 형식을 체크하세요.
            </p>
          )}
          <p className="email_explain">
            ※ ruu.kr 이메일 서비스를 이용하여 가입하는 것을 추천드립니다.
          </p>
        </div>
        <div>
          <input
            id="user-join-nickname"
            placeholder="닉네임"
            className="join-nickname-input"
            maxLength={10}
            value={user.nick}
            onChange={onChangeNickNmae}
          />
          <button className="join-nickname-btn" onClick={dbCheck}>
            중복확인
          </button>
        </div>
        {nickCount == 0 ? null : nickDup === true ? (
          <p className="nick-style" style={green}>
            사용가능한 닉네임입니다.
          </p>
        ) : (
          <p className="nick-style" style={red}>
            이미 사용중인 닉네임입니다.
          </p>
        )}
        <div className="margin-bottom margin-top">
          <input
            id="user-join-password"
            type="password"
            placeholder="비밀번호"
            className="join-input"
            maxLength={50}
            value={user.password}
            onChange={onChangePWord}
          />
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-password-check"
            type="password"
            placeholder="비밀번호 확인"
            className="join-input"
            maxLength={50}
            value={pwordCheck}
            onChange={onChangePWordCheck}
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <div className="margin-bottom">
          <button className="join-btn" onClick={onClickNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

const JoinPage2 = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.regi_user;
  });

  const [name, setName] = useState("");
  const [nameCheck, setNameCheck] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCheck, setPhoneCheck] = useState(false);

  const checkName = () => {
    const regex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (regex.test(name)) {
      dispatch(createName(name));
      setNameCheck(true);
    } else {
      setNameCheck(false);
    }
  };

  useEffect(() => {
    checkName();
  }, [name]);

  const checkPhone = () => {
    const regex = /^[0-9]+$/;
    if (regex.test(phone)) {
      dispatch(createPhone(phone));
      setPhoneCheck(true);
    } else {
      setPhoneCheck(false);
    }
  };

  useEffect(() => {
    checkPhone();
  }, [phone]);

  const open = useDaumPostcodePopup();
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    dispatch(createZipcode(data.zonecode));
    dispatch(createAdr(data.address));
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const onChangeDeAdr = (e) => {
    dispatch(createDeAdr(e.target.value));
  };

  const handleJoin = () => {
    request.post("/user/register", {
      create: {
        email: user.email,
        password: user.password,
        name: user.name,
        nick: user.nick,
        phone: user.phone,
        zipcode: user.zipcode,
        address: user.address,
        address_detail: user.address_detail,
      },
      terms: user.terms,
    });
    navigate("/landing/join/3");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  const red = {
    color: "red",
  };

  const green = {
    color: "green",
  };

  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage2">
        <h2 className="margin-bottom">회원가입</h2>
        <p className="left">* 선택입력</p>
        <div className="margin-bottom">
          <input
            id="user-join-name"
            placeholder="이름"
            className="join-input"
            maxLength={10}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoFocus
          />
          {nameCheck ? (
            <p className="nick-style" style={green}>
              사용가능한 이름입니다.
            </p>
          ) : (
            <p className="nick-style" style={red}>
              유효하지 않은 이름입니다.
            </p>
          )}
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-phone"
            placeholder="전화번호"
            className="join-input"
            maxLength={13}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          {phoneCheck ? (
            <p className="nick-style" style={green}>
              사용가능한 번호입니다.
            </p>
          ) : (
            <p className="nick-style" style={red}>
              유효하지 않은 번호입니다.
            </p>
          )}
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-postcode"
            placeholder="우편번호"
            className="join-postcode-input"
            value={user.zipcode}
          />
          <button className="join-postcode-btn" onClick={handleClick}>
            검색
          </button>
        </div>
        <div className="margin-bottom">
          <input
            id="user-join-adress"
            placeholder="주소"
            className="join-div"
            value={user.address}
          />
        </div>
        <div className="margin-bottom">
          <textarea
            id="user-join-adress-detail"
            placeholder="상세주소"
            className="join-adress"
            maxLength={50}
            value={user.address_detail}
            onChange={onChangeDeAdr}
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <div className="margin-bottom">
          <button
            className="join-btn"
            onClick={() => {
              handleJoin();
            }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

const JoinPage3 = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.regi_user;
  });

  useEffect(() => {
    return () => {
      dispatch(removeInfo());
    };
  });

  return (
    <div className="logo-wrapper">
      <Logo />
      <div className="joinpage3">
        <h2 className="margin-bottom">가입완료</h2>
        <div className="left">
          <p>{user.nick}님 가입해주셔서 감사합니다.</p>
          <p>{user.email}로 가입인증 메일을 발송했습니다.</p>
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
    </div>
  );
};

export { JoinPage0, JoinPage1, JoinPage2, JoinPage3 };
