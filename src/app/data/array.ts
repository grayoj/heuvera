import {
  Calendar,
  GitGraph,
  House,
  LifeBuoy,
  Star,
  User,
  Wallet,
} from 'lucide-react';

export const sideBar = [
  {
    name: 'Personal Info',
    route: '',
    description:
      'Update your profile, contact details, and preferences to personalize your experience.',
  },
  {
    route: 'booking',
    name: 'Booking History',
    description:
      'View and manage your past, current, and upcoming bookings in one place.',
  },
  {
    route: 'payment',
    name: 'Payment Methods',
    description:
      'Securely manage and update your preferred payment options for smooth transactions.',
  },
  {
    route: 'support',
    name: 'Support & Assistance',
    description:
      'Get help, contact support, and access resources to enhance your experience.',
  },
];

export const sideBarAdmin = [
  {
    name: 'Personal Info',
    route: '/',
    description:
      'Update your profile, contact details, and preferences to personalize your experience.',
    icon: User,
  },
  {
    route: 'property',
    name: 'Property Listings',
    description:
      'Manage and view all properties you’ve listed for rent or lease.',
    icon: House,
  },
  {
    route: 'booking',
    name: 'Booking Mangement',
    description: 'Track upcoming, ongoing, and past bookings in one place',
    icon: Calendar,
  },
  {
    route: 'earnings',
    name: 'Earnings & Payouts',
    description:
      'Monitor your earnings, track pending payments, and manage payout preferences.',
    icon: Wallet,
  },
  {
    route: 'review',
    name: 'Reviews & Ratings',
    description:
      'View guest feedback, monitor your ratings, and maintain your reputation.',
    icon: Star,
  },
  {
    route: 'insights',
    name: 'Property Insights',
    description:
      'Analyze booking trends, occupancy rates, and performance metrics for your listings. ',
    icon: GitGraph,
  },
  {
    route: 'support',
    name: 'Support & Assistance',
    description:
      'Access help articles, contact support, or resolve issues with your listings. ',
    icon: LifeBuoy,
  },
];

export const personInput = [
  { label: 'First name', value1: 'George', label2: 'Last name', value2: 'Doe' },
  {
    label: 'Email',
    value: 'ftgeorgean@gmail.com',
    primaryBtn: 'Change email',
    secondaryBtn: 'Add another phone number',
  },
  {
    label: 'Phone Number',
    value: '+234 704 953 2023',
    primaryBtn: 'Change phone number',
    secondaryBtn: 'Add another email',
  },
  {
    label: 'Address',
    primaryBtn: 'Change address',
    value: 'No.2 West Street, Nursing Estate, Karu, Abuja',
    secondaryBtn: 'Add another address',
  },
];

export const pastBookings = [
  {
    image: 'hheye',
    name: 'George’s Semi Detached',
    location: 'Behind Block C, Abuja',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    status: 'Pending',
    pricePaid: '50,000',
    noOfGuests: 3,
  },
  {
    image: 'hheye',
    name: 'George’s Semi Detached',
    location: 'Behind Block C, Abuja',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    status: 'Pending',
    pricePaid: '50,000',
    noOfGuests: 3,
  },
];

export const adminBookings = [
  {
    guestName: 'Godiwn Praise',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    propertyName: 'George duplex',
    status: 'Pending',
  },
  {
    guestName: 'Godiwn Praise',
    date: 'Mar 12, 2025 - Mar 21, 2025',
    propertyName: 'George duplex',
    status: 'Pending',
  },
];

export const help = [
  {
    title: 'Some information isn’t displayed',
    description:
      'Rest assured, we’ve taken steps to safeguard your identity by noy displaying certain account details',
  },
  {
    title: 'Some information isn’t displayed',
    description:
      'Rest assured, we’ve taken steps to safeguard your identity by noy displaying certain account details',
  },
];

export const inputs = [
  { name: 'Full Name', value: 'John Doe' },
  { name: 'Email', value: 'george' },
];

export const propertyListings = [
  {
    image: '',
    price: '#50,000',
    address: '3617 W.Gray St. Utica',
    noOfBeds: 2,
    noOfBaths: 2,
    measurement: '60m^2',
  },
];

export const earnings = [
  {
    heading: 'Total Earnings',
    amount: '₦2,500,000',
    percent: 45,
  },
  {
    heading: 'Pending Payout',
    amount: '₦2,500,000',
    percent: 35,
  },
  {
    heading: 'Available Balance',
    amount: '₦2,500,000',
    percent: 47,
  },
];


export const earningsTable=[
  {
    method: 'Bank Transfer',
    date: 'Mar 12, 2025',
    amount: '₦2,500,000',
    status: 'Pending'
  },
  {
    method: 'Bank Transfer',
    date: 'Mar 12, 2025',
    amount: '₦2,500,000',
    status: 'Completed'
  }
]