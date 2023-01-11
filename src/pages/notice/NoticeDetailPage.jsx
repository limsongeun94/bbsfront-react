import Page from "src/components/Page";
import NoticeListTable from "./NoticeListTable";
import { request } from "src/libs/request";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dateFomat from "../../libs/datetime";

const NoticeDetailPage = () => {
  const { id } = useParams();

  const [notice, setNotice] = useState({
    title: "",
    writer_nick: "",
    writer_id: "",
    created_at: "",
    updated_at: "",
    view_cnt: 0,
    body: "",
  });

  const showNoticeDetailPage = () => {
    request
      .get("/notice", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setNotice(response.data);
      });
  };

  useEffect(() => {
    showNoticeDetailPage();
  }, [id]);

  return (
    <Page>
      <h2 className="board-name">공지</h2>
      <div className="post-detail-wrapper">
        <div>
          <h2 className="post-detail-title">{notice.title}</h2>
          <div>
            <div>
              <span>{notice.writer_nick}</span>
              <span>({notice.writer_id})</span>
              <span> | </span>
              <span>작성 </span>
              <span>{dateFomat(notice.created_at)}</span>
              <span> | </span>
              <span>수정 </span>
              <span>{dateFomat(notice.updated_at)}</span>
              <span> | </span>
              <span>조회 </span>
              <span>{notice.view_cnt}</span>
            </div>
          </div>
        </div>
        <hr className="post-detail-line" />
        <div className="main-text-wrapper">
          <div className="main-text">{notice.body}</div>
        </div>
      </div>
      <NoticeListTable />
    </Page>
  );
};

export default NoticeDetailPage;
