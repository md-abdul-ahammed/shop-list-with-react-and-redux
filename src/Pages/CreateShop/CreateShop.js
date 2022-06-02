import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shopList } from "../../actions/shopAction";
import "./CreateShop.css";

const CreateShop = () => {
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [addNewArea, setAddNewArea] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [newAreaValue, setNewAreaValue] = useState("");
  const [selectValueCategory, setSelectValueCategory] = useState("");
  const [selectValueArea, setSelectValueArea] = useState("");
  const [showCategoryError, setShowCategoryError] = useState("");
  const [showAreaError, setShowAreaError] = useState("");
  const [showDateError, setShowDateError] = useState("");
  const [openingDate, setOpeningDate] = useState();
  const [closeingDate, setClosingDate] = useState();
  const [shopName, setShopName] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shoplist } = useSelector((state) => state.shopList);
  const { areaAndCategorydata } = useSelector(
    (state) => state.areaAndCategories
  );
  const { shopAreas, shopCategories } = areaAndCategorydata;
  const onInputChange = (e) => {
    const { value } = e.target;
    const re = /^[A-Za-z ]+$/;
    if (value === "" || re.test(value)) {
      setShopName(value);
    }
  };
  // Disabled Previous Date Funtion
  const disablePastDate = (value = 0) => {
    const today = new Date();
    const dd = String(today.getDate() + value).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  const handleSelectOnchange = (e, from) => {
    if (e.target.value === "newCategory") {
      setNewCategoryValue("");
      setAddNewCategory(true);
      return;
    }
    if (e.target.value === "newArea") {
      setNewAreaValue("");
      setAddNewArea(true);
      return;
    }
    if (from === "area") {
      setNewAreaValue(e.target.value);
      console.log(newAreaValue);
    }
    if (from === "category") {
      setNewCategoryValue(e.target.value);
      console.log(from, e.target.value);
    }
  };
  const handleOnchange = (e, from) => {
    console.log(e.target.value);
    if (from === "area") {
      setNewAreaValue(e.target.value);
    }
    if (from === "category") {
      setNewCategoryValue(e.target.value);
    }
    if (newCategoryValue) {
      setShowCategoryError("");
    }
    if (newAreaValue) {
      setShowAreaError("");
    }
  };

  const handleAddNew = (from) => {
    if (from === "category") {
      if (!newCategoryValue) {
        setShowCategoryError("Please enter valid category name");
        return;
      }
      shopCategories.push(newCategoryValue);
      setSelectValueCategory(newCategoryValue);
      setAddNewCategory(false);
    }
    if (from === "area") {
      if (!newAreaValue) {
        setShowAreaError("Please enter valid Area name");
        return;
      }
      shopAreas.push(newAreaValue);
      setSelectValueArea(newAreaValue);
      setAddNewArea(false);
    }
  };

  const handleOnchangeOpeningDate = (e) => {
    setOpeningDate(e.target.value);
  };
  const handleOnchangeCloseingDate = (e) => {
    setClosingDate(e.target.value);
  };

  // -------------add shop here--------------
  const handleSubmit = (e) => {
    e.preventDefault();
    //******** Error Handle ******//
    if (!shopName) {
      setShopNameError("Shop name is required");
    } else {
      setShopNameError("");
    }
    if (!newAreaValue) {
      setShowAreaError("Shop area is required ");
    } else {
      setShowAreaError("");
    }
    if (!newCategoryValue) {
      setShowCategoryError("Shop Category is required ");
    } else {
      setShowCategoryError("");
    }
    //*****************//
    // Check is opening date is less than closing date ?
    if (closeingDate < openingDate || closeingDate === openingDate) {
      setShowDateError("Closing date must be grater than opening date");
      return;
    }
    if (!shopName || !newAreaValue || !newCategoryValue) {
      return;
    }
    setShowDateError("");
    console.log(shoplist);
    const data = [
      ...shoplist,
      {
        id:
          shoplist.length !== 0
            ? Number(shoplist[shoplist.length - 1].id) + 1
            : 1,
        shopName,
        area: newAreaValue,
        category: newCategoryValue,
        openingDate,
        closeingDate,
      },
    ];
    dispatch(shopList(data));
    e.target.reset();
    setShopName("");
    navigate("/shopList");
  };

  return (
    <form onSubmit={handleSubmit} className="create-shop-container">
      <h1>Create A Shop</h1>
      <label>Shop Name</label>
      <input
        style={{
          borderColor: shopNameError && "red",
          outlineColor: shopNameError && "red",
        }}
        type="text"
        value={shopName}
        onChange={onInputChange}
        placeholder="Enter your shop name"
      />
      {shopNameError && <div className="error">{shopNameError}</div>}
      <label>Please select your shop area</label>
      {addNewArea ? (
        <>
          <input
            style={{
              borderColor: showAreaError && "red",
              outlineColor: showAreaError && "red",
            }}
            autoFocus
            onChange={(e) => handleOnchange(e, "area")}
            type="text"
          />
          <div className="error">{showAreaError && showAreaError}</div>
          <div className="action-btn">
            <button onClick={() => handleAddNew("area")}>Done</button>
            <button className="cancel-btn" onClick={() => setAddNewArea(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <select
            style={{
              borderColor: showAreaError && "red",
              outlineColor: showAreaError && "red",
            }}
            defaultValue={selectValueArea ? selectValueArea : "area"}
            onChange={(e) => handleSelectOnchange(e, "area")}
          >
            <option disabled value="area">
              Select Area
            </option>
            {shopAreas.map((area, i) => (
              <option key={i} value={area}>
                {area}
              </option>
            ))}
            <option value="newArea">Add New Area</option>
          </select>
          {showAreaError && <div className="error">{showAreaError}</div>}
        </>
      )}
      <label>Please Select Your Category</label>
      {addNewCategory ? (
        <>
          <input
            style={{
              borderColor: showCategoryError && "red",
              outlineColor: showCategoryError && "red",
            }}
            autoFocus
            onChange={(e) => handleOnchange(e, "category")}
            type="text"
          />
          <div className="error">{showCategoryError && showCategoryError}</div>
          <div className="action-btn">
            <button onClick={() => handleAddNew("category")}>Done</button>
            <button
              className="cancel-btn"
              onClick={() => setAddNewCategory(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <select
            style={{
              borderColor: showCategoryError && "red",
              outlineColor: showCategoryError && "red",
            }}
            defaultValue={
              selectValueCategory ? selectValueCategory : "category"
            }
            onChange={(e) => handleSelectOnchange(e, "category")}
          >
            <option disabled value="category">
              Select Category
            </option>
            {shopCategories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
            <option value="newCategory">Add New Category</option>
          </select>
          {showCategoryError && (
            <div className="error">{showCategoryError}</div>
          )}
        </>
      )}
      <label>Enter Your Opening Date</label>
      <input
        style={{
          borderColor: showDateError && "red",
          outlineColor: showDateError && "red",
        }}
        onChange={handleOnchangeOpeningDate}
        type="date"
        min={disablePastDate()}
      />
      <label>Enter Your Closeing Date</label>
      <input
        style={{
          borderColor: showDateError && "red",
          outlineColor: showDateError && "red",
        }}
        onChange={handleOnchangeCloseingDate}
        min={
          openingDate
            ? openingDate
                .split("-")
                .map(
                  (data, i) =>
                    (i === 2 && String(Number(data) + 1).padStart(2, "0")) ||
                    data
                )
                .join("-")
            : disablePastDate(1)
        }
        type="date"
      />
      <div className="error">{showDateError && showDateError}</div>
      <button className="add-btn" type="submit">
        Add Shop
      </button>
    </form>
  );
};

export default CreateShop;
