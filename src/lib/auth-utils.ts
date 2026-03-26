export const getUserFromRequest = (request: Request) => {
  const userHeader = request.headers.get("x-user");

  if (!userHeader) return null;

  try {
    return JSON.parse(userHeader);
  } catch {
    return null;
  }
};