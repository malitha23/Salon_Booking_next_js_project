"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

const page = () => {
  // Define the state with a proper type to accept string or null for imageUrl
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const router = useRouter();

  // Handle file input change and display preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining to handle null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        // Cast reader.result as a string (base64 encoded)
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file); // Convert the file to base64 string
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) { 
      formData.set('file', selectedFile); 
    }
    
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("contactNo", contactNo);
    formData.append("startingPrice", startingPrice);
    formData.append("openTime", openTime);
    formData.append("closeTime", closeTime);
    formData.append("createdAt", new Date().toISOString());

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
    
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Please login to add a saloon.',
        });
        return;
      }
    
      const response = await fetch("/api/addsaloons", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send form data as multipart/form-data
      });
    
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Saloon added successfully!',
        }).then(() => {
          // Redirect or navigate to another page (e.g., using router.push)
          router.push("/dashboard/saloon");
        }); 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error inserting saloon: ${await response.text()}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting form.',
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px 60px",
      }}
    >
      <div>
        <h2>Add Details</h2>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Upload File:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {/* Image preview */}
            {imageUrl && (
              <div style={{ marginTop: "15px" }}>
                <img
                  src={imageUrl}
                  alt="Selected Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Title:
            </label>
            <input
              type="text"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Description:
            </label>
            <textarea
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "100px", // Make the textarea taller
                resize: "vertical", // Allow vertical resizing
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Location:
            </label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}  style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Tangalle">Tangalle</option>
              <option value="Ambalangoda">Ambalangoda</option>
              <option value="Weligama">Weligama</option>
              <option value="Ahangama">Ahangama</option>
              <option value="Hikkaduwa">Hikkaduwa</option>
              <option value="Benthota">Benthota</option>
              <option value="Koggala">Koggala</option>
              <option value="Hakmana">Hakmana</option>
              <option value="Dickwella">Dickwella</option>
              <option value="Baddegama">Baddegama</option>
              <option value="Kataragama">Kataragama</option>
              <option value="Weerawila">Weerawila</option>
              <option value="Tissamaharama">Tissamaharama</option>
              <option value="Udugama">Udugama</option>
              <option value="Neluwa">Neluwa</option>
              <option value="Deniyaya">Deniyaya</option>
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Starting Price:
            </label>
            <input
              type="text"
              placeholder="Add price"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Contact Number:
            </label>
            <input
              type="text"
              placeholder="Add contact number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Open Time:
            </label>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Close Time:
            </label>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#f5c100",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
