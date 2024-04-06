import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { auth } from "../firebaseConfig";

function SidebarNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      console.log(firebaseUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="h-screen sticky top-0 shadow-md"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/pro"
            icon={HiViewBoards}
            label="Pro"
            labelColor="dark"
          >
            Kanban
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/inbox" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <hr />
          {user ? (
            <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight}>
              Logout
            </Sidebar.Item>
          ) : (
            <>
              <Sidebar.Item as={Link} to="/signin" icon={HiArrowSmRight}>
                LogIn
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarNav;
