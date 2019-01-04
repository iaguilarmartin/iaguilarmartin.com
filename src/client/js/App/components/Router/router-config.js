import Home from '../../pages/Home';
import About from '../../pages/About';
import Portfolio from '../../pages/Portfolio';
import Resume from '../../pages/Resume';
import Blog from '../../pages/Blog';
import Contact from '../../pages/Contact';

import HomeIcon from './icons/Home';
import BriefcaseIcon from './icons/Briefcase';
import NameplateIcon from './icons/Nameplate';
import LaptopIcon from './icons/Laptop';
import NewspaperIcon from './icons/Newspaper';
import EnvelopeIcon from './icons/Envelope';

const routesConfig = {
  home: {
    path: '/home',
    label: 'Home',
    component: Home,
    icon: HomeIcon,
    isDefault: true
  },
  about: {
    path: '/about-me',
    label: 'About',
    component: About,
    icon: NameplateIcon
  },
  portfolio: {
    path: '/portfolio',
    label: 'Portfolio',
    component: Portfolio,
    icon: BriefcaseIcon
  },
  resume: {
    path: '/resume-and-skills',
    label: 'Resume',
    component: Resume,
    icon: LaptopIcon
  },
  blog: {
    path: '/blog',
    label: 'Blog',
    component: Blog,
    icon: NewspaperIcon
  },
  contact: {
    path: '/contact',
    label: 'Contact',
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
