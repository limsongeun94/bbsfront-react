import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";
import { useNavigate, useLocation } from "react-router-dom";

const NoticeListTable = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [noticeList, setNoticeList] = useState([]);

  const handleNoticeShowList = () => {
    request
      .get("/notice/list/page", {
        params: {
          page: 1,
          size: 10,
        },
      })
      .then((response) => {
        setNoticeList(response.data.contents);
      });
  };

  useEffect(() => {
    handleNoticeShowList();
  }, []);

  const onClickNoticeDetail = (data_id) => {
    request
      .get("/notice", {
        params: {
          id: data_id,
        },
      })
      .then((response) => {
        navigate("/notice/detail/" + data_id);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="list-page">
      <table>
        <colgroup>
          <col style={{ width: "80px" }} />
          <col />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <td>ID</td>
            <td>제목</td>
            <td>글쓴이</td>
            <td>조회수</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((data) => {
            return (
              <tr
                className="list-main"
                key={data.id}
                onClick={() => onClickNoticeDetail(data.id)}
              >
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.writer_nick}</td>
                <td>{data.view_cnt}</td>
                <td>{dateFomat(data.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeListTable;
