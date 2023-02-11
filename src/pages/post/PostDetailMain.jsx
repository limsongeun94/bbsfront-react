import { Button } from "react-bootstrap";
import parse from "html-react-parser";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";

const PostDetailMain = (props) => {
  const [userId, setUserId] = useState("");

  const onClickThumbsUp = () => {
    request.post("/thumbs", {
      user_id: userId,
      post_id: props.post.id,
      reply_id: 0,
      value: true,
    });
  };

  const onClickThumbsDown = () => {
    request.post("/thumbs", {
      user_id: userId,
      post_id: props.post.id,
      reply_id: 0,
      value: false,
    });
  };

  const getPost = () => {
    request
      .get("/post", {
        params: {
          id: props.post.id,
        },
      })
      .then((response) =>
        props.getThumbs(
          response.data.thumbs_up_cnt,
          response.data.thumbs_down_cnt
        )
      );
  };

  const setUserInfo = () => {
    request.get("/user/info").then((response) => setUserId(response.data.id));
  };

  useEffect(() => {
    setUserInfo();
    getPost();
  }, []);

  return (
    <div className="main-text-wrapper">
      <div className="main-text">{parse(props.post.body)}</div>
      <div className="main-text-like-unlike">
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
          onClick={onClickThumbsUp}
        >
          <div>{props.post.thumbs_up_cnt}</div>
          <div>좋아요!</div>
        </Button>
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
          onClick={onClickThumbsDown}
        >
          <div>{props.post.thumbs_down_cnt}</div>
          <div>싫어요!</div>
        </Button>
      </div>
    </div>
  );
};
export default PostDetailMain;
