# Scheduler Tool
A Booking Tool for Small Business

## Scope
The booking tool is for use by a small business in scheduling and organizing the booking of multiple spaces. Employees of the business (admins) should have control over all reservations made by any users. User will have the ability to create reservations and edit their own reservations. Both admins and users will have visibility into the cost of their individual reservations, as well as over a given month.

A Minimum Viable Product (MVP) should give a user the ability to create reservations for a specified location and time/date as long as they do not conflict with any existing reservation. A given reservation has a price value determined by an admin. An admin may create, edit, or delete any reservations within the organization. An admin should be able to view reservations by date, by user, by location, or some combination therein. 

The MVP should utilize Google OAuth for authentication, with an option for signing up with email/password. 

Beyond the MVP, the following capabilities should be available:

- Import events from Google Calendar into a location's availability schedule
- Export a report for a user summarizing reservations and costs in a given month
- Ability to reserve a location for all day
- Manage recurring reservations
	- Rate (Daily, Weekly, Monthly)
	- Exceptions, days on/off
	- start/end date

Stretch goals:

- Email booking user when admin changes their reservation
- Export reservations to a Google Calendar
- Email admin when a booking user makes a reservation
- Give admin ability to send invite email to potential new users

## Models
### Organization
- Name
- Admins [\<User>]
- Hourly Rate
- Day Rate
- Cancellation Lead Time

### User 
- Name
- Email 
- Password
- Phone Number
- Organization [\<Organization>]

### Booking	
- Booking Owner \<User>
- Booking Title
- Location \<Location>
- Created By \<User>
- Created On
- Start Time
- End Time
- Date
- Price
- RecurrenceID (id)

### Location
- Name
- Description
- Organization \<Organization>
- External calendar (link/id)

### Recurrence (Stretch)
- RecurrenceID
- Frequency
- Start Date
- End Date
- Location \<Location>
- [Exception Dates]
- Booking Owner \<User>
- Ext. Calendar

## User Stories
### Admin
An admin should be able to:

- Create an account using:
	- Google OAuth
	- Username/Password
- Create a new organization
- Create locations for an organization
- Grant other users admin access

An admin should be able to:

- Create reservations
- Edit reservations
- Delete reservations
- View all reservations
	- For a specific date
	- Over a specified date range
	- For a specified teacher
	- For a specified location
- Print a report for a user that displays
	- All reservations made in a given month
	- Price per reservation
	- Overall price owed
- Edit a reservation to have zero cost

### User
A user should be able to:

- Sign up with an account for a specific organization
- Create an account using:
	- Google OAuth
	- Username/password
- Sign in using an existing account
- Create reservations
- Edit reservations they created
- Delete their own reservations they created
- Reserve a location
	- Minimum: 30 minutes (+ 30 min increments)
- See what times are reserved for each location

A user should NOT be able to:

- Edit or Delete reservations within X hours of the scheduled time (X set by Admin)
- Create a reservation that is in conflict with an existing reservation
- Create a reservation before the current date

## Integrations
- Google Calendar
	- Import from
	- Export to
	- Note: send api key from backend
- Google OAuth
	- User authentication

## Schedule

#### Sprint 1
- Initialize React App with Material UI
- Build the following UI components:
	- Log in / Register
	- Sidebar (Responsive Drawer)
	- Users Page
	- User Page
	- Locations Page
	- Location Page
	- Create Reservation form
	- Edit Reservation form
	- Reservations Page
- Style components with color scheme

#### Sprint 2
- Initialize Express API with Node.js
- Set up models with Mongoose/MongoDB
- Build Organization create route
- Build User Register/Login/Logout routes
- Build Location CRUD routes
- Test Org/User/Locaton routes with Postman

#### Sprint 3
- Build Reservation CRUD routes
- Test Reservation routes with Postman
- Set up Google OAuth for User Login
- Add user validation to Location/Reservation CRUD
- Enable Admin access to raise other Users to Admin

#### Sprint 4
- Connect User Auth routes to React App
- Connect Location/Reservation CRUD to React App
- Test all basic CRUD in React App
- Implement User vs Admin validation in API
- Test CRUD validation of User vs Admin in Postman
- Implement/Test CRUD validation of user vs admin in React

**\*****\*****\*** **MVP complete** **\*****\*****\***

#### Sprint 5 
- Read in events from external Google Calendar into Locations
- Generate monthly report for users
- Set up Recurrence CRUD in API
- Implement Recurrence CRUD in React
- Use Gmail API to send email to Users if reservation changes

