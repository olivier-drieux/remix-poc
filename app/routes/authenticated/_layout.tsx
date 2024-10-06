import { Outlet } from '@remix-run/react';
import type { LoaderFunctionArgs } from 'react-router';
import { auth } from '~/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return auth.isAuthenticated(request, {
        failureRedirect: '/sign-in',
    });
};

export default function AuthenticatedLayout() {
    return <Outlet />;
}
