import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Tailwind,
} from '@react-email/components';

interface BookingCancellationEmailProps {
  guestName: string;
  propertyName: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
}

export default function BookingCancellationEmailTemplate({
  guestName,
  propertyName,
  propertyLocation,
  checkInDate,
  checkOutDate,
}: BookingCancellationEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Your booking at {propertyName} has been cancelled</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-lg mx-auto bg-[#F3F2ED] shadow-lg rounded-md p-8 text-center">
            <div>
              <img
                src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi"
                alt="Heuvera"
                width="50"
                className="mx-auto"
              />
            </div>

            <Text className="text-2xl font-semibold text-gray-900 mt-6">
              Hi {guestName}, your booking has been cancelled. 😔
            </Text>

            <Text className="text-gray-700 leading-relaxed">
              We’re sorry to inform you that your booking at{' '}
              <strong>{propertyName}</strong> has been cancelled. Here were your
              stay details:
            </Text>

            <div className="bg-gray-100 p-4 rounded-lg text-left mt-4">
              <Text className="text-gray-900 font-semibold">
                Cancelled Booking Details:
              </Text>
              <ul className="text-gray-700 leading-relaxed text-sm">
                <li>
                  <strong>Property:</strong> {propertyName}
                </li>
                <li>
                  <strong>Location:</strong> {propertyLocation}
                </li>
                <li>
                  <strong>Check-in:</strong> {checkInDate}
                </li>
                <li>
                  <strong>Check-out:</strong> {checkOutDate}
                </li>
              </ul>
            </div>

            <Text className="text-gray-600 text-sm mt-6">
              If you need assistance, our{' '}
              <a
                className="text-[#8F6858] cursor-pointer no-underline"
                href="https://heuvera.com/contact"
              >
                Support Team
              </a>{' '}
              is available 24/7.
            </Text>

            <Text className="text-gray-800 font-semibold mt-6">
              The Heuvera Team
            </Text>

            <Text className="text-xs text-gray-500 mt-6">
              © {currentYear} Heuvera. All rights reserved. <br />
              <a
                href="https://heuvera.com/contact"
                className="text-[#8F6858] font-semibold"
              >
                Contact Support
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
