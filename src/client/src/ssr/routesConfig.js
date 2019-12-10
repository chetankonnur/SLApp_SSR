import LandingComponent from '../components/pages/landing/components/LandingComponent';
import AboutComponent from '../components/pages/about/components/AboutComponent';

export default [
  {
    path: "/",
    component: LandingComponent,
    exact: true,
  },
  {
    path: '/about',
    component: AboutComponent,
    exact: true,
  }
];