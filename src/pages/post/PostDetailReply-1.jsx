import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";

const PostDetailReply = (props) => {
  return (
    <>
      <ReplyView post={props.post} />
      <ReplyCreate post={props.post} />
    </>
  );
};

const ReplyView = (props) => {
  const [reReply, setReReply] = useState(0);

  const OnClickReply = (props) => {
    if (reReply == props.data.id) {
      return (
        <div style={{ display: "flex" }}>
          <img
            src="/reply_arrow.png"
            width="100px"
            style={{ transform: "rotate(0.5turn)" }}
          />
          <div style={{ flexGrow: "1" }}>
            <ReplyCreate reply_id={props.data.id} post={props.post} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {props.post.replies.map((data) => {
        return (
          <>
            <Replycontainer key={data.id} data={data} setReReply={setReReply} />
            <OnClickReply key={data.id} data={data} post={props.post} />
            {props.post.replies.map((data) => {
              return (
                <div style={{ display: "flex" }}>
                  <img
                    src="/reply_arrow.png"
                    width="100px"
                    style={{ transform: "rotate(0.5turn)" }}
                  />
                  <div style={{ flexGrow: "1" }}>
                    <Replycontainer
                      key={data.id}
                      data={data}
                      setReReply={setReReply}
                    />
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
};

const Replycontainer = (props) => {
  return (
    <div className="reply-view-wrapper">
      <div className="reply-head">
        <div>{props.data.writer_nick}</div>
        <div>{dateFomat(props.data.created_at)}</div>
      </div>
      <div className="reply-body">{props.data.body}</div>
      <div class="reply-foot">
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
            onClick={() => props.setReReply(props.data.id)}
          >
            답글
          </Button>
        </div>
      </div>
    </div>
  );
};

const ReplyCreate = (props) => {
  const [createReply, setCreateReply] = useState("");

  const handleCreateReply = () => {
    request.post("post/reply", {
      target_id: 0,
      post_id: props.post.id,
      writer_id: 0,
      writer_nick: "string",
      body: createReply,
    });
    // .then((response) => {
    //   props.setReply([...props.reply, response.data]);
    //   setCreateReply("");
    // });
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

export default PostDetailReply;
