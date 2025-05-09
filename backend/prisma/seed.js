// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      height: 175, // 175 cm
      targetWeight: 70, // 70 kg
    },
  });

  console.log(`Created user: ${user.email}`);

  // Create weight entries
  const today = new Date();
  const weights = [
    { weight: 85, date: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000), notes: 'Starting weight' },
    { weight: 83, date: new Date(today.getTime() - 75 * 24 * 60 * 60 * 1000), notes: 'First month' },
    { weight: 80, date: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000), notes: 'Second month' },
    { weight: 78, date: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000), notes: 'Progress slowing' },
    { weight: 76, date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000), notes: 'Back on track' },
    { weight: 74, date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000), notes: 'Feeling good' },
    { weight: 73, date: new Date(), notes: 'Current weight' },
  ];

  for (const weightData of weights) {
    await prisma.weight.create({
      data: {
        ...weightData,
        userId: user.id,
      },
    });
  }

  console.log(`Created ${weights.length} weight entries`);

  // Create shipment entries
  const shipments = [
    {
      status: 'delivered',
      trackingNumber: 'TRK123456',
      expectedDate: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
      deliveredDate: new Date(today.getTime() - 58 * 24 * 60 * 60 * 1000),
      medicationType: 'Semaglutide',
      dosage: '0.25mg'
    },
    {
      status: 'delivered',
      trackingNumber: 'TRK234567',
      expectedDate: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      deliveredDate: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000),
      medicationType: 'Semaglutide',
      dosage: '0.5mg'
    },
    {
      status: 'shipped',
      trackingNumber: 'TRK345678',
      expectedDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      deliveredDate: null,
      medicationType: 'Semaglutide',
      dosage: '1.0mg'
    },
    {
      status: 'processing',
      trackingNumber: null,
      expectedDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
      deliveredDate: null,
      medicationType: 'Semaglutide',
      dosage: '1.0mg'
    }
  ];

  for (const shipmentData of shipments) {
    await prisma.shipment.create({
      data: {
        ...shipmentData,
        userId: user.id,
      },
    });
  }

  console.log(`Created ${shipments.length} shipment entries`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });