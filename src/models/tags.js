import bookshelf from '../db';
import todo from '../models/todo';



const TABLE_NAME = 'tags';

/**
 * User model.
 */
class Tags extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  todo(){
    return this.belongsToMany(todo);
  }
}

export default Tags;
