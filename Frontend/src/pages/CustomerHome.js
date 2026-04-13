import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const [restaurants, setRestaurants] = useState([]);// IT IS ONLY FOR SHOWING RESTAURANT LIST ON CUSTOMER HOME PAGE. It is used to store the list of restaurants fetched from the backend. BUT THE ACTUAL IMPLEMENTATION OF THIS FUNCTION IS IN THE ADDRESTAURANT.JS FILE. 
  const [search, setSearch] = useState("");// it is used to store the search query entered by the user in the search box. This state is used to filter the list of restaurants displayed on the customer home page based on the search query. As the user types in the search box, the search state is updated and the list of restaurants is filtered accordingly.
  const [loading, setLoading] = useState(true);//
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8080/api/customer/restaurants");
    setRestaurants(res.data);
    setLoading(false);
  };

  if (loading) return <h2 className="page-title">Loading...</h2>;

  const links = [
    { label: "Home", path: "/customer/home" },
    { label: "Cart", path: "/cart" },
    { label: "Order History", path: "/history" },
    { label: "Logout", path: "/" }
  ];

  return (
    <div>
      <Navbar links={links} />
      <h2 className="page-title">Restaurants</h2>

      <div className="search-box">
        <input
          placeholder="Search restaurants..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid">
        {restaurants
          .filter((r) =>
            r.name.toLowerCase().includes(search.toLowerCase())// we are filtering the list of restaurants based on the search query entered by the user. We convert both the restaurant name and the search query to lowercase to make the search case-insensitive. This way, if the user types "pizza" in the search box, it will match with a restaurant named "Pizza Hut" or "pizza express". The filtered list of restaurants is then mapped to display only those that match the search criteria.
          )
          .map((restaurant) => (
            <div className="card" key={restaurant.id}>
        <img
        src={
            restaurant.imageUrl
            ? restaurant.imageUrl
            : "https://via.placeholder.com/400x200?text=Restaurant+Image"
        }
        alt={restaurant.name}
        className="restaurant-img"
        onError={(e) => {
            e.target.src =
            "https://via.placeholder.com/400x200?text=Restaurant+Image";
        }}
        /> 
        <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
              <button
                className="action-btn"
                onClick={() => navigate(`/foods/${restaurant.id}`)}
                >
                View Foods
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomerHome;