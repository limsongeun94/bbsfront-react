import { useEffect, useState } from "react";
import Page from "src/components/Page";
import { request } from "src/libs/request";

const IndexPage = (props) => {
  const [bestPostList, setBestPostList] = useState([]);
  const [newPostList, setNewPostList] = useState([]);
  const [bestBoardList, setBestBoardList] = useState([]);
  const [newBoardList, setNewBoardList] = useState([]);
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

    request.get("/board/best/list").then((response) => {
      setBestBoardList(response.data);
      console.log("인기", response.data);
    });

    request.get("/board/new/list").then((response) => {
      setNewBoardList(response.data);
      console.log("신규", newBoardList);
    });
  };

  useEffect(() => {
    showBoard();
  }, []);

  return (
    <Page>
      <div>
        <div>최신게시글</div>
        <table className="thumbnail_table">
          {newPostList.map((data) => (
            <ThumbnailPost
              key={data.id}
              board_name={data.board_name}
              title={data.title}
              replies_cnt={data.replies_cnt}
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
            <tbody>
              {bestBoardList.map((data) => (
                <ThumbnailBoard key={data.id} name={data.name} />
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <tbody>
              {newBoardList.map((data) => {
                <ThumbnailBoard key={data.id} name={data.name} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </Page>
    // </div>
  );
};

const ThumbnailPost = (props) => {
  return (
    <tr>
      <td>{props.board_name}</td>
      <td>{props.title}</td>
      <td>{props.replies_cnt}</td>
    </tr>
  );
};

const ThumbnailBoard = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
    </tr>
  );
};

export default IndexPage;
