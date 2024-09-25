/***********************Dark Theme*****************************/
const $modeLink = $('#switch-mode');
const $faSpan = $modeLink.find('.fa');
const $textSpan = $modeLink.find('.text');

// Detect system dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkMode.matches) {
  // System is in dark mode, set initial state accordingly
  $modeLink.addClass('active');
  $faSpan.text('light_mode');
  $textSpan.text('Light Mode');
  $('body').addClass('dark');
   $('#aku').contents().find('iframe').css('filter', 'invert(100%)');
   localStorage.setItem("theme", "dark");
} else {
  // System is in light mode, set initial state accordingly
  $modeLink.removeClass('active');
  $faSpan.text('dark_mode');
  $textSpan.text('Dark Mode');
  $('body').removeClass('dark');
   $('#aku').contents().find('iframe').css('filter', 'invert(0%)');
   localStorage.setItem("theme", "light");
}

// Add event listener to toggle button
$modeLink.on('click', function() {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $faSpan.text('dark_mode');
    $textSpan.text('Dark Mode');
    $('body').removeClass('dark');
    $('#notes').contents().find('body').removeClass('dark'); 
    $('#mutualfund').contents().find('body').removeClass('dark'); 
    $('#mutualform').contents().find('body').removeClass('dark'); 
    $('#gemini').contents().find('body').addClass('light_mode'); 
    $('#aku').contents().find('body').addClass('light_mode'); 
    $('#qrcode').contents().find('body').addClass('light_mode'); 
    $('#aku').contents().find('iframe').css('filter', 'invert(0%)');
    localStorage.setItem("theme", "light");
  } else {
    $(this).addClass('active');
    $faSpan.text('light_mode');
    $textSpan.text('Light Mode');
    $('body').addClass('dark');
    $('#notes').contents().find('body').addClass('dark');
    $('#mutualfund').contents().find('body').addClass('dark');
    $('#mutualform').contents().find('body').addClass('dark');
    $('#gemini').contents().find('body').removeClass('light_mode'); 
    $('#qrcode').contents().find('body').removeClass('light_mode'); 
    $('#aku').contents().find('body').removeClass('light_mode'); 
    $('#aku').contents().find('iframe').css('filter', 'invert(100%)');
   localStorage.setItem("theme", "dark");
  }
});
/**************************Dark Theme**************************/

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric', month: 'short', year: 'numeric'
  };
  const formattedDate = date.toLocaleDateString('en-GB',
    options);

  return formattedDate;
};



const cusStatement = (key) => {
  $(".downPre").fadeIn();
  const iframe = $('#invoice')[0]; // Get the iframe element
  const iframeDoc = iframe.contentWindow.document; // Get the iframe's document object
 
  const $detailRef = db.ref(`Wallet/${key}/Data`).orderByChild('Date');

  let walletRef = db.ref(`Wallet/${key}/`);
  walletRef.once('value',
    snap => {
      data = snap.val();
      name = data.Name;
    });

  console.log(name);
  $(iframeDoc).find('.StaName').html(name);
  $(iframeDoc).find('.StaNumber').html(key);
  let fromDate = $('#fromDate').val();
  let toDate = $('#toDate').val();

  if (fromDate === "" || toDate === "") {
     $(iframeDoc).find('.Dater').html('All Transactions');
    // Retrieve all transactions
    $detailRef.once('value', (snap) => {
      // Process the data
      processTransactions(snap, key);
    });
  } else {
     $(iframeDoc).find('.Dater').show();
     let formattedDate1 = formatDate(fromDate);
  let formattedDate2 = formatDate(toDate);
  $(iframeDoc).find('.fromD').html(formattedDate1);
    $(iframeDoc).find('.toD').html(formattedDate2);
    // Use the provided dates to filter the transactions
    $detailRef.startAt(fromDate).endAt(toDate).once('value', (snap) => {
      // Process the data
      processTransactions(snap, key);
    });
  }
}

const processTransactions = (snap, key) => {
  const iframe = $('#invoice')[0]; // Get the iframe element
  const iframeDoc = iframe.contentWindow.document; // Get the iframe's document object

  let date = new Date();
  let formattedDate = formatDate(date);
  $(iframeDoc).find('.genDate').html(formattedDate);

  const $fireState = $(iframeDoc).find('#fireStatement');

  $fireState.html('');


  let calculate = 0; // Initialize the calculate variable
  snap.forEach((childSnap) => {
    const id = childSnap.val();

    const formattedDate = formatDate(id.Date);

    if (id.Pay == 0) {
      calculate += id.Receive;
    } else {
      calculate += id.Pay;
    }

    if (id.Balance >= 0) {
      state = "green";
    } else {
      state = "red";
    }
    let statementHTML = ` <tr>
    <td class="date" style="white-space: nowrap;">${formattedDate}</td>
    <td style="text-align:left;">${id.Purpose}</td>
    <td class="withdraw" style="color:red; text-align: right; padding-right: 5px;">${id.Pay}</td>
    <td class="deposit" style="color:green; text-align: right; padding-right:5px;">${id.Receive}</td>
    <td class="balance" style="color:${state}; text-align: right; padding-right:5px;">${id.Balance}</td>
    </tr>`;
    $fireState.append(statementHTML);
    $(iframeDoc).find('.total').text(calculate).css('color', state);
  });
  downloadPdf();
}





const downloadPdf = () => {
  const iframe = document.getElementById('invoice');
  const iframeDoc = iframe.contentWindow.document;
  const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
  const html = iframeContent.body.innerHTML;

  let name = $(iframeDoc).find('.StaName').text();
  let phone = $(iframeDoc).find('.StaNumber').text();

  let upperCaseName = name.substring(0,
    4).toUpperCase();
  let lastFourDigitsPhone = phone.substring(phone.length - 4);

  let password = upperCaseName + lastFourDigitsPhone;
  let datetime = new Date().toISOString().replace(/:/g, '').replace(/\..+/, '');
let fname = `${name.toUpperCase()}${datetime}`;

  // Add a wrapper div to control margins and padding
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.margin = '0';
  wrapperDiv.style.padding = '0';
  wrapperDiv.innerHTML = html;

  const pdf = new html2pdf();
  pdf.from(wrapperDiv).set({
    margin: 0.1,
    // set margin to 0
    filename: fname,
    image: {
      type: 'jpeg',
      quality: 1
    },
    html2canvas: {
      scale: 2.9,
      // increase scale to reduce whitespace
      useCORS: true
    },
    jsPDF: {
      unit: 'in',
      format: 'A4',
      orientation: 'portrait'
    }
  }).output('blob').then((blob) => {
    if (!blob) {
      console.error('Blob is null or undefined');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fname;
    a.click();
    URL.revokeObjectURL(url);
    $(".downPre").fadeOut();
    $downEntryLink.click();
  }).catch((err) => {
    console.error('Error generating PDF:', err);
  });
}