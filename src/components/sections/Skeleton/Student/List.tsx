import { Group, Skeleton, Stack } from '@mantine/core';
import React from 'react';

const ListStudentsSkeleton = () => {
  return (
    <>
      <Group position='apart' align='flex-start' mt={12}>
        <Stack>
          <Skeleton height={36} w={120} />
          <Skeleton height={25} w={120} />
        </Stack>
        <Skeleton height={36} w={180} />
      </Group>
      <Group position='right'>
        <Group>
          <Skeleton height={36} w={185} />
          <Skeleton height={36} w={60} />
        </Group>
      </Group>

      <Skeleton height={450} mt={12} />

      <Group position='apart' mt={12}>
        <Skeleton height={36} w={205} />
        <Skeleton height={36} w={355} />
      </Group>
    </>
  );
};

export default ListStudentsSkeleton;
