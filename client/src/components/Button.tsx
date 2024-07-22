interface Props {
  children1: string;
  children2: string;
  children3: string;
  color1: string;
  color2: string;
  color3: string;
  borderColor1: string;
  borderColor2: string;
  borderColor3: string;
  onClick1: () => void;
  onClick2: () => void;
  onClick3: () => void;
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
  children3,
  onClick3,
  color3,
  borderColor3,
  setPage,
}) => {
  return (
    <div className="bottom-fixed-container">
      <button
        style={{
          backgroundColor: color1,
          border: `2px solid ${borderColor1}`,
        }}
        className="btn btn-lg button-style"
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
        }}
        className="btn btn-lg button-style"
        onClick={() => {
          onClick2();
          setPage("planOutfit");
        }}
      >
        {children2}
      </button>
      <button
        style={{
          backgroundColor: color3,
          border: `2px solid ${borderColor3}`,
        }}
        className="btn btn-lg button-style"
        onClick={() => {
          onClick3();
          setPage("camera");
        }}
      >
        {children3}
      </button>
    </div>
  );
};

export default Button;
