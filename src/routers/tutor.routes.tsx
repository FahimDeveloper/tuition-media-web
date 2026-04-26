import {createElement} from 'react';
import {GridIcon, ListIcon, UserCircleIcon} from '@/icons';
import {lazy} from 'react';
import type {TPath} from '@/types/path';
import LazyLoad from '@/components/common/LazyLoad';

const TutorDashboard = LazyLoad(lazy(() => import('@/pages/Dashboard/Home')));
const UserProfiles = LazyLoad(lazy(() => import('@/pages/Dashboard/Profile')));
const CurrentStatus = LazyLoad(
  lazy(() => import('@/pages/Dashboard/History/CurrentStatus')),
);

const JobBoard = LazyLoad(
  lazy(() => import('@/pages/Dashboard/JobBoard/JobBoard')),
);

// Single source of truth for tutor dashboard routing and sidebar metadata.
export const tutorPath: TPath[] = [
  {
    index: true,
    name: 'Dashboard',
    icon: GridIcon,
    showInSidebar: true,
    element: <TutorDashboard />,
  },
  {
    path: 'profile',
    name: 'User Profile',
    icon: UserCircleIcon,
    showInSidebar: true,
    element: <UserProfiles />,
  },
  {
    path: 'job-board',
    name: 'Job Board',
    icon: ListIcon,
    showInSidebar: true,
    element: <JobBoard />,
  },
  {
    // This parent must own the `history` segment so its children resolve under
    // `/tutor/history/...`. The default redirect to the first child is handled
    // centrally inside `routesGenerator`.
    path: 'history',
    name: 'History',
    icon: GridIcon,
    showInSidebar: true,
    children: [
      {
        path: 'current-status',
        name: 'Current Status',
        showInSidebar: true,
        element: <CurrentStatus />,
      },
      {
        path: 'applied-jobs',
        name: 'Applied Jobs',
        showInSidebar: true,
        element: createElement('h1', null, 'Applied Jobs'),
      },
      {
        path: 'applied-opportunities',
        name: 'Applied Opportunities',
        showInSidebar: true,
        element: createElement('h1', null, 'Applied Opportunities'),
      },
      {
        path: 'shortlisted',
        name: 'Shortlisted Opportunities',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'appointed',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'confirmed',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'payment',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'due',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'refund',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
      {
        path: 'canceled',
        element: createElement('h1', null, 'Tuition Opportunities'),
      },
    ],
  },
  {
    path: 'verification',
    element: createElement('h1', null, 'Tuition Jobs'),
  },
  {
    path: 'settings',
    element: createElement('h1', null, 'Tuition Jobs'),
  },
];
