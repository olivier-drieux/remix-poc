import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { auth } from '~/auth.server';
import { Button } from '~/components/ui/button';

export async function action({ request }: ActionFunctionArgs) {
    await auth.logout(request, { redirectTo: '/sign-in' });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await auth.isAuthenticated(request, {
        failureRedirect: '/sign-in',
    });

    return { user };
};

export default function Authenticated() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <div className='w-screen h-full flex flex-col items-center justify-center gap-4'>
            <h1 className='text-4xl text-center'>
                Welcome <b>{user.username}</b>, you are authenticated! 🎉
            </h1>
            <Form method='post'>
                <Button>Logout</Button>
            </Form>
        </div>
    );
}
