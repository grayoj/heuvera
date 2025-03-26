import { Queue, Worker, Job } from "bullmq";
import { sendEmail } from "./email";
import { prisma } from "./prisma";
import {
  getBookingConfirmationEmailTemplate,
  getBookingCancellationEmailTemplate,
} from "./templates";

const redisUrl = process.env.REDIS_URLS!;
const url = new URL(redisUrl);
const hostname = url.hostname;
const port = url.port ? Number(url.port) : 6379;
const password = url.password;

const connection: { host: string; port: number; password?: string } = {
  host: hostname,
  port,
};
if (password) {
  connection.password = password;
}

export const queue = new Queue("booking-confirmation", { connection });
export const cancellationQueue = new Queue("booking-cancellation", {
  connection,
});

export const worker = new Worker(
  "booking-confirmation",
  async (job: Job<{ bookingId: string; userId: string }>) => {
    const { bookingId } = job.data;
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true, user: true },
    });

    if (booking && booking.user && booking.listing) {
      const emailTemplate = getBookingConfirmationEmailTemplate({
        guestName: booking.user.name ?? "Guest",
        propertyName: booking.listing.title ?? "Unknown Property",
        propertyLocation: booking.listing.address ?? "Not Provided",
        checkInDate: booking.startDate
          ? booking.startDate.toDateString()
          : "N/A",
        checkOutDate: booking.endDate ? booking.endDate.toDateString() : "N/A",
        guestCount: booking.guests ?? 1,
        totalPrice: booking.totalPrice
          ? `$${booking.totalPrice.toFixed(2)}`
          : "N0.00",
        bookingDetailsLink: `https://heuvera.com/bookings/${booking.id}`,
      });

      await sendEmail(
        booking.user.email ?? "",
        "Booking Confirmed",
        emailTemplate,
      );
    }
  },
  { connection },
);

export const cancellationWorker = new Worker(
  "booking-cancellation",
  async (
    job: Job<{
      bookingId: string;
      userEmail: string;
      guestName: string;
      propertyName: string;
      propertyLocation: string;
      checkInDate: string;
      checkOutDate: string;
    }>,
  ) => {
    const emailTemplate = getBookingCancellationEmailTemplate({
      guestName: job.data.guestName,
      propertyName: job.data.propertyName,
      propertyLocation: job.data.propertyLocation,
      checkInDate: new Date(job.data.checkInDate).toDateString(),
      checkOutDate: new Date(job.data.checkOutDate).toDateString(),
    });

    await sendEmail(job.data.userEmail, "Booking Cancelled", emailTemplate);
  },
  { connection },
);
