"use client";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { useNProgressRouter } from "@/hooks/useNProgress";
import LoginPage from "./login/page";
import React, { Suspense } from "react";
import axios from "axios";
import { Text } from "@mantine/core";

const profileCookies = getCookie("profile") || "";
const tokenCookies = getCookie("token") || "";

const Home: React.FC = () => {
  // const [role, setRole] = React.useState("");
  // const profile = JSON.parse(profileCookies);

  // async function fetchRoleData() {
  //   const response = await axios
  //     .get(`http://192.168.1.20:1337/api/users/${profile.id}?populate=role`, {
  //       headers: {
  //         Authorization: `Bearer ${tokenCookies}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Role user: ", response.data.role.name);
  //       setRole(response.data.role.name);
  //     })
  //     .catch((error) => {
  //       // Handle error.
  //       console.log("An error occurred:", error.response);
  //       //throw
  //     });
  // }

  // React.useEffect(() => {
  //   fetchRoleData();
  // });

  return (
    <>
      {profileCookies && tokenCookies ? (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Text>Done</Text>
        </Suspense>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Home;
