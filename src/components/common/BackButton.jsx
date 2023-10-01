import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <IoIosArrowBack
        size="1.5rem"
        color="#e8aaa3"
        onClick={() => navigate(-1)}
        style={{ marginLeft: "2rem", marginTop: "2rem" }}
      />
    </div>
  );
};

export default BackButton;
