const bcrypt = require('bcrypt');
const wrongPassword = 'passwOrd';
const unsecurePlainTextPassword = 'password';
const saltRounds = 10;

/**
 * Compare passwords and log to the console if password is the correct one.
 * @param {String} pass - The raw password string.
 * @param {String} hash - The hashed/encrypted string.
 */
const comparePass = (pass, hash) => {
  const correct = bcrypt.compareSync(pass, hash);
  console.log('Correct password: ', correct);
  console.log(bcrypt.getRounds(hash).toString(), 'rounds of salt were used to encrypt this.');
}

/**
 * Generate a password hash using 10 saltRounds.
 * Also compare password to see how bcrypt works.
 */
bcrypt.hash(unsecurePlainTextPassword, saltRounds)
  .then(hash => {
    console.log(hash);
    return  hash;
  })
  .then(hash => {
    console.log('Testing correct pass...');
    comparePass(unsecurePlainTextPassword, hash);
    return hash;
  })
  .then(hash => {
    console.log('Testing wrong pass...');
    comparePass(wrongPassword, hash);
  })
  .catch(error => {
    console.error(error);
  });
