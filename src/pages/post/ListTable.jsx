const ListTable = () => {
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
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
export default ListTable;
