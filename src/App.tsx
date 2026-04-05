import {Outlet} from 'react-router-dom';
// import {ScrollToTop} from '@/components/common/ScrollToTop';

const App = () => {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <Outlet />;
    </div>
  );
};

export default App;
