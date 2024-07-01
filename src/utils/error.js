exports.httpError = (res, message, error) => {
    console.error(error);
    res.status(500).json({ error: message });
  };
  

  