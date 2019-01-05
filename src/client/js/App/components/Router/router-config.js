import Home from '../../pages/Home';
import About from '../../pages/About';
import Portfolio from '../../pages/Portfolio';
import Resume from '../../pages/Resume';
import Blog from '../../pages/Blog';
import Contact from '../../pages/Contact';
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
    label: translate('menu_routes_home_label'),
    component: Home,
    icon: HomeIcon,
    isDefault: true
  },
  about: {
    path: '/about-me',
    label: translate('menu_routes_about_label'),
    component: About,
    icon: NameplateIcon
  },
  portfolio: {
    path: '/portfolio',
    label: translate('menu_routes_portfolio_label'),
    component: Portfolio,
    icon: BriefcaseIcon
  },
  resume: {
    path: '/resume-and-skills',
    label: translate('menu_routes_resume_label'),
    component: Resume,
    icon: LaptopIcon
  },
  blog: {
    path: '/blog',
    label: translate('menu_routes_blog_label'),
    component: Blog,
    icon: NewspaperIcon
  },
  contact: {
    path: '/contact',
    label: translate('menu_routes_contact_label'),
    component: Contact,
    icon: EnvelopeIcon
  }
};

export const defaultRoute =
  routesConfig[
    Object.keys(routesConfig).find(routeKey => routesConfig[routeKey].isDefault)
  ];

const routes = Object.keys(routesConfig).map(routeKey => ({
  name: routeKey,
  ...routesConfig[routeKey]
}));

export default routes;
