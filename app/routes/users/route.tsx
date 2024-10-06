import type { MetaFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { db } from 'drizzle/drizzle';
import { type User, getSelectableUserFields, userSchema } from 'drizzle/schema/user-schema';
import { Suspense } from 'react';
import UsersTable from './users-table';

export const meta: MetaFunction = () => {
    return [
        { title: 'Table POC' },
        { name: 'description', content: 'A proof of concept for Table component with Remix' },
    ];
};

export async function loader() {
    return {
        users: new Promise((resolve) => {
            setTimeout(() => {
                resolve(db.select(getSelectableUserFields).from(userSchema).execute());
            }, 2000);
        }) as Promise<User[]>,
    };
}

export default function Users() {
    const loaderData = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>Users</h1>
            <Suspense fallback={<div>loading...</div>}>
                <Await resolve={loaderData.users}>{(users) => <UsersTable users={users} />}</Await>
            </Suspense>
        </div>
    );
}
