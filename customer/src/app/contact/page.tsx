"use client";
import * as StyleX from "@stylexjs/stylex";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from 'sweetalert2';
// import Mark from "../../../public/assets/_.png";
// import Park from "../../../public/assets/Line 19.png";
// import Bg from "../../../public/assets/contact.png";
import Image from "next/image";

const styles = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  hero: {
    width: "100%",
    height: {
      default: "80vh",
      "@media (max-width: 768px)": "90vh",
    },
    gap: {
      default: 40,
      "@media (max-width: 768px)": 20,
    },
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottomLeftRadius: "190% 70%",
    borderBottomRightRadius: "190% 70%",
  },
  heading: {
    color: "#fff",
    width: "100%",
    fontSize: {
      default: 36,
      "@media (max-width: 768px)": "28px",
      "@media (min-width: 1920px)": "86px",
    },
    textAlign: "center",
    fontWeight: 700,
  },
  headingText: {
    fontSize: {
      default: "84px",
      "@media (max-width: 768px)": "42px",
      "@media (min-width: 1920px)": "84px",
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: {
      default: "20px 60px",
      "@media (max-width:768px)": "20px",
    },
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    width: "90%",
    boxShadow: "0 0 5px 0 #00000025",
  },
  main: {
    width: "100%",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: {
      default: " 70%",
      "@media (max-width: 768px)": "100%",
    },
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Nunito Sans",
  },
  asteriskIcon: {
    marginLeft: "5px",
    width: "10px",
    height: "10px",
  },
  input: {
    padding: "20px 10px",
    borderRadius: "8px",
    border: "1px solid #999999",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  textarea: {
    padding: "20px 10px",
    borderRadius: "8px",
    border: "1px solid #999999",
    outline: "none",
    fontSize: "18px",
    color: "#fff",
    width: "100%",
    minHeight: "200px",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 30px",
    borderRadius: "44px",
    border: "none",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#333",
      transform: "scale(1.05)",
    },
  },
  submitIcon: {
    width: "16px",
    height: "16px",
    marginLeft: "10px",
  },
  formTitle: {
    fontSize: "84px",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Nunito Sans",
    marginBottom: "20px",
    textAlign: "center",
  },
  firstcontainer: {
    display: "flex",
    gap: "30px",
    flexDirection: {
      default: "row",
      "@media (max-width: 768px)": "column",
    },
  },
  errorMessage: {
    color: "red",
    fontSize: "16px",
    marginTop: "15px",
    marginBottom: "10px",
  },
});

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid. It should be 10 digits.";
      isValid = false;
    }
    if (!formData.message) {
      newErrors.message = "Message is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Show a loading alert
        Swal.fire({
          title: 'Submitting...',
          text: 'Please wait while your form is being submitted.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        // Send form data to the API endpoint for email sending
        const response = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Success alert
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted and email sent successfully!',
            icon: 'success',
          });
        } else {
          // Error alert for API response
          Swal.fire({
            title: 'Error',
            text: `Failed to send email: ${result.message}`,
            icon: 'error',
          });
        }
      } catch (error) {
        // Generic error alert
        Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred while submitting the form.',
          icon: 'error',
        });
      }
  
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    }
  };
  
  return (
    <>
      <div {...StyleX.props(styles.main)}>
        <div {...StyleX.props(styles.formContainer)}>
          <form onSubmit={handleSubmit} {...StyleX.props(styles.form)}>
            <div {...StyleX.props(styles.formField)}>
              <label {...StyleX.props(styles.label)}>Your Name</label>
              <div {...StyleX.props(styles.firstcontainer)}>
                <div style={{ width: "100%" }}>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    {...StyleX.props(styles.input)}
                  />
                  {errors.firstName && (
                    <div {...StyleX.props(styles.errorMessage)}>
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={formData.lastName}
                    onChange={handleChange}
                    {...StyleX.props(styles.input)}
                  />
                  {errors.lastName && (
                    <div {...StyleX.props(styles.errorMessage)}>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div {...StyleX.props(styles.formField)}>
              <label {...StyleX.props(styles.label)}>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Eg: example@gmail.com'
                pattern='[^ @]*@[^ @]*'
                value={formData.email}
                onChange={handleChange}
                {...StyleX.props(styles.input)}
              />
              {errors.email && (
                <div {...StyleX.props(styles.errorMessage)}>{errors.email}</div>
              )}
            </div>
            <div {...StyleX.props(styles.formField)}>
              <label {...StyleX.props(styles.label)}>Phone Number</label>
              <input
                type='text'
                name='phone'
                placeholder='Eg:  +44 20 7946 0958'
                value={formData.phone}
                onChange={handleChange}
                {...StyleX.props(styles.input)}
              />
              {errors.phone && (
                <div {...StyleX.props(styles.errorMessage)}>{errors.phone}</div>
              )}
            </div>
            <div {...StyleX.props(styles.formField)}>
              <label {...StyleX.props(styles.label)}>Message</label>
              <textarea
                name='message'
                placeholder='Enter your message'
                value={formData.message}
                onChange={handleChange}
                {...StyleX.props(styles.textarea)}
              />
              {errors.message && (
                <div {...StyleX.props(styles.errorMessage)}>
                  {errors.message}
                </div>
              )}
            </div>
            <div {...StyleX.props(styles.submitButtonContainer)}>
              <button type='submit' {...StyleX.props(styles.submitButton)}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Page;
