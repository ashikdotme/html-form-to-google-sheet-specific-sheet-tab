#  How to submit HTML forms to Google Sheets or any Specific Tab.

How to submit a simple HTML form to a Google Sheet using only HTML and JavaScript.

This example shows how to set up a HTML_FORM that sends data to Google Sheets with any specific sheet tab.

### 1. Set up a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet. This is where we'll store the form data.
2. Set the following headers in the first row and create multiple sheet base on your form data condition.
check the example screenshot.
<img src="https://i.postimg.cc/2yctBw2h/03.png">

Next Click on `Extensions -> Apps Script`. This will open new Google Script. Rename it to something like _"HTML_FORM"_.

<img src="https://i.postimg.cc/G23Xm8GZ/02.png" width="450" />
<img src="https://i.postimg.cc/N0dzTksg/01.png" width="450" />
Replace the `myFunction() { ...` section with the following code snippet:

```js
function doPost(e) {
  var ss = SpreadsheetApp.openById("1y-MCjrzKFuynN-5mh-YmdAOUuln5YmYMRriID1p0dCU"); // Sheet ID you will get on URL, see example
  var laptopSheet = ss.getSheetByName("laptop"); // Select Option Condition from HTML 
  var mobileSheet = ss.getSheetByName("mobile"); //  Select Option Condition from HTML 
   // Data save base on Form Condition
  if(e.parameter.Device == 'laptop'){
    laptopSheet.appendRow([e.parameter.Name,e.parameter.Email,e.parameter.Device,e.parameter.Laptop_Model,e.parameter.Laptop_Version])
  }
  // Data save base on Form Condition
  else if(e.parameter.Device == 'mobile'){
    mobileSheet.appendRow([e.parameter.Name,e.parameter.Email,e.parameter.Device,e.parameter.Mobile_Model,e.parameter.Mobile_Version])
  }
  // Return Success Message
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success'}))
    .setMimeType(ContentService.MimeType.JSON)

}

```
### Node: Or If you want only one Single Sheet then use that code.
Replace the `myFunction() { ...` section with the following code snippet:

```js

const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

```

Save the project before moving on to the next step.

### 3. Run the initialSetup function - see screenshot

<img src="https://i.postimg.cc/kgHmPCSN/04.png" width="450" />

You should see a modal asking for permissions. Click `Review permissions` and continue to the next screen.

Because this script has not been reviewed by Google, it will generate a warning before you can continue. You must click the "Go to HTML_FORM (Unsafe)" for the script to have the correct permissions to update your form.

<img src="https://i.postimg.cc/MpQsXJ4m/1.png" width="450" />
<img src="https://i.postimg.cc/MpSscFSk/2.png" width="450" />
After giving the script the correct permissions, you should see the output in the script editor console.

Now your script has the correct permissions to continue to the next step.

### 4. Add a trigger for the script

<img src="https://i.postimg.cc/1RTRZpZV/4.png" width="450" />

Select the project "Triggers" from the sidebar and then click the `Add Trigger` button.

In the window that appears, select the following options:

- Choose which function to run: `doPost`
- Choose which deployment should run: `Head`
- Select event source: `From spreadsheet`
- Select event type: `On form submit`

<img src="https://i.postimg.cc/pTCZFWR3/5.png" width="450" />
Again give the script permissions, 
Then select "Save".

### 5. Publish the project

Now your project is ready to publish. Select the `Deploy` button and `New Deployment` from the drop-down.

<img src="https://i.postimg.cc/sgz4wGxb/8.png" width="450" />

Click the "Select type" icon and select `Web app`. 

In the form that appears, select the following options:

- Description: `HTML_FORM` (This can be anything that you want.)
- Web app → Execute As: `Me`
- Web app → Who has access: `Anyone`

Then click `Deploy`.

<img src="https://i.postimg.cc/tCj6jQbx/9.png" width="450" />
<img src="https://i.postimg.cc/DwYmmR95/10.png" width="450" />
**Important:** Copy and save the web app URL before moving on to the next step.

### 6. Configure your HTML form

Create a HTML form like the following.
check source code: index.html
```html
<form method="POST" name="HTML_FORM"> 
  <div class="single-input">
    <label for="name" class="form-label">Name*</label>
    <input type="text" name="Name" id="name" class="form-control" placeholder="Name"> 
  </div>

  <div class="single-input">
    <label for="email">Email*</label>
    <input type="email" name="Email" id="email" placeholder="you@company.com">
  </div>

  <div class="single-input">
    <label for="select_device">Select Device</label>
    <select class="form-select" name="Device" id="select_device">
      <option selected value="">Select device</option>
      <option value="laptop">Laptop</option>
      <option value="mobile">Mobile</option>
    </select>
  </div>

  <div class="laptop-select">
    <div class="single-input">
      <label for="laptop-model">1. Laptop Model?</label>
      <input type="text" name="Laptop_Model" id="laptop-model" placeholder="Type your answer">
    </div>
    <div class="single-input">
      <label for="laptop-version">2. Laptop Version?</label>
      <input type="text" name="Laptop_Version" id="laptop-version" placeholder="Type your answer">
    </div> 
  </div>
  <div class="mobile-select">
    <div class="single-input">
      <label for="mobile-model">1. Mobile Model?</label>
      <input type="text" name="Mobile_Model" id="mobile-model" placeholder="Type your answer">
    </div>
    <div class="single-input">
      <label for="mobile-version">2. Mobile Version?</label>
      <input type="text" name="Mobile_Version" id="mobile-version" placeholder="Type your answer">
    </div> 
  </div>

  <div class="single-input">
    <input type="submit" class="submit-btn" name="data_submit" value="Submit"> 
  </div>
</form>
```
### 7. Configure your scripts.js
check source code: assets/js/script.js

Add js code on your script js file.

```js
const scriptURL = 'https://script.google.com/macros/s/AKfycbw5volV_rb4KMWKRvmIh64u6JJR12_Ss1-h8rryTjcwG2J_-q09PtMe4uTWq1MWL1KUnA/exec'

const form = document.forms['HTML_FORM']          
form.addEventListener('submit', e => {
  e.preventDefault();
  let name = $('#name').val();
  let email = $('#email').val();
  let select_device = $('#select_device').val(); 
  if(name.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Required',
      text: 'Name is Required!', 
    })
  }
  else if(email.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Required',
      text: 'Email is Required!', 
    })
  } 
  else if(select_device.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Required',
      text: 'Select Device is Required!', 
    })
  } 
  else{
    $('.submit-btn').val('Sending...');
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => { 
        Swal.fire("Success!",
        "Your Data Submit Success",
        "success"
        ).then(()=>{ 
        $('.submit-btn').val('Submit'); 
          form.reset();
        }) 
      } 
    )
    .catch(error => console.error('Error!', error.message))
  } 
});
```
I have Added Sweet Alert for validation and success message.
check full source code.
## Done!
# Now when you submit this form, the data will be saved in the Google Sheet.
## Thank you.
