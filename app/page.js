'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const callApi = async () => {
    if (!session) return;
    const res = await fetch('http://localhost:8081/api/private', {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });
    const data = await res.text();
    alert(data);
  };

  const handleLogout = async () => {
    if (!session) return;

    try {
      // Clear NextAuth session
      await signOut({ redirect: false });

      // Redirect to Keycloak logout URL
      const keycloakLogoutUrl = `http://localhost:8080/realms/Hune_user/protocol/openid-connect/logout?redirect_uri=http://localhost:3000`;
      window.location.href = keycloakLogoutUrl; // Redirect to Keycloak to logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn('keycloak')}>Sign In</button>
      )}
    </div>
  );
}