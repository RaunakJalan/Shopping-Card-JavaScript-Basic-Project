//variables
const courses = document.querySelector("#courses-list"),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');



//eventListeners
loadEventListener();

function loadEventListener(){
    courses.addEventListener('click',buyCourse);

    //remove button clicked
    shoppingCartContent.addEventListener('click',removeCourse);

    //clear Cart button
    clearCartBtn.addEventListener('click',clearCart);

    //On load add from local storage
    document.addEventListener('DOMContentLoaded',getFromLocalStorage);
}



//Functions
function buyCourse(e){
    e.preventDefault();
    //Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')){
        //read course values
        //console.log(e.target.parentElement.parentElement);
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}

//read html content of course and select info
function getCourseInfo(course){
    //.log(course);
    //Create an object with course data

    const courseInfo = {
        image:course.querySelector('img').src,
        title:course.querySelector('h4').textContent,
        price:course.querySelector('.price span').textContent,
        id:course.querySelector('a').getAttribute('data-id')
    }
    //console.log(courseInfo);

    //insert into Cart
    addIntoCart(courseInfo);
}

//Display selected course into Cart
function addIntoCart(course){
    //create a <tr>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>

            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>


        </tr>

    `;

    //Add into the shopping Cart
    shoppingCartContent.appendChild(row);

    //Add courses into storage
    saveIntoStorage(course);

}

//Add courses into local storage
function saveIntoStorage(course){
    let courses = getCourseFromStorage();

    //add course into array
    courses.push(course);

    //convert json into string
    localStorage.setItem('courses',JSON.stringify(courses));

}

//Get content from storage
function getCourseFromStorage(){
    let courses;

    // if storage empty create empty array
    if(localStorage.getItem('courses')===null){
        courses = [];
    }
    else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//remove Course
function removeCourse(e){
    let course,courseId;

    if(e.target.classList.contains('remove')){
            e.target.parentElement.parentElement.remove();
            course = e.target.parentElement.parentElement;
            courseId = course.querySelector('a').getAttribute('data-id');
    }
    //Remove from local storage
    removeCourseLocalStorage(courseId);
}

//Remove course from local storage
function removeCourseLocalStorage(id){
    let coursesLS = getCourseFromStorage();

    coursesLS.forEach(function(courseLS,index){
        if(courseLS.id === id){
            coursesLS.splice(index,1);
        }
    });
    //Add rest of array
    localStorage.setItem('courses',JSON.stringify(coursesLS));
}


//Clear cart
function clearCart(e){

    //Method 1
    //shoppingCartContent.innerHTML='';
    //console.log(shoppingCartContent.firstChild);
    //Method 2:
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //console.log(shoppingCartContent.firstChild);
    //Clear from local storage
    clearLocalStorage();

}

function clearLocalStorage(){
    localStorage.clear();
}

//On load add from local storage
function getFromLocalStorage(){
    let coursesLS = getCourseFromStorage();

    //Loop through courses
    coursesLS.forEach(function(course){
        const row = document.createElement('tr');

        //Build the template
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>

                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>


            </tr>

        `;

        //Add into the shopping Cart
        shoppingCartContent.appendChild(row);
    });
}
