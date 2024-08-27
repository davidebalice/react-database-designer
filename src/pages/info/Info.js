import github from "../../assets/img/github2.png";
import Breadcrumb from "../../components/breadcrumb/index";

const Info = () => {
  const title = "Info";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  return (
    <>
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        <div className="card">
          <div className="card-body formContainer">
            <div className="row p-4">
              <b style={{ padding: 0 }}>Database diagram designer</b>
              developed in React and Node.
              <br /> <br />
              In this demo you can create a database, with tables and fields,
              and create the relationships between fields via drag and drop.
              <br />
              You can export the generated sql code.
              <br />
              <br />
              The demo is in Demo Mode, CRUD (write, update and delete)
              operations are not allowed.
              <br />
              <br />
              <br />
              <p style={{ padding: "0" }}>
                <img src={github} style={{ width: "100px" }} alt="github" />
              </p>
              <br />
              <b style={{ padding: 0 }}>Backend</b>
              <br />
              <a
                href="https://github.com/davidebalice/node-database-designer-api"
                target="_blank"
                style={{
                  padding: 0,
                  color: "#333",
                  textDecoration: "underline",
                }}
                rel="noreferrer"
              >
                github.com/davidebalice/node-database-designer-api
              </a>
              <br /><br />
              <b style={{ padding: 0 }}>Frontend</b>
              <br />
              <a
                href="https://github.com/davidebalice/react-database-designer"
                target="_blank"
                style={{
                  padding: 0,
                  color: "#333",
                  textDecoration: "underline",
                }}
                rel="noreferrer"
              >
                davidebalice/react-database-designer
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
