import { Schema, Document } from 'mongoose';
import { User } from 'src/user/models/user.model';
import { Category } from './category.model';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    collection: 'Posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: string;
  description: string;
  content: string;
  user: User;
  category: Category;
}
