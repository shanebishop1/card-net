export function getPrettyTime(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const fullDate = new Date(date);
    return fullDate.toLocaleDateString("en-US", options);
  }


  