import { request } from "src/libs/request";
import { useState } from "react";
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

  const doLogout = () => {
    request.delete("/user/authenticate").then((res) => {
      dispatch(removeUser());
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchSelect === "") {
        alert("검색내용의 유형을 선택해주세요.");
      } else {
        navigate("list/search/" + searchSelect + "/" + searchValue);
      }
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const searchOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const [searchSelect, setSearchSelect] = useState("");
  const searchOnSelect = (e) => {
    setSearchSelect(e.target.value);
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

          <div className="search_bar">
            <select
              className="head-select"
              name="search"
              onChange={searchOnSelect}
              value={searchSelect}
            >
              <option value="">검색내용</option>
              <option value="T">제목</option>
              <option value="B">본문</option>
              <option value="W">작성자</option>
              <option value="TB">제목 + 본문</option>
              <option value="A">전체</option>
            </select>

            <Form.Control
              placeholder="검색"
              style={{ width: "300px", margin: "0px 10px" }}
              minLength={2}
              maxLength={10}
              onKeyPress={handleOnKeyPress}
              onChange={searchOnChange}
              value={searchValue}
            />

            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              // onClick={doSearch}
              onClick={() => {
                searchSelect === ""
                  ? alert("검색내용의 유형을 선택해주세요.")
                  : navigate(
                      "list/search/" +
                        searchSelect +
                        "/" +
                        searchValue +
                        "?page=1"
                    );
              }}
            >
              검색
            </Button>
          </div>

          <div>
            {user.id ? (
              <div className="text-nowrap">
                <span style={{ marginRight: "10px" }}>
                  {user.nick}님 안녕하세요
                </span>
                <Button
                  variant="outline-secondary"
                  className="outline-secondary text-nowrap"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate("/user/info/" + user.id + "?page=1");
                  }}
                >
                  마이페이지
                </Button>
                <Button
                  variant="danger"
                  className="text-nowrap"
                  onClick={doLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              // <Button variant="outline-primary">Primary</Button>
              // 버튼이 퍼지는 이유는 글자가 개행(너비가 부족해서 다음줄로 넘어감)되어서 그런건데
              // css 옵션중에 글자 개행을 막는 옵션이 white-space: nowrap;
              <Button
                variant="outline-secondary"
                className="outline-secondary text-nowrap"
                onClick={() => {
                  navigate("/landing/login");
                }}
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
