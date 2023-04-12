import { useEffect, useState, useRef } from "react";
import { request } from "src/libs/request";
import Header from "../main/Header";
import Footer from "../main/Footer";
import PageNum from "../post/PageNum";
import { Button } from "react-bootstrap";
import dateFomat from "src/libs/datetime";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const fileInput = useRef();
  const { user_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    nick: "",
    intro: "",
    thumbnail: "",
  });

  const showUserInfo = () => {
    request
      .get("user/info/" + user_id, {
        params: {
          user_id: user_id,
        },
      })
      .then((response) => {
        setUserInfo({
          id: response.data.id,
          name: response.data.name,
          nick: response.data.nick,
          intro: response.data.introduction,
          thumbnail: response.data.thumbnail,
        });
      });
  };

  const [postList, setPostList] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const showPostList = () => {
    if (userInfo.id) {
      request
        .get("post/list/page", {
          params: {
            writer_id: userInfo.id,
            page: page,
          },
        })
        .then((response) => {
          setPostList(response.data.contents);
          setLastPage(response.data.pages);
        });
    }
  };

  const [introUpdate, setIntroUpdate] = useState(1);

  const updateUserInfo = () => {
    request
      .put("/user/info", {
        id: userInfo.id,
        introduction: userInfo.intro,
      })
      .then((response) => {
        setIntroUpdate(1);
        showUserInfo();
      });

    request
      .patch("/user/nick", {
        id: userInfo.id,
        nick: userInfo.nick,
      })
      .then((response) => {
        setIntroUpdate(1);
        showUserInfo();
      });
  };

  const thumbnailUpload = () => {
    fileInput.current.click();
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    request
      .patch("/user/thumbnail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo({ ...userInfo, thumbnail: response.data.thumbnail });
      });
  };

  let user_state = useSelector((state) => {
    return state.user;
  });

  const [loginInfo, setLoginInfo] = useState(0);

  const getUserId = () => {
    setLoginInfo(user_state.id);
  };

  useEffect(() => {
    showUserInfo();
  }, []);

  useEffect(() => {
    showPostList();
  }, [userInfo.id, page]);

  useEffect(() => {
    getUserId();
  }, [user_state]);

  return (
    <div className="userinfo-page">
      <Header />
      <div className="userinfo_container">
        <div>
          <div>
            <img src={userInfo.thumbnail} width="200px" height="200px" />
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              type="file"
              ref={fileInput}
              onChange={uploadFile}
              accept="image/*"
              style={{ display: "none" }}
            />
            {loginInfo ? (
              <Button
                variant="outline-secondary"
                className="outline-secondary text-nowrap"
                style={{ marginTop: "10px" }}
                onClick={thumbnailUpload}
              >
                변경하기
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          <table>
            <colgroup>
              <col style={{ width: "35%" }} />
              <col style={{ widht: "65%" }} />
            </colgroup>
            <tr>
              <td style={{ width: "100px" }}>이름</td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td style={{ width: "100px" }}>닉네임</td>
              {introUpdate ? (
                <td>{userInfo.nick}</td>
              ) : (
                <td>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, nick: e.target.value });
                    }}
                    value={userInfo.nick}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td style={{ width: "100px" }}>자기소개</td>
              {loginInfo && introUpdate ? (
                <td>{userInfo.intro}</td>
              ) : (
                <td>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, intro: e.target.value });
                    }}
                    value={userInfo.intro}
                  />
                </td>
              )}
            </tr>
          </table>
        </div>
        <div>
          {introUpdate ? (
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              onClick={() => setIntroUpdate(0)}
            >
              수정
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              onClick={updateUserInfo}
            >
              제출
            </Button>
          )}
        </div>
      </div>
      <div className="list-page" style={{ marginTop: "10px" }}>
        <h4>작성글 목록</h4>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>제목</td>
              <td>추천/비추천</td>
              <td>조회수</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            {postList.map((data) => {
              return (
                <tr
                  key={data.id}
                  className="list-main"
                  onClick={() =>
                    navigate("/post/detail/" + data.board_id + "/" + data.id)
                  }
                >
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>
                    <span>{data.thumbs_up_cnt}</span>
                    <span>/</span>
                    <span>{data.thumbs_down_cnt}</span>
                  </td>
                  <td>{data.view_cnt}</td>
                  <td>{dateFomat(data.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PageNum
        className="wright-page"
        lastPage={lastPage}
        page={page}
        setSearchParams={setSearchParams}
      />
      <Footer />
    </div>
  );
};

export default UserInfoPage;
