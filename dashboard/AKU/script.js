const semesterItems = $(".semester-item");
const iframeContainer = $("#iframe-container");
let currSemester;

$("#Search").hide();
$(".noData").hide();
$(".student-table").hide();
$(".searchBar").hide();

semesterItems.on("click", function (event) {
	// Remove active class from all semester items
	semesterItems.removeClass("active");
	// Add active class to the clicked semester item
	$(this).addClass("active");

	// Get the text of the clicked semester item
	const selectedSemesterText = $(this).text();
	currSemester = selectedSemesterText;
	if (selectedSemesterText === "I" || selectedSemesterText === "II" || selectedSemesterText === "III") {
		$(".data").show();
		$(".noData").hide();
		$("#Search").show();
	} /*else if (selectedSemesterText === "III") {
		$(".data").hide();
		$(".noData").show();
		$("#Search").hide();
		$(".semMess").text("Result Not Declared!");
		
	} */
	else {
		$(".data").hide();
		$(".noData").show();
		$("#Search").hide();
		$(".semMess").text("Exam Not Conducted!");
	}
});

$(document).ready(() => {
	$('input[name="opt"]').on("change", event => {
		iframeContainer.html("");
		if ($(event.target).attr("id") === "searOpt1") {
			$(".student-table").show();
			$(".searchBar").hide();
		} else if ($(event.target).attr("id") === "searOpt2") {
			$(".student-table").hide();
			$(".searchBar").show();
		}
	});
});

const students = [
  { name: "Falak Siddique", regNumber: "27", roll: "01", status: "p" },
  { name: "Md Afiat Daniyal", regNumber: "01", roll: "02", status: "p" },
  { name: "Mahpara", regNumber: "35", roll: "03", status: "p" },
  { name: "Md Hasim Hussain", regNumber: "10", roll: "04", status: "p" },
  { name: "Nihal Ahmad Raza", regNumber: "47", roll: "05", status: "p" },
  { name: "Md Danish Raza", regNumber: "42", roll: "06", status: "p" },
  { name: "Md Ehsan Reza", regNumber: "21", roll: "07", status: "p" },
  { name: "Md Danish Raza", regNumber: "31", roll: "08", status: "p" },
  { name: "Noorul Ain", regNumber: "05", roll: "09", status: "p" },
  { name: "Md Shadab Alam", regNumber: "37", roll: 10, status: "p" },
  { name: "Nahid Akram", regNumber: "11", roll: 11, status: "a" },
  { name: "Ragib Ahsan Anjum", regNumber: "49", roll: 12, status: "p" },
  { name: "Md Shayaque Niyaz", regNumber: "28", roll: 13, status: "p" },
  { name: "Nasihat Perween", regNumber: "36", roll: 14, status: "p" },
  { name: "Chandan Kumar", regNumber: "15", roll: 15, status: "a" },
  { name: "Md Shahjahan", regNumber: "12", roll: 16, status: "p" },
  { name: "Mukhtar Ashraf", regNumber: "30", roll: 17, status: "p" },
  { name: "Aman Sagar", regNumber: "55", roll: 18, status: "p" },
  { name: "Jafar Equbal", regNumber: "29", roll: 19, status: "p" },
  { name: "Sagar Kumar", regNumber: "20", roll: 20, status: "a" },
  { name: "Manish Kumar", regNumber: "21", roll: 21, status: "a" },
  { name: "Abdur Rahman", regNumber: "09", roll: 22, status: "p" },
  { name: "Akbar Haider", regNumber: "08", roll: 23, sttus: "p" },
  { name: "Ashraf Ali", regNumber: "11", roll: 24, status: "p" },
  { name: "Sahnaj Khatun", regNumber: "04", roll: 25, status: "p" },
  { name: "Mishba Nihal Rony", regNumber: "56", roll: 26, status: "p" },
  { name: "Mriganka Adhya", regNumber: "27", roll: 27, status: "a" },
  { name: "Md Aftab", regNumber: "28", roll: 28, status: "a" },
  { name: "Avinash Kumar Sharma", regNumber: "29", roll: 29, status: "a" },
  { name: "Md Ikbal Hussain", regNumber: "02", roll: 30, status: "p" },
  { name: "Md Sahnawaj", regNumber: "14", roll: 31, status: "p" },
  { name: "Kashif Kauser", regNumber: "07", roll: 32, status: "p" },
  { name: "Abdul Khabir", regNumber: "33", roll: 33, status: "a" },
  { name: "Tabis Rukhsar", regNumber: "41", roll: 34, status: "p" },
  { name: "Md Asif", regNumber: "35", roll: 35, status: "a" },
  { name: "Javed Iqbal ", regNumber: "58", roll: 36, status: "p" },
  { name: "Anand Kumar", regNumber: "37", roll: 37, status: "a" },
  { name: "Shah Arzan", regNumber: "20", roll: 38, status: "p" },
  { name: "Arvind Kumar Das", regNumber: "52", roll: 39, status: "p" },
  { name: "Amit Kumar Kevat", regNumber: "48", roll: 40, status: "p" },
  { name: "Soyabur Rahman", regNumber: "39", roll: 41, status: "p" },
  { name: "Md Iftekhar Alam", regNumber: "50", roll: 42, status: "p" },
  { name: "Farooque Alam", regNumber: "13", roll: 43, status: "p" },
  { name: "Alakh Kumar", regNumber: "44", roll: 44, status: "a" },
  { name: "Md Mursalim", regNumber: "24", roll: 45, status: "p" },
  { name: "Atish Kumar", regNumber: "54", roll: 46, status: "p" },
  { name: "Md Ashraf Raza", regNumber: "23", roll: 47, status: "p" },
  { name: "Prity Kumari", regNumber: "48", roll: 48, status: "a" },
  { name: "Md Hasamuddin", regNumber: "18", roll: 49, status: "p" },
  { name: "Samser Alam", regNumber: "50", roll: 50, status: "a" },
  { name: "Md Mubarak", regNumber: "40", roll: 51, status: "p" },
  { name: "Nurani Jahan", regNumber: "17", roll: 52, status: "p" },
  { name: "Md Nasim", regNumber: "51", roll: 53, status: "p" },
  { name: "Md Adil Raja", regNumber: "22", roll: 54, status: "p" },
  { name: "Khushkadam Usman", regNumber: "26", roll: 55, status: "p" },
  { name: "Md Shanawaz Alam", regNumber: "53", roll: 56, status: "p" },
  { name: "Awesh Karni", regNumber: "25", roll: 57, status: "p" },
  { name: "Najmul Haque", regNumber: "44", roll: 58, status: "p" },
  { name: "Md Musharraf", regNumber: "33", roll: 59, status: "p" },
  { name: "Saurav Suman", regNumber: "60", roll: 60, status: "a" }
];

// Function to populate student data
const populateStudentData = pageNumber => {
	const $studentData = $("#student-data");
	$studentData.empty();
	const startIndex = (pageNumber - 1) * 10;
	const endIndex = startIndex + 10;
	for (let i = startIndex; i < endIndex; i++) {
		if (i >= students.length) break;
		const student = students[i];
		const $row = $(`<tr onclick='result("${student.regNumber}","${student.status}")'>`).html(`
      <td>2022BP${student.roll}</td>
      <td>${student.name}</td>
      <td>221091890${student.regNumber}</td>
    `);
		$studentData.append($row);
	}
};

// Function to handle pagination link clicks
const handlePaginationClick = event => {
	const currentPage = $(event.target).text();
	populateStudentData(currentPage);
	// Remove active class from all links
	$(".pagination a").removeClass("active");
	// Add active class to the current link
	$(event.target).addClass("active");
};

// Function to generate pagination links
const generatePaginationLinks = () => {
	const $pagination = $(".pagination");
	$pagination.empty();
	const totalPages = Math.ceil(students.length / 10);
	for (let i = 1; i <= totalPages; i++) {
		const $link = $("<a>").attr("href", "#").text(i);
		$link.on("click", handlePaginationClick);
		if (i === 1) {
			$link.addClass("active"); // Add active class to the first link
		}
		$pagination.append($link);
	}
};

// Initialize pagination
generatePaginationLinks();
populateStudentData(1);

$(".searchInput").on("input", e => {
	const inputValue = $(e.target).val();
	if (inputValue.length >= 2) {
		$(e.target).val(inputValue.slice(0, 2));

		const regNo = inputValue.slice(0, 2);
		result(regNo);
		//console.log(inputValue);
	}
	console.log($(window).height());
});

const result = (regNo,sta) => {
  if(sta === 'a'){
    return;
  }
  
  // Clear existing iframes
  iframeContainer.html("");
  let link;
  if (currSemester === "I") {
    link = `https://results.akuexam.net/ResultsBPharm1stSemPub2022.aspx?Sem=I&RegNo=221091890${regNo}`;
    fheight = "580";
  } else if (currSemester === "II") {
    link = `https://results.akuexam.net/ResultsBPharm2ndSemPub2023.aspx?Sem=II&RegNo=221091890${regNo}`;
    fheight = "615";
  } else if (currSemester === "III") {
    link = `https://results.akuexam.net/ResultsBPharm3rdSemPub2023.aspx?Sem=III&RegNo=221091890${regNo}`;
    fheight = "615";
  }


  const iframe = $("<iframe>")
    .attr({
      src: link,
      frameborder: 0,
      width: "100%",
      id: "mainIframe",
      height: $(window).height() - fheight
    })
    .css({
      overflowY: "hidden",
      filter: 'grayscale(100%) invert(100%) '
    })
    .attr("scrolling", "no");

  iframeContainer.append(iframe);
// Get the element with the id "resultFrame" using jQuery
const resultFrameLink = $("#resultFrame");
// Click the link
resultFrameLink.trigger("click");
resultFrameLink.click();
  // Add event listener to download div
  //$(".download").on("click", takeScreenshot);
};



/*
const takeScreenshot = () => {
  const iframe = $("#mainIframe")[0];
  html2canvas(iframe, {
    useCORS: true,
    logging: true,
    proxy: "https://html2canvas.hertzen.com/proxy"
  }).then(canvas => {
    console.log("Canvas generated:", canvas);
    setTimeout(() => { // Add a small delay to ensure canvas is fully loaded
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' })); // Set MIME type explicitly
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.pdf";
        console.log("Anchor element:", a);
        console.log("Anchor element href:", a.href);
        console.log("Triggering anchor element click...");
        a.click();
        console.log("Anchor element click triggered.");
      }, 100); // Add a small delay
    });
  });
};*/


