import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;   // any react Element like H1, div ....
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
]

const Orders = () => {

  const [rows, setRows] = useState<DataType[]>([

    {_id: "string",
      amount: 4,
      quantity: 23,
      discount: 32,
      status: <span className="red">Status</span>,
      action: <Link to={`/orders/${"Sfd"}`}></Link>
    }
  ])

  const Table = TableHOC<DataType>(
      column, 
      rows, 
      "dashboard-prouct-box", 
      "Orders", 
      rows.length > 6, 
  )();
  

  return (
    <div className="container">
      <h1>My Orders:</h1>
      {Table}
      
    </div>
  )
}

export default Orders