import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";

const Navigator = (props) => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const showBoardList = () => {
    request.get("board/list").then((response) => {
      setBoardList(response.data);
    });
  };

  useEffect(() => {
    showBoardList();
  }, []);

  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column left-nav">
        <Nav.Link
          onClick={() => {
            navigate("/post/list/0");
          }}
        >
          전체게시판
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            navigate("/notice/list");
          }}
        >
          공지사항
        </Nav.Link>
        <hr />
        <Nav.Link eventKey="disabled" disabled id="disnav">
          즐겨찾기
        </Nav.Link>
        <Nav.Link>즐찾 게시판이름</Nav.Link>
        <hr />
        {boardList.map((data) => (
          <Nav.Link
            key={data.id}
            eventKey={"link-" + data.id}
            onClick={() => {
              navigate("/post/list/" + data.id);
            }}
          >
            {data.name}
          </Nav.Link>
        ))}
      </Nav>
    </nav>
  );
};

export default Navigator;
