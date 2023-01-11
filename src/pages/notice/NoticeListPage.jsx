import Page from "src/components/Page";
import { Button } from "react-bootstrap";
import NoticeListTable from "./NoticeListTable";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const NoticeListPage = () => {
  return (
    <Page>
      <h2 className="board-name">공지</h2>
      <NoticeListTable />
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

export default NoticeListPage;
