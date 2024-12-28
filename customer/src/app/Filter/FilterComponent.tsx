"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation'; // Correct import for app directory
import * as StyleX from "@stylexjs/stylex";

const x = StyleX.create({
  filterDiv2: {
    width: {
      default: "25%",
      "@media (max-width: 768px)": "100%",
    },
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "0px 10px",
    flexWrap: "wrap",
  },
  filterInput: {
    outline: "none",
    background: "transparent",
    border: "none",
    fontSize: {
      default: 18,
      "@media (max-width: 768px)": 14,
    },
    color: "#6C6C6C",
  },
  divider: {
    content: "",
    width: 2,
    height: 50,
    backgroundColor: "#99999925",
  },
  button: {
    border: "none",
    color: "#fff",
    width: "90%",
    background: "#1a1a1a",
    borderRadius: "100px",
    paddingLeft: "15px",
    paddingRight: "25px",
    height: "80%",
    fontWeight: 500,
    fontSize: 20,
  },
});

const FilterComponent: React.FC = () => {
  const [location, setLocation] = React.useState<string>('');
  const [priceRange, setPriceRange] = React.useState<string>('');
  const router = useRouter(); // Initialize useRouter for navigation

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(event.target.value);
  };

  const handleSearch = () => {
    // Construct the query string for the selected filters
    const searchParams = new URLSearchParams();
    if (location) searchParams.append('location', location);
    if (priceRange) searchParams.append('priceRange', priceRange);

    // Redirect to the /saloon page with query parameters
    if (router) {
      router.push(`/saloon?${searchParams.toString()}`);
    } else {
      console.error('Router is not available.');
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        border: "5px solid #d3d3d340",
        height: 60,
        borderRadius: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "60px 0",
        padding: "0 20px",
      }}
    >
      {/* Location Filter */}
      <div {...StyleX.props(x.filterDiv2)}>
        <select {...StyleX.props(x.filterInput)} value={location} onChange={handleLocationChange}>
          <option value="">Location</option>
          <option value="">All</option>
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

      {/* Divider */}
      <div {...StyleX.props(x.divider)} />

      {/* Starting Price Range Filter */}
      <div {...StyleX.props(x.filterDiv2)}>
        <select {...StyleX.props(x.filterInput)} value={priceRange} onChange={handlePriceRangeChange}>
          <option value="">Starting Price</option>
          <option value="">All</option>
          <option value="0-100">Rs 0 - 100</option>
          <option value="101-200">Rs 101 - 200</option>
          <option value="201-300">Rs 201 - 300</option>
          <option value="301-400">Rs 301 - 400</option>
          <option value="401-500">Rs 401 - 500</option>
          <option value="501+">Rs 501+</option>
        </select>
      </div>

      {/* Divider */}
      <div {...StyleX.props(x.divider)} />

      {/* Search Button */}
      <div
        style={{
          width: "30%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button {...StyleX.props(x.button)} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
