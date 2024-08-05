auth.onAuthStateChanged(user => {
  if (user) {
    $("body").show();
  } else {
   window.location.href = "../index.html";
  }
});



const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
  const li = item.parentElement;

  item.addEventListener('click', function () {
    allSideMenu.forEach(i=> {
      i.parentElement.classList.remove('active');
    });
    li.classList.add('active');
  })
});


const $addEntryLink = $("#addEntry");
$addEntryLink.on('click', function() {
  const $faSpan = $(this).find('.fa'); // get the .fa span element
  const $textSpan = $(this).find('.text'); // get the .text span element

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $faSpan.text('add'); // reset to "add" when inactive
    $textSpan.text('New Entry'); // reset to "New Entry" when inactive
    $('#transaction-form').hide();
    $downEntryLink.show();
    $('.box-info, .customer, .btn-Customer').show();
    activePage("wallet");
  } else {
    $(this).addClass('active');
    $faSpan.text('close');
    $textSpan.text('Close');
    forms("NewEntry");
    activePage("newEntry");
    $('#transaction-form').show();
    $downEntryLink.hide();
    $('.box-info, .customer, .btn-Customer').hide();
  }
});


const $downEntryLink = $("#downEntry");
$downEntryLink.on('click', function() {
  const $faSpan = $(this).find('.fa'); // get the .fa span element
  const $textSpan = $(this).find('.text'); // get the .text span element

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $faSpan.text('download'); // reset to "add" when inactive
    $textSpan.text('Download'); // reset to "New Entry" when inactive
    $('#transaction-form').hide();
    $addEntryLink.show();
    $('.box-info, .customer, .btn-Customer').show();
    activePage("wallet");
  } else {
    $(this).addClass('active');
    $faSpan.text('close');
    $textSpan.text('Close');
    forms("downEntry");
    $(".downPre").hide();
    activePage("download");
    $('#transaction-form').show();
    $addEntryLink.hide();
    $('.box-info, .customer, .btn-Customer').hide();
  }
});

// TOGGLE SIDEBAR
const $menuBar = $('#sidebar .brand');
const $sidebar = $('#sidebar');

$menuBar.on('click', () => {
  $sidebar.toggleClass('hide');
});
if ($(window).width() < 768) {
  $sidebar.addClass('hide');
}


//SECTION HANDLR
const $cardsSec = $('#Cards');
const $geminiSec = $('#Gemini');
const $noteSec = $('#Note');
const $membersSec = $('#Members');
const $walletSec = $('#Wallet');
const $marketSec = $('#Market');
const $addEntry = $('#addEntry')
const $downEntry = $('#downEntry')
const $mfOperation = $('#mf-operation')

const showWallet = () => {
  activePage("wallet");
  $walletSec.show();
  $membersSec.hide();
  $marketSec.hide();
  $cardsSec.hide();
  $geminiSec.hide();
  $noteSec.hide();
  $mfOperation.hide();
  $mfEntryLink.hide();
}

const showCards = () => {
  activePage("cards");
  $cardsSec.show();
  $membersSec.hide();
  $marketSec.hide();
  $walletSec.hide();
  $addEntry.hide();
  $downEntry.hide();
  $geminiSec.hide();
  $noteSec.hide();
  $mfOperation.hide();
  $mfEntryLink.hide();
}


const showGemini = () => {
  activePage("gemini");
  $geminiSec.show();
  $cardsSec.hide();
  $membersSec.hide();
  $marketSec.hide();
  $walletSec.hide();
  $addEntry.hide();
  $downEntry.hide();
  $noteSec.hide();
  $mfOperation.hide();
  $mfEntryLink.hide();
}

const showMembers = () => {
  activePage("members");
  $walletSec.hide();
  $marketSec.hide();
  $noteSec.hide();
  $cardsSec.hide();
  $membersSec.show();
  $addEntry.hide();
   $downEntry.hide();
   $geminiSec.hide();
  $mfOperation.hide();
  $mfEntryLink.hide();
}

const showMarket = () => {
  activePage("market");
  $walletSec.hide();
  $cardsSec.hide();
  $noteSec.hide();
  $membersSec.hide();
  $marketSec.show();
   $geminiSec.hide();
  $addEntry.hide();
   $downEntry.hide();
  $mfOperation.show();
  $mfEntryLink.show();
}


const showNotes = () => {
  activePage("note");
  $walletSec.hide();
  $cardsSec.hide();
  $noteSec.show();
  $membersSec.hide();
  $marketSec.hide();
   $geminiSec.hide();
  $addEntry.hide();
   $downEntry.hide();
  $mfOperation.hide();
  $mfEntryLink.hide();
}

const toggleCustomer = (formType) => {
  const isCustomerVisible = $('.customer').is(':visible');
  $('.customer').toggle();
  $('.box-info').toggle();
  $('#tran-info').hide();
  if (isCustomerVisible) {
    activePage("newCustomer")
    forms("NewCustomer");
    $(".Upbox").hide();
    $('#customer-form').show();
    $('.btn-Customer').css('background-color', 'var(--red)');
  } else {
    activePage("wallet");
    $('#customer-form').hide();
    $('.btn-Customer').css('background-color', '');
  }
  $('.btn-Customer').html(`
    <span class="material-icons fa">${isCustomerVisible? 'arrow_back': 'add'}</span>
    <span class="text">${isCustomerVisible? '&nbsp;&nbsp;Go Back': 'Add Customer'}</span> `);
}

const activePage = (page)=> {
  let link = '';

  $(".breadcrumb").html(link);
  if (page === "wallet") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">Wallet</a>
    </li>`;
  } else if (page === "download") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
     <li>
    <a class="active" href="#Wallet">Wallet</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">Download</a>
    </li>`;
  } else if (page === "cards") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Cards">Cards</a>
    </li>`;
  }  else if (page === "gemini") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Gemini">Gemini</a>
    </li>`;
  }  else if (page === "note") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Note">Notes</a>
    </li>`;
  }  else if (page === "members") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Members">Members</a>
    </li>`;
  } else if (page === "newEntry") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">Wallet</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">New Entry</a>
    </li>`;
  } else if (page === "newCustomer") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">Wallet</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Wallet">New Customer</a>
    </li>`;
  }else if (page === "market") {
    link = ` <li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Market">Market</a>
    </li>`;
  }  else if (page === "mutualfund") {
    link = `<li>
    <a href="#">Dashboard</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Market">Market</a>
    </li>
    <li><i class='bx bx-chevron-right'></i></li>
    <li>
    <a class="active" href="#Market">Add Fund</a>
    </li>`;
  }
  $(".breadcrumb").html(link);
}
