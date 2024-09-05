import DashboardNav from '../DashboardNav/DashboardNav';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <div className='w-64'>
                <DashboardNav/>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;