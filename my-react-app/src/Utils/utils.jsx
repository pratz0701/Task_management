const getSanitizedInput = (inputData = '', expectedType = '') => {
  let finalOutputPostSanitization = inputData.trim();

  switch (expectedType) {
    case 'task':
      finalOutputPostSanitization = finalOutputPostSanitization.replace(/[^a-zA-Z0-9\- ]/g, '');
      break;
    default:
      finalOutputPostSanitization = finalOutputPostSanitization.replace(/[<>]/g, '');
      break;
  }

  return finalOutputPostSanitization;
};

export { getSanitizedInput };
