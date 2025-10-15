import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Auth
import AdminRoute from "./Pages/Admin/AdminRoute.jsx";
import GenreList from "./Pages/Admin/GenreList.jsx";

// Restricted
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import PrivateRoute from "./Pages/Auth/PrivateRoutes.jsx";

import Home from "./Pages/Home.jsx";
import Profile from "./Pages/User/Profile.jsx";
import CreateMovie from "./Pages/Admin/CreateMovie.jsx";
import AdminMoviesList from "./Pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "./Pages/Admin/UpdateMovie.jsx";
import AllMovies from "./Pages/Movies/AllMovies.jsx";
import MovieDetails from "./Pages/Movies/MovieDetails.jsx";
import AllComments from "./Pages/Admin/AllComments.jsx";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
