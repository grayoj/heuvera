import { GET as getListings } from './_get';
import { POST as createListing } from './_post';
import { PATCH as updateListing } from './_patch';
import { DELETE as deleteListing } from './_delete';

export {
  getListings as GET,
  createListing as POST,
  updateListing as PATCH,
  deleteListing as DELETE,
};
