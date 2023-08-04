
function productConnect(){

    var product = document.getElementById('product-info');
    var institutional = document.getElementById('institutional');
    var individual = document.getElementById('individual');
    var instProduct = document.getElementById('institutional-info')
    var indProduct = document.getElementById('individual-info');
    var os = document.getElementById('os');
    let osAndroid = document.getElementById('os-android');

    product.addEventListener('change',function(){
        const selectOption = this.value;
        switch(selectOption){

            case 'Kurumsal':
                institutional.style.display = 'block';
                individual.style.display = 'none';
                os.style.display ='none';
                osAndroid.style.display = 'none';
                instProduct.addEventListener('change', insConnect);
                break;
            case 'Bireysel':
                institutional.style.display = 'none';
                individual.style.display = 'block';
                os.style.display ='none';
                osAndroid.style.display = 'none';
                indProduct.addEventListener('change',function(){
                    switch(this.value){
                        case this.options[0].value:
                            osAndroid.style.display = 'none';
                        case this.options[1].value:
                        case this.options[2].value:
                        case this.options[3].value:
                        case this.options[4].value:
                            os.style.display = 'block';
                            osAndroid.style.display = 'none';
                            break;
                        default:
                            osAndroid.style.display = 'block'
                            os.style.display = 'none';
                    }
                });
                break;
            default:
                institutional.style.display = 'none';
                individual.style.display = 'none';
                os.style.display = 'none'; 
                osAndroid.style.display = 'none';
        }
    });
}

function insConnect(){

    if(this.value == this.options[1].value){
        os.style.display = 'block';
    }
    else{
        os.style.display = 'none';
    }
}

function toolTipInfo() {
    var iconImage = document.getElementById('icon-img');
    var toolTip = document.getElementById('tooltip');
    
    iconImage.addEventListener('mouseover',function(){
        toolTip.style.display = 'block';
    })
    
    iconImage.addEventListener('mouseout',function(){
        toolTip.style.display = 'none';
    })
}

productConnect();
toolTipInfo();

document.getElementById("user-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:5000/dosya-yukle', {  // Flask uygulamanızın çalıştığı URL'yi buraya yazın
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        alert(result);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
    } else {
      alert("Lütfen bir dosya seçin.");
    }
  });







  