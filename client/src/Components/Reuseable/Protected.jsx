import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !user) {
      navigate("/");
    }
    if (!token || !user) {
      return null;
    }
  }, []);
  return children;
};

export default Protected;
