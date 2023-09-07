'use client';

import { Box, Group, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ServiceName } from '../../../../types/enums';
import { getDetailServices } from '../../../../apis';
import { useNProgress, useNProgressRouter } from '../../../../hooks/useNProgress';
import StudentForm from '../../../../components/elements/StudentForm';

const StudentsDetails = () => {
  useNProgress();
  const router = useNProgressRouter();
  const params = useParams();

  const studentDetail = useQuery({
    queryKey: [ServiceName.Student, 'page', params],
    queryFn: () => getDetailServices({ serviceName: ServiceName.Student, slug: params.slug }),
    keepPreviousData: true,
    enabled: !!params.slug,
  });

  const { isLoading } = studentDetail || {};
  const student = (studentDetail?.data as any)?.data?.data;

  return (
    <>
      {isLoading ? <Text>Đang loading</Text> : <StudentForm onUpdate={() => console.log('updatedđ')} data={student} />}
    </>
  );
};

export default StudentsDetails;
