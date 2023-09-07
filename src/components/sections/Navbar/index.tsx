'use client';

import { Navbar as BaseNavbar, NavLink, ScrollArea, createStyles } from '@mantine/core';
import { IconBuildingCommunity, IconCalendarEvent, IconSchool } from '@tabler/icons-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const Navbar = () => {
  const { classes } = useStyles();
  const segment = useSelectedLayoutSegment();

  return (
    <BaseNavbar width={{ base: 200 }}>
      <BaseNavbar.Section grow component={ScrollArea}>
        <Link href={`/admin/students`} className={classes.link}>
          <NavLink
            icon={<IconSchool size='1rem' stroke={1.5} />}
            label='Students'
            defaultOpened
            active={segment === 'students'}
          />
        </Link>
        <Link href={`/admin/companies`} className={classes.link}>
          <NavLink
            icon={<IconBuildingCommunity size='1rem' stroke={1.5} />}
            label='Companies'
            defaultOpened
            active={segment === 'companies'}
          />
        </Link>
        <Link href={`/admin/actions`} className={classes.link}>
          <NavLink
            icon={<IconCalendarEvent size='1rem' stroke={1.5} />}
            label='Event'
            defaultOpened
            active={segment === 'actions'}
          />
        </Link>
      </BaseNavbar.Section>
    </BaseNavbar>
  );
};

export default Navbar;

const useStyles = createStyles((_theme) => ({
  link: { textDecoration: 'none' },
}));
