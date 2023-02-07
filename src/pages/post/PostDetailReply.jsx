import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";
import { useSelector } from "react-redux";

const PostDetailReply = () => {
  const [reply, setReply] = useState([]);

  return (
    <>
      <ReplyView reply={reply} setReply={setReply} />
      <ReplyCreate reply={reply} setReply={setReply} />
    </>
  );
};

const ReplyView = (props) => {
  let state = useSelector((state) => state.post_id);

  const [reReply, setReReply] = useState(0);

  const handleShowReply = () => {
    request
      .get("post/reply", {
        params: {
          post_id: state.post_id,
        },
      })
      .then((response) => {
        props.setReply(response.data);
      });
  };

  useEffect(() => {
    handleShowReply();
  }, [state.post_id]);

  return (
    <>
      {props.reply.map((data) => {
        return (
          <>
            <div className="reply-view-wrapper" key={data.id} data={data}>
              <div className="reply-head">
                <div>{data.writer_nick}</div>
                <div>{dateFomat(data.created_at)}</div>
              </div>
              <div className="reply-body">{data.body}</div>
              <div class="reply-foot">
                <div>
                  <Button
                    variant="outline-secondary"
                    className="outline-secondary text-nowrap margin-right"
                  >
                    <span>
                      <img src="/thumbs-up.png" width="18px" />
                    </span>
                    <span>{data.thumbs_up_cnt}</span>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="outline-secondary text-nowrap"
                  >
                    <span>
                      <img src="/thumbs-down.png" width="18px" />
                    </span>
                    <span>{data.thumbs_down_cnt}</span>
                  </Button>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Button
                    variant="outline-secondary"
                    className="outline-secondary text-nowrap"
                    onClick={() => setReReply(data.id)}
                  >
                    답글
                  </Button>
                </div>
              </div>
            </div>
            {reReply == data.id ? <ReReplyCreate reply_id={data.id} /> : null}
          </>
        );
      })}
    </>
  );
};

const ReplyCreate = (props) => {
  let state = useSelector((state) => state.post_id);

  const [createReply, setCreateReply] = useState("");

  const handleCreateReply = () => {
    request
      .post("post/reply", {
        target_id: 0,
        post_id: state.post_id,
        writer_id: 0,
        writer_nick: "string",
        body: createReply,
      })
      .then((response) => {
        props.setReply([...props.reply, response.data]);
        setCreateReply("");
      });
  };

  return (
    <>
      <div className="reply-write-wrapper">
        <textarea
          placeholder="내용을 작성하세요."
          onChange={(e) => setCreateReply(e.target.value)}
          value={createReply}
        />
        <div className="reply-submit-wrapper">
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

const ReReplyCreate = (props) => {
  // "post/reply" get요청에서 파라미터로 reply_id도 추가시킬 필요 있을 것 같음

  let state = useSelector((state) => state.post_id);

  const [createReReply, setCreateReReply] = useState("");

  const handleCreateReReply = () => {
    request.post("/post/reply", {
      target_id: props.reply_id,
      post_id: state.post_id,
      writer_id: 0,
      writer_nick: "string",
      body: createReReply,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <img
        src="/reply_arrow.png"
        width="100px"
        style={{ transform: "rotate(0.5turn)" }}
      />
      <div style={{ flexGrow: "1" }}>
        <div className="reply-write-wrapper">
          <textarea
            placeholder="내용을 작성하세요."
            onChange={(e) => setCreateReReply(e.target.value)}
            value={createReReply}
          />
          <div className="reply-submit-wrapper">
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              onClick={handleCreateReReply}
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailReply;
