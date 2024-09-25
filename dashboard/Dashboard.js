
const wallet = () => {
  $('#customer-form').hide();
  $('#transaction-form').hide();
  $('#addEntry').hide();
  $('#downEntry').hide();
  $('#tran-info').hide();
   $mfOperation.hide();
   $mfEntryLink.hide();
  activePage('wallet');


  let IWP = 0;
  let IWR = 0;
  db.ref('Wallet').once('value',
    (snap) => {
      const $walletListContainer = $('#fireWallet');
      $walletListContainer.html('');

      snap.forEach((fire) => {
        const key = fire.key;
        const data = fire.val();
        const name = data.Name;
        const photo = data.Photo;
        const total = data.Total;

        let state = '';
        let walletHTML = '';
        if (total >= 0) {
          IWP += total;
          state = 'pay';
        } else {
          IWR += total
          state = 'receive';
        }
        $('.Receive').html(parseFloat(IWR) * -1);
        $('.Pay').html(IWP);
        walletHTML += `
        <tr data-key="${key}" onclick="walletTrans(${key})" ondblclick="oper(${key})">
        <td style="justify-content: center">
        <img src="${photo}" ></td><td>
        <p>${name}</p>
        </td>
        <td>
        <span class="${state}">${total}</span>
        </td>
        </tr>`;
        $walletListContainer.append(walletHTML);
      });
    });
}

const walletTrans = (key) => {
  $('#addEntry').show();
  $('#downEntry').show();
 
  
  const $walletRef = db.ref(`Wallet/${key}/Data`);
  const $nameRef = db.ref(`Wallet/${key}/`);
  const $transHisContainer = $('#transHis');
  $('#addEntry').attr('key', key);
  $('#Entry').attr('key', key);


  $nameRef.once('value', snap => {
   let data = snap.val();
    let name = data.Name;
    let total = data.Total;
    $("#custName").html(name);
  });
  $("#custPhone").html(key);

  let walletHTML = '';
  $walletRef.on('value', (snap) => {
    const data = snap.val();

    // Convert data to an array and sort it by SINo in descending order
    const sortedData = Object.entries(data).sort((a, b) => {
      const sinA = a[1].SINo;
      const sinB = b[1].SINo;
      return sinB - sinA;
    });

    sortedData.forEach(([key, id]) => {
      let state = '';
      if (id.Pay == 0) {
        state = 'pay';
      } else {
        state = 'receive';
      }

      const date = new Date(id.Date);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);

      walletHTML += `
      <tr data-key="${id}" id="transRow">
      <td>
      <p class="date">${formattedDate}</p>
      </td>
      <td><span class="purpose">${id.Purpose}</span></td>
      <td><span class="${state}">${id.Pay || id.Receive}</span></td>
      </tr>`;
    });
    $transHisContainer.html(walletHTML);
     $('#tran-info').show();
  });
}

const market = () => {
  activePage('market');
  wallet();
   $('#mutualform').hide();
}

const cards = () => {
  activePage("cards");
  db.ref('Cards').once('value', (snap) => {
    const $cardsContainer = $('#fireCards');

    snap.forEach((fire) => {
      const cardName = fire.key;
      const Data = fire.val();
      const cvv = Data.CVV;
      const cardHolder = Data.CardHolder;
      const bank = Data.Bank;
      const cardType = Data.CardType;
      const company = Data.CardCompany;
      const expDate = Data.ExpiryDate;
      const note = Data.Note;
      const colour = Data.Background;
      const cardNumber = [
        Data.CardNumber.First,
        Data.CardNumber.Second,
        Data.CardNumber.Third,
        Data.CardNumber.Fourth
      ];
      const fullNumber = cardNumber[0]+cardNumber[1]+cardNumber[2]+cardNumber[3];
      const cardHTML = `<div class="card" onclick="flipCard('${fullNumber}')">
      <div class="card-inner" id="${fullNumber}card">
      <div class="front" style="background:${colour}" id="${fullNumber}front">
      <img src="${Data.Logo}" class="back-img">
      <div class="cardRow">
      <p class="type">${cardType}</p>
      <img src="img/${bank}.png" width="60px" />
      </div>
      <div class="cardRow cardchip">
      <img src="img/chip.png" width="40px" />
      <img src="img/Wifi.png" width="20px" />
      </div>
      <div class="cardRow card-no">
      <p>${cardNumber[0]}</p>
      <p>${cardNumber[1]}</p>
      <p>${cardNumber[2]}</p>
      <p>${cardNumber[3]}</p>
      </div>
      <div class="cardRow card-holder">
      <p>CARD HOLDER</p>
      <p>VALID TILL</p>
      </div>
      <div class="cardRow card-holdername">
      <p>${cardHolder}</p>
      <p>${expDate}</p>
      </div>
      <div class="cardRow card-company">
      <p>&nbsp;</p>
      <img src="img/${company}.png" width="50px" />
      </div>
      </div>
      <div class="back" style="background-image:${colour}" id="${fullNumber}back">
      <div class="bar"></div>
      <div class="cardRow cardcvv">
      <div>
      <img src="img/pattern.png" height="25px" />
      </div>
      <p>${cvv}</p>
      </div>
      <div class="cardRow cardtext">
      <p>${note}</p>
      </div>
      <div class="cardRow cardsign">
      <p>CUSTOMER SIGNATURE</p>
      <img src="img/${company}.png" width="70px" />
      </div>
      </div>
      </div>
      </div>
      `;
      $cardsContainer.append(cardHTML);
    });
  });
  market();
}

const qrcode = () => {
  activePage('qrcode');
  cards();
}

const aku = () => {
  activePage('aku');
  qrcode();
}

const members = () => {
  activePage("members");
  firebase.database().ref('Users').once('value', (snap) => {
    const $memberListContainer = $('#member-list');
    $memberListContainer.html(''); // clear the list before populating it

    snap.forEach((fire) => {
      const Key = fire.key;
      console.log(Key);
      const Data = fire.val();
      const name = Data.Name;
      const role = Data.Role;
      let state = '';
      let memberHTML = '';
      if (role === "Admin") {
        state = 'not-completed';
      } else {
        state = 'completed';
      }
      memberHTML += `<li class="${state}">
      <p>${name}</p>
      <p class="role status ${state}">${role}</p>
      </li>
      `;
      $memberListContainer.append(memberHTML);
    });
  });
  aku();
//  $("#preloader").fadeOut(4500);
}

let clickCount = {};
const flipCard = (cardNo) => {
  if (!clickCount[cardNo]) {
    clickCount[cardNo] = 0;
  }
  clickCount[cardNo]++;
  if (clickCount[cardNo] === 5) {
    $(`#${cardNo}card`).addClass('flipped');
    clickCount[cardNo] = 0;
  } else {
    $(`#${cardNo}card`).removeClass('flipped');
  }
  // Reset counter after 2 seconds
  setTimeout(() => {
    clickCount[cardNo] = 0;
  }, 1000);
}

const gemini = () => {
  activePage('gemini');
  members();
}

const notes = () => {
  activePage('note');
  gemini();
}

$(document).ready(async function() {
  await loadPageContent();
  setTimeout(function() {
      $("#preloader").fadeOut(900);
  }, 9000);

});

async function loadPageContent() {
  notes();
}