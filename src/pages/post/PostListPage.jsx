import Page from "src/components/Page";
import { Button } from "react-bootstrap";
import ListTable from "src/pages/post/ListTable";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useParams } from "react-router-dom";
import { request } from "src/libs/request";

const PostListPage = () => {
  const { params } = useParams();

  const [boardName, setBoardName] = useState("");

  const showBoardName = () => {
    if (params == 0) {
      setBoardName("전체게시판");
    } else {
      request
        .get("board", {
          params: {
            id: params,
          },
        })
        .then((response) => {
          setBoardName(response.data.name);
        });
    }
  };

  useEffect(() => {
    showBoardName();
  }, [params]);

  return (
    <Page>
      <h2 className="board-name">{boardName}</h2>
      <ListTable params={params} />
      <div className="list-bottom">
        <PageNum className="wright-page" />
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

const PageNum = () => {
  let [active, setActive] = useState(1);
  let items = [];

  const onClickActive = (number) => {
    setActive(number);
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => onClickActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  );
};

export default PostListPage;
