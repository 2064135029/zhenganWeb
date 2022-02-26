const otherRutes = [
  {
    path: '/questionnaire/add',
    name: '新增问诊',
    icon: 'smile',
    hideInMenu: true,
    component: './Questionnaire/components/AddQue',
  },
];

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
    component: './Questionnaire',
  },
  {
    path: '/category',
    name: '诊疗项目设置',
    icon: 'smile',
    component: './Category',
  },
  {
    path: '/result',
    name: '诊断结果',
    icon: 'smile',
    component: './Result',
  },
  {
    path: '/pay',
    name: '付款管理',
    icon: 'smile',
    component: './PayManage',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'crown',
    routes: [
      {
        path: '/sys/wx',
        name: '微信用户',
        icon: 'smile',
        component: './SystemManage/WxUser',
      },
      {
        path: '/sys/patient',
        name: '就诊用户',
        icon: 'smile',
        component: './SystemManage/Patient',
      },
      {
        path: '/sys/role',
        name: '角色管理',
        icon: 'smile',
        component: './SystemManage/Role',
      },
      {
        path: '/sys/user',
        name: '系统用户',
        icon: 'smile',
        component: './SystemManage/User',
      },
      {
        component: './404',
      },
    ],
  },
  ...otherRutes,
  {
    path: '/',
    redirect: '/questionnaire',
  },
  {
    component: './404',
  },
];
