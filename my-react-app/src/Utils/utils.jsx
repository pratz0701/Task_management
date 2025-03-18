const getSanitizedInput = (inputData, expectedType) => {
    let finalOutputPostSanitization = inputData.trim();
  
    switch (expectedType) {
      case 'task':
        finalOutputPostSanitization = inputData.replace(/[^a-zA-Z0-9-]/g, '');
        break;
      case 'authentication':
        finalOutputPostSanitization = inputData.replace(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{5}$/, '');
        break;
      default:
        break;
    }
    return finalOutputPostSanitization;
  };

  export{
    getSanitizedInput
  }