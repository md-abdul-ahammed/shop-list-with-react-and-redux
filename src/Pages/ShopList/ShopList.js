import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shopList } from "../../actions/shopAction";
import "./ShopList.css";

const ShopList = () => {
  const [filter, setFilter] = useState({});
  const [list, setList] = useState([]);
  const { shoplist } = useSelector((state) => state.shopList);
  const [showFilter, setShowFilter] = useState(false);
  const { areaAndCategorydata } = useSelector(
    (state) => state.areaAndCategories
  );
  const { shopAreas, shopCategories } = areaAndCategorydata;
  const dispatch = useDispatch();

  const handleDeleteShop = (id) => {
    const index = shoplist.findIndex((newlist) => newlist.id === id);
    shoplist.splice(index, 1);
    dispatch(shopList(shoplist));
    if (filter.name && filter.value) {
      const matchedShopList = shoplist.filter(
        (list) => list[filter.name] === filter.value
      );
      setList(matchedShopList);
      return;
    }
  };

  const handleFilter = (name, value) => {
    setFilter({
      name,
      value,
    });
  };

  const handleDate = (from) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const todayDate = yyyy + "-" + mm + "-" + dd;

    if (from === "openingDate") {
      const matchedShopList = shoplist.filter(
        (list) => list["closeingDate"] >= todayDate
      );
      setList(matchedShopList);
    }
    if (from === "closeingDate") {
      const matchedShopList = shoplist.filter(
        (list) => list["closeingDate"] <= todayDate
      );
      setList(matchedShopList);
    }
  };

  useEffect(() => {
    if (filter.name && filter.value) {
      const matchedShopList = shoplist.filter(
        (list) => list[filter.name] === filter.value
      );
      setList(matchedShopList);
    }
    setList(shoplist);
  }, [shoplist, filter]);

  return (
    <div className="shop-list">
      <div className="shop-list-header">
        <h2>All Shop List Available here</h2>
        <Link className="add-btn fit-content" to="/">
          Add New Shop
        </Link>
      </div>
      <div className="shop-list-area">
        {/* ---------mobile device filter option------------ */}
        <div className="lg-hidden sm-block">
          <button
            style={{ marginBottom: "8px" }}
            onClick={() => setShowFilter(!showFilter)}
            className="shadow"
          >
            Filters
          </button>
          {showFilter && (
            <div className="filter-container ">
              <div className="filter">
                <h4 style={{ margin: 0 }}>Area :</h4>
                <div className="all-areas">
                  {shopAreas.map((area) => (
                    <div
                      className={
                        filter.name === "area" && filter.value === area
                          ? "shadow animation"
                          : null
                      }
                      onClick={() => {
                        handleFilter("area", area);
                        setShowFilter(false);
                      }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              <div className="filter">
                <h4 style={{ margin: 0 }}>Category :</h4>
                <div className="all-areas">
                  {shopCategories.map((category) => (
                    <div
                      className={
                        filter.name === "category" && filter.value === category
                          ? "shadow animation"
                          : null
                      }
                      onClick={() => {
                        handleFilter("category", category);
                        setShowFilter(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              <div className="filter">
                <h4 style={{ margin: 0 }}>Shop Status :</h4>
                <div className="all-areas">
                  <span
                    onClick={() => handleDate("openingDate")}
                    className="badge"
                  >
                    Open
                  </span>
                  <span
                    onClick={() => handleDate("closeingDate")}
                    className="red-badge"
                  >
                    Close
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ************* */}
        <div className="sm-hidden">
          <div className="filter-container mt-3">
            <h3 style={{ margin: 0 }}>Filters By </h3>
            <div className="filter">
              <h4 style={{ margin: 0 }}>Area :</h4>
              <div className="all-areas">
                {shopAreas.map((area) => (
                  <div
                    className={
                      filter.name === "area" && filter.value === area
                        ? "shadow animation"
                        : null
                    }
                    onClick={() => handleFilter("area", area)}
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
            <div className="filter">
              <h4 style={{ margin: 0 }}>Category :</h4>
              <div className="all-areas">
                {shopCategories.map((category) => (
                  <div
                    className={
                      filter.name === "category" && filter.value === category
                        ? "shadow animation"
                        : null
                    }
                    onClick={() => handleFilter("category", category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <div className="filter">
              <h4 style={{ margin: 0 }}>Shop Status :</h4>
              <div className="all-areas">
                <span
                  onClick={() => handleDate("openingDate")}
                  className="badge"
                >
                  Open
                </span>
                <span
                  onClick={() => handleDate("closeingDate")}
                  className="red-badge"
                >
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-list-container mt-3">
          {list.length ? (
            list.map((shop, i) => (
              <div key={i} className="shop-card shadow">
                <div>
                  Name:{" "}
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#000",
                      marginLeft: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {shop.shopName}
                  </span>
                </div>
                <div>
                  Area:{" "}
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#000",
                      textTransform: "capitalize",
                    }}
                  >
                    {shop.area}
                  </span>
                </div>
                <div>
                  Category:{" "}
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#000",
                      textTransform: "capitalize",
                    }}
                  >
                    {shop.category}
                  </span>
                </div>
                <div>
                  Opening Date:{" "}
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#000",
                      textTransform: "capitalize",
                    }}
                  >
                    {shop.openingDate}
                  </span>
                </div>
                <div>
                  Closing Date:{" "}
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#000",
                      textTransform: "capitalize",
                    }}
                  >
                    {shop.closeingDate}
                  </span>
                </div>
                <div className="shop-action-container">
                  <button className="shadow">Edit</button>
                  <button
                    className="shadow"
                    onClick={() => handleDeleteShop(shop.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="error element-middle">
              Shop is not available right now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopList;
