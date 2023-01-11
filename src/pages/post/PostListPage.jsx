import Page from "src/components/Page";
import { Button } from "react-bootstrap";
import ListTable from "src/pages/post/ListTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "src/libs/request";
import PageNum from "./PageNum";

const PostListPage = () => {
  const { board_id } = useParams();

  const [boardName, setBoardName] = useState("");
  const [postList, setPostList] = useState([]);
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
          page: 1,
          size: 10,
        },
      })
      .then((response) => {
        setPostList(response.data.contents);
        setLastPage(response.data.pages);
      });
  };

  useEffect(() => {
    showBoardName();
    setPostPage();
  }, [board_id]);

  return (
    <Page>
      <h2 className="board-name">{boardName}</h2>
      <ListTable postList={postList} />
      <div className="list-bottom">
        <PageNum className="wright-page" lastPage={lastPage} />
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap wright-button"
        >
          글쓰기
        </Button>
      </div>
    </Page>
  );
};

export default PostListPage;
