"use client";

import {
  AppShell,
  Header,
  Flex,
  Text,
  BackgroundImage,
  Center,
  useMantineTheme,
  Burger,
  ActionIcon,
  useMantineColorScheme,
  Group,
  Avatar,
  Popover,
  Stack,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconLogout } from "@tabler/icons-react";
import { useNProgressRouter } from "../../../hooks/useNProgress";
import { convertCharName } from "../../../utils";

interface IAdminLayoutProps {
  children: React.ReactNode;
  navbar: React.ReactElement;
}

const AdminLayout = (props: IAdminLayoutProps) => {
  const theme = useMantineTheme();
  const router = useNProgressRouter();
  const { children, navbar } = props || {};
  const [role, setRole] = React.useState("");
  const [popOpened, setPopOpened] = React.useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const profileCookies = getCookie("profile") || "";
  const tokenCookies = getCookie("token") || "";
  const profile = JSON?.parse(profileCookies) || "";

  async function fetchRoleData() {
    const response = await axios
      .get(`http://192.168.1.20:1337/api/users/${profile.id}?populate=role`, {
        headers: {
          Authorization: `Bearer ${tokenCookies}`,
        },
      })
      .then((response) => {
        console.log("Data: ", response.data);
        setRole(response.data.role.name);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        //throw
      });
  }

  React.useEffect(() => {
    fetchRoleData();
  });

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("profile");
    router.push("/login");
  };

  return (
    <AppShell
      padding="md"
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={navbar}
      header={
        <Header height={60}>
          <Flex justify={"space-between"}>
            <BackgroundImage
              onClick={() => router.push("/admin")}
              w={200}
              h={60}
              sx={{ ":hover": { cursor: "pointer" } }}
              src={
                colorScheme === "light"
                  ? "https://cdn.dribbble.com/userupload/3634333/file/original-4dc043d8e07ad67aae028fe39355b4f3.jpg?resize=400x300&vertical=center"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJtXX6SjY_A2GeJgO3uyxtiGdMbevcT-FZFfKtasI-5WpxjFrVO69EGPE1259wzFbmR8&usqp=CAU"
              }
            />
            <Group p={16}>
              <ActionIcon
                variant="outline"
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )}
              </ActionIcon>
              <Group>
                <Text
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "dark" ? theme.white : theme.black,
                  })}
                >
                  {profile?.username} - {role ? role : "Reader Role"}
                </Text>
                <Popover
                  width={200}
                  position="bottom-end"
                  withArrow
                  shadow="md"
                  opened={popOpened}
                >
                  <Popover.Target>
                    <Avatar color="cyan" radius="xl" sx={{ cursor: "pointer" }} onClick={() => setPopOpened(true)}>
                      <Text>{convertCharName(profile.username)}</Text>
                    </Avatar>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack spacing={4}>
                      <Text
                        p={4}
                        sx={{
                          cursor: "pointer",
                          borderRadius: 4,
                          ":hover": { backgroundColor: "rgb(220, 220, 228)" },
                        }}
                        onClick={() => {
                          router.push("/admin/profile")
                          setPopOpened(false)
                        }}
                      >
                        Profile
                      </Text>
                      <Group
                        p={4}
                        position="apart"
                        sx={{
                          cursor: "pointer",
                          borderRadius: 4,
                          ":hover": { backgroundColor: "rgb(220, 220, 228)" },
                        }}
                        onClick={handleLogout}
                      >
                        <Text color="red">Logout</Text>
                        <IconLogout color="red" />
                      </Group>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            </Group>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default AdminLayout;
