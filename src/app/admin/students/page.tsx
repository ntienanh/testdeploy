'use client';

import dayjs from 'dayjs';
import { deleteOneServices, getApiServices } from '@/apis';
import { ServiceName } from '@/types/enums';
import { ActionIcon, Button, Checkbox, Group, Pagination, Popover, Stack, Table, Text, Tooltip } from '@mantine/core';
import { useListState, useLocalStorage } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { nprogress } from '@mantine/nprogress';
import {
  IconAlertCircle,
  IconCaretDownFilled,
  IconCheck,
  IconPencil,
  IconPlus,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import ListStudentsSkeleton from '../../../components/sections/Skeleton/Student/List';
import { useNProgress, useNProgressRouter } from '../../../hooks/useNProgress';
import { notifications } from '@mantine/notifications';

const StudentsPage = () => {
  useNProgress();
  const router = useNProgressRouter();

  const [values, setValues] = React.useState<any>([]);
  const [selected, setSelected] = React.useState<any>([]);
  const [displayFields, displayFieldsHandlers] = useListState(['id', 'name', 'createdAt', 'updatedAt']);
  const [activePage, setActivePage] = React.useState(1);
  const [popOpened, setPopOpened] = React.useState(false);
  const [pageSize, setPageSize] = useLocalStorage({ key: 'pageSize', defaultValue: 2 });

  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: [ServiceName.Student, 'page', activePage, pageSize],
    queryFn: () => getApiServices({ serviceName: ServiceName.Student, page: activePage, pageSize: pageSize }),
    keepPreviousData: true,
    staleTime: 10 * 1000,
  });

  const deleteMutation = useMutation({
    mutationKey: [ServiceName.Student],
    //body is id of student
    mutationFn: async (id: number | string) => await deleteOneServices({ serviceName: ServiceName.Student, slug: id }),
    onSuccess: (_, id) => {
      //Cách 1 use Refetch
      // studentsQuery.refetch();
      // Cách 2 use Invalidate queryClient store
      queryClient.invalidateQueries({ queryKey: [ServiceName.Student] });
      notifications.show({
        message: `${id} Deleted successfully!`,
        color: 'green',
        icon: <IconCheck size='1.1rem' />,
      });
    },
  });

  const { isLoading } = studentsQuery;
  const data = (studentsQuery?.data as any)?.data?.data || [];
  const allKeys = (studentsQuery?.data as any)?.data?.data?.[0]?.attributes || {};
  const keys = Object?.keys(allKeys);
  const pagination = studentsQuery?.data?.data?.meta?.pagination;

  const toggleDisplayField = (newKey: string) => () => {
    if (displayFields.includes(newKey)) {
      return displayFieldsHandlers.setState(displayFields.filter((key) => key !== newKey));
    }
    displayFieldsHandlers.setState([...displayFields, newKey]);
  };

  const openModal = (id: any) => {
    return modals.openConfirmModal({
      centered: true,
      title: 'Confirmation',
      children: (
        <Stack h={140} justify='center' align='center' sx={{ backgroundColor: '#F8F9FA' }} mb={12}>
          <IconAlertCircle color='red' size='2.5rem' />
          <Text>Are you sure you want to delete this?</Text>
        </Stack>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  const handleDeleteSelected = () => {
    values.map((value: number) => {
      deleteMutation.mutate(value);
    });
  };

  React.useEffect(() => {
    const selectedElements = data?.filter((element: any) => values.includes(element.id));
    setSelected(selectedElements);
  }, [values]);

  return (
    <>
      {isLoading ? (
        <ListStudentsSkeleton />
      ) : (
        <>
          <Group mt={12} position='apart' align='flex-start'>
            <Stack spacing={0}>
              <Text fz={'1.5rem'} fw={600} sx={{ textTransform: 'uppercase' }}>
                Students
              </Text>
              <Text>{data?.length} entries found</Text>
            </Stack>
            <Button
              leftIcon={<IconPlus size='1.5rem' />}
              variant='filled'
              onClick={() => router.push('students/create', { scroll: true })}
            >
              Create new entry
            </Button>
          </Group>

          <Group position={selected?.length ? 'apart' : 'right'} pb={8} h={44} mt={16}>
            {selected?.length > 0 ? (
              <>
                <Group spacing={12}>
                  <Text sx={{ fontWeight: 600 }}>{selected?.filter(Boolean).length} item selected</Text>
                  <Button variant='outline' color='red' onClick={handleDeleteSelected}>
                    Delete
                  </Button>
                </Group>
              </>
            ) : null}

            <Group spacing={12}>
              <Popover width={200} position={'bottom-end'} withArrow shadow='md'>
                <Popover.Target>
                  <Button
                    variant='outline'
                    sx={{ backgroundColor: '#fff', ':focus': { border: '2px solid red' } }}
                    rightIcon={<IconCaretDownFilled color='white' size='1.2rem' style={{ cursor: 'pointer' }} />}
                  >
                    {displayFields.length} currently selected
                  </Button>
                </Popover.Target>

                <Popover.Dropdown>
                  {keys.map((item, index) => (
                    <Group
                      key={index}
                      sx={{ borderRadius: 4, ':hover': { backgroundColor: 'rgb(220, 220, 228)' } }}
                      p={8}
                    >
                      <Checkbox
                        key={item}
                        checked={displayFields.includes(item)}
                        onChange={toggleDisplayField(item)}
                        label={item}
                        disabled={['id', 'name', 'checked'].includes(item) && true}
                        transitionDuration={0}
                        readOnly
                      />
                    </Group>
                  ))}
                </Popover.Dropdown>
              </Popover>

              <Popover width={200} position={'bottom-end'} withArrow shadow='md'>
                <Popover.Target>
                  <Button>
                    <IconSettings color='white' size='1.2rem' style={{ cursor: 'pointer' }} />
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size='sm'>This is uncontrolled popover, it is opened when button is clicked</Text>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Group>

          <Table highlightOnHover withBorder withColumnBorders bgcolor='white'>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) return setValues(data?.map((element: any) => element.id));

                      return setValues([]);
                    }}
                    checked={values.length === data?.length}
                    indeterminate={values.length < data?.length && values.length > 0}
                  />
                </th>
                {displayFields.map((feild, index) => (
                  <th style={{ textTransform: 'uppercase' }} key={index}>
                    {feild}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((element: any, index: any) => {
                  const CustomCellContent = ({ header, value }: any) => {
                    switch (header) {
                      case 'id':
                        return <Text>{element?.id}</Text>;
                      case 'name':
                        return (
                          <Text sx={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/students/${element.id}`)}>
                            {value}
                          </Text>
                        );
                      case 'createdAt':
                        return dayjs(value).format('DD-MM-YYYY');
                      case 'updatedAt':
                        return dayjs(value).format('DD-MM-YYYY');
                      case 'publishedAt':
                        return dayjs(value).format('DD-MM-YYYY');
                      case 'achievements':
                        return value.map((val: any) => <li key={val}>{val}</li>);
                      default:
                        return value;
                    }
                  };

                  return (
                    <tr key={element.id}>
                      <td width={40}>
                        <Checkbox
                          checked={values.includes(element.id)}
                          onChange={(e) => {
                            //  kiểm tra id đã có trong values hay chưa
                            const selectedItemIndex = values.indexOf(element.id);
                            if (selectedItemIndex !== -1) {
                              // Nếu có rồi, loại bỏ itemId khỏi selectedItems
                              setValues(values.filter((val: any) => val !== element.id));
                            } else {
                              // Nếu chưa có, thêm itemId vào selectedItems
                              setValues([...values, element.id]);
                            }
                          }}
                        />
                      </td>
                      {displayFields.map((header) => {
                        const value = element?.attributes[header];
                        return (
                          <td key={header}>
                            <CustomCellContent header={header} value={value} />
                          </td>
                        );
                      })}
                      <td width={100}>
                        <Group position='apart'>
                          <Tooltip label='Details'>
                            <ActionIcon onClick={() => router.push(`/admin/students/${element.id}`)}>
                              <IconPencil size='1rem' />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label='Delete'>
                            <ActionIcon onClick={() => openModal(element.id)}>
                              <IconTrash size='1rem' color='red' />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <Group position='apart' pt={16}>
            <Group>
              <Popover width={80} opened={popOpened}>
                <Popover.Target>
                  <Button
                    onClick={() => setPopOpened(true)}
                    variant='outline'
                    sx={{ backgroundColor: '#fff', ':focus': { border: '2px solid red' } }}
                    rightIcon={<IconCaretDownFilled color='white' size='1.2rem' style={{ cursor: 'pointer' }} />}
                  >
                    {pageSize}
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack spacing={2}>
                    {[2, 5, 10, 20].map((item, index) => {
                      return (
                        <Text
                          p={6}
                          key={index}
                          sx={{
                            cursor: 'pointer',
                            borderRadius: 4,
                            ':hover': { backgroundColor: 'rgb(220, 220, 228)' },
                          }}
                          onClick={() => {
                            setPopOpened(false);
                            setPageSize(item);
                          }}
                        >
                          {item}
                        </Text>
                      );
                    })}
                  </Stack>
                </Popover.Dropdown>
              </Popover>
              <Text>Entries per page</Text>
            </Group>

            <Pagination total={pagination?.pageCount} value={activePage} onChange={setActivePage} position='right' />
          </Group>
        </>
      )}
    </>
  );
};

export default StudentsPage;
