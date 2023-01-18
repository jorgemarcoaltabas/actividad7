import bcrypt from "bcrypt";
const saltRounds = 10;

const hash = (text: String): string => {
  return bcrypt.hashSync(String(text), saltRounds);
};

const compare = (text: String, encrypted: string): boolean => {
  return bcrypt.compareSync(String(text), encrypted);
};

export { hash, compare };
