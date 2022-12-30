import { Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";

const Navigator = (props) => {
  const navigate = useNavigate();

  const eng_board_name = [
    "hotdeal",
    "humor",
    "counsel",
    "travel",
    "dessert",
    "electronics",
  ];

  const [boardList, setBoardList] = useState([]);

  const showBoardList = () => {
    request.get("board/list").then((response) => {
      setBoardList(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    showBoardList();
  }, []);

  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column left-nav">
        <Nav.Link eventKey="link-0">전체 게시판</Nav.Link>
        <hr />
        <Nav.Link eventKey="disabled" disabled id="disnav">
          즐겨찾기
        </Nav.Link>
        <Nav.Link>즐찾 게시판이름</Nav.Link>
        <hr />
        {boardList.map((data, index) => (
          <Nav.Link
            key={data.id}
            eventKey={"link-" + data.id}
            onClick={() => {
              data.eng_name = eng_board_name[index];
              navigate("post/list/" + data.eng_name);
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
