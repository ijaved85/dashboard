const wrapper = document.querySelector(".wrapper"),
	qrInput = wrapper.querySelector(".form input"),
	//downloadBtn = wrapper.querySelector("button"),
	QRIMG = wrapper.querySelector(".QR");
let preValue;
let mode;
qrInput.addEventListener("keyup", () => {
	if (!qrInput.value.trim()) {
		wrapper.classList.remove("active");
		preValue = "";
		return;
	}
	let qrValue = qrInput.value.trim();
	 mode = "#0C0C1E";
	generateQRCode(qrValue);
});
//#4267b2,

function generateQRCode(preValue) {
	QRIMG.innerHTML = "";
	const url = "upi://pay?pa=afifislam@axisb&pn=Javed Iqbal&am=" + preValue;
	const qrcode = new QRCodeStyling({
		height: 210,
		width: 210,
		type: "canvas",
		data: url,
		image: "./Upi.png",
		qrOptions:{
		  errorCorrectionLevel:"Q"
		},
		dotsOptions: {
			color: "#3C91E6",
			type: "dots"
		},
		cornersSquareOptions: {
			type: "extra-rounded"
		},
		cornersDotOptions: {
			type: "dots"
		},
		backgroundOptions: {
			color: mode
		},
		imageOptions: {
			crossOrigin: "anonymous",
			margin: 10,
			imageSize:1
		}
	});

	qrcode.append(QRIMG);
	wrapper.classList.add("active");
}
/*
downloadBtn.addEventListener("click", () => {
	const canvas = document.querySelector("canvas");
	const link = document.createElement("a");
	link.href = canvas.toDataURL();
	link.download = "qr-code.png";
	link.click();
});
*/