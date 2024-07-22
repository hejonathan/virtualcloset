type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  borderColor: string;
};

type ButtonGroupProps = {
  buttons: ButtonProps[];
  setPage: (page: string) => void;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, setPage }) => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          style={{
            backgroundColor: button.color,
            border: `2px solid ${button.borderColor}`,
            fontSize: "5.3vw",
            padding: "1.5vw",
            flex: 1, // This will make the buttons take up equal space
            margin: "0 1%",
            boxSizing: "border-box",
          }}
          className="btn btn-lg"
          onClick={() => {
            button.onClick();
            setPage(`page${index + 1}`);
          }}
        >
          {button.children}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
