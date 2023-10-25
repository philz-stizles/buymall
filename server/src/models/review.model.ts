import { Schema, Types, model, Document, PopulatedDoc } from 'mongoose';
import Product, { IProductDocument } from '@src/models/product.model';
import { IUserDocument } from '@src/models/user.model';

// Put as much business logic in the models to keep the controllers as simple
// and lean as possible

export interface IReviewDocument extends Document {
  review: string;
  rating: number;
  product: PopulatedDoc<IProductDocument & Document>;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  createdAt: string;
  updatedAt: string;
}

const reviewSchema = new Schema(
  {
    review: { type: String, required: [true, 'Review cannot be empty'] },
    rating: { type: Number, min: 1, max: 5 },
    product: {
      type: Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must have a tour'],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must have a createdBy'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // This makes sure that when we have a virtual property( i.e. a field that is not
    // stored in the DB but calculated using some other value) to show up whenever there is an output
    toObject: { virtuals: true }, // The same as above
  }
);

reviewSchema.index({ tour: 1, createdBy: 1 }, { unique: true }); // Every review must
// have a unique combination tour and createdBy, thus preventing dublicate reviews -
// multiple reviews from same user

reviewSchema.pre(/^find/, function (next) {
  // this
  //     .populate({ path: 'tour', select: 'name -_id' }) // First query
  //     .populate({ path: 'createdBy', select: 'name photo -_id' }); // Second query // Rather than duplicating the populate query
  // // for every static method you use to retrieve the Model data, define it as a pre method and it will apply
  // // for all find queries - findById, findOne etc

  // It might not be necessary to display Tour, depending on your business model
  this.populate({ path: 'createdBy', select: 'name photo -_id' });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$tour',
        ratingCount: { $sum: 1 },
        ratingAvg: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].ratingCount,
      ratingsAverage: stats[0].ratingAvg,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// reviewSchema.post('save', function () {
//   const review = this as IReviewDocument;
//   this.constructor.calcAverageRatings(review.product);
// });

// reviewSchema.pre(/^findOneAnd/, async function () {
//   this.review = await review.findOne();
//   console.log(this.review);
//   next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
//   const review = this as IReviewDocument;
//   await review.review.constructor.calcAverageRatings(this.review.tour);
// });

const Review = model<IReviewDocument>('Reviews', reviewSchema);

export default Review;
