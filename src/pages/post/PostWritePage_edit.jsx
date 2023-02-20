import Header from "../main/Header";
import Footer from "../main/Footer";
import Editor from "../../components/Editor";
import { Button } from "react-bootstrap";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostWriterPage = () => {
  const { board_id, post_id } = useParams();
  const navigate = useNavigate();

  const [boardList, setBoardList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [selected, setSelected] = useState("");
  const [mainText, setMainText] = useState("");
  // const [userInfo, setUserInfo] = useState({
  //   user_id: "",
  //   user_nick: "",
  // });

  const boardNameList = () => {
    request.get("board/list/").then((response) => {
      setBoardList(response.data);
    });
  };

  // const getUserInfo = () => {
  //   request.get("user/info").then((response) => {
  //     setUserInfo({
  //       user_id: response.data.id,
  //       user_nick: response.data.nick,
  //     });
  //   });
  // };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const uploadPost = () => {
    if (nameInput == "") {
      alert("제목을 입력하세요.");
    } else if (selected == "") {
      alert("게시판을 선택하세요.");
    } else if (mainText == "") {
      alert("내용을 입력하세요.");
    } else {
      request
        .put("/post", {
          title: nameInput,
          body: mainText,
          id: post_id,
        })
        .then((res) => {
          navigate("/post/list/" + selected);
        });
    }
  };

  const getBeforeContents = () => {
    request
      .get("/post", {
        params: {
          id: post_id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSelected(response.data.board_id);
        setNameInput(response.data.title);
        setMainText(response.data.body);
      });
  };

  useEffect(() => {
    boardNameList();
    // getUserInfo();
    getBeforeContents();
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
