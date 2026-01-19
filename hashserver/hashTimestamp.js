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


const PrintTimestamp = () => {
    const currentDate = new Date();
    //const randomString = Math.floor(Math.random() * currentDate).toString(36);
    const formattedDate = currentDate.toISOString();
    const finalHashStamp = `${formattedDate}: ${generateRandomString(32)}`;
    return finalHashStamp;
}

module.exports = {generateRandomString, PrintTimestamp}