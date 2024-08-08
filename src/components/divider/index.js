const Divider = ({ marginTop, marginBottom, borderSize, borderType, borderColor}) => {
  return (
    <>
      <div
        className="divider"
        style={{
          marginTop: marginTop + "px",
          marginBottom: marginBottom + "px",
          borderTop: borderSize + "px " + borderType,
          borderType: borderType,
          borderColor: borderColor
        }}
      >
        {" "}
      </div>
    </>
  );
};

export default Divider;
