export type User = {
  name: string;
  age: number;
};

const users: User[] = [
  {
    name: "sabir",
    age: 27,
  },
  {
    name: "yamal",
    age: 19,
  },
  {
    name: "messi",
    age: 22,
  },
];

export const filterUsers = (name: string, age: number) => {
  return users.filter((user) => {
    return user.age === age && user.name === name;
  });
};
