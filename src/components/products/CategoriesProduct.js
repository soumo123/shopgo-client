import React from 'react'
import Sidebar from '../admin/Sidebar';
import FilterSidebar from './FilterSidebar';

const CategoriesProduct = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");
    const title = queryParams.get("title");


  return (
    <>
     <div className="container-fluid display-table">
       <div className="row display-table-row mt-5">
       <FilterSidebar />
       <div className="col-md-10 col-sm-11 display-table-cell v-align">

       </div>
       </div>
       </div>
    
    
    </>
  )
}

export default CategoriesProduct