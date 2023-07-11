import { Box } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout></RootLayout>}>
      <Route index element={<Home></Home>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/favorite" element= {<Favorites></Favorites>} />
    </Route>
  )
);

function App() {
  return (
    <Box bg="black">
      <RouterProvider router={router}></RouterProvider>
    </Box>
  );}

export default App;
