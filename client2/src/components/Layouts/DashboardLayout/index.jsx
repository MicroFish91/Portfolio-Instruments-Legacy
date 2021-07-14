// import Footer from "../Footer";
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";

const DashboardLayout = (props) => {
  return (
    <div>
      <div class="app sidebar-mini rtl">
        <div class="page">
          <div class="page-main">
            {/* <Navbar />
            <Sidebar /> */}

            {props.children}
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
