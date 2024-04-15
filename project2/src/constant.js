export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    REQUIRED_MESSAGES: 'requiredMessage'
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Error: Network cannot connect',
    [SERVER.AUTH_INSUFFICIENT]: 'Error: Invalid user',
    [SERVER.REQUIRED_USERNAME]: 'Error: Username required',
    default: 'Something went wrong.  Please try again',
  };
  