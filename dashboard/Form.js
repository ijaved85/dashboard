const forms = (formType) => {
  let form = '';
  $("#fireForm").html(form);
  let data,
  name,
  total,
  SINUM;
  if (formType === "NewCustomer") {
    form = `<form id="customer-form">
  <div class="Upbox">
  <div class="percent">
    <svg>
      <circle cx="70" cy="70" r="70"></circle>
      <circle cx="70" cy="70" r="70"></circle>
    </svg>
    <div class="num">
      <h2><span class="upPercent">0</span><span class="per">%</span></h2>
    </div>
  </div>
  <h2 class="text">Uploading...</h2>
</div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br><br>
    <label for="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" required><br><br>
    <label for="photo">Photo:</label>


    <label for="photo-file" id="photo-button">CHOOSE A FILE</label>
    <input type="file" id="photo-file" onclick="phfil()" style="display: none; required"/>
   <span id="photo-text" style="display: inline-block; max-width: 120px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">No file chosen, yet.</span>
    <br><br>
    <label for="date">Date:</label>
    <input type="date" id="date" name="date" required><br><br>
    <label for="purpose">Purpose:</label>
    <input type="text" id="purpose" name="purpose" required><br><br>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" name="amount" required><br><br>
    <label for="type">Type:</label>
    <input type="radio" id="receive" name="type" value="receive" required>
    <label for="receive">Receive</label>
    <input type="radio" id="pay" name="type" value="pay" required>
    <label for="pay">Pay</label><br><br>
    <div class="submit-button-container">
    <span class="submit" onClick="custForm()">Submit</span>
    </div>

    </form>`;
  } else if (formType === "NewEntry") {
    let key = $('#addEntry').attr('key');
    let walletRef = db.ref(`Wallet/${key}/`);

    walletRef.once('value', snap => {
      data = snap.val();
      name = data.Name;
      SINUM = data.LastSI;
      total = data.Total;
      $('#NewCusname').val(name);
      $('#SINo').val(SINUM);
      $('#totalAmount').val(total);
      console.log(data);
    });

    form = `<form id="transaction-form">
    <label for="name">Name:</label>
    <input type="text" id="NewCusname" name="name" readonly ><br><br>
    <label for="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" value="${key}" readonly><br><br>
    <label for="date">Date:</label>
    <input type="date" id="date" name="date" required><br><br>
    <label for="purpose">Purpose:</label>
    <input type="text" id="purpose" name="purpose" required>
    <label for="amount" hidden>Total Amount:</label>
    <input type="number" id="totalAmount" name="totalAmount" readonly hidden>
    <label for="Si" hidden>SI No:</label>
    <input type="number" id="SINo" name="Si" readonly hidden>
    <br><br>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" name="amount" required><br><br>
    <label for="type">Type:</label>
    <input type="radio" id="receive" name="type" value="receive" required>
    <label for="receive">Receive</label>
    <input type="radio" id="pay" name="type" value="pay" required>
    <label for="pay">Pay</label><br><br>
    <div class="submit-button-container">
    <span class="submit" onClick="transForm()">Submit</span>
    </div>
    </form>`;
  }else if (formType === "downEntry") {
    let key = $('#addEntry').attr('key');
    let walletRef = db.ref(`Wallet/${key}/`);
    walletRef.once('value', snap => {
      data = snap.val();
      name = data.Name;
      $('#downName').val(name);
    });

    form = `<form id="transaction-form" class="down-Form">
    <div class="downPre">
    <div class="downWrap">
  <div class="loading">
    <div class="downText">Downloading...</div>
    <div class="bounce-icon"></div>
  </div>
</div></div>

  <label for="name">Name:</label>
  <input type="text" id="downName" name="name" readonly><br><br>
  <label for="phone">Phone Number:</label>
  <input type="tel" id="phone" name="phone" value="${key}" readonly><br><br>
  
  <label for="date">Date:</label>
  <input type="radio" id="all" name="date-option" value="all" checked>
  <label for="all">All</label>
  <input type="radio" id="custom" name="date-option" value="custom">
  <label for="custom">Custom</label>
  
  <div id="custom-date-container" style="display: none;">
    <label for="fromDate">From:</label>
    <input type="date" id="fromDate" name="fromDate" required><br><br>
    <label for="toDate">To:</label>
    <input type="date" id="toDate" name="toDate" required><br><br>
  </div>
  
  <div class="submit-button-container">
    <span class="submit" onclick="cusStatement('${key}')">Download</span>
  </div>
</form>`;
$(document).ready(function() {
  $('input[name="date-option"]').change(function() {
    if ($(this).val() === 'custom') {
      $('#custom-date-container').show();
    } else {
      $('#custom-date-container').hide();
    }
  });
});
  }
  $("#fireForm").html(form);
}



const custForm = () => {
$('.Upbox').fadeIn();

  // Get the form elements
  const nameInput = $('#name');
  const phoneInput = $('#phone');
  const photoInput = $('#photo-file');
  const amountInput = $('#amount');
  const dateInput = $('#date');
  const purposeInput = $('#purpose');
  const typeInput = $('input[name="type"]:checked');

  // Get the form data
  const name = nameInput.val();
  const phone = phoneInput.val();
  const photo = photoInput[0].files[0];
  const amount = amountInput.val();
  const date = dateInput.val();
  const purpose = purposeInput.val();
  const type = typeInput.val();

  if (name == '' || phone == '' || amount == '' || date == '' || purpose == '' || type == '' || !photo) {
    displayWarning('Enter all details');
  } else {
  storageRef = storage.ref();
  const filename = `${Date.now()}_${photo.name}`;
  const uploadTask = storageRef.child(`Wallet/${phone}/photo/`+filename).put(photo);
  // Create a new transaction object
  const TranProf = {
    SINo: 'SINo',
    Dates: 'Date',
    Pay: 'Pay',
    Purpose: 'Purpose',
    Receive: 'Receive',
    Balance: 'Balance'
  };

  let transaction;
  let calculate = 0;
  if (type === 'pay') {
    calculate = parseFloat(amount) * -1;
    transaction = {
      [TranProf.SINo]: 1,
      [TranProf.Dates]: date,
      [TranProf.Pay]: calculate,
      [TranProf.Purpose]: purpose,
      [TranProf.Receive]: 0,
      [TranProf.Balance]: calculate
    };
  } else {
    transaction = {
      [TranProf.SINo]: 1,
      [TranProf.Dates]: date,
      [TranProf.Pay]: 0,
      [TranProf.Purpose]: purpose,
      [TranProf.Receive]: parseFloat(amount),
      [TranProf.Balance]: parseFloat(amount)
    };
    calculate = parseFloat(amount);
  }

 uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (pross) => {
   setTimeout(() => {
  let progress = (pross.bytesTransferred / pross.totalBytes) * 100;
  let inte = Math.floor(progress);
  $(".upPercent").html(inte);
  $(".Upbox .percent svg circle:nth-child(2)").css("stroke-dashoffset", 440 - (440 * inte) / 100);
   }, 10);
},
    (error) => {
      console.error(error);
    },
    () => {
      // Upload complete
      uploadTask.snapshot.ref.getDownloadURL().then((photoURL) => {
        const dataObj = {
          LastSI: 1,
          Name: name,
          Photo: photoURL,
          Total: calculate
        }
        db.ref('Wallet').child(phone).set(dataObj).then(() => {
          db.ref('Wallet/'+phone+'/Data/').push(transaction);
          toggleCustomer();
          wallet();
           displaySuccessToast('Data uploaded successfully');
          console.log('Data written to Realtime Database');
        }).catch((error) => {
             displayError('Error while uploading');
          console.error('Error writing data to Realtime Database:', error);
        });
      });
    });
  }
}


const transForm = () => {

  // Get the form elements
  const nameInput = $('#NewCusname');
  const phoneInput = $('#phone');
  const amountInput = $('#amount');
  const totalAmtInput = $('#totalAmount');
  const SINoInput = $('#SINo');
  const dateInput = $('#date');
  const purposeInput = $('#purpose');
  const typeInput = $('input[name="type"]:checked');

  // Get the form data
  const name = nameInput.val();
  const phone = phoneInput.val();
  const amount = amountInput.val();
  const totalAmt = totalAmtInput.val();
  const sinum = SINoInput.val();
  const date = dateInput.val();
  let purpose = purposeInput.val();
  const type = typeInput.val();
  let calculate = 0;
  
  if (purpose == '' && name === 'Modern Dresses'){
  purpose = 'Google Pay Business';
} else if  (purpose == ''){
  purpose = 'Initial';
}
  
  if(name == ''){
 displayWarning('Select the customer');
  }else if (amount == '' || date == '' || type == '') {
    displayWarning('Enter all the details');
  }else{
  // Create a new transaction object
  const TranProf = {
    SINo: 'SINo',
    Dates: 'Date',
    Pay: 'Pay',
    Purpose: 'Purpose',
    Receive: 'Receive',
    Balance: 'Balance'
  };

  let transaction;
  let curSI = parseFloat(sinum) + 1;
  if (type === 'pay') {
    const calc = parseFloat(amount) * -1;
    transaction = {
      [TranProf.SINo]: curSI,
      [TranProf.Dates]: date,
      [TranProf.Pay]: calc,
      [TranProf.Purpose]: purpose,
      [TranProf.Receive]: 0,
      [TranProf.Balance]: parseFloat(totalAmt) + calc
    };
    calculate = parseFloat(totalAmt) + calc;
    db.ref('Wallet/'+phone).child('Total').set(calculate);
    db.ref('Wallet/'+phone).child('LastSI').set(curSI);


  } else {
    const calc = parseFloat(amount) * -1;
    transaction = {
      [TranProf.SINo]: curSI,
      [TranProf.Dates]: date,
      [TranProf.Pay]: 0,
      [TranProf.Purpose]: purpose,
      [TranProf.Receive]: parseFloat(amount),
      [TranProf.Balance]: parseFloat(totalAmt) +  parseFloat(amount)
    };
    calculate = parseFloat(totalAmt) + parseFloat(amount);
    db.ref('Wallet/'+phone).child('Total').set(calculate);
    db.ref('Wallet/'+phone).child('LastSI').set(curSI);
  }
  db.ref('Wallet/'+phone+'/Data/').push(transaction);
  $("#addEntry").click();
  wallet();
}
      }






$('#photo-button').on('click', function() {
  // Directly trigger the file input's click event
  console.log("click");
  $('#photo-file')[0].click();
});

$('#photo-file').on('change', function() {
  var file = $(this)[0].files[0];
  var fileName = file.name;
  console.log(fileName);
  $('#photo-text').text(fileName);
});


function phfil() {

  $('#photo-file').on('change', function() {
    var file = $(this)[0].files[0];
    var fileName = file.name;
    console.log(fileName);
    $('#photo-text').text(fileName);
  });

}
