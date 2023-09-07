'use client';

import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { createServices } from '../../../../apis';
import StudentForm from '../../../../components/elements/StudentForm';
import { useNProgress, useNProgressRouter } from '../../../../hooks/useNProgress';
import { ServiceName } from '../../../../types/enums';

const StudentCreate = () => {
  useNProgress();
  const router = useNProgressRouter();

  const createMutation = useMutation({
    mutationKey: [ServiceName.Student],
    mutationFn: (body: any) => {
      return createServices({
        serviceName: ServiceName.Student,
        body: { data: body }, // mapping
      });
    },

    onSuccess: () => {
      notifications.show({
        message: `Created successfully!`,
        color: 'green',
        icon: <IconCheck size='1.1rem' />,
      });
    },
  });

  return <StudentForm onCreate={createMutation.mutate} data={''} />;
};

export default StudentCreate;
