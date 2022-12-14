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
      {/* {user.id ? (
        <div>
          <span>{user.nick}님 안녕하세요</span>
          <button onClick={doLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={toLogin}>로그인</button>
      )} */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
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
              className="outline-secondary"
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
              <div>
                <span>{user.nick}님 안녕하세요</span>
                <Button
                  variant="outline-secondary"
                  className="outline-secondary"
                  onClick={doLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              // <Button variant="outline-primary">Primary</Button>
              <Button
                variant="outline-secondary"
                className="outline-secondary"
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
