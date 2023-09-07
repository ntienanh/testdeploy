"use client";

import { useNProgress } from "@/hooks/useNProgress";
import {
  ActionIcon,
  Box,
  Button,
  Code,
  Flex,
  Group,
  Switch,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId, useListState, useSessionStorage } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import React from "react";
import { convertCharName } from "../../utils";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { IconTrash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  text: { color: theme.colorScheme === "dark" ? theme.white : theme.black },
}));

function AdminPage() {
  useNProgress();
  const { classes } = useStyles();
  const [values, handlers] = useListState<any>([]);

  const form = useForm({
    initialValues: {
      employees: [{ name: "", active: false, key: randomId() }],
    },
  });

  const fields = form.values.employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="John Doe"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <Switch
        label="Active"
        {...form.getInputProps(`employees.${index}.active`, {
          type: "checkbox",
        })}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("employees", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box maw={500} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Name
          </Text>
          <Text weight={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          No one here...
        </Text>
      )}

      {fields}

      <Group position="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem("employees", {
              name: "",
              active: false,
              key: randomId(),
            })
          }
        >
          Add employee
        </Button>
      </Group>
      <Group position="center" mt="md">
        <Button
          onClick={() => form.reorderListItem("employees", { from: 1, to: 2 })}
        >
          Reorder employee 1 to 2
        </Button>
      </Group>

      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </Box>
  );
}
export default AdminPage;
