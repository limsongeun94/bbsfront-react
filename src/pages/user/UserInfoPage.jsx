import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import Header from "../main/Header";
import Footer from "../main/Footer";
import PageNum from "../post/PageNum";
import { Button } from "react-bootstrap";
import dateFomat from "src/libs/datetime";

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    nick: "",
    intro: "",
    thumbnail: "images.jpg",
  });

  const showUserInfo = () => {
    request.get("user/info").then((response) => {
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

  const showPostList = () => {
    request
      .get("post/list/page", {
        params: {
          writer_id: userInfo.id,
          page: 1,
        },
      })
      .then((response) => {
        setPostList(response.data.contents);
      });
  };

  useEffect(() => {
    showUserInfo();
  }, []);

  useEffect(() => {
    showPostList();
  }, [userInfo.id]);

  return (
    <div className="userinfo-page">
      <Header />
      <div className="userinfo_container">
        <div>
          <div>
            <img src={userInfo.thumbnail} width="200px" height="200px" />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              style={{ marginTop: "10px" }}
            >
              변경하기
            </Button>
          </div>
        </div>
        <div>
          <table>
            <colgroup>
              <col style={{ width: "35%" }} />
              <col style={{ widht: "65%" }} />
            </colgroup>
            <tr>
              <td>이름</td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td>닉네임</td>
              <td>{userInfo.nick}</td>
            </tr>
            <tr>
              <td>자기소개</td>
              <td>{userInfo.intro}</td>
            </tr>
          </table>
        </div>
        <div>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
          >
            수정
          </Button>
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
                <tr key={data.id} className="list-main">
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
      <PageNum />
      <Footer />
    </div>
  );
};

export default UserInfoPage;
