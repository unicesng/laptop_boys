import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signInWithPopup } from "firebase/auth";

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignIn = async (email, password) => {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignUp = async (email, password) => {
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const isSignIn = event.submitter.textContent === "Sign in with Email";
    if (isSignIn) {
      handleEmailSignIn(email, password);
    } else {
      handleEmailSignUp(email, password);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        <p className="text-xl text-center mb-4 font-semibold">Sign In to ESG Application</p>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              name="email"
              type="email"
              placeholder="username@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" className="mb-4">
            Sign in with Email
          </Button>
          <div>
            <p className="text-center text-sm mb-2">OR</p>
            <hr />
          </div>
          <Button onClick={handleGoogleSignIn} className="mb-4">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
