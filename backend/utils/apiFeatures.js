class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  
  filter() {
    const queryObj = {...this.queryString}; // create duplicate using destructuring
    const excludedFields = ['page','sort','limit','fields']; // fields to exclude
    excludedFields.forEach(el => delete queryObj[el]); // remove excluded fields from queryObj

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\bgte|gt|lte|lt\b/g, match => `$${match}`);
    
    this.query = this.query.find(JSON.parse(queryStr));
    
    return this;
  }
  
  sort() {
    // Sorting
    if(this.queryString.sort) {

      const sortBy = req.query.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    
    return this;
  }
  
  limitFields() {
    // Field limiting
    if(this.queryString.fields) {
      const fields = req.query.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // minus is for excluding
      
    }
    
    return this;
  }
  
  paginate() {
    // Pagination
    const page = this.queryString.page * 1 || 1; // change to int. Define default value with pipe
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit; 
    
    this.query = this.query.skip(skip).limit(limit);
    
    return this;
  }
}

module.exports = APIFeatures;