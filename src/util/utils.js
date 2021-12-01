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

export async function getBase64(file) {
  try {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (err) {
    console.log("File Reader Error: ", err);
  }
}
