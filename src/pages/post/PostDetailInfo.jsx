import dateFomat from "../../libs/datetime";

const PostDetailInfo = (props) => {
  return (
    <div>
      <h2 className="post-detail-title">{props.post.title}</h2>
      <div className="post-detail-head">
        <div>
          <img
            src={props.post.writer.thumbnail}
            width="150"
            height="150"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </div>
        <div>
          <div>
            <span>{props.post.writer.nick}</span>
            <span>({props.post.writer.id})</span>
          </div>
          <div>{props.post.writer.introduction}</div>
        </div>
        <div>
          <div>
            <span>댓글&nbsp;</span>
            <span>{props.post.replies_cnt}</span>
          </div>
          <div>
            <span>조회수&nbsp;</span>
            <span>{props.post.view_cnt}</span>
          </div>
          <div>
            <span>작성&nbsp;</span>
            <span>{dateFomat(props.post.created_at)}</span>
          </div>
          <div>
            <span>수정&nbsp;</span>
            <span>{dateFomat(props.post.updated_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetailInfo;
