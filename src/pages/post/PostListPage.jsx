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

  return (
    <Page>
      <Header />
      <h3 className="board-name">게시판이름</h3>
      <ListTable />
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
