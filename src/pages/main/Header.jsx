import { request } from "src/libs/request";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "src/store/user";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

const Header = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/landing/login");
  };

  const doLogout = () => {
    request.delete("/user/authenticate").then((res) => {
      dispatch(removeUser());
    });
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container className="container">
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/logo (1).svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            게시판
          </Navbar.Brand>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="검색내용"
              id="input-group-dropdown-1"
              className="outline-secondary header-dropdown"
            >
              <Dropdown.Item href="#">전체</Dropdown.Item>
              <Dropdown.Item href="#">제목</Dropdown.Item>
              <Dropdown.Item href="#">본문</Dropdown.Item>
              <Dropdown.Item href="#">작성자</Dropdown.Item>
              <Dropdown.Item href="#">제목+본문</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className="outline-secondary"
            >
              검색
            </Button>
          </InputGroup>
          <div>
            {user.id ? (
              <div className="text-nowrap">
                <span>{user.nick}님 안녕하세요</span>
                <Button
                  variant="outline-secondary"
                  className="outline-secondary text-nowrap"
                  onClick={doLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              // <Button variant="outline-primary">Primary</Button>
              // 버튼이 퍼지는 이유는 글자가 개행(너비가 부족해서 다음줄로 넘어감)되어서 그런건데
              // css 옵션중에 글자 개행을 막는 옵션이 white-space: nowrap; 이야
              <Button
                variant="outline-secondary"
                className="outline-secondary text-nowrap"
                onClick={toLogin}
              >
                로그인
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
