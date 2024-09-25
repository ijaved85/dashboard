var i;
auth.onAuthStateChanged(user => {
  if (user) {
    $("body").show();
  } else {
    window.location.href = ".../index.html";
  }
});



 // assume this is defined somewhere
 
const $sel = $('#seel');
let option = ''; // Initialize option as an empty string

funds.forEach((fund) => {
 option +=`<option value="${fund.value}">${fund.name}</option>`;
});

$sel.html(option);

const Pay = () => {
  const selValue = $('#seel').val();
  console.log(`Selected value: ${selValue}`);
  const selectedFund = funds.find(fund => fund.value === selValue);
  console.log(`Selected fund: ${selectedFund}`);
  if (!selectedFund) {
    alert("Invalid Fund Selection");
    return;
  }
  
  const Amount = $("#amnt").val();
  if (selectedFund.holderName === 'Javed Iqbal') {
    fName = selectedFund.holderName;
  } else {
    fName = $("input[name='holdername']:checked").val();
  }
  const SipDate = $("#sipdate").val();
  const Nav = parseFloat($("#navval").val());
  const Unit = Amount / Nav;
  const FixUnit = Unit.toFixed(3);
  const FixNav = Nav.toFixed(4);
  if (!Amount || !SipDate) {
    alert("Field Empty");
  } else {
    //SipDate = dateformat(SipDate);
    db.ref(selectedFund.name + '/' + SipDate).set(
      {
        name: fName,
        amount: Amount,
        nav: FixNav,
        unit: FixUnit
      }, (err) => {
        if (err) {
          displayError(err.message);
        } else {
          displaySuccessToast("Successfully Added");
          mfNewData.reset()
          setTimeout(() => {
$(parent.document).find('#mfEntry').trigger('click');
          }, 1000);
        }
      });
  }
};

$('#seel').change(function() {
  const value = $(this).val();
  const selectedFund = funds.find(fund => fund.value === value);

  if (selectedFund && selectedFund.holderName === 'Javed & Obaidur') {
    $("#siphol").css("display", "initial");
    console.log(selectedFund, selectedFund.holderName);
  } else {
    $("#siphol").css("display", "none");
    console.log(selectedFund, selectedFund.holderName);
  }
});