// src/lib/getUsers.ts

export async function getUsersFromAuth0() {
  const res = await fetch(
    `https://${process.env.AUTH0_MGMT_DOMAIN}/oauth/token`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_MGMT_CLIENT_ID,
        client_secret: process.env.AUTH0_MGMT_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_MGMT_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  const { access_token } = await res.json();

  const userRes = await fetch(
    `https://${process.env.AUTH0_MGMT_DOMAIN}/api/v2/users`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!userRes.ok) throw new Error("Kullanıcılar getirilemedi");

  return userRes.json();
}
