import Header from "../main/Header";
import Page from "src/components/Page";
import BoardName from "./BoardName";
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
    board: {
      name: "",
    },
    title: "",
    writer: {
      nick: "",
      id: "",
      introduction: "",
    },
    replies_cnt: 0,
    view_cnt: 0,
    created_at: "",
    updated_at: "",
    body: "",
    thumbs_up_cnt: 0,
    thumbs_down_cnt: 0,
    replies: [],
  });
  console.log(id);

  useEffect(() => {
    request
      .get("/post", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response.data.thumbs_up_cnt);
        setPost(response.data);
      });
  }, []);

  return (
    <Page>
      <Header />
      <BoardName name={post.board.name} />
      <PostDetailInfo post={post} />
      <PostDetailMain post={post} />
      <PostDetailReply />
      <ListTable />
      <Footer />
    </Page>
  );
};
export default PostDetailPage;
