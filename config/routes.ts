export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/questionnaire',
    name: '问诊管理',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/category',
    name: '诊疗项目设置',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/result',
    name: '诊断结果',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/pay',
    name: '付款管理',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/sys/wx',
        name: '微信用户',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/sys/patient',
        name: '就诊用户',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/sys/role',
        name: '角色管理',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/sys/user',
        name: '系统用户',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
