import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={() => (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

{
  /* <Route
  path="/admin"
  render={() => (
    <WithAdminAuth>
      <AdminLayout>
        <Admin />
      </AdminLayout>
    </WithAdminAuth>
  )}
/>; */
}
