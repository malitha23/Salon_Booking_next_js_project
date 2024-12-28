"use client";
import EyeClose from "../../../public/assets/eyeClose.svg";
import EyeOpen from "../../../public/assets/eyeOpen.svg";
import * as StyleX from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [bussinessName, setBussinessName] = useState("");
  const [bussinessNameError, setBussinessNameError] = useState("");
  const [showBussinessNameError, setShowBussinessNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    let hasError = false;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_]).{8,}$/;
    const emailPattern = /\S+@\S+\.\S+/;
    const phonePattern = /^94\d{9}$/; // Update pattern based on your requirement

    // Validation
    if (name.length > 4) {
      setShowNameError(false);
    } else {
      hasError = true;
      setShowNameError(true);
      setNameError("Please enter your name");
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      setShowConfirmPasswordError(true);
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setShowConfirmPasswordError(true);
      hasError = true;
    } else {
      setShowConfirmPasswordError(false);
    }

    if (!phone) {
      setPhoneError("Please Enter Phone Number.");
      setShowPhoneError(true);
      hasError = true;
    } else if (!phonePattern.test(phone)) {
      setPhoneError("*Invalid phone number ex. 94XXXXXXXXX");
      setShowPhoneError(true);
      hasError = true;
    } else {
      setShowPhoneError(false);
    }

    if (!bussinessName) {
      setBussinessNameError("Please Enter a Business Name");
      setShowBussinessNameError(true);
      hasError = true;
    } else {
      setShowBussinessNameError(false);
    }

    if (hasError) return;

    // If no errors, proceed with signup API call
    try {
      setIsLoading(true); // Show loading indicator

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          bussinessName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have been registered successfully.',
        });
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('adminName', data.data.name);
        localStorage.setItem('adminEmail', data.data.email);
        // Optionally navigate to a login page
        router.push('/dashboard'); // Use `router.push` for Next.js
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'Please check your details and try again.',
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);

      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const handleBlur = () => {
    if (!name) {
      setNameError("Please enter a name.");
      setShowNameError(true);
    }
    if (!email) {
      setEmailError("Please enter an email.");
      setShowEmailError(true);
    }
    if (!password) {
      setPasswordError("Please enter a password.");
      setShowPasswordError(true);
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter a password.");
      setShowConfirmPasswordError(true);
    }
    if (!phone) {
      setPhoneError("Please enter a phone number.");
      setShowPhoneError(true);
    }
    if (!bussinessName) {
      setBussinessNameError("Please enter a Bussiness Name.");
      setShowBussinessNameError(true);
    }
  };

  const handlePhoneChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (value.length <= 12) {
      setPhone(value);
    }
    if (/^\d*$/.test(value)) {
    }
  };

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const confirmpasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmpasswordVisible);
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      <div {...StyleX.props(styles.container)}>
        <div {...StyleX.props(styles.formContainer)}>
          <div {...StyleX.props(styles.heading)}>
            <h1>Sign Up</h1>
          </div>
          <div
            style={{
              width: "100%",
              height: "65%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div {...StyleX.props(styles.textInputContainer)}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                {...StyleX.props(styles.textInput)}
                onFocus={() => setShowNameError(false)}
              />
              {showNameError && (
                <div {...StyleX.props(styles.errorText)}>{nameError}</div>
              )}
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
              {showEmailError && (
                <div {...StyleX.props(styles.errorText)}>{emailError}</div>
              )}
            </div>
            <div {...StyleX.props(styles.textInputContainer)}>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                {...StyleX.props(styles.textInput)}
                onFocus={() => setShowPhoneError(false)}
              />
              {showPhoneError && (
                <div {...StyleX.props(styles.errorText)}>{phoneError}</div>
              )}
            </div>
            <div {...StyleX.props(styles.textInputContainer)}>
              <input
                type="text"
                placeholder="Bussiness Name"
                value={bussinessName}
                onChange={(e) => setBussinessName(e.target.value)}
                onBlur={handleBlur}
                {...StyleX.props(styles.textInput)}
                onFocus={() => setShowBussinessNameError(false)}
              />
              {showBussinessNameError && (
                <div {...StyleX.props(styles.errorText)}>
                  {bussinessNameError}
                </div>
              )}
            </div>
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
              <div
                {...StyleX.props(styles.eyeIcon)}
                onClick={passwordVisibility}
              >
                {passwordVisible ? (
                  <Image src={EyeOpen} alt="EyeOpen" width={20} height={20} />
                ) : (
                  <Image src={EyeClose} alt="EyeClose" width={20} height={20} />
                )}
              </div>
              {showPasswordError && (
                <div {...StyleX.props(styles.errorText)}>{passwordError}</div>
              )}
            </div>
            <div {...StyleX.props(styles.textInputContainer)}>
              <input
                type={confirmpasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleBlur}
                {...StyleX.props(styles.textInput)}
                onFocus={() => setShowConfirmPasswordError(false)}
              />
              <div
                {...StyleX.props(styles.eyeIcon)}
                onClick={confirmpasswordVisibility}
              >
                {confirmpasswordVisible ? (
                  <Image src={EyeOpen} alt="EyeOpen" width={20} height={20} />
                ) : (
                  <Image src={EyeClose} alt="EyeClose" width={20} height={20} />
                )}
              </div>
              {showConfirmPasswordError && (
                <div {...StyleX.props(styles.errorText)}>
                  {confirmpasswordError}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "25%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "60px"
            }}
          >
            <div {...StyleX.props(styles.signupButtonContainer)}>
              <button
                {...StyleX.props(styles.signupButton)}
                onClick={handleSignUp}
              >
                  {isLoading ? 'Wait...' : 'Sign Up'}
              </button>
            </div>
            <p>
              Have an account?{" "}
              <Link href="/signIn" {...StyleX.props(styles.signinlink)}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = StyleX.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    overflowY: "hidden",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: {
      default: "60%",
      "@media (max-width: 768px)": "80%",
      "@media (max-width: 480px)": "80%",
    },
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: {
      default: "2em",
      "@media (max-width: 480px)": "10px",
    },
    width: {
      default: "60%",
      "@media (max-width: 768px)": "100%",
    },
    height: "95%",
    opacity: "0.9",
    boxShadow: "0 0 10px 0 #00000025",
    borderRadius: 15,
  },
  heading: {
    marginBottom: "8px",
    height: "10%",
  },
  textInputContainer: {
    width: "100%",
    marginBottom: "0.6em",
    position: "relative",
    height: "16%",
  },
  textInput: {
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.6em",
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
    position: "absolute",
    top: "50px",
  },
  signupButtonContainer: {
    width: "100%",
  },
  signupButton: {
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
  signinlink: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },

  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "20px",
    cursor: "pointer",
  },
});

export default SignUp;
