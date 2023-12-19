```bash
-   Dear Programmer:
-   As I write this code, only God and
-   I knowhow it works.
-   In a few months only god will know it!
-   
-   Therefore if you try to optimize the code 
-   and it fails
-   please increase this counter as a warning for the next person:
-   

```
-   **Total hours wasted here** = [![wakatime](https://wakatime.com/badge/user/162dd9c9-7c7f-462e-81ef-741960841996/project/018b680c-65b3-4014-9138-848b81cd3c30.svg)](https://wakatime.com/badge/user/162dd9c9-7c7f-462e-81ef-741960841996/project/018b680c-65b3-4014-9138-848b81cd3c30)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Gari Wash Wash

This Car Wash Management System is a comprehensive software solution designed to streamline and optimize the operations of car wash and detailing businesses. This project enables car wash owners and staff to efficiently manage their services, appointments, and customer interactions, while providing a user-friendly experience for clients seeking quality car cleaning services.

## Features

-   **Multi-Tenant System**: The system allows car wash owners to register and manage their businesses independently within a shared platform.
-   **User Roles**: Supports various user roles, including Super Admins, Car Wash Admins, and Staff Members, each with specific permissions and access levels.
-   **Service Listings**: Enables car wash businesses to list their services, complete with unique pricing and descriptions.
-   **Booking System**: Clients can easily book appointments at their preferred car wash, choosing from a variety of services and time slots.
-   **Interactive Dashboards**: Car wash owners and staff access personalized dashboards, making it simple to view and manage bookings, staff schedules, and customer feedback.
-   **Direction Assistance**: Provides clients with maps links for easy navigation to the chosen car wash location.
-   **Role-Based Authorization**: Ensures that each user can access only the features relevant to their role.

## Getting Started

-   **Installation**
    Clone the project repository and install the necessary dependencies:

```bash
git clone https://github.com/user/sample-repo.git
```

-   **Configuration**
    Set up your environment variables, database connections, and other configuration settings.
    There is a `.env.example` to guide you.

-   **Install Packages**
    In your terminal run :

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

-   **Database Migration**
    Run database migrations to create the necessary tables and structures using:

```bash
npx prisma migrate dev
# or
yarn prisma migrate dev
# or
pnpx prisma migrate dev
# or
bun prisma migrate dev
```

-   **User Registration**
    Start by creating a Super Admin account to manage the system.

-   **Onboarding Car Washes**
    Super Admins can onboard car wash businesses, defining their services and pricing.

-   **User Access**
    Car Wash Admins and Staff Members can access their personalized dashboards to manage their respective car wash businesses.

-   **Client Booking**
    Clients can browse services, book appointments, and receive directions to their chosen car wash.

## Technologies Used

-   **[Prisma](https://www.prisma.io/)**: A powerful database toolkit used to manage data and database interactions.

-   **[React/Next.js](https://nextjs.org/)**: A versatile framework for building the frontend of the application, providing a responsive and dynamic user interface.

-   **[Node.js](https://nodejs.org/en)**: The backend of the system is built using Node.js for server-side logic and API development.

-   **[Next Auth](https://next-auth.js.org/)**: A complete open-source authentication solution for Next.js applications.

## Contributing

Contributions are always welcome!

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
