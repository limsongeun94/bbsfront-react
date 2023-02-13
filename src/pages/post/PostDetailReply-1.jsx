import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";

const PostDetailReply = (props) => {
  const [userId, setUserId] = useState("");

  const onClickThumbsUp = () => {
    request
      .post("/thumbs", {
        user_id: userId,
        post_id: 0,
        reply_id: props.data.id,
        value: true,
      })
      .then((response) => {
        props.showDetailPage();
      });
  };

  const onClickThumbsDown = () => {
    request
      .post("/thumbs", {
        user_id: userId,
        post_id: 0,
        reply_id: props.data.id,
        value: false,
      })
      .then((response) => {
        props.showDetailPage();
      });
  };

  const setUserInfo = () => {
    request.get("/user/info").then((response) => setUserId(response.data.id));
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <>
      <ReplyView
        post={props.post}
        getReply={props.getReply}
        onClickThumbsUp={onClickThumbsUp}
        onClickThumbsDown={onClickThumbsDown}
      />
      <ReplyCreate post={props.post} getReply={props.getReply} />
    </>
  );
};

const ReplyView = (props) => {
  const [reReply, setReReply] = useState(0);

  const OnClickReReplyCreate = (_props) => {
    if (reReply == _props.data.id) {
      return (
        <div style={{ display: "flex" }}>
          <img
            src="/reply_arrow.png"
            width="100px"
            style={{ transform: "rotate(0.5turn)" }}
          />
          <div style={{ flexGrow: "1" }}>
            <ReReplyCreate
              reply_id={_props.data.id}
              post={_props.post}
              getReply={props.getReply}
            />
          </div>
        </div>
      );
    }
    return null;
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
              onClick={props.onClickThumbsUp}
            >
              <span>
                <img src="/thumbs-up.png" width="18px" />
              </span>
              <span>{props.data.thumbs_up_cnt}</span>
            </Button>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              onClick={props.onClickThumbsDown}
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

  const ReplycontainerWithoutBtn = (props) => {
    return (
      <div className="rereply-view-wrapper" style={{ minHeight: "107px" }}>
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
              onClick={props.onClickThumbsUp}
            >
              <span>
                <img src="/thumbs-up.png" width="18px" />
              </span>
              <span>{props.data.thumbs_up_cnt}</span>
            </Button>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
              onClick={props.onClickThumbsDown}
            >
              <span>
                <img src="/thumbs-down.png" width="18px" />
              </span>
              <span>{props.data.thumbs_down_cnt}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {props.post.replies.map((data) => {
        return (
          <>
            <Replycontainer
              key={data.id}
              data={data}
              setReReply={setReReply}
              onClickThumbsUp={props.onClickThumbsUp}
              onClickThumbsDown={props.onClickThumbsDown}
            />
            <OnClickReReplyCreate key={data.id} data={data} post={props.post} />
            {data.replies.map((data) => {
              return (
                <div
                  style={{
                    display: "flex",
                    background: "rgb(244, 244, 244)",
                    border: "1px solid #212529",
                  }}
                >
                  <img
                    src="/reply_arrow.png"
                    width="100px"
                    style={{ transform: "rotate(0.5turn)" }}
                  />
                  <div style={{ flexGrow: "1" }}>
                    <ReplycontainerWithoutBtn
                      key={data.id}
                      data={data}
                      setReReply={setReReply}
                      onClickThumbsUp={props.onClickThumbsUp}
                      onClickThumbsDown={props.onClickThumbsDown}
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

const ReplyCreate = (props) => {
  const [createReply, setCreateReply] = useState("");

  const handleCreateReply = () => {
    request
      .post("post/reply", {
        target_id: 0,
        post_id: props.post.id,
        writer_id: 0,
        writer_nick: "string",
        body: createReply,
      })
      .then((response) =>
        request
          .get("post/reply", {
            params: {
              post_id: props.post.id,
            },
          })
          .then((response) => {
            props.getReply(response.data);
          })
      );
  };

  return (
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
  );
};

const ReReplyCreate = (props) => {
  const [createReply, setCreateReply] = useState("");

  const handleCreateReReply = () => {
    request
      .post("post/reply", {
        target_id: props.reply_id,
        post_id: props.post.id,
        writer_id: 0,
        writer_nick: "string",
        body: createReply,
      })
      .then((response) =>
        request
          .get("post/reply", {
            params: {
              post_id: props.post.id,
            },
          })
          .then((response) => {
            props.getReply(response.data);
          })
      );
  };

  return (
    <div className="rereply-write-wrapper">
      <textarea
        placeholder="내용을 작성하세요."
        onChange={(e) => setCreateReply(e.target.value)}
        value={createReply}
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
  );
};

export default PostDetailReply;
