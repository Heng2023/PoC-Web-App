import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: "web-client", 
      clientSecret: "EhBsRrU1P7UQBAtOcHRcXJx6sSaszerf", // Replace with your actual client secret
      issuer: "http://localhost:8080/realms/Hune_user"
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }  
});

export { handler as GET, handler as POST };