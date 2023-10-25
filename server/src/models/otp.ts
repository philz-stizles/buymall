import otpGenerator from 'otp-generator';
import { Model, Schema, model } from 'mongoose';
import config from '@src/config';
import moment, { Moment } from 'moment';

export enum OtpType {
  ACCESS,
  REFRESH,
  RESET_PASSWORD,
  VERIFY_EMAIL,
}

// Create an interface representing a document in MongoDB.
export interface IOtp {
  _id: string;
  userId?: string;
  code: string;
  expiresAt: number;
  type: OtpType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOtpDocument extends IOtp, Document {
  verify: (candidatePassword: string) => Promise<boolean>;
}

export interface IOtpModel extends Model<IOtpDocument> {
  generate(): Promise<string>;
  build(userId: string, type: OtpType, expiresAt: Moment): Promise<string>;
}

// Put as much business logic in the models to keep the controllers as simple and lean as possible
// 2. Create a Schema corresponding to the document interface.
const otpSchema = new Schema<IOtpDocument, IOtpModel>(
  {
    userId: String,
    code: { type: String, required: true },
    expiresAt: { type: Number, required: true },
    type: String,
    isActive: { type: Boolean, default: true, select: false },
  },
  {
    timestamps: true,
  }
);

/**
 * Generate Otp
 * @param {string} userId
 * @param {Moment} expiresAt
 * @param {OtpType} type
 * @returns {string}
 */
otpSchema.statics.generate = async function () {
  // You can use arrow functions here as we will not be requiring
  // the 'this' reference
  function generate() {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  }

  let code = generate();
  let existingOtp = await this.findOne({ code });
  while (existingOtp) {
    code = generate();
    existingOtp = await this.findOne({ code });
  }

  return code;
};

/**
 * Generate otp
 * @param {string} userId
 * @param {Moment} expiresAt
 * @param {OtpType} type
 * @returns {IOtpDocument}
 */
otpSchema.statics.build = async (
  userId: string,
  type: OtpType,
  expiresAt: Moment
) => {
  const code = await Otp.generate();
  const newOtp = new Otp({
    userId,
    code,
    type,
    expiresAt: expiresAt.toDate(),
  });
  await newOtp.save();

  return newOtp.code;
};

const Otp = model<IOtpDocument, IOtpModel>('Otp', otpSchema);

export default Otp;
