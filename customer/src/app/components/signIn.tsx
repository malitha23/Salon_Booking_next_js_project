"use client";
import EyeClose from "../../../public/assets/eyeClose.svg";
import EyeOpen from "../../../public/assets/eyeOpen.svg";
import * as StyleX from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async () => {
    let hasError = false;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_]).{8,}$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (!email) {
      setEmailError("Please Enter an email.");
      setShowEmailError(true);
      hasError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError("*Invalid Email. Example: abc@gmail.com");
      setShowEmailError(true);
      hasError = true;
    } else {
      setShowEmailError(false);
    }

    if (!password) {
      setPasswordError("Please Enter a password.");
      setShowPasswordError(true);
      hasError = true;
    } else if (!passwordPattern.test(password)) {
      setPasswordError("*Invalid password. Example: Abcd123#");
      setShowPasswordError(true);
      hasError = true;
    } else {
      setShowPasswordError(false);
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', data.data.token);
          console.log('User logged in:', data);

          // Success alert with SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have been logged in successfully.',
          });

          window.location.href = '/dashboard';
        } else {
          // Error alert with SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error Logging In',
            text: data.message || 'An error occurred while logging in.',
          });
        }
      } catch (error) {
        console.error('Error logging in:', error);

        // Unexpected error alert with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Unexpected Error',
          text: 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    }
  };

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBlur = () => {
    if (!email) {
      setEmailError("Please enter an email.");
      setShowEmailError(true);
    }
    if (!password) {
      setPasswordError("Please enter a password.");
      setShowPasswordError(true);
    }
  };

  return (
    <>
      <div {...StyleX.props(styles.container)}>
        <div {...StyleX.props(styles.formContainer)}>
          <div {...StyleX.props(styles.heading)}>
            <h1>Sign in</h1>
          </div>
          <div {...StyleX.props(styles.textInputContainer)}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              {...StyleX.props(styles.textInput)}
              onFocus={() => setShowEmailError(false)}
            />
          </div>
          {showEmailError && (
            <div {...StyleX.props(styles.errorText)}>{emailError}</div>
          )}

          <div {...StyleX.props(styles.textInputContainer)}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              {...StyleX.props(styles.textInput)}
              onFocus={() => setShowPasswordError(false)}
            />
            <div {...StyleX.props(styles.eyeIcon)} onClick={passwordVisibility}>
              {passwordVisible ? (
                <Image src={EyeOpen} alt="Eye" width={20} height={20} />
              ) : (
                <Image src={EyeClose} alt="EyeClose" width={20} height={20} />
              )}
            </div>
          </div>
          {showPasswordError && (
            <div {...StyleX.props(styles.errorText)}>{passwordError}</div>
          )}

          <div {...StyleX.props(styles.forget)}>Forgot Password ?</div>
          <div {...StyleX.props(styles.signinButtonContainer)}>
            <button
              {...StyleX.props(styles.signinButton)}
              onClick={handleSignin}
            >
              {isLoading ? 'Wait...' : 'Sign In'}
            </button>

          </div>
          <p {...StyleX.props(styles.accountText)}>
            Don't have an account?{" "}
            <Link href="/signUp" {...StyleX.props(styles.signuplink)}>
              Sign Up
            </Link>
          </p>
          <div>
            <h2>Or</h2>
          </div>
          <p {...StyleX.props(styles.accountText)}>
            For Bussiness{" "}
            <Link href="" {...StyleX.props(styles.signuplink)}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

const styles = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: {
      default: "60%",
      "@media (max-width: 768px)": "80%",
    },
    height: "80vh",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: {
      default: "2em",
      "@media (max-width: 480px)": "10px",
    },
    width: {
      default: "60%",
      "@media (max-width: 768px)": "100%",
    },
    height: "90%",
    boxShadow: "0 0 10px 0 #00000025",
    opacity: "0.9",
  },
  heading: {
    marginBottom: "20px",
  },
  forget: {
    alignSelf: "flex-end",
    marginBottom: "20px",
    marginTop: "10px",
    cursor: "pointer",
  },
  textInputContainer: {
    width: "100%",
    marginBottom: "1em",
    position: "relative",
  },
  textInput: {
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.8em",
    fontSize: "1em",
    border: "none",
    borderBottom: "1px solid black",
    ":focus": {
      outline: "none",
      border: "none",
    },
  },
  errorText: {
    alignSelf: "flex-start",
    paddingLeft: "12px",
    color: "red",
    fontSize: "0.9em",
    marginBottom: "1em",
  },
  signinButtonContainer: {
    width: "100%",
  },
  signinButton: {
    width: "100%",
    padding: "0.8em",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1a1a1a",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  signuplink: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  accountText: {
    fontSize: "14px",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "20px",
    cursor: "pointer",
  },
  loaderDiv: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgb(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    width: "100%",
    height: "100%",
    zIndex: 90,
  },
  loader: {
    width: "25%",
  },
});

export default SignIn;
