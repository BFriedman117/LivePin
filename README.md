# LivePin

This is a full-stack application for the LivePin coding challenge.

# To get started:

Run the following terminal commands:
- Run 'npm install'
- Run 'createdb LivePin' (This can be any db name as long as it matches the "name" field in the package.json)
- Create a file called 'secrets.js' in the root folder.
  - If I have sent you this file, you should be able to simply add it to the root folder and have everything work from there.
  - If not, the file exports 3 variables: 'PASSWORD', which is the password for the email address specified in server/communications/email.js, and 'ACCOUNT_SID' and 'AUTH_TOKEN' for server/communications/sms.js, which are the Twilio credentials.
- Run 'npm run start-dev'
- Open 'localhost:8080/form'

# What the app does

Currently the app allows you to run it on your local machine and either:

A. Send an email with a local link that displays the message you provided
B. Send an SMS with the message. Since it is not deployed, there is no simple way to access the information from a local link on a mobile device.

# Possible Improvements

While the app fulfills the basic user stories, it has the obvious shortcomings of not being a deployed application - namely, the ability to send a link to the message via text as well as a link that does not require a local build to be running. I tried deploying to Heroku, but could not get some of the credentials for API's to work properly in time.

There is also a lot that can be improved in terms of code style and organization. While everything is fairly modular and clean at the current moment, the front end functions on the Form component could have been separated into source files - particularly the form validation functions.

Additionally, there is a lot of unused code that came with the boilerplate, such as the Redux, Socket, and Google OAuth setup as well as some unused front end components. Since there is a fairly complex pipeline connecting all these files, getting rid of them would have resulted in several hours of debugging (e.g. getting rid of one thing in one place crashes a file somewhere else that suddenly can't resolve a path)
