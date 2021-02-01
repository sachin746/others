function openmenu(){
    document.querySelector(".sidebar").classList.add("open")
    }
    function closemenu(){
        document.querySelector(".sidebar").classList.remove("open")
    }

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

function yo1(){
    var x=document.getElementById("1").value;
    document.getElementById("11").innerHTML=x;
}
function yo2(){
    var x=document.getElementById("2").value;
    document.getElementById("22").innerHTML=x;
}
function yo3(){
    var x=document.getElementById("3").value;
    document.getElementById("33").innerHTML=x;
}
function remove(imput){
    $('.1').css({"display":"none"})
}