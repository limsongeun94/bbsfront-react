import { useEffect, useState } from "react";
import { request } from "src/libs/request";
import { useNavigate } from "react-router-dom";
import Page from "src/components/Page";

const IndexPage = (props) => {
  const [bestPostList, setBestPostList] = useState([]);
  const [newPostList, setNewPostList] = useState([]);
  const [bestBoardList, setBestBoardList] = useState([]);
  const [newBoardList, setNewBoardList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [boardTab, setBoardTab] = useState("best");

  const showBoard = () => {
    request
      .get("post/best/list", {
        params: {
          board_id: 0,
          size: 5,
        },
      })
      .then((response) => {
        setBestPostList(response.data);
      });

    request
      .get("post/new/list", {
        params: {
          size: 5,
        },
      })
      .then((response) => {
        setNewPostList(response.data);
      });

    request.get("board/best/list").then((response) => {
      setBestBoardList(response.data);
    });

    request.get("board/new/list").then((response) => {
      setNewBoardList(response.data);
    });

    request
      .get("notice/list", {
        params: {
          board_id: 0,
        },
      })
      .then((response) => {
        setNoticeList(response.data);
      });
  };

  useEffect(() => {
    showBoard();
  }, []);

  return (
    <Page>
      <div className="main_thumbnail">
        <div>
          <div>최신게시글</div>
          <table className="thumbnail_table">
            {newPostList.map((data) => (
              <ThumbnailPost
                key={data.id}
                board_name={data.board_name}
                title={data.title}
                replies_cnt={data.replies_cnt}
                id={data.id}
              />
            ))}
          </table>
        </div>
        <div>
          <div>인기게시글</div>
          <table className="thumbnail_table">
            {bestPostList.map((data) => (
              <ThumbnailPost
                key={data.id}
                board_name={data.board_name}
                title={data.title}
                replies_cnt={data.replies_cnt}
                id={data.id}
              />
            ))}
          </table>
        </div>
        <div>
          <div>
            <span
              onClick={() => {
                setBoardTab("best");
              }}
              style={{ cursor: "pointer" }}
            >
              인기게시판
            </span>
            <span> | </span>
            <span
              onClick={() => {
                setBoardTab("new");
              }}
              style={{ cursor: "pointer" }}
            >
              신설게시판
            </span>
            <span> | </span>
            <span>게시판찾기</span>
          </div>
          {boardTab == "best" ? (
            <table className="thumbnail_table">
              {bestBoardList.map((data) => (
                <ThumbnailBoard key={data.id} name={data.name} id={data.id} />
              ))}
            </table>
          ) : (
            <table className="thumbnail_table">
              {newBoardList.map((data) => (
                <ThumbnailBoard key={data.id} name={data.name} id={data.id} />
              ))}
            </table>
          )}
        </div>
        <div>
          <div>공지사항</div>
          <table className="thumbnail_table">
            {noticeList.map((data) => (
              <THumbnailNotice
                key={data.id}
                title={data.title}
                create_at={data.created_at}
                id={data.id}
              />
            ))}
          </table>
        </div>
      </div>
    </Page>
  );
};

const ThumbnailPost = (props) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate("post/detail/" + props.id);
      }}
    >
      <td>{props.board_name}</td>
      <td>{props.title}</td>
      <td>{props.replies_cnt}</td>
    </tr>
  );
};

const ThumbnailBoard = (props) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate("post/list/" + props.id);
      }}
    >
      <td>{props.name}</td>
    </tr>
  );
};

const THumbnailNotice = (props) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate("notice/detail/" + props.id);
      }}
    >
      <td>{props.title}</td>
      <td>{props.create_at}</td>
    </tr>
  );
};

export default IndexPage;
