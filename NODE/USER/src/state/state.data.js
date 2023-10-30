let sentEmail = false;

const setSentEmail = (boolean) => {
  //settea el estado del sentEmail segun lo que le pases a databoolean
  sentEmail = boolean;
};

const getSentEmail = () => {
  //te devuelve el estado de sentEmail
  return sentEmail;
};

module.exports = { setSentEmail, getSentEmail };
