import ApiError from '@src/errors/api-error';
import NotFoundError from '@src/errors/not-found';
import Vendor, { IVendorDocument } from '@src/models/vendor.model';
import { IVendor } from '@src/models/vendor.model';
import { httpStatus } from '@src/utils/api.utils';
import { FilterQuery, QueryOptions } from 'mongoose';

/**
 * Create a vendor
 * @param {IVendor} data
 * @returns {Promise<IVendorDocument>}
 */
const create = async (data: Partial<IVendor>): Promise<IVendorDocument> => {
  if (await getByName(data.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return await Vendor.create(data);
};

/**
 * Get vendor by email
 * @param {string} id
 * @param {Array<Key>} select
 * @returns {Promise<IVendorDocument | null>}
 */
const getById = async (
  id?: string,
  fields: string[] = []
): Promise<IVendorDocument | null> => {
  return await Vendor.findById(id)
    .select(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    .exec();
};

/**
 * Get vendor by name
 * @param {string} name
 * @param {Array<string>} fields
 * @returns {Promise<IVendorDocument | null>}
 */
const getByName = async (
  name?: string,
  fields: string[] = []
): Promise<IVendorDocument | null> => {
  return await Vendor.findOne(
    {
      name,
    },
    {}
  )
    .select(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    .exec();
};

const getMany = async (
  query: FilterQuery<IVendorDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return await Vendor.find(query, {}, options).sort({ createdAt: -1 }).exec();
};

type VendorUpdateInput = Partial<IVendorDocument>;

/**
 * Update vendor by id
 * @param {string} id
 * @param {VendorUpdateInput} update
 * @param {Array<string>} fields
 * @returns {Promise<IVendorDocument | null>}
 */
const update = async (
  id: string,
  update: VendorUpdateInput,
  fields: string[] = []
): Promise<IVendorDocument | null> => {
  const existingVendor = await getById(id, ['id', 'name']);
  if (!existingVendor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vendor not found');
  }

  if (
    update.name &&
    (await getByName(update.name)) &&
    update.name !== existingVendor.name
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is already a vendor with that name'
    );
  }

  const updatedVendor = await Vendor.findByIdAndUpdate(id, update).select(
    fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  );

  return updatedVendor;
};

const remove = async (id: string) => {
  const targetVendor = await Vendor.findByIdAndDelete(id).exec();
  if (!targetVendor) {
    throw new NotFoundError('Vendor does not exist');
  }
};

export default { create, getMany, getById, update, remove };
