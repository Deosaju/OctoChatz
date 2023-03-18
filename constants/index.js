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
    name: '/Profile',
    imgUrl: profile,
    link: '/Profile',
  },

  {
    name: '/People',
    imgUrl: people,
    link: '/People',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
