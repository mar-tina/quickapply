# quickapply [Quicksend]

## Original Intent of the Application

The original intent of the application was to allow easy drag and drop of templated content to send
emails for when you are on the job hunt and are not looking to move back and forth between Gmail and
job sites for the applications that require you to send an email

### Initial Roadblock

After i had set up the application as a popup browser extension. I realized that as soon as you click
outside the shadow-dom that holds the popup it dissapears. The whole popup was set up in a way that required
it to be persistent. I do not know how i managed to overlook that simple but very huge flaw.

#### Steps Taken to try and overcome that initial flaw

- Use a content Script

  First step was to try and introduce a content script because that would most definitely be persistent.
  My initial thought was to try and render it the same way when you click inspect the chrome devtools show
  up to the side and push the body content to the side. I did not want it to lay on top of the current document
  and block the existing text. Failed . I honestly dont think you can do that or my google keyword searches are
  weak. I didn't know how exactly to even research this method if i was to pursue it.

- Use a content script but without the popup

  After i decided the structure of that application was too cluttered anyways i chose another approach.
  Use a content script to detect the necessary elements that a user my want to copy:
    
    - links
    - images
    - emails [mail:to]
    
  This approach was to limit the features of the extension to only collect the necessary data but structuring
  of the emails and templating is to be done in an SPA . The web application would be better suited
  to handle the bulk of the work . That is structuring the templates. Tracking whether the email was opened or not.
  Sending to bulk recipients as compared to doing all of this in a popup . The extension would allow users to collect
  the necessary content they needed and the web app would be responsible for the bulk of the work. This seemed
  possible because i was using pouch db as my database and with pouch db you can do this:

      var db = new PouchDB('dbname');

      db.put({
      _id: 'dave@gmail.com',
      name: 'David',
      age: 69
      });

      db.changes().on('change', function() {
      console.log('Ch-Ch-Changes');
      });

      db.replicate.to('http://example.com/mydb');

The whole entire application is meant to run in the users computer with no external servers. Meaning the db would be
replicated to localhost:3000 where the web app would be running and would have access to the pouch db as well
meaning sharing data would be almost at a realtime capacity.
