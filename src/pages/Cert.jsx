import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { request } from "src/libs/request";

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const navigate = useNavigate();

  useEffect(() => {
    request
      .post("/cert?key=" + key)
      .then((response) => {
        navigate("/landing/authentication/success");
      })
      .catch((response) => {
        navigate("/landing/authentication/fail");
      });
  }, []);
};
