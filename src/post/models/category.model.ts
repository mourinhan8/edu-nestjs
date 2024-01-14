import { Schema, Document } from 'mongoose';
import { Post } from './post.model';

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    collection: 'Categories',
  },
);

export { CategorySchema };

export interface Category extends Document {
  title: string;
  posts: [Post];
}
