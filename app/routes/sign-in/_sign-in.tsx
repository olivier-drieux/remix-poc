import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { auth, sessionStorage } from '~/auth.server';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

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

export default function SignIn() {
    const { error } = useLoaderData<typeof loader>();

    return (
        <>
            <Form method='post'>
                <div>
                    <Label htmlFor='identifier'>Identifier</Label>
                    <Input name='identifier' id='identifier' />
                </div>

                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' id='password' />
                </div>
                <Button>Log In</Button>
                {error ? <div>{error.message}</div> : null}
            </Form>
        </>
    );
}
