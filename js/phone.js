const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    phoneContainer = document.getElementById('phone-container');
        // clear phone container card before adding new cards 
        phoneContainer.textContent = ' ';

        // display show all button if there is more than 12 phones 
        const showAllContainer = document.getElementById('show-all-container');
        if(phones.length > 12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
        }
        else{
            showAllContainer.classList.add('hidden');
        }
        console.log('is show all', isShowAll);

        // display only first 12 phone if now show all 
        if(!isShowAll){
            phones = phones.slice(0, 12);
        }

    phones.forEach(phone =>{
        // console.log(phone);
        // 2 create a div
        const  phoneCard = document.createElement('div');
        phoneCard.classList = `card p-8 bg-base-100 shadow-xl`;

        // 3 set inner HTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `; 

        // 4 append child 
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const handleShowDetails = async (id) =>{
    console.log('click show details button', id);

    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}



const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="">
        <p class="py-2"><span class="font-bold text-xl">Storage: </span>${phone.mainFeatures.storage}</p>
        <p class="py-1"><span class="font-bold text-xl">Display Size: </span>${phone.mainFeatures.displaySize}</p>
        <p class="py-1"><span class="font-bold text-xl">ChipSet: </span>${phone.mainFeatures.chipSet
        }</p>
        <p class="py-1"><span class="font-bold text-xl">Memory: </span>${phone.mainFeatures.memory}</p>
        <p class="py-1"><span class="font-bold text-xl">Slug: </span>${phone.
            slug}</p>
        <p class="py-1"><span class="font-bold text-xl">Release Date: </span>${phone.releaseDate}</p>
        <p class="py-1"><span class="font-bold text-xl">Brand: </span>${phone.brand}</p>
        <p class="py-1"><span class="font-bold text-xl">Gps: </span>${phone.others.GPS
        }</p>
    `;

    // show the modal 
    show_details_modal.showModal();
}



const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();