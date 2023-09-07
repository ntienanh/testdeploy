import { Box, Button, Grid, Group, NumberInput, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { hasLength, useForm, zodResolver } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useNProgressRouter } from '../../../hooks/useNProgress';
import { z } from 'zod';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

interface IStudentFormProps {
  data: any;
  onCreate?: any;
  onUpdate?: any;
  onDelete?: () => void;
  isLoading?: boolean;
}

const schema = z.object({
  name: z.string().nonempty('This field is required').min(2, { message: 'Name should have at least 2 letters' }),
  mssv: z.string().max(10, 'Max 10 characters').min(10, { message: 'Name should have at least 10 letters' }),
  gpa: z.number().max(4, 'Max points is 4'),
});

const StudentForm = (props: IStudentFormProps) => {
  const params: any = useParams();
  const router = useNProgressRouter();
  const isCreate = !params?.slug;

  const { data, onCreate, onUpdate, onDelete, isLoading } = props || {};

  const form = useForm({
    initialValues: data?.attributes || {},
    validate: zodResolver(schema),
  });

  const onSubmit = async (body: any) => {
    delete body.createdAt;
    delete body.updatedAt;
    delete body.createdBy;
    delete body.updatedBy;
    delete body.publishedAt;

    if (isCreate) {
      return await onCreate(body);
    }
    await onUpdate(body);
  };

  if (!data && !isCreate) {
    return null;
  }

  // console.log('dynamic form data', data?.attributes);
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Box>
        <Group position='apart' w={'4rem'} onClick={() => router.back()} spacing={0} sx={{ cursor: 'pointer' }}>
          <IconArrowLeft size='1.5rem' color='rgb(123, 121, 255)' />
          <Text color='rgb(123, 121, 255)'>Back</Text>
        </Group>

        <Group position='apart'>
          <Text fz={'1.5rem'} fw={600}>
            {isCreate ? 'Create an entry' : data?.attributes?.name}
          </Text>
          <Group>
            <Button type='submit' color='green' loading={isLoading} disabled={!form.isDirty || !form.isValid}>
              Save
            </Button>
            {!isCreate && !!onDelete && (
              <Button type='button' color='red' onClick={onDelete}>
                Delete
              </Button>
            )}
          </Group>
        </Group>

        <Grid mt={24} pl={8} pr={8}>
          <Grid.Col p={16} span={10} sx={{ flex: 1, backgroundColor: '#fff', height: 'auto', borderRadius: 4 }}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  withAsterisk
                  label='name'
                  placeholder='Please enter your name'
                  {...form.getInputProps('name')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  withAsterisk
                  label='student code'
                  placeholder='Please enter your mssv'
                  {...form.getInputProps('mssv')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <NumberInput
                  placeholder='Please enter your gpa'
                  label='gpa'
                  decimalSeparator=','
                  step={0.1}
                  precision={1}
                  max={4}
                  min={0}
                  withAsterisk
                  defaultValue={0.0}
                  {...form.getInputProps('gpa')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Textarea placeholder='Please enter your description' label='description' />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col ml={24} p={0} span={2} sx={{ borderRadius: 4 }}>
            <Stack>
              <Group
                position='center'
                p={12}
                sx={{
                  backgroundColor: isCreate ? '#EAFBE7' : '#EAF5FF',
                  border: isCreate ? '2px solid #C6F0C2' : '2px solid #B8E1FF',
                  borderRadius: 4,
                }}
              >
                <Text color={isCreate ? 'green' : 'blue'}>
                  <strong>{isCreate ? 'Create' : 'Detail'} version</strong>
                </Text>
              </Group>
              <Box p={16} sx={{ backgroundColor: '#fff', borderRadius: 4 }}>
                <Stack>
                  <Text sx={{ borderBottom: '1px solid gray' }}>INFORMATION</Text>
                  <Stack spacing={4}>
                    <Group position='apart'>
                      <Text fw={500}>Created</Text>
                      <Text>{!isCreate ? (dayjs(data?.attributes?.createdAt) as any).fromNow() : 'null'}</Text>
                    </Group>

                    <Group position='apart'>
                      <Text fw={500}>Last update</Text>
                      {!isCreate ? (dayjs(data?.attributes?.updatedAt) as any).fromNow() : 'null'}
                    </Group>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </form>
  );
};

export default StudentForm;
