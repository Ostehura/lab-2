import { Posts } from '../posts/posts.entity';
import { Components } from './components';

export const resource = {
  resource: Posts,
  options: {
    properties: {
      title: {
        type: 'string',
        components: {
          edit: Components.ItalicInput,
        },
      },
    },
  },
};
