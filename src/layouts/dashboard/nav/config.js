// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Slider',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Portafolio',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Noticias',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'PQRSD',
    path: '/dashboard/pqrs',
    icon: icon('ic_mail'),
  },
  {
    title: 'Contratación',
    path: '/dashboard/contracts',
    icon: icon('ic_lock'),
  },
  {
    title: 'Control interno',
    path: '/dashboard/internal-control',
    icon: icon('ic_lock'),
  },
  {
    title: 'Contabilidad',
    path: '/dashboard/financial',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
