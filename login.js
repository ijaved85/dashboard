auth.onAuthStateChanged(user => {
  $(".preContent").fadeIn();
  if (user) {
    adminCheck(user.uid).then(isAdmin => {
      if (isAdmin) {
        $(".preContent").fadeOut();
        displaySuccessToast("Sign In Successfully");
        setTimeout(function() {
          window.location.href = "./dashboard/index.html";
        }, 1500);
            
      } else {
        console.log("User is not an admin");
      }
    }).catch(error => {
      console.error("Error checking admin status:", error);
    });
  } else {
$(".preContent").fadeOut(100);
    console.log("No user");
  }
});

$('#submit').click((e) => {
  e.preventDefault();
  // Select the element you want to fade in
$(".preContent").fadeIn();
  var email = $("#login-email").val().trim();
  var password = $("#login-pass").val().trim();

  if (email == "" || password == "") {
    $(".preContent").fadeOut();
    displayError("Email & Password can't be empty");
  } else {
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      user = userCredential.user;
      // Check if the user is an admin
      return adminCheck(user.uid); // Return the promise
    })
    .then((isAdmin) => {
      // Handle the result of adminCheck
      if (isAdmin) {
        console.log(isAdmin);
        displaySuccessToast("Sign In Successfully");
         setTimeout(function() {
          window.location.href = "./dashboard/index.html";
        }, 1500);
      } else {
        displayError("Only admins are allowed to log in");
        auth.signOut(); // Sign out the user
      }
    })
    .catch((err) => {
      $(".preContent").fadeOut(100);
      displayError(err.message);
    });
  }
});






$('#reset').click((e) => {
  e.preventDefault();
  $(".preContent").fadeIn();
  var email = $("#login-email").val();

  if (email == "") {
    $(".preContent").fadeOut();
    displayError("Enter the email id!");
  } else {
    auth.sendPasswordResetEmail(email).then(() => {
      $(".preContent").fadeOut();
      displaySuccessToast(`Link Send to ${email}`);
      $("#login-email").val("");
      $HandleLink.click();
    }).catch((err) => {
      $(".preContent").fadeOut(100);
      displayError(err.message);
    });
  }
});


const $HandleLink = $("#LinkHandle");
$HandleLink.on('click', function() {

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('#LinkHandle a').text('Forgot Password');
    $('#resetBtn').hide();
    $('#submitBtn').show();
    $("#login-pass").show();
  } else {
    $(this).addClass('active');
    $('#LinkHandle a').text('I Do Remember');
    $('#resetBtn').show();
    $('#submitBtn').hide();
    $("#login-pass").hide();
  }
});
if ('serviceWorker' in navigator) {
        window.addEventListener('load', ()=> {
          navigator.serviceWorker.register('./sw.js').then((reg)=> {
            // Registration was successful
            console.log('Registration successful with scope: ', reg.scope);
          }, (err)=> {
            // registration failed :(
            console.log('Registration failed: ', err);
          });
        });
      }

      let deferredPrompt;
     $("#installApp").hide();
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        $("#installApp").show();
        $("#installApp").click((e) => {
          $("#installApp").hide();
          deferredPrompt.prompt();
          deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        });
      });
