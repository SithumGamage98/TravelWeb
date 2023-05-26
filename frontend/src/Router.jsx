import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './Components/userManagement/authentication/UserContext';
import Navbar from './Components/layout/Navbar';
import Register from './Components/userManagement/authentication/Register';
import Verify from './Components/userManagement/authentication/Verify';
import AddBlog from './Components/BlogsManagement/AddBlog';
import ViewAllBlogs from './Components/BlogsManagement/ViewAllBlogs';
import UpdateBlog from './Components/BlogsManagement/UpdateBlog';
import ViewBlog from './Components/BlogsManagement/ViewBlog';
import ClientViewAllBlogs from './Components/BlogsManagement/ClientViewAllBlogs';
import AddHotel from './Components/HotelManagement/AddHotel';
import ViewAllHotels from './Components/HotelManagement/ViewAllHotels';
import UpdateHotel from './Components/HotelManagement/UpdateHotel';
import ViewHotel from './Components/HotelManagement/ViewHotel';
import ClientViewAllHotels from './Components/HotelManagement/ClientViewAllHotels';
import AddPackage from './Components/PackageManagement/AddPackage';
import ViewAllPackages from './Components/PackageManagement/ViewAllPackages';
import UpdatePackage from './Components/PackageManagement/UpdatePackage';
import ViewPackage from './Components/PackageManagement/ViewPackage';
import AddEvent from './Components/EventsManagement/AddEvent';
import ClientViewAllEvents from './Components/EventsManagement/ClientViewAllEvents';
import ViewAllEvents from './Components/EventsManagement/ViewAllEvents';
import UpdateEvent from './Components/EventsManagement/UpdateEvent';
import ViewEvent from './Components/EventsManagement/ViewEvent';
import ClientViewAllPackages from './Components/PackageManagement/ClientViewAllPackages';
import PaymentGateway from './Components/HotelManagement/PaymentGateway';
import Inquiry from './Components/PackageManagement/Inquiry';
import ManagerDashboard from './Components/layout/ManagerDashboard';
import BloggerDashboard from './Components/layout/BloggerDashboard';
//import Footer from './Components/layout/Footer';
import Login from './Components/userManagement/authentication/Login';
import Footer_02 from './Components/layout/Footer2';

function Router() {
  const { userType } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        {userType === 'Blogger' || userType === 'Manager' ? <Navbar /> : null}
        <div className="App">
          <Routes>
            <Route path="/verify/:id/:token" element={<Verify />} />
            {userType === null && (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}

            {userType === 'Blogger' && (
              <>
                <Route path="/blogs" element={<ViewAllBlogs />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/viewblog/:id" element={<ViewBlog />} />
                <Route path="/updatead/:id" element={<UpdateBlog />} />
                <Route path="/clientblogs" element={<ClientViewAllBlogs />} />
                <Route path="/hotels" element={<ViewAllHotels />} />
                <Route path="/viewhotel/:id" element={<ViewHotel />} />
                <Route path="/clienthotels" element={<ClientViewAllHotels />} />
                <Route path="/packages" element={<ViewAllPackages />} />
                <Route path="/viewpackage/:id" element={<ViewPackage />} />
                <Route
                  path="/clientpackages"
                  element={<ClientViewAllPackages />}
                />
                <Route path="/events" element={<ViewAllEvents />} />
                <Route path="/viewevent/:id" element={<ViewEvent />} />
                <Route path="/clientevents" element={<ClientViewAllEvents />} />
                <Route path="/paymentgateway" element={<PaymentGateway />} />
                <Route path="/inquiry" element={<Inquiry />} />
                {/* <Route path="/" element={<ManagerDashboard />} /> */}
                <Route path="/dashboard" element={<BloggerDashboard />} />
              </>
            )}
            {userType === 'Manager' && (
              <>
                <Route path="/dashboard" element={<ManagerDashboard />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/blogs" element={<ViewAllBlogs />} />
                <Route path="/updatead/:id" element={<UpdateBlog />} />
                <Route path="/viewblog/:id" element={<ViewBlog />} />
                <Route path="/clientblogs" element={<ClientViewAllBlogs />} />
                <Route path="/addhotel" element={<AddHotel />} />
                <Route path="/hotels" element={<ViewAllHotels />} />
                <Route path="/updatehotel/:id" element={<UpdateHotel />} />
                <Route path="/viewhotel/:id" element={<ViewHotel />} />
                <Route path="/clienthotels" element={<ClientViewAllHotels />} />
                <Route path="/addpackage" element={<AddPackage />} />
                <Route path="/packages" element={<ViewAllPackages />} />
                <Route path="/updatepackage/:id" element={<UpdatePackage />} />
                <Route path="/viewpackage/:id" element={<ViewPackage />} />
                <Route
                  path="/clientpackages"
                  element={<ClientViewAllPackages />}
                />
                <Route path="/addevent" element={<AddEvent />} />
                <Route path="/events" element={<ViewAllEvents />} />
                <Route path="/updateevent/:id" element={<UpdateEvent />} />
                <Route path="/viewevent/:id" element={<ViewEvent />} />
                <Route path="/clientevents" element={<ClientViewAllEvents />} />
                <Route path="/paymentgateway" element={<PaymentGateway />} />
                <Route path="/inquiry" element={<Inquiry />} />
              </>
            )}
          </Routes>
        </div>
        {userType === 'Blogger' || userType === 'Manager' ? (
          <Footer_02 />
        ) : null}
      </BrowserRouter>
    </div>
  );
}

export default Router;
