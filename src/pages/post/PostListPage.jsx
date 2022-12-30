import Pagination from "react-bootstrap/Pagination";
import Header from "src/pages/main/Header";
import Footer from "src/pages/main/Footer";
import Page from "src/components/Page";
import { Button } from "react-bootstrap";
import ListTable from "src/pages/post/ListTable";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { request } from "src/libs/request";

const PostListPage = () => {
  const { params } = useParams();

  const [boardId, setBoardId] = useState(0);

  const eng_board_name = [
    "hotdeal",
    "humor",
    "counsel",
    "travel",
    "dessert",
    "electronics",
  ];

  const [postList, setPostList] = useState([]);

  const handleShowList = () => {
    request
      .get("post/list/page", {
        // params: {
        //   // page값 바뀔때마다 데이터 바뀌는거 보이지? 응
        //   // 밑에 1,2,3,4... 버튼 누를때마다 page값 넣어서 api요청 넣으면 돼.
        //   page: 1,
        // },
        params: {
          board_id: boardId,
        },
      })
      .then((response) => {
        const content = response.data.contents;
        setPostList([...content]);
      });
  };

  useEffect(() => {
    handleShowList();
  }, []);

  return (
    <Page>
      <Header />
      <h3 className="board-name">{params}</h3>
      <ListTable params={params} postList={postList} />
      <div className="list-bottom">
        <PageNum className="wright-page" />
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap wright-button"
        >
          글쓰기
        </Button>
      </div>
      <Footer />
    </Page>
  );
};

const PageNum = () => {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default PostListPage;
