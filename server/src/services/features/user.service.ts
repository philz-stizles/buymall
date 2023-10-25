import ApiError from '@src/errors/api-error';
import Role, { RoleType } from '@src/models/role.model';
import User, { IUserDocument } from '@src/models/user.model';
import { IUser } from '@src/models/user.model';
import { httpStatus } from '@src/utils/api.utils';

/**
 * Create a user
 * @param {IUser} data
 * @returns {Promise<IUserDocument>}
 */
const create = async (data: Partial<IUser>): Promise<IUserDocument> => {
  if (await getUserByEmail(data.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const role = await Role.findOne({ name: 'VENDOR' });

  return await User.create({...data, roles: [role]});
};

/**
 * Get user by email
 * @param {string} id
 * @param {Array<Key>} select
 * @returns {Promise<IUserDocument | null>}
 */
const getById = async (
  id?: string,
  select?: string[]
): Promise<IUserDocument | null> => {
  return await User.findById(id).exec();
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<string>} fields
 * @returns {Promise<IUserDocument | null>}
 */
const getUserByEmail = async (
  email?: string,
  fields: string[] = []
): Promise<IUserDocument | null> => {
  return await User.findOne(
    {
      email,
    },
    {}
  )
    .select(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    .exec();
};

type UserUpdateInput = Partial<
  Pick<IUserDocument, 'email' | 'isEmailVerified'>
>;

/**
 * Update user by email
 * @param {string} email
 * @param {UserUpdateInput} update
 * @param {Array<string>} fields
 * @returns {Promise<IUserDocument | null>}
 */
const updateUserByEmail = async (
  email: string,
  update: UserUpdateInput,
  fields: string[] = []
): Promise<IUserDocument | null> => {
  const existingUser = await getUserByEmail(email, ['id', 'email', 'name']);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    update.email &&
    (await getUserByEmail(update.email as string)) &&
    update.email !== email
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const updatedUser = await User.findOneAndUpdate({ email }, update).select(
    fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  );

  return updatedUser;
};

export default { create, getById,  getUserByEmail, updateUserByEmail };
