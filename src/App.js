import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/theme.css";
import "./styles/layout.css";
import Login from "./pages/employees/Login";
import Register from "./pages/employees/Register";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import "./styles/theme.css";
import "./styles/layout.css";
import { useSelector } from "react-redux";
import EmployeeHome from "./pages/employees/EmployeeHome";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/employees/Students";
import Results from "./pages/employees/Results";
import AllEmployeeList from "./pages/employees/AllEmployeeList";
import AddStudent from "./pages/employees/AddStudent";
import EditStudent from "./pages/employees/EditStudent";
import EditEmployee from "./pages/employees/EditEmployee";
import PublicRoute from "./components/PublicRoute";
import AddResult from "./pages/employees/AddResult";
import EditResult from "./pages/employees/EditResult";
import ResultCheck from "./pages/ResultCheck";
function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div>
      {loading && <Spinner />}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result/:resultId" element={<ResultCheck />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* -----------EMPLOYEE ROUTES---------------- */}

          {/* EMPLOYEE HOME PAGE */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeHome />
              </ProtectedRoute>
            }
          />

          {/* ALL STUDENTS */}
          <Route
            path="/employee/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          {/* ADD STUDENT */}
          <Route
            path="/employee/students/add"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/students/edit/:rollNo"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />

          {/* edit employee */}
          <Route
            path="/employee/edit/:employeeId"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />

          {/* STUDENT RESULT */}
          <Route
            path="/employee/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />

          {/* ALL EMPLOYEES LIST */}
          <Route
            path="/employee/all-employees"
            element={
              <ProtectedRoute>
                <AllEmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/results/add"
            element={
              <ProtectedRoute>
                <AddResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/results/edit/:resultId"
            element={
              <ProtectedRoute>
                <EditResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
