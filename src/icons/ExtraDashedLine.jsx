export const ExtraDashedLine = () => {
  return (
    <svg
      height="20"
      width="15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        style={{ strokeWidth: "5px" }}
        strokeDasharray="1, 5"
        x1="0"
        x2="350"
        y1="10"
        y2="10"
      />
    </svg>
  );
};
