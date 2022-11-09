
// Layouts
import HeaderOnly from '../layouts/HeaderOnly';

// Pages
import Dictionary from '../pages/Dictionary';

// Public routes
const publicRoutes = [
    { path: '/', component: Dictionary, layout: HeaderOnly },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };