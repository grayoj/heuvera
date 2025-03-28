import { Queue, Worker, Job } from "bullmq";
import { sendEmail } from "./email";
import { prisma } from "./prisma";
import {
  getBookingCancellationMail,
  getBookingConfirmationMail,
} from "./email/render";

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
export const cancellationQueue = new Queue("booking-cancellation", { connection });

export const worker = new Worker(
  "booking-confirmation",
  async (job: Job<{ bookingId: string; userId: string }>) => {
    const { bookingId } = job.data;
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true, user: true },
    });

    if (!booking || !booking.user || !booking.listing) {
      console.error(`Booking not found or missing user/listing data for ID: ${bookingId}`);
      return;
    }

    const emailContent = await getBookingConfirmationMail(
      booking.user.name ?? "Guest",
      booking.listing.title ?? "Unknown Property",
      booking.listing.address ?? "Not Provided",
      booking.startDate ? booking.startDate.toDateString() : "N/A",
      booking.endDate ? booking.endDate.toDateString() : "N/A",
      booking.guests ?? 1,
      booking.totalPrice ? `$${booking.totalPrice.toFixed(2)}` : "N0.00",
      `https://heuvera.com/bookings/${booking.id}`,
    );

    await sendEmail(booking.user.email ?? "", "Booking Confirmed", emailContent);
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
    const emailTemplate = await getBookingCancellationMail(
      job.data.guestName,
      job.data.propertyName,
      job.data.propertyLocation,
      new Date(job.data.checkInDate).toDateString(),
      new Date(job.data.checkOutDate).toDateString(),
    );

    await sendEmail(job.data.userEmail, "Booking Cancelled", emailTemplate);
  },
  { connection },
);
