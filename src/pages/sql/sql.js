import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const Sql = () => {
  let { id } = useParams();
  if (!id) {
    id = 0;
  }
  const [tables, setTables] = useState([]);
  const [links, setLinks] = useState([]);
  const [sql, setSql] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Sql");
  const [selectedCharset, setSelectedCharset] = useState("utf8mb4");
  const [selectedEngine, setSelectedEngine] = useState("InnoDB");
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(id);

  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "databases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDatabases(response.data.databases);
        if (id === 0 && response.data.databases.length > 0) {
          console.log(response.data.databases[0].id);
          setSelectedDatabase(response.data.databases[0].id);
        }
      } catch (error) {
        console.error("Error loading databases:", error);
      }
    };

    fetchDatabases();
  }, []);

  useEffect(() => {
    let apiUrl = `${process.env.REACT_APP_API_BASE_URL}sql?database_id=${selectedDatabase}`;
    const token = localStorage.getItem("authToken");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setTables(response.data.tables);
        setLinks(response.data.links);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [selectedDatabase]);

  useEffect(() => {
    const generateSQL = () => {
      let sqlStr = "";

      tables.forEach((table) => {
        const tableFields = table.fields.filter(
          (field) => field.table_id === table.id
        );
        sqlStr += `CREATE TABLE \`${table.name}\` (\n`;
        sqlStr += tableFields
          .map((field) => {
            let fieldSql = `  \`${field.name}\` ${field.field_type}`;
            if (field.lenght && field.field_type !== "text") {
              fieldSql += `(${field.lenght})`;
            }
            if (field.ai) fieldSql += " AUTO_INCREMENT";
            if (field.primary_field) fieldSql += " PRIMARY KEY";
            return fieldSql;
          })
          .join(",\n");
        sqlStr += `\n) ENGINE=${selectedEngine} DEFAULT CHARSET=${selectedCharset};\n\n`;
      });

      links.forEach((link) => {
        console.log(link.sourceTable);
        console.log(link.targetTable);
        console.log(tables);
        const fromTable = tables.find(
          (table) => table.name === link.sourceTable
        );
        const toTable = tables.find((table) => table.name === link.targetTable);

        console.log("fromTable");
        console.log(fromTable);
        if (fromTable && toTable) {
          sqlStr += `ALTER TABLE \`${fromTable.name}\` \n`;
          sqlStr += `  ADD CONSTRAINT fk_${fromTable.name}_${toTable.name}\n`;
          sqlStr += `  FOREIGN KEY (${link.sourceField}) REFERENCES ${toTable.name}(${link.targetField});\n\n`;
        }
      });

      setSql(sqlStr);
    };

    if (tables.length) {
      generateSQL();
    }
  }, [tables, links]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sql).then(
      () => {
        setCopyButtonText("Copied!");
        setTimeout(() => setCopyButtonText("Copy"), 4000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const handleDatabaseChange = (e) => {
    const newDatabaseId = e.target.value;
    setSelectedDatabase(newDatabaseId);
    navigate(`/sql/${newDatabaseId}`);
  };

  return (
    <div className="page">
      <div style={{ marginBottom: "1rem" }}>
        <div className="buttonContainer">
          <div className="selectContainer">
            <span>Charset</span>
            <select
              value={selectedCharset}
              onChange={(e) => setSelectedCharset(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="utf8mb4">utf8mb4</option>
              <option value="utf8">utf8</option>
              <option value="latin1">latin1</option>
            </select>
          </div>

          <div className="selectContainer">
            <span>Engine</span>
            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="InnoDB">InnoDB</option>
              <option value="MyISAM">MyISAM</option>
              <option value="MEMORY">MEMORY</option>
            </select>
          </div>

          <div className="selectContainer">
            <span>Database</span>
            <select value={selectedDatabase} onChange={handleDatabaseChange}>
              {databases.map((db) => (
                <option key={db.id} value={db.id}>
                  {db.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={copyToClipboard} className="designerButton">
            <IoCopyOutline />
            {copyButtonText}
          </button>
        </div>

        <pre className="sqlContainer">{sql}</pre>
      </div>
    </div>
  );
};

export default Sql;
