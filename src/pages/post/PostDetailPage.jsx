import Page from "src/components/Page";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailMain from "./PostDetailMain";
import PostDetailReply from "./PostDetailReply";
import ListTable from "./ListTable";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";

const PostDetailPage = () => {
  const { board_id, post_id } = useParams();

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

  const showPostList = () => {
    request
      .get("post/list/page", {
        params: {
          writer_id: 0,
          // 1. post.board 이걸 사용할 수 있는데 문제는 비동기라서
          // 명백하게 showDetailPage 이 완료된 후에 지금 이 함수를 실행하도록 하거나
          // 2. url에 board_id 정보를 넣어서 그걸 받아 쓰면 돼.
          // 페이지네이션까지 신경쓰려면 2번 방법이 편할듯..?
          board_id: board_id, //얘는 어떻게해? 방법은 두가지야.
          page: 1,
          size: 10,
        },
      })
      .then((response) => {
        setPostList(response.data.contents);
      });
  };

  useEffect(() => {
    showDetailPage();
    showPostList();
  }, [post_id]);

  return (
    <Page>
      <h2 className="board-name">{post.board.name}</h2>
      <div className="post-detail-wrapper">
        <PostDetailInfo post={post} />
        <hr className="post-detail-line" />
        <PostDetailMain post={post} />
        <hr className="post-detail-line" />
        <PostDetailReply post_id={post_id} />
      </div>
      <ListTable postList={postList} />
    </Page>
  );
};
export default PostDetailPage;
