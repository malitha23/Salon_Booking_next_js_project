"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react'; // Add this line
import Swal from 'sweetalert2';

const page = () => {
  const searchParams = useSearchParams();
  const Saloon = searchParams.get("event");
  const initialSaloonData = Saloon
    ? JSON.parse(decodeURIComponent(Array.isArray(Saloon) ? Saloon[0] : Saloon))
    : null;

  const [id, setId] = useState(initialSaloonData?.id || '');
  const [title, setTitle] = useState(initialSaloonData?.title || '');
  const [description, setDescription] = useState(initialSaloonData?.description || '');
  const [location, setLocation] = useState(initialSaloonData?.location || '');
  const [startingPrice, setStartingPrice] = useState(initialSaloonData?.startingPrice || '');
  const [contactNo, setContactNo] = useState(initialSaloonData?.contactNo || '');
  const [openTime, setOpenTime] = useState(initialSaloonData?.openTime || '');
  const [closeTime, setCloseTime] = useState(initialSaloonData?.closeTime || '');
  const [imageUrl, setImageUrl] = useState(initialSaloonData?.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const router = useRouter();

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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (selectedFile) {
      formData.set('file', selectedFile);
    }
    formData.append("id", id);
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

      const response = await fetch("/api/updatesaloons", {
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
          text: 'Saloon updated successfully!',
        }).then(() => {
          // Redirect or navigate to another page (e.g., using router.push)
          router.push("/dashboard/saloon");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error updating saloon: ${await response.text()}`,
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
        <h2>Edit Details</h2>
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
            <select value={location} onChange={(e) => setLocation(e.target.value)} style={{
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
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;