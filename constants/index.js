import { chat, dashboard, logout, profile, people } from '/public/assets';

export const navlinks = [
  {
    name: '/',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: '/Chat',
    imgUrl: chat,
    link: '/Chat',
  },
  {
    name: '/People',
    imgUrl: people,
    link: '/People',
  },
  {
    name: '/Profile',
    imgUrl: profile,
    link: '/Profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
