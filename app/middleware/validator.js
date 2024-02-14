export const validateTokenRequest = (req, res, next) => {
    const err = {};
  
    if (!req.body.email) {
      err.message = "Email field is required.";
    } else
    // validate email format using regex
    if (!/^\S+@\S+\.\S+$/.test(req.body.email)) {
      err.message = 'Invalid email address format.'
    } else
  
    if (!req.body.password) {
      err.message = "Password is required";
    } 
    
    if (Object.keys(err).length > 0) {
      return res.status(422).json(err);
    }
  
    next();
  };