import Header from "../main/Header";
import Footer from "../main/Footer";
import Editor from "../../components/Editor";
import { Button } from "react-bootstrap";

const PostWriterPage = () => {
  return (
    <div className="none-layout-page">
      <Header />
      <div className="writer-wrapper">
        <div className="writer-title-wrapper">
          <input className="writer-title" placeholder="제목을 입력해 주세요." />
          <select className="writer-category" name="category">
            <option value="">카테고리 선택</option>
            <option value="hotdeal">핫딜</option>
            <option value="humor">유머게시판</option>
            <option value="counsel">고민상담</option>
            <option value="travle">여행</option>
            <option value="dessert">디저트</option>
            <option value="electronics">전자기기</option>
          </select>
        </div>
        <Editor />
        <div className="write-btn-wrapper">
          <Button
            variant="outline-secondary"
            className="outline-secondary text-nowrap post-btn"
          >
            등록
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostWriterPage;
