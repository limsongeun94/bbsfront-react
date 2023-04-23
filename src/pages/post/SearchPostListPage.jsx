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
  const [postList, setPostList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const { searchSelect, searchValue } = useParams();

  const setPostPage = () => {
    request
      .get("/post/search/list/page", {
        params: {
          query: searchValue,
          criteria: searchSelect,
          page: page,
          size: 10,
        },
      })
      .then((response) => {
        setPostList(response.data.contents);
        setLastPage(response.data.pages);
      });
  };

  useEffect(() => {
    setPostPage();
  }, [page, searchValue]);

  return (
    <Page>
      <h2 className="board-name">검색 결과</h2>
      <ListTable postList={postList} noticeList={noticeList} />
      <div className="list-bottom">
        <PageNum
          className="wright-page"
          lastPage={lastPage}
          page={page}
          setSearchParams={setSearchParams}
        />
      </div>
    </Page>
  );
};

export default PostListPage;
