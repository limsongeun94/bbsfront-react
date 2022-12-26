import { Button } from "react-bootstrap";

const PostDetailMain = (props) => {
  return (
    <div className="mina-text-wrapper">
      <div className="main-text">{props.post.body}</div>
      <div className="main-text-like-unlike">
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
        >
          <div>{props.post.thumbs_up_cnt}</div>
          <div>좋아요!</div>
        </Button>
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
        >
          <div>{props.post.thumbs_down_cnt}</div>
          <div>싫어요!</div>
        </Button>
      </div>
    </div>
  );
};
export default PostDetailMain;
