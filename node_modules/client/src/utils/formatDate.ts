export const formatDate = (
  date: string | Date
): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const formatDateTime = (
  date: string | Date
): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

export const timeAgo = (
  date: string | Date
): string => {
  const now = new Date().getTime();
  const then = new Date(date).getTime();

  const diffInSeconds = Math.floor(
    (now - then) / 1000
  );

  if (diffInSeconds < 60) return "just now";

  const diffInMinutes = Math.floor(
    diffInSeconds / 60
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${
      diffInMinutes === 1 ? "" : "s"
    } ago`;
  }

  const diffInHours = Math.floor(
    diffInMinutes / 60
  );

  if (diffInHours < 24) {
    return `${diffInHours} hour${
      diffInHours === 1 ? "" : "s"
    } ago`;
  }

  const diffInDays = Math.floor(
    diffInHours / 24
  );

  if (diffInDays < 30) {
    return `${diffInDays} day${
      diffInDays === 1 ? "" : "s"
    } ago`;
  }

  return formatDate(date);
};