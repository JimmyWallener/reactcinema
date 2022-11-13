import bcrypt from 'bcryptjs-react';

export const saltedPassword = async (password: string): Promise<string> => {
  return await bcrypt
    .hash(password, bcrypt.genSaltSync(10))
    .then((hash) => hash);
};

// async function that returns a promise after comparing the password
export const matchPassword = async (
  storedPassword: string,
  inputPassword: string
) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};
