import Page from "src/components/Page";
import { Button } from "react-bootstrap";
import ListTable from "src/pages/post/ListTable";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "src/libs/request";
import PageNum from "./PageNum";

const PostListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { board_id } = useParams();

  const [boardName, setBoardName] = useState("");
  const [postList, setPostList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const showBoardName = () => {
    if (board_id == 0) {
      setBoardName("전체게시판");
    } else {
      request
        .get("board", {
          params: {
            id: board_id,
          },
        })
        .then((response) => {
          setBoardName(response.data.name);
        });
    }
  };

  const setPostPage = () => {
    request
      .get("post/list/page", {
        params: {
          writer_id: 0,
          board_id: board_id,
          page: page,
          size: 10,
        },
      })
      .then((response) => {
        setPostList(response.data.contents);
        setLastPage(response.data.pages);
      });
  };

  const showBoardNotice = () => {
    request
      .get("notice/list", {
        params: {
          board_id: board_id,
        },
      })
      .then((response) => {
        setNoticeList(response.data);
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
    getUserId();
  }, [user_state]);

  useEffect(() => {
    setPostPage();
  }, [page]);

  useEffect(() => {
    showBoardName();
    showBoardNotice();
  }, [board_id]);

  return (
    <Page>
      <h2 className="board-name">{boardName}</h2>
      <ListTable postList={postList} noticeList={noticeList} />
      <div className="list-bottom">
        <PageNum
          className="wright-page"
          lastPage={lastPage}
          page={page}
          setSearchParams={setSearchParams}
        />
        {loginInfo ? (
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap wright-button"
            onClick={() => {
              navigate("/post/writer/new");
            }}
          >
            글쓰기
          </Button>
        ) : null}
      </div>
    </Page>
  );
};

export default PostListPage;
