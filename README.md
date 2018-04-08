## consigliere

---------------------
  UI & Data Tier
---------------------

    TASKCREATE.JS    UMUT
  - [ ] 1. "Change Type" button in TaskCreate component file -> convert it to a Picker and store the value
  - [ ] 2. "Set Reminder" button currently saving the Task data to Firebase -> convert it in a way that it holds the push notif. time
  - [x] 3. [ FURKIE ] "Time" text input currently getting a string -> convert it to a Picker as in Alarm on iOS
  
    #### TASKLIST.JS
  - [x] 4. Task List currently is listing the names -> convert it to native-base SwipeableRow component (rightSwipe: delete the task from database / leftSwipe: get the user to the Task Edit screen which is basically TaskCreate.js) ORHCA
  - [x] 5. List just shows name -> add "location name | time" as a sub-text as in our mockup UI.
  - [ ] 6. Currently no List Separation as Tomorrow, Today etc. (bcos we do not hold the date data for tasks) -> add date in TaskCreate and display the tasks according to date using ListDivider in native-base
  - [x] 7. On asynchronous Firebase call at Tasks tab, there is no spinner to be shown in the wait time -> add a Spinner
  - [x] 8. Add 'Add' button ( '+' Icon preferred) and connect it to TaskCreate.js
  
    #### LOGINFORM.JS     SELIN
  - [ ] 9. No Register button as in UI Mockup and no SignUp functionality -> add the text, button and the functionality
  - [ ] 10. User session working but no indicator for session check on login screen -> add spinner
  
    #### MAINTAB.JS
  - [ ] 11. In RouterComponent.js, add a right button for 'Logout' (Icon preferred) and add the Logout functionality
  
  
  - [ ] *** 12. Currently when you exit the app, you log out -> make logins persistent


---------------------
  Logic Tier
---------------------

  ...
