import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

const Dashboard = function({ auth }) {
    return (
        <>
            <Head title="Dashboard"/>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in, {auth.user.name}!</div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <AuthenticatedLayout children={page}/>

export default Dashboard;
