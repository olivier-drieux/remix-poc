import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { auth, sessionStorage } from '~/auth.server';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const action = async ({ request }: ActionFunctionArgs) => {
    await auth.authenticate('form', request, {
        successRedirect: '/authenticated',
        failureRedirect: '/sign-in',
    });
};

type LoaderError = { message: string } | null;
export const loader = async ({ request }: LoaderFunctionArgs) => {
    await auth.isAuthenticated(request, { successRedirect: '/authenticated' });
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const error = session.get(auth.sessionErrorKey) as LoaderError;
    return { error };
};

export default function Screen() {
    const { error } = useLoaderData<typeof loader>();

    return (
        <>
            <Form method='post'>
                <div>
                    <label htmlFor='identifier'>Identifier</label>
                    <Input name='identifier' id='identifier' />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <Input type='password' name='password' id='password' />
                </div>
                <Button>Log In</Button>
                {error ? <div>{error.message}</div> : null}
            </Form>
        </>
    );
}
