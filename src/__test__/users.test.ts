import { getUserByEmail } from "../queries/userQueries";

describe("get users", () => {
  it("should  get user by email", () => {
    getUserByEmail("mrsabir4@gmail.com");
  });
});
