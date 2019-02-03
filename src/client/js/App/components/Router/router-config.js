import Home from '../../pages/Home';
import About from '../../pages/About';
import Portfolio from '../../pages/Portfolio';
import Resume from '../../pages/Resume';
import Blog from '../../pages/Blog';
import Contact from '../../pages/Contact';
import ProjectDetails from '../../pages/ProjectDetails';
import { translate } from '../../i18n';

import HomeIcon from './icons/Home';
import BriefcaseIcon from './icons/Briefcase';
import NameplateIcon from './icons/Nameplate';
import LaptopIcon from './icons/Laptop';
import NewspaperIcon from './icons/Newspaper';
import EnvelopeIcon from './icons/Envelope';

const routesConfig = {
  home: {
    path: '/home',
    component: Home,
    inMenu: true,
    icon: HomeIcon,
    label: translate('menu_routes_home_label'),
    isDefault: true
  },
  about: {
    path: '/about-me',
    component: About,
    inMenu: true,
    label: translate('menu_routes_about_label'),
    icon: NameplateIcon
  },
  project: {
    path: '/portfolio/:projectId',
    component: ProjectDetails
  },
  portfolio: {
    path: '/portfolio',
    component: Portfolio,
    inMenu: true,
    label: translate('menu_routes_portfolio_label'),
    icon: BriefcaseIcon
  },
  resume: {
    path: '/resume-and-skills',
    component: Resume,
    inMenu: true,
    label: translate('menu_routes_resume_label'),
    icon: LaptopIcon
  },
  blog: {
    path: '/blog',
    component: Blog,
    inMenu: true,
    label: translate('menu_routes_blog_label'),
    icon: NewspaperIcon
  },
  contact: {
    path: '/contact',
    component: Contact,
    inMenu: true,
    label: translate('menu_routes_contact_label'),
    icon: EnvelopeIcon
  }
};

export const defaultRoute =
  routesConfig[
    Object.keys(routesConfig).find(routeKey => routesConfig[routeKey].isDefault)
  ];

export const getRoutePath = (routeName, params = {}) => {
  let path = routesConfig[routeName] && routesConfig[routeName].path;
  if (!path) {
    return null;
  }

  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};

const routes = Object.keys(routesConfig).map(routeKey => ({
  name: routeKey,
  ...routesConfig[routeKey]
}));

export default routes;
