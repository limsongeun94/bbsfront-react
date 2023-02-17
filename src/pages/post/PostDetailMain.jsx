import { Button } from "react-bootstrap";
import parse from "html-react-parser";
import { request } from "src/libs/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostDetailMain = (props) => {
  let user_state = useSelector((state) => {
    return state.user;
  });
  // const [userId, setUserId] = useState("");

  const onClickThumbsUp = () => {
    request
      .post("/thumbs", {
        user_id: user_state.id,
        post_id: props.post.id,
        reply_id: 0,
        value: true,
      })
      .then((response) => {
        props.showDetailPage();
      });
  };

  const onClickThumbsDown = () => {
    request
      .post("/thumbs", {
        user_id: user_state.id,
        post_id: props.post.id,
        reply_id: 0,
        value: false,
      })
      .then((response) => {
        props.showDetailPage();
      });
  };

  // const setUserInfo = () => {
  //   request.get("/user/info").then((response) => setUserId(response.data.id));
  // };

  // useEffect(() => {
  //   setUserInfo();
  // }, []);

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
