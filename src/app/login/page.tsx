"use client";

import { loginServices } from "@/apis";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  FocusTrap,
  PasswordInput,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LOGO_IMAGE =
  "https://sharedassessments.org/wp-content/uploads/2022/12/login.png";
const CONTAINER_VIEW: React.CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: 32,
  backgroundColor: "#9053c7",
  background: "linear-gradient(-135deg, #c850c0, #4158d0)",
};
const LOGIN_VIEW: React.CSSProperties = {
  width: 690,
  backgroundColor: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "32px 18px",
  gap: 46,
};

const LoginPage = () => {
  useNProgress()
  const router = useNProgressRouter();
  const [btnLoad, setBtnLoad] = React.useState(false);

  const form = useForm({
    initialValues: { userName: "", password: "" },
    validateInputOnBlur: true,
    validate: {
      userName: (value) => (value.length < 2 ? "Length min is 2" : null),
      password: (value) => (value.length < 5 ? "Length min is 5" : null),
    },
  });

  const loginQuery = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => {
      return loginServices(body);
    },
    onSuccess: () => {
      notifications.show({
        message: `Login successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
      router.push("/admin");
    },
    onError: () => {
      notifications.show({
        message: `Email or password not invalid`,
        color: "red",
        icon: <IconX size="1.1rem" />,
      });
      setBtnLoad(false);
      form.reset();
    },
  });

  const onSubmit = (values: any) => {
    setBtnLoad(true);
    const newValues: any = {
      identifier: values.userName,
      password: values.password,
    };
    loginQuery.mutate(newValues);
  };

  return (
    <>
      <div style={CONTAINER_VIEW}>
        <div style={LOGIN_VIEW}>
          <div style={{ width: 290 }}>
            <img src={LOGO_IMAGE} alt="IMG" />
          </div>
          <Center>
            <Box w={316}>
              <Text
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: 6,
                }}
              >
                Đăng nhập hệ thống
              </Text>
              <FocusTrap>
                <form onSubmit={form.onSubmit(onSubmit)}>
                  <TextInput
                    disabled={btnLoad}
                    label="UserName"
                    placeholder="Name"
                    {...form.getInputProps("userName")}
                    required
                    autoFocus
                    rightSection={
                      !!form.values.userName && (
                        <Tooltip label="Clear">
                          <ActionIcon
                            variant="light"
                            c={"red"}
                            onClick={() => form.setFieldValue("userName", "")}
                          >
                            <IconX />
                          </ActionIcon>
                        </Tooltip>
                      )
                    }
                  />
                  <PasswordInput
                    disabled={btnLoad}
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                    required
                  />

                  <Flex mt={"md"} justify={"space-between"} align={"center"}>
                    <Button type="submit" loading={btnLoad}>
                      Submit
                    </Button>
                    <Link href={"#"}>
                      <Text
                        sx={{ textDecoration: "underline", color: "black" }}
                      >
                        Quên mật khẩu?
                      </Text>
                    </Link>
                  </Flex>
                </form>
              </FocusTrap>
            </Box>
          </Center>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
