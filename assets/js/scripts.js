$(document).ready(function(){ 
	const scriptURL = 'https://script.google.com/macros/s/AKfycbw5volV_rb4KMWKRvmIh64u6JJR12_Ss1-h8rryTjcwG2J_-q09PtMe4uTWq1MWL1KUnA/exec'
    
	const form = document.forms['HTML_FORM']          
	form.addEventListener('submit', e => {
		e.preventDefault();
		let name = $('#name').val();
		let email = $('#email').val();
		let select_device = $('#select_device').val(); 
		if(name.length == 0){
			Swal.fire({
				icon: 'error',
				title: 'Required',
				text: 'Name is Required!', 
			})
		}
		else if(email.length == 0){
			Swal.fire({
				icon: 'error',
				title: 'Required',
				text: 'Email is Required!', 
			})
		} 
		else if(select_device.length == 0){
			Swal.fire({
				icon: 'error',
				title: 'Required',
				text: 'Select Device is Required!', 
			})
		} 
		else{
			$('.submit-btn').val('Sending...');
			fetch(scriptURL, { method: 'POST', body: new FormData(form)})
				.then(response => { 
					Swal.fire("Success!",
					"Your Data Submit Success",
					"success"
					).then(()=>{ 
					$('.submit-btn').val('Submit'); 
						form.reset();
					}) 
				} 
			)
			.catch(error => console.error('Error!', error.message))
		} 
	});
	 
  	// Select Device
  	$('#select_device').change(function () {
		let device = $(this).val();
		if(device == 'laptop'){
			$('.laptop-select').show();
			$('.mobile-select').hide();
		}
		else if(device == 'mobile'){
			$('.mobile-select').show();
			$('.laptop-select').hide();
		}
		else{
			$('.mobile-select').hide();
			$('.laptop-select').hide();
		}
    });
 
  
});