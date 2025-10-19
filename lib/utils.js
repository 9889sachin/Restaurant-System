export function formatPrice(amount) {
  return `₹${amount.toFixed(2)}`;
}

export function isAdmin(session) {
  return session?.user?.role === "admin";
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
