import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { request } from "src/libs/request";

const PostDetailReply = (props) => {
  useEffect(() => {
    request
      .get("pose/reply", {
        params: {
          post_id: props.id,
        },
      })
      .then((response) => console.log("리플", response.data));
  }, []);

  return (
    <>
      <div className="ripple-view-wrapper">
        <div className="ripple-head">
          <div>닉네임</div>
          <div>날짜</div>
        </div>
        <div className="ripple-body">댓글본문</div>
        <div class="ripple-foot">
          <div>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap margin-right"
            >
              <span>
                <img src="/thumbs-up.png" width="18px" />
              </span>
              <span>{999}</span>
            </Button>
            <Button
              variant="outline-secondary"
              className="outline-secondary text-nowrap"
            >
              <span>
                <img src="/thumbs-down.png" width="18px" />
              </span>
              <span>{999}</span>
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
      <div className="ripple-write-wrapper">
        <textarea placeholder="내용을 작성하세요." />
        <div className="ripple-submit-wrapper">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap"
          >
            등록
          </Button>
        </div>
      </div>
    </>
  );
};
export default PostDetailReply;
