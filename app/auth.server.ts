import { createCookieSessionStorage } from '@remix-run/node';
import { and, eq, or } from 'drizzle-orm';
import { db } from 'drizzle/drizzle';
import { type User, getSelectableUserFields, userSchema } from 'drizzle/schema/user-schema';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

if (!process.env.AUTH_SECRET) {
    throw new Error('The AUTH_SECRET environment variable is required');
}

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.AUTH_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

export const auth = new Authenticator<User>(sessionStorage);

auth.use(
    new FormStrategy(async ({ form }) => {
        const identifier = form.get('identifier');
        const password = form.get('password');

        // replace the code below with your own authentication logic
        if (!password || typeof password !== 'string') {
            throw new AuthorizationError('Password is required');
        }
        if (!identifier || typeof identifier !== 'string') {
            throw new AuthorizationError('Email is required');
        }

        const users = await db
            .select(getSelectableUserFields)
            .from(userSchema)
            .where(
                and(
                    or(eq(userSchema.email, identifier), eq(userSchema.username, identifier))
                    // eq(userSchema.password, password)
                )
            );

        if (1 !== users.length) {
            throw new AuthorizationError('Invalid credentials');
        }

        return users[0];
    })
);
