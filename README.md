# consigliere

---------------------
  UI & Data Tier
---------------------

    TASKCREATE.JS    
  1. "Change Type" button in TaskCreate component file -> convert it to a Picker and store the value
  2. "Set Reminder" button currently saving the Task data to Firebase -> convert it in a way that it holds the push notif. time
  3. "Time" text input currently getting a string -> convert it to a Picker as in Alarm on iOS
  
    TASKLIST.JS
  4. Task List currently is listing the names -> convert it to native-base SwipeableRow component (rightSwipe: delete the task from database / leftSwipe: get the user to the Task Edit screen which is basically TaskCreate.js)
  5. List just shows name -> add "location name | time" as a sub-text as in our mockup UI.
  6. CUrrently no List Separation as Tomorrow, Today etc. (bcos we do not hold the date data for tasks) -> add date in TaskCreate and display the tasks according to date using ListDivider in native-base
  7. On asynchronous Firebase call at Tasks tab, there is no spinner to be shown in the wait time -> add a Spinner
  
    LOGINFORM.JS
  8. No Register button as in UI Mockup and no SignUp functionality -> add the text, button and the functionality
  
    MAINTAB.JS
  9. In RouterComponent.js, add a right button for 'Logout' (Icon preferred) and add the Logout functionality
  
  
 *** 10. Currently when you exit the app, you log out -> make logins persistent

