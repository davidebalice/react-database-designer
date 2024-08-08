const notPermission = () => {
  return (
    <>
      <div className="container fluid">
        <div
          className="row justify-content-center align-items-center jumbotron w-100"
          style={{ height: "65vh" }}
        >
          <p className="notAuth">
            You do not have permission to view this page
            <br />
          </p>
        </div>
      </div>
    </>
  );
};
export default notPermission;
