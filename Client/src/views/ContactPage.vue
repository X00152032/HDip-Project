<!-- Contact Page -->

<template>
<body>
    <div id = maintable class="bg-white text-grey" style="text-align: left">
        <ol class="ordered-list">
        <h2>Contact Us</h2> <hr>
        </ol><br>
<div class="fill_form">
    <h5>Have a Question?<br>Fill out our Contact Form.</h5><br>
    <a href="#contact-id">
      <img id="contact_form" src="../assets/contact_form.png" alt="link to the contact form">
      </a>
      <br>
      <br>
      <br>
      <h5>St. Raphaela’s Secondary School,<br>
          St. Raphaela’s Road,<br>
          Stillorgan,<br>
          Co. Dublin.<br>
          01-2888730</h5>
    </div>
<div class="map">
<h5>How to Find Us<br></h5>
<p>St. Raphaela's is located between Stillorgan Village<br> and Sandyford Industrial Estate, at the top of <br>Upper Kilmacud Road, and accessed via Stillorgan Heath.</p><br>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.3584702473318!2d-6.207522084617531!3d53.28311338714746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867091346a24979%3A0xb1a0dc6ef3c078c5!2sSt%20Raphaelas%20Secondary%20School!5e0!3m2!1sen!2sie!4v1598194032451!5m2!1sen!2sie" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe><br>
</div>
</div>
	<div class="contact" id="contact-id">
		<section><h3><a href="#!">[ close ]</a></h3></section>
		<form action="/ajax/email" class="contact-form" method="POST" onsubmit="submitEmailForm(this)">
			<div>
				<input type="text" name="name" placeholder="name" class="contact-form-input" required />
			</div>
			<div>
				<input type="email" name="email" placeholder="email" class="contact-form-input" required />
			</div>
			<div>
				<textarea name="message" class="contact-form-input" placeholder="MESSAGE" required></textarea>
			</div>
			<div>
				<button type="submit">send</button>
			</div>
		</form>
	</div>
  </body>
</template>

<script>
export default {
     
    methods: {
		submitEmailForm(form) {
			var obj = new XMLHttpRequest();
			obj.onreadystatechange = function(){
			if(obj.readyState == 4){
				if(obj.status == 200){
						var res = JSON.parse(obj.responseText);
						alert(res.message);
					}
				else{
						alert("XMLHttp status " + obj.status + ": " + obj.statusText);
					}
				}
      };
      
			obj.open("post", form.action, true);
			obj.setRequestHeader("Content-Type", "application/json"); // NOTICE: "application/json"
			obj.send(JSON.stringify({ name: form.name.value, email: form.email.value, message: form.message.value }));
			return false;
    }
    }}
	</script>

<style scoped>


.fill_form{
  float:left;
  margin-left:30px;
}

.fill_form h5{
  margin-left:130px;
  text-align: center;
}

.map iframe{
  float:right;
  margin-right:180px;
  align-content: center;
}

.map h5, p{
  text-align:center;
}

#contact-id h3{
  text-align: center;
  margin-top: 500px;
}


#contact_form{
align-content: center;   
width: 150px;
border-radius: 15%;
margin-left: 200px;
}

*, *::before, *::after {
			box-sizing: border-box;
		}
		body {
			font-family: sans-serif;
			font-size: 16px;
			background-color: #fff;
		}
		h1 {
			font-variant: small-caps;
		}
		.contact {
			visibility: hidden;
			opacity: 0;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			transition: .5s;
			background-color: #fff;
		}
		.contact section {
			text-align: right;
			padding: 10px;
		}
			.contact section a {
				border: none;
				text-decoration: none;
				outline: none;
				color:#003ea1;
			}
		.contact:target {
			visibility: visible;
			opacity: 1;
		}
		.contact-form {
			position: absolute;
			max-width: 500px;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			display: flex;
			flex-direction: column;
			box-shadow: 0 0 20px rgba(0,0,0,0.2);
			width:90%;
			border-radius: 20px;
			overflow: hidden;
		}
		.contact-form-input,
		.contact-form button {
			font-family: inherit;
			text-transform: uppercase;
			font-weight: bold;
			font-size: 12px;
			padding: 24px;
			letter-spacing: 1px;
			border: none;
			width: 100%;
			outline: none;
		}
		.contact-form button {
			background-color: #003ea1;
			padding: 20px;
			color: #fff;
		}
		.contact-form div:nth-child(1),
		.contact-form div:nth-child(2) {
			position: relative;
		}
		.contact-form div:nth-child(1)::after,
		.contact-form div:nth-child(2)::after {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 1px;
			background-color: rgba(0,0,0,0.15);
		}
		.contact-form textarea {
			overflow: auto;
			height: 100px;
			text-transform: none;
		}
</style>