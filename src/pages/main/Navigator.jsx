import { Nav } from "react-bootstrap";

const Navigator = (props) => {
  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column left-nav">
        <Nav.Link eventKey="disabled" disabled id="disnav">
          즐겨찾기
        </Nav.Link>
        <Nav.Link eventKey="link-0">즐찾 게시판이름</Nav.Link>
        <hr />
        <Nav.Link eventKey="link-0">유머게시판</Nav.Link>
        <Nav.Link eventKey="link-1">핫딜</Nav.Link>
        <Nav.Link eventKey="link-2">고민상담</Nav.Link>
      </Nav>
    </nav>
  );
};

export default Navigator;
