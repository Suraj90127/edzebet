

$(document).ready(function () {
    const currentPath = window.location.pathname;
    $(`a[href="${currentPath}"]`).addClass('active').css('pointer-events', 'none');
});

$('.back-to-tops').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

let checkID = $('html').attr('data-change');
let i = 0;

// if (checkID == 1) i = 1;
// if (checkID == 2) i = 3;
// if (checkID == 3) i = 5;
// if (checkID == 4) i = 0.5;

// function cownDownTimer() {
//     const countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();

//     setInterval(function () {
//         const now = new Date().getTime();
//         const distance = countDownDate - now;

//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const minute = Math.ceil(minutes % i);
//         const seconds1 = Math.floor((distance % (1000 * 60)) / 1000);
//         const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

//         if (checkID != 1) {
//             $(".time .time-sub:eq(1)").text(minute);
//         }
        
//         $(".time .time-sub:eq(2)").text(Math.floor(seconds1 / 10)); // Dividing seconds1 by 10 to simulate the original logic
//         $(".time .time-sub:eq(3)").text(seconds2);
        
//         // Duplicate the logic for the second timer
//         if (checkID != 1) {
//             $(".time2 .time-sub:eq(1)").text(minute);
//         }
        
//         $(".time2 .time-sub:eq(2)").text(Math.floor(seconds1 / 10)); // Same logic for the second timer
//         $(".time2 .time-sub:eq(3)").text(seconds2);
//     }, 1000); // Set to 1000ms to run every second
// }

// cownDownTimer();


let sockets = null;
let intervalRef = null;

function connectsockets(checkID, host) {
  // Clear any existing interval
  if (intervalRef) {
    clearInterval(intervalRef);
  }

  if (sockets) {
    sockets.disconnect(); // Ensure previous sockets is disconnected
  }

  const setupsockets = (eventName) => {
    sockets = io.connect(host); // Connect to the server

    sockets.on(eventName, (data) => {
      if (!data) return;
      
      const { minute, secondtime1, secondtime2 } = data;

    //   console.log(`Minute: ${minute}, Second Time 1: ${secondtime1}, Second Time 2: ${secondtime2}`);

 $(".time .time-sub:eq(1)").text(minute);
    $(".time .time-sub:eq(2)").text(secondtime1); // Dividing seconds1 by 10 to simulate the original logic
        $(".time .time-sub:eq(3)").text(secondtime2);
      // Handle open time logic
 
    });

    // Clean up sockets listener on disconnection
    return () => {
      sockets.off(eventName);
      sockets.disconnect();
    };
  };

  // Set up sockets connection based on typeid1
  if (checkID == 3) {
    setupsockets('timeUpdate_5');
  } 
  if (checkID == 2) {
    setupsockets('timeUpdate_3');
  }
  if (checkID == 1) {
    setupsockets('timeUpdate_11');
  }
  if (checkID == 4) {
    setupsockets('timeUpdate_30');
  }
}


// Usage example
const typeid1 = 5; // Change this based on your needs
// const host = 'https://edzebet.com';
const host = 'http://localhost:5505';
const activeVoice = true; // or false, depending on your needs



// Call the function to establish the sockets connection
connectsockets(checkID, host);

// Cleanup when necessary
window.addEventListener('unload', () => {
  if (sockets) {
    sockets.disconnect(); // Disconnect sockets on page unload
  }
});










