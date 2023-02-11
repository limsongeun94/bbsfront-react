import Page from "src/components/Page";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailMain from "./PostDetailMain";
import PostDetailReply from "./PostDetailReply-1";
import ListTable from "./ListTable";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import { Button } from "react-bootstrap";
import PageNum from "./../post/PageNum";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { board_id, post_id } = useParams();

  const [lastPage, setLastPage] = useState(0);
  const [post, setPost] = useState({
    id: 0,
    board: {
      name: "",
    },
    writer: {
      id: "",
      nick: "",
      introduction: "",
      thumbnail: "",
    },
    title: "",
    replies_cnt: 0,
    view_cnt: 0,
    created_at: "",
    updated_at: "",
    body: "",
    thumbs_up_cnt: 0,
    thumbs_down_cnt: 0,
    replies: [],
  });

  const showDetailPage = () => {
    request
      .get("post", {
        params: {
          id: post_id,
        },
      })
      .then((response) => {
        setPost(response.data);
      });
  };

  const [postList, setPostList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  const showPostList = () => {
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

  const removePost = () => {
    request.delete("post", {
      params: {
        id: post_id,
      },
    });
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

  const getReply = (data) => {
    setPost({ ...post, replies: data });
  };

  useEffect(() => {
    showDetailPage();
    showPostList();
    showBoardNotice();
  }, [post_id]);

  useEffect(() => {
    setPostPage();
  }, [page]);

  return (
    <Page>
      <h2 className="board-name">{post.board.name}</h2>
      <div className="post-detail-wrapper">
        <PostDetailInfo post={post} />
        <hr className="post-detail-line" />
        <PostDetailMain post={post} showDetailPage={showDetailPage} />
        <hr className="post-detail-line" />
        <PostDetailReply post={post} getReply={getReply} />
      </div>
      <div className="post-detail-btn-wrapper">
        <div className="list-top-btn">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
            onClick={() => {
              navigate("/post/list/" + board_id);
            }}
          >
            목록
          </Button>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
            onClick={(e) => window.scrollTo(0, 0)}
          >
            맨위로
          </Button>
        </div>
        <div className="edit-btn">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
          >
            수정
          </Button>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
            onClick={removePost}
          >
            삭제
          </Button>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
            onClick={() => {
              navigate("/post/writer");
            }}
          >
            글쓰기
          </Button>
        </div>
      </div>
      <ListTable postList={postList} noticeList={noticeList} />
      <PageNum
        lastPage={lastPage}
        page={page}
        setSearchParams={setSearchParams}
      />
    </Page>
  );
};
export default PostDetailPage;
