import Header from "../main/Header";
import Footer from "../main/Footer";
import Editor from "../../components/Editor";
import { Button } from "react-bootstrap";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostWriterPage = () => {
  const navigate = useNavigate();

  const [boardList, setBoardList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [selected, setSelected] = useState("");
  const [mainText, setMainText] = useState("");
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    user_nick: "",
  });

  // let user_id = 0;
  // let user_nick = "";

  const boardNameList = () => {
    request.get("board/list/").then((response) => {
      setBoardList(response.data);
    });
  };

  const getUserInfo = () => {
    request.get("user/info").then((response) => {
      setUserInfo({
        user_id: response.data.id,
        user_nick: response.data.nick,
      });
      // user_id = response.data.id;
      // user_nick = response.data.nick;

      // console.log(user_id, user_nick);
    });
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const uploadPost = () => {
    request
      .post("/post", {
        title: nameInput,
        body: mainText,
        writer_nick: userInfo.user_nick,
        writer_id: userInfo.user_id,
        board_id: selected,
      })
      .then((res) => {
        navigate("/post/list/" + selected);
      });
    // console.log(mainText);
    // console.log(nameInput);
    // console.log(selected);
  };

  useEffect(() => {
    boardNameList();
    getUserInfo();
    // console.log(userInfo);
  }, []);

  return (
    <div className="none-layout-page">
      <Header />
      <div className="writer-wrapper">
        <div className="writer-title-wrapper">
          <input
            className="writer-title"
            placeholder="제목을 입력해 주세요."
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
            value={nameInput}
          />
          <select
            className="writer-category"
            name="category"
            onChange={handleSelect}
            value={selected}
          >
            <option value="">카테고리 선택</option>
            {boardList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>
        <Editor onChange={(e) => setMainText(e)} value={mainText} />
        <div className="write-btn-wrapper">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap post-btn"
            onClick={uploadPost}
          >
            등록
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostWriterPage;
