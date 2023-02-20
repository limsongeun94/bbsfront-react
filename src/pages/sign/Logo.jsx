import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      <img
        src="/logo (1).svg"
        width="38"
        height="38"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <h2>게시판</h2>
    </div>
  );
};

export default Logo;
