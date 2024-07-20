interface Props {
  children1: string;
  children2: string;
  color1: string;
  color2: string;
  borderColor1: string;
  borderColor2: string;
  onClick1: () => void;
  onClick2: () => void;
  setPage: (page: string) => void;
}
const Button: React.FC<Props> = ({
  children1,
  onClick1,
  color1,
  borderColor1,
  children2,
  onClick2,
  color2,
  borderColor2,
  setPage,
}) => {
  return (
    <div className="d-flex justify-content-between position-fixed bottom-0 start-0 end-0 p-3">
      <button
        style={{
          backgroundColor: color1,
          border: `2px solid ${borderColor1}`,
          margin: "0 10px",
        }}
        className="btn btn-lg w-50"
        onClick={() => {
          onClick1();
          setPage("myCloset");
        }}
      >
        {children1}
      </button>
      <button
        style={{
          backgroundColor: color2,
          border: `2px solid ${borderColor2}`,
          margin: "0 10px",
        }}
        className="btn btn-lg w-50"
        onClick={() => {
          onClick2();
          setPage("planOutfit");
        }}
      >
        {children2}
      </button>
    </div>
  );
};

export default Button;
