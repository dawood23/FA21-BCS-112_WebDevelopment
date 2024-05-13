function validateForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('Email').value;
    let message = document.getElementById('message').value;

    
    if (name.trim() === '' || email.trim() === '' || email.indexOf('@') === -1  || email.indexOf('.') ===-1 || message.trim() === '') {
        alert('Please fill out all the fields.');
        return false;
    }
    return true;
}

window.onload= function(){
    document.getElementById("subbtn").onclick= function(){
        if(validateForm()){
            alert("Form Has been submitted");
        }
        else{
            alert("Please Enter valid Data!!");
        }
    }
}