import Header from "../main/Header";
import Page from "src/components/Page";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailMain from "./PostDetailMain";
import PostDetailReply from "./PostDetailReply";
import ListTable from "./ListTable";
import Footer from "../main/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";

const PostDetailPage = () => {
  const { id } = useParams();

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
          id: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  };

  useEffect(() => {
    showDetailPage();
  }, [id]);

  return (
    <Page>
      <Header />
      <h3 className="board-name">{post.board.name}</h3>
      <PostDetailInfo post={post} />
      <PostDetailMain post={post} />
      <PostDetailReply post_id={id} />
      <ListTable />
      <Footer />
    </Page>
  );
};
export default PostDetailPage;
