import { DataSourceContext } from "../../context.js";
import {
  comparePasswords,
  createJWT,
  hashPassword,
} from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const signIn: MutationResolvers["signIn"] = async (
  _,
  { username, password },
  { dataSources }: DataSourceContext
) => {
  try {
    const user = await dataSources.db.user.findFirstOrThrow({
      where: { username },
    });
    const isValidPassword = comparePasswords(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = createJWT(user);

    return {
      code: 200,
      message: "User is signed in",
      success: true,
      token,
    };
  } catch {
    return {
      code: 401,
      message: "bah non",
      success: false,
      token: null,
    };
  }
};

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { username, password },
  { dataSources }: DataSourceContext
) => {
  try {
    const createdUser = await dataSources.db.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });

    return {
      code: 201,
      message: `User ${username} has been created`,
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username,
      },
    };
  } catch {
    return {
      code: 400,
      message: "Something bad happened",
      success: false,
      user: null,
    };
  }
};
