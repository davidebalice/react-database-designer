import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Sql = () => {
  const { id } = useParams();
  const [tables, setTables] = useState([]);
  const [links, setLinks] = useState([]);
  const [sql, setSql] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [selectedCharset, setSelectedCharset] = useState("utf8mb4");
  const [selectedEngine, setSelectedEngine] = useState("InnoDB");

  useEffect(() => {
    let apiUrl = `${process.env.REACT_APP_API_BASE_URL}sql?database_id=${id}`;
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
  }, []);

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

      /*
CREATE TABLE `database_designer_link` (
  `id` int(11) NOT NULL,
  `database_id` int(11) NOT NULL DEFAULT 0,
  `sourceTable` varchar(255) NOT NULL,
  `sourceField` varchar(255) NOT NULL,
  `targetTable` varchar(255) NOT NULL,
  `targetField` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `api1_failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `api1_migrations`
--

CREATE TABLE `api1_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


*/

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

  return (
    <div className="page">
      <h4 className="mb-3">Generated SQL</h4>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Charset:
          <select
            value={selectedCharset}
            onChange={(e) => setSelectedCharset(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="utf8mb4">utf8mb4</option>
            <option value="utf8">utf8</option>
            <option value="latin1">latin1</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Engine:
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="InnoDB">InnoDB</option>
            <option value="MyISAM">MyISAM</option>
            <option value="MEMORY">MEMORY</option>
          </select>
        </label>
      </div>


      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          maxHeight: "400px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {sql}
      </pre>
      <button
        onClick={copyToClipboard}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 10px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        {copyButtonText}
      </button>
    </div>
  );
};

export default Sql;
