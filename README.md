# Simplist

Simplist (short for _simple list_) is a sample synchronisable to-do list app developed to showcase React Native with Expo, Redux, Firebase Authentication and Realtime Database.

>Simplist was developed as training material for NUS Orbital 2021 Mission Control 1: React Native (Part 2) conducted by Phillmont Muktar on May 22, 2021.

### Development environment pre-requisites
- A package manager (e.g., npm, Yarn, or pnpm)
- A working Firebase account
- [Expo Go](https://expo.io/tools#client) on your mobile device or simulators
- [`expo-cli`](https://expo.io/tools#cli), install with `npm install expo-cli --global` or `yarn global add expo-cli`

### Setting up
1. Clone this repository  
`git clone https://github.com/purfectliterature/simplist.git`

2. Change-directory into the project root  
`cd simplist`

3. Install all dependencies with your package manager  
`npm install` or `yarn install`

4. Create a [Firebase](https://firebase.google.com) application  
Since this app only uses Firebase Authentication and Realtime Database, [Spark plan](https://firebase.google.com/pricing) (without credit card) is sufficient.

5. Add a _web application_ on your Firebase project  
You can set this application's nickname to whatever you feel like. The author used `web-ui`, for example.

6. Grab the configuration info from _Add Firebase SDK_  
If you missed this page, go to _Project Overview_, scroll down to _Your apps_, and locate the web app with your set nickname. Under _SDK setup and configuration_, choose _Config_ and the configuration info is given to you in the form of `config firebaseConfig = { ... };`.

7. Create a `.env` file (yes, starting with a dot) in the root project directory

8. Populate the `.env` file with the Firebase configuration info as follows:
```sh
API_KEY=<your firebaseConfig.apiKey>
AUTH_DOMAIN=<your firebaseConfig.authDomain>
PROJECT_ID=<your firebaseConfig.projectId>
STORAGE_BUCKET=<your firebaseConfig.storageBucket>
MESSAGING_SENDER_ID=<your firebaseConfig.messagingSenderId>
APP_ID=<your firebaseConfig.appId>
MEASUREMENT_ID=<your firebaseConfig.measurementId>
```

9. In Firebase, enable **Authentication** by navigating to _Build_ > _Authentication_ > _Get started_ on your Firebase console

10. In Firebase, enable **Realtime Database** by navigating to _Build_ > _Realtime Database_ > _Get started_ on your Firebase console  
You may choose to initialise the database in test mode for debugging purposes.

11. Run the app  
`npm start` or `yarn start`

12. (Optional) To set up the Firebase Admin SDK in the `admin` directory, follow [these instructions to set up your Service Account](https://firebase.google.com/docs/admin/setup#initialize-sdk) and place the downloaded JSON file as `service-account.json` in `admin`  

13. Create a `.env` file in `admin` and populate it as follows:  
```sh
AUTH_DOMAIN=<your firebaseConfig.authDomain>
```

14. With your Terminal working directory in `admin` (invoke `cd admin` from project root if have not already), run the Firebase Admin SDK "server"  
`npm start` or `yarn start`

15. The Admin SDK "server" has been set up using [nodemon](https://www.npmjs.com/package/nodemon), so simply type any Admin SDK syntax in `index.js` (example commented to create an account) and save to apply changes to your Firebase application
