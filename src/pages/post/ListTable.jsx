import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { request } from "src/libs/request";
import dateFomat from "src/libs/datetime";

const ListTable = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [postList, setPostList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  const handleShowList = () => {
    request
      .get("post/list/page", {
        params: {
          board_id: props.params,
        },
      })
      .then((response) => {
        const content = response.data.contents;
        setPostList([...content]);
      });
  };

  useEffect(() => {
    handleShowList();
  }, [props.params]);

  const onClickDetail = (data_id) => {
    request
      .get("post", {
        params: {
          id: data_id,
        },
      })
      .then((response) => {
        navigate("/post/detail/" + data_id);
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
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <td>ID</td>
            <td>제목</td>
            <td>글쓴이</td>
            <td>추천/비추천</td>
            <td>조회수</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody>
          {postList.map((data) => {
            return (
              <tr
                className="list-main"
                key={data.id}
                onClick={() => onClickDetail(data.id)}
              >
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.writer_nick}</td>
                <td>
                  <span>
                    <img src="/thumbs-up.png" width="18px" />
                  </span>
                  <span>{data.thumbs_up_cnt}</span>
                  <span>&nbsp;/&nbsp;</span>
                  <span>
                    <img src="/thumbs-down.png" width="18px" />
                  </span>
                  <span>{data.thumbs_down_cnt}</span>
                </td>
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

export default ListTable;
