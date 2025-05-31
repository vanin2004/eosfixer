let rmData = "removedCources";
let classNames = ["even","odd"];

function removeFooter(){
    document.querySelector("#frontpage-category-combo").remove();
}

function initCheckBoxes(removedCourcesList){
    console.log("begin");
    let counter = 0;

    const courseBoxes = document.querySelectorAll('.courses.frontpage-course-list-enrolled > div[data-type]');
    courseBoxes.forEach((courseBox) => {
      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.style.float = 'left';
      checkboxWrapper.style.marginRight = '10px';
      checkboxWrapper.style.marginTop = '3px'; 
      checkboxWrapper.classList.add("checkboxwrapper");
    
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkboxes');
      checkbox.style.display = 'none';
      if (removedCourcesList.includes(courseBox.dataset.courseid)){
        checkbox.checked = false;
        courseBox.style.display = 'none';
      }
      else{
        checkbox.checked = true;
        courseBox.classList.remove(classNames[counter%2]);
        courseBox.classList.add(classNames[(counter+1)%2]);
        counter++;
    }
      checkboxWrapper.appendChild(checkbox);
      courseBox.insertBefore(checkboxWrapper, courseBox.firstChild);
    });
}

function initMainCheckBox(){
    const place = document.querySelector("#frontpage-course-list")
    const checkbox = document.createElement('input');
    const checkboxWrapper = document.createElement('P');

    checkbox.type = 'checkbox';
    checkbox.id = 'maincheckbox';

    checkbox.addEventListener('change', function() {
        
        let checkboxes = document.querySelectorAll(".checkboxes");
        let counter = 0;
        if (!this.checked) {
            let removedCourcesList = new Set();
            checkboxes.forEach((element)=>{
            
            element.style.display = 'none';
            if (!element.checked){
                element.parentElement.parentElement.style.display = 'none';
                removedCourcesList.add(element.parentElement.parentElement.dataset.courseid);
            }
            else{
                element.parentElement.parentElement.classList.remove(classNames[counter%2]);
                element.parentElement.parentElement.classList.add(classNames[(counter+1)%2]);
                counter++;
            }
          });

          setStorageData(rmData, Array.from(removedCourcesList));
        //   chrome.storage.local.get(null, function(data) {
        //     console.log('Все данные из local:', data);
        //   });

        } else {
          checkboxes.forEach((element)=>{
            element.parentElement.parentElement.style.display = 'block';
            element.style.display = 'block';
            element.parentElement.parentElement.classList.remove(classNames[counter%2]);
            element.parentElement.parentElement.classList.add(classNames[(counter+1)%2]);
            counter++;
          });
        }
      });
    checkbox.style.margin = '0px 10px';
    checkboxWrapper.textContent = "Режим редактирования ";
    checkboxWrapper.appendChild(checkbox);
 
    place.insertBefore(checkboxWrapper,place.firstChild);
}


function getStorageData(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key]);
      });
    });
  }

function setStorageData(key,data){
    console.log(data);
    chrome.storage.local.set({ [key]: data });
}
  
async function main() {
    let data = await getStorageData(rmData);
    if (data === undefined) {
        data = [];
        alert("Здравствуйте!\nКажется,вы пользуетесь расширением EosFix в первый раз!\nЧтобы удалить лишнее предметы:\n1) поставьте галочку рядом с надписью 'Режим редактирования'\n2) выделите все предметы, которые вас интересуют\n3) снимите первую галочку\nСпасибо за установку!")
    }
    console.log(data);
    removeFooter();
    initCheckBoxes(data);
    initMainCheckBox();
}

main();


//  {
//     "manifest_version": 3,
//     "name": "lks_fix",
//     "version": "2.4",
//     "description": "ничего лишнего,только нужное",
//     "permissions": [
//       "storage"
//     ],
//     "content_scripts": [
//       {
//         "matches": ["https://e-learning.bmstu.ru/kaluga/"],
//         "js": ["app.js"]
//       }
//     ],
//     "icons": {
//       "48": "48.png",
//       "128": "128.png"
//     }
//   }
  

