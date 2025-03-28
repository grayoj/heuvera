import { GET as getFavourites } from "./_get";
import { POST as createFavourites } from "./_post";
import { DELETE as cancelFavourites } from "./_delete";

export {
  getFavourites as GET,
  createFavourites as POST,
  cancelFavourites as DELETE,
};
