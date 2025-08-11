
const generateRandomString = (length) => {
  let result = '';
  const characters =
    'abcdefghijklmnopqrstuvwxyz0123456789-';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

let randomString = generateRandomString(32);

const PrintTimestamp = () => {
    const currentDate = new Date();
    //const randomString = Math.floor(Math.random() * currentDate).toString(36);
    const formattedDate = currentDate.toISOString();
    console.log(`${formattedDate}: ${randomString}`);
}

setInterval(PrintTimestamp, 5000);
