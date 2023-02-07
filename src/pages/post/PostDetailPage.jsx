import Page from "src/components/Page";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailMain from "./PostDetailMain";
import PostDetailReply from "./PostDetailReply-1";
import ListTable from "./ListTable";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPostId } from "./../../store/post_id";

const PostDetailPage = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { board_id, post_id } = useParams();

  useEffect(() => {
    dispatch(setPostId(post_id));
  }, []);

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

  useEffect(() => {
    showDetailPage();
    showPostList();
    showBoardNotice();
  }, [post_id]);

  return (
    <Page>
      <h2 className="board-name">{post.board.name}</h2>
      <div className="post-detail-wrapper">
        <PostDetailInfo post={post} />
        <hr className="post-detail-line" />
        <PostDetailMain post={post} />
        <hr className="post-detail-line" />
        <PostDetailReply post={post} />
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
    </Page>
  );
};
export default PostDetailPage;
