import { Button } from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";

const PostDetailReply = (props) => {
  let user_state = useSelector((state) => {
    return state.user;
  });

  const [loginInfo, setLoginInfo] = useState(0);

  const handleRemove = (reply_id) => {
    request
      .delete("/post/reply", {
        params: {
          id: reply_id,
        },
      })
      .then((response) => {
        props.resetReply();
      });
  };

  const onClickThumbsUp = (data) => {
    if (user_state.id) {
      request
        .post("/thumbs", {
          user_id: user_state.id,
          post_id: 0,
          reply_id: data.id,
          value: true,
        })
        .then((response) => {
          props.resetReply();
        });
    } else alert("로그인 후 참여하세요.");
  };

  const onClickThumbsDown = (data) => {
    if (user_state.id) {
      request
        .post("/thumbs", {
          user_id: user_state.id,
          post_id: 0,
          reply_id: data.id,
          value: false,
        })
        .then((response) => {
          props.resetReply();
        });
    } else alert("로그인 후 참여하세요.");
  };

  const getUserId = () => {
    setLoginInfo(user_state.id);
  };

  useEffect(() => {
    getUserId();
  }, [user_state]);

  return (
    <>
      <ReplyView
        post={props.post}
        getReply={props.getReply}
        loginInfo={loginInfo}
        onClickThumbsUp={onClickThumbsUp}
        onClickThumbsDown={onClickThumbsDown}
        handleRemove={handleRemove}
      />
      {loginInfo ? (
        <ReplyCreate post={props.post} getReply={props.getReply} />
      ) : null}
    </>
  );
};

const ReplyView = (props) => {
  const [reReply, setReReply] = useState(0);
  const [clickReply, setClickReply] = useState(false);

  const [reUpdateState, setReUpdateState] = useState(0);
  const [rereUpdateState, setReReUpdateState] = useState(0);

  console.log("reUpdateState1", reUpdateState);

  const OnClickReReplyCreate = (_props) => {
    if (reReply == _props.data.id && clickReply == true) {
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
        <div
          className="reply-body"
          onClick={() => {
            props.setReReply(props.data.id);
            props.setClickReply(!props.clickReply);
          }}
        >
          {props.data.body}
        </div>
        <div className="reply-foot">
          <div>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap margin-right"
              style={{ width: "58px" }}
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
              style={{ width: "58px" }}
              onClick={props.onClickThumbsDown}
            >
              <span>
                <img src="/thumbs-down.png" width="18px" />
              </span>
              <span>{props.data.thumbs_down_cnt}</span>
            </Button>
          </div>
          {props.data.writer_id == props.loginInfo ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <Button
                variant="warning"
                className=" text-nowrap margin-right"
                onClick={() => setReUpdateState(props.data.id)}
              >
                수정
              </Button>
              <Button
                variant="danger"
                className=" text-nowrap"
                onClick={props.handleRemove}
              >
                삭제
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const ReReplycontainer = (props) => {
    return (
      <div className="rereply-view-wrapper">
        <div className="reply-head">
          <div>{props.data.writer_nick}</div>
          <div>{dateFomat(props.data.created_at)}</div>
        </div>
        <div className="reply-body">{props.data.body}</div>
        <div className="reply-foot">
          <div>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap margin-right"
              style={{ width: "58px" }}
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
              style={{ width: "58px" }}
              onClick={props.onClickThumbsDown}
            >
              <span>
                <img src="/thumbs-down.png" width="18px" />
              </span>
              <span>{props.data.thumbs_down_cnt}</span>
            </Button>
          </div>
          {props.data.writer_id == props.loginInfo ? (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button
                variant="warning"
                className=" text-nowrap margin-right"
                onClick={() => setReReUpdateState(props.data.id)}
              >
                수정
              </Button>
              <Button
                variant="danger"
                className=" text-nowrap"
                onClick={props.handleRemove}
              >
                삭제
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      {props.post.replies.map((data) => {
        return (
          <Fragment key={data.id}>
            {reUpdateState == data.id ? (
              <ReplyUpdate
                data={data}
                setReUpdateState={setReUpdateState}
                post={props.post}
                getReply={props.getReply}
              />
            ) : (
              <Replycontainer
                data={data}
                setReReply={setReReply}
                setClickReply={setClickReply}
                clickReply={clickReply}
                // loginInfo={props.userId}
                loginInfo={props.loginInfo}
                onClickThumbsUp={() => props.onClickThumbsUp(data)}
                onClickThumbsDown={() => props.onClickThumbsDown(data)}
                handleRemove={() => props.handleRemove(data.id)}
                setReUpdateState={setReUpdateState}
              />
            )}
            {/* <Replycontainer
              data={data}
              setReReply={setReReply}
              setClickReply={setClickReply}
              clickReply={clickReply}
              // loginInfo={props.userId}
              loginInfo={props.loginInfo}
              onClickThumbsUp={() => props.onClickThumbsUp(data)}
              onClickThumbsDown={() => props.onClickThumbsDown(data)}
              handleRemove={() => props.handleRemove(data.id)}
              handleUpdate={() => props.handleUpdate(data)}
            /> */}
            {props.loginInfo ? (
              <OnClickReReplyCreate data={data} post={props.post} />
            ) : null}

            {data.replies.map((data) => {
              return (
                <div
                  key={data.id}
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
                    {rereUpdateState == data.id ? (
                      <ReReplyUpdate
                        data={data}
                        setReReUpdateState={setReReUpdateState}
                        post={props.post}
                        getReply={props.getReply}
                      />
                    ) : (
                      <ReReplycontainer
                        data={data}
                        setReReply={setReReply}
                        loginInfo={props.loginInfo}
                        onClickThumbsUp={() => props.onClickThumbsUp(data)}
                        onClickThumbsDown={() => props.onClickThumbsDown(data)}
                        handleRemove={() => props.handleRemove(data.id)}
                        setReReUpdateState={setReReUpdateState}
                      />
                    )}
                    {/* <ReReplycontainer
                      data={data}
                      setReReply={setReReply}
                      loginInfo={props.loginInfo}
                      onClickThumbsUp={() => props.onClickThumbsUp(data)}
                      onClickThumbsDown={() => props.onClickThumbsDown(data)}
                      handleRemove={() => props.handleRemove(data.id)}
                    /> */}
                  </div>
                </div>
              );
            })}
          </Fragment>
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
            setCreateReply("");
          })
      );
  };

  return (
    <div className="reply-write-wrapper">
      <textarea
        placeholder="내용을 작성하세요."
        onChange={(e) => setCreateReply(e.target.value)}
        value={createReply}
        maxLength="200"
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
        maxLength="200"
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

const ReplyUpdate = (props) => {
  const [updateReply, setUpdateReply] = useState(props.data.body);

  const handleUpdate = () => {
    request
      .put("/post/reply", {
        id: props.data.id,
        body: updateReply,
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
            props.setReUpdateState(0);
          })
      );
  };

  return (
    <div className="reply-write-wrapper">
      <textarea
        placeholder="내용을 작성하세요."
        onChange={(e) => setUpdateReply(e.target.value)}
        value={updateReply}
        maxLength="200"
      />
      <div className="reply-submit-wrapper">
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
          onClick={() => handleUpdate()}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

const ReReplyUpdate = (props) => {
  const [updateReply, setUpdateReply] = useState(props.data.body);

  const handleUpdate = () => {
    request
      .put("/post/reply", {
        id: props.data.id,
        body: updateReply,
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
            props.setReReUpdateState(false);
          })
      );
  };

  return (
    <div className="reply-write-wrapper">
      <textarea
        placeholder="내용을 작성하세요."
        onChange={(e) => setUpdateReply(e.target.value)}
        value={updateReply}
        maxLength="200"
      />
      <div className="reply-submit-wrapper">
        <Button
          variant="outline-secondary"
          className="outline-secondary text-nowrap"
          onClick={() => handleUpdate()}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default PostDetailReply;
