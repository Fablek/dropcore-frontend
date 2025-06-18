export interface UserSpaceInfo {
  email: string;
  usedSpace: number;
  spaceLimit: number;
}

export async function fetchUserInfo(email: string): Promise<UserSpaceInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/users/${encodeURIComponent(email)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return res.json();
}
