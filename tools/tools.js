export function today() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate);
  return currentDate;
}

export function thisMonth() {
  const date = new Date();

  return date.getMonth() + 1;
}
