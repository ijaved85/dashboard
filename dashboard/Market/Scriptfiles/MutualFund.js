var i;
auth.onAuthStateChanged(user => {
  if (user) {
    $("body").show();
  } else {
    window.location.href = ".../index.html";
  }
});

let Invested = 0;
let Current = 0;
let TotalReturn = 0;
var TotalAmount = 0;
var CurrentNAV = 0;
var TotalUnit = 0;
var SIPRedeem = 0;
var fillData, Key, Data, date, name, amount, nav, unit, calc, res, data, PAL, rowName, id;

const baseApiUrl = 'https://api.mfapi.in/mf/';
const fetchDataForFund = async (fundId) => {
  const url = `${baseApiUrl}${fundId}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};


const fetchAllData = async () => {
  const allData = [];
  for (const fund of funds) {
    const data = await fetchDataForFund(fund.id);
    // Extract necessary data from the response
    const fundData = {
      id: fund.id,
      name: fund.name,
      nav: data.data[0].nav,
    };
    allData.push(fundData);
  }
  return allData;
};


fetchAllData().then((data) => {
  var i = 1;
  data.forEach((fundData) => {
    let addTab = "";

    db.ref(fundData.name).once('value',
      (snap)=> {
        addTab += createTable(i);
        $('#MainTable').append(addTab);

        let addRow, addCal;
        snap.forEach((fire)=> {
          Key = fire.key;
          Data = fire.val();
          let dateString = Key;
          name = Data.name;
          amount = Data.amount;
          nav = Data.nav;
          unit = Data.unit;
          calc = Number(amount);
          TotalAmount += calc;
          calc = Number(unit);
          TotalUnit += calc;
          date = new Date(dateString);
          
          let options = {
            day: '2-digit', month: 'short', year: 'numeric'
          };
          let formattedDate = date.toLocaleDateString('en-IN', options);

          /*---------------------Fund Data-----------------*/
          $('#FundName'+i).text(fundData.name);
          rowName = fundData.name+Key;
          addRow += `<tr id="${rowName}" style="color:var(--dark);">
          <td data-label="Date">${formattedDate}</td>
          <td data-label="Name">${name}</td>
          <td data-label="Amount">₹ ${amount}</td>
          <td data-label="Nav">${nav}</td>
          <td data-label="Unit">${unit}</td>
          <td class="operation" onclick="deleteData('${Key}','${fundData.name}','${formattedDate}')" hidden>
          <i class="fa fa-trash-o" aria-hidden="true"></i>
          </td><td class="operation" onclick="editData('${Key}','${fundData.name}','${formattedDate}')" hidden>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </td>
          </tr>`;
        });
        $('#table_data'+i).append(addRow);


        //Calculation
        CurrentNAV = fundData.nav;
        SIPRedeem = (CurrentNAV * TotalUnit).toFixed(3);
        Current += Number(SIPRedeem);
        PAL = (SIPRedeem - TotalAmount).toFixed(3);
        Invested += TotalAmount;
        calc = TotalAmount.toFixed(2);
        TotalAmount = calc;

        /*----------------------Fund Main Data---------------*/
        addCal = `<tr id="sdata" style="color:var(--dark);">
        <td data-label="Total Amount">₹ ${TotalAmount}</td>
        <td data-label="Current NAV">${CurrentNAV}</td>
        <td data-label="Total Unit">${TotalUnit}</td>
        <td data-label="Redeem">₹ ${SIPRedeem}</td>
        <td data-label="P&L" id="PAL${i}">₹ ${PAL}</td>
        </tr>`;
        $('#Summary_data'+i).append(addCal);

        $("#PAL"+i).css("fontWeight", "bold");
      //  $("#sdata").css("backgroundColor", "#dfe6e9");

        if (PAL > 1) {
          $("#PAL"+i).css("backgroundColor", "var(--light-green)");
          $("#PAL"+i).css("color", "var(--green)");
        } else {
          $("#PAL"+i).css("color", "var(--red)");
          $("#PAL"+i).css("backgroundColor", "var(--light-red)");
        }

        i++;
        TotalAmount = 0;
        CurrentNAV = 0;
        TotalUnit = 0;
        SIPRedeem = 0;
        PAL = 0;

        Invested = Math.round(Invested);
        Current = Math.round(Current);
        TotalReturn = Current - Invested;

        /*------------------------Main Data-----------------*/
        $('#Main_data').text("");
        addCal = `<tr id="mdata">
        <td data-label="Invested">₹ ${Invested}</td>
        <td data-label="Current">₹ ${Current}</td>
        <td data-label="Total Returns" id="TR">₹ ${TotalReturn}</td>
        </tr>`;
        $('#Main_data').append(addCal);

        //Filling Data
        $("#TR").css("fontWeight", "bold");
       // $("#mdata").css("backgroundColor", "#dfe6e9");

        if (TotalReturn >= 0) {
          $("#TR").css("backgroundColor", "var(--light-green)");
          $("#TR").css("color", "var(--green)");
        } else {
          $("#TR").css("color", "var(--red)");
          $("#TR").css("backgroundColor", "var(--liggt-red)");
        }
      });
  });
  fade();
}).catch((error) => {
  console.error(error);
});


/***************Create Heading For Table*************/
const createTable = (i)=> {
  let creTab;
  creTab = `<h1 id="FundName${i}">Fnud Name</h1><br>
  <table class="table">
  <thead>
  <tr>
  <th>Date</th>
  <th>Name</th>
  <th>Amount</th>
  <th>Nav</th>
  <th>Unit</th>
  <th colspan="2" class="operation" hidden>Operation</th>
  </tr>
  </thead>
  <tbody id="table_data${i}">
  </tbody>
  </table>
  <table class="table summary">
  <thead>
  <tr>
  <th>Total Amount</th>
  <th>Current NAV</th>
  <th>Total Unit</th>
  <th>Current Amount</th>
  <th>P&L</th>
  </tr>
  </thead>
  <tbody id="Summary_data${i}">
  </tbody>
  </table><br><br>`;
  return creTab;
}




//Delete Data
const deleteData = (key, fundName, fdate) => {
  let id = fundName+key;
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete entry of Date : "+fdate,
    icon: "warning",
    background: "var(--light)",
    color:"var(--dark)",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      if (checkAdmin()) {
        firebase.database().ref(fundName).child(key).remove()
        .then(() => {
          let timerInterval;
          Swal.fire({
            title: "Updated",
            background: "var(--light)",
            color:"var(--dark)",
            html: `<b>The data of ${fdate}, has been deleted successfully.</b>`,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("li");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              location.reload();
            }
          });
        })
        .catch((error) => {
          displayError(error.message);
        });
     } else {
        displayWarning("Please login from Admin email.");
      }
    }
  });
}


//Update Data
const editData = (oldDate, fundName, fdate) => {
  Swal.fire({
    title: 'Edit Data Of '+fdate,
      background: "var(--light)",
    color:"var(--dark)",
    html: `<form><div class="form-row"><div class="form-group"><label for="Name"><b>Name:</b></label><br><div class="radio-group"><input type="radio" id="uName1" name="uName" value="Javed Iqbal" class="swal2-input"><label for="uName1">Javed Iqbal</label><br><input type="radio" id="uName2" name="uName" value="Javed & Obaidur" class="swal2-input"><label for="uName2">Javed & Obaidur</label></div></div></div><div class="form-row"><div class="form-group"><label for="fundAmount"><b>Amount:</b></label><input type="number" id="uAmount" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundNav"><b>Nav:</b></label><input type="number" id="uNav" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundUnit"><b>Unit:</b></label><input type="number" id="uUnit" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundDate"><b>Date:</b></label><input type="date" id="uDate" class="swal2-input"></div></div></form>`,
    inputAttributes: {
      'aria-label': 'Name, Fund Amount, Fund Nav, Fund Unit, Date'
    },
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const uName = Swal.getPopup().querySelector('input[name="uName"]:checked').value;
      const uAmount = Swal.getPopup().querySelector('#uAmount').value;
      const uNav = Swal.getPopup().querySelector('#uNav').value;
      const uUnit = Swal.getPopup().querySelector('#uUnit').value;
      const uDate = Swal.getPopup().querySelector('#uDate').value;

      if (!uName || !uAmount || !uNav || !uUnit || !uDate) {
        Swal.fire("Error", `Please input all the field`, "error");
      } else {
        updateData(fundName, oldDate, uDate, uName, uAmount, uNav, uUnit, fdate);
      }
    }
  });
}

const updateData = (fundName, oldDate, uDate, uName, uAmount, uNav, uUnit, fdate)=> {
  const updates = {};
  updates[oldDate] = null;
  updates[uDate] = {
    name: uName,
    amount: uAmount,
    nav: uNav,
    unit: uUnit
  };
  if (checkAdmin) {
    db.ref(fundName).update(updates)
    .then(() => {
      let timerInterval;
      Swal.fire({
        title: "Updated",
        html: `<b>The data of ${oldDate} has been updated to ${uDate} successfully.<b>`,
        timer: 3000,
          background: "var(--light)",
    color:"var(--dark)",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("li");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload();
        }
      });
    }).catch((error) => {
      displayError(`Failed to update: ${error.message}`);
    });
  } else {
    displayWarning("Please login from admin email.");
  }
}



//Fade Out
const fade = ()=> {
  $("#preloader").css("display",
    "none");
 // Nav();
  setTimeout(() => {
    $("#datta").css("display",
      "initial");
    $("#preloader").hide();
    $(".navbar").css("display", "flex");
  },
    1000);
}


