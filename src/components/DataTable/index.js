import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const DataTable_Component = ({ apidata, columns, search }) => {
  const [data, setData] = useState([]);
  const [datafilter, setFilter] = useState("");
  const [datafinals, setFinals] = useState([]);

  useEffect(() => {
    let result = data.filter((val) => {
      if (search === "name") {
        return val.name?.toLowerCase().match(datafilter?.toLowerCase());
      } else if (search === "title") {
        return val.title?.toLowerCase().match(datafilter?.toLowerCase());
      } else if (search === "transaction_id") {
        return val.transaction_id?.toString().match(datafilter?.toString());
      } else if (search === "account_name") {
        return val.account_name?.toLowerCase().match(datafilter?.toLowerCase());
      } else if (search === "log") {
        return val.log?.toLowerCase().match(datafilter?.toLowerCase());
      } else if (search === "api_key") {
        return val.api_key?.toLowerCase().match(datafilter?.toLowerCase());
      } else if (search === "transaction") {
        return val.transaction?.toLowerCase().match(datafilter?.toLowerCase());
      }
    });

    setFinals(result);
  }, [datafilter]);

  useEffect(() => {
    setFinals(apidata);
    setData(apidata);
  }, [apidata]);

  return (
    <>
      <div className="table-responsive ">
        <DataTable
          columns={columns}
          data={datafinals}
          pagination
          fixedHeader
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={
            <div className="row justify-content-start">
              <div className="col-12">
                <input
                  type="text"
                  placeholder={`search with ${search}`}
                  className="form-control "
                  value={datafilter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default DataTable_Component;
