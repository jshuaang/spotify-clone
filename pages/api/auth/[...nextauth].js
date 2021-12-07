import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

function refreshAccessToken(token){
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body:refreshedToken } =  spotifyApi.refreshAccessToken(token);

    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      accessTokenExpires: refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken,
    }

  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt ({token, user, account}) {
      // initial sign in
      if( account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          ...user
        }
      }

      // return and token has not expired
      if(Date.now() < token.accessTokenExpires){
        return token
      }

      // access token expired & update it
      return await refreshAccessToken(token)
    },
    async session({session, token}) {
      session.user.accessToken = token.accessToken,
      session.user.refreshToken = token.refreshToken,
      session.user.username = token.username

      return session;
    }
  }
})