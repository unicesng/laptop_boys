import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; 
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { auth } from "../firebaseConfig";

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(firebaseUser)
      setUser(firebaseUser);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Laptop bois</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
        {user ? ( 
          <NavbarLink onClick={handleSignOut}>Sign Out</NavbarLink>
        ) : (
          <>
            <NavbarLink as={Link} to="/signin">Sign In</NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default Nav;
