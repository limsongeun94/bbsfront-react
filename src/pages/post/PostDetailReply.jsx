import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";

const PostDetailReply = (props) => {
  const [reply, setReply] = useState([]);
  const [createReply, setCreateReply] = useState("");

  const onChange = (e) => {
    setCreateReply(e.target.value);
  };

  const onReset = () => {
    setCreateReply("");
  };

  useEffect(() => {
    handleShowReply();
  }, []);

  const handleShowReply = () => {
    request
      .get("post/reply", {
        params: {
          post_id: props.post_id,
        },
      })
      .then((response) => {
        setReply(response.data);
      });
  };

  const handleCreateReply = () => {
    request
      .post("post/reply", {
        target_id: 0,
        post_id: props.post_id,
        writer_id: 0,
        writer_nick: "string",
        body: createReply,
      })
      .then((response) => {
        setReply([...reply, response.data]);
        onReset();
      });
  };

  return (
    <>
      {reply.map((data) => {
        return <ReplyView key={data.id} data={data} />;
      })}
      <div className="ripple-write-wrapper">
        <textarea
          placeholder="내용을 작성하세요."
          onChange={onChange}
          value={createReply}
        />
        <div className="ripple-submit-wrapper">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
            onClick={handleCreateReply}
          >
            등록
          </Button>
        </div>
      </div>
    </>
  );
};

const ReplyView = (props) => {
  return (
    <div className="ripple-view-wrapper">
      <div className="ripple-head">
        <div>{props.data.writer_nick}</div>
        <div>{props.data.created_at}</div>
      </div>
      <div className="ripple-body">{props.data.body}</div>
      <div class="ripple-foot">
        <div>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap margin-right"
          >
            <span>
              <img src="/thumbs-up.png" width="18px" />
            </span>
            <span>{props.data.thumbs_up_cnt}</span>
          </Button>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
          >
            <span>
              <img src="/thumbs-down.png" width="18px" />
            </span>
            <span>{props.data.thumbs_down_cnt}</span>
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
          >
            답글
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostDetailReply;
