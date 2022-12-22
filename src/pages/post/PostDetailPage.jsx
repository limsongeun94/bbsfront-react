import Header from "../main/Header";
import Page from "src/components/Page";
import BoardName from "./BoardName";

const PostDetailPage = () => {
  return (
    <Page>
      <Header />
      <BoardName />
      <div>
        <div className="post-detail-title">게시글 제목</div>
        <div className="post-detail-head">
          <div>
            <img
              src="/images.jpg"
              width="150"
              height="150"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </div>
          <div>
            <div>작성자닉네임 (작성자아이디)</div>
            <div>작성자 자기소개글</div>
          </div>
          <div>
            <div>
              <span>댓글&nbsp;</span>
              <span>111</span>
            </div>
            <div>
              <span>조회수&nbsp;</span>
              <span>111</span>
            </div>
            <div>
              <span>작성&nbsp;</span>
              <span>12.22</span>
            </div>
            <div>
              <span>수정&nbsp;</span>
              <span>15:37</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default PostDetailPage;
