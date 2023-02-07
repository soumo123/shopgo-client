import React, { useState,useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch} from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core";
import MetaData from "../../components/layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers,deleteUser} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UsersList = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[searchData,setSearchData] = useState("")

  console.log("search",searchData)
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    isDeleted,
    message,
  } = useSelector((state) => state.profile);



  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }
dispatch(getAllUsers(searchData));
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    
  }, [dispatch, alert, isDeleted, message,searchData]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
    <MetaData title={`ALL USERS - Admin`} />
    <div className="container-fluid display-table">
      <div className="row display-table-row">
        <SideBar/>
<div className="dashboard">
 
<div className="user d-xl-block d-lg-block d-sm-block">
<input type="search" id="form2" class="form-control" placeholder='Search..' onChange= {(e)=>setSearchData(e.target.value)}/>
<button type="button" className="btn btn-primary" style={{position:'absolute',left:'88%',top:'12.5%'}}>
    <i class="fas fa-search"></i>
  </button>
</div>
  <div className="productListContainer">
    <h1 id="productListHeading" className="bg-light text-info" style={{textAlign:'center'}}>ALL USERS </h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
</div>
</div>
    
    </>
  )
}

export default UsersList