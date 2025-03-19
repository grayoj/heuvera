import { GET as getBookings } from './_get';
import { POST as createBooking } from './_post';
import { DELETE as cancelBooking } from './_delete';

export { getBookings as GET, createBooking as POST, cancelBooking as DELETE };
