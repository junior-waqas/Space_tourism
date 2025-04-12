const navBar = document.querySelector('nav')
const navCancelBtn=document.querySelector('.ham-cancel-button')
const body = document.querySelector('body')
const header = document.querySelector('header')
const homePageMain = document.querySelector('main')
let destinationMain = null
let pageStatusTracker = null
let jsonData = null
let hamburgerButton=document.querySelector('.hamburger')

// having api data as soon browser lods 
window.addEventListener('load',async () => {
    jsonData = await fetchData();
});




// page switching and section switching 

document.body.addEventListener('click', (event) => {

    if (event.target.parentElement === navBar) {
        if (event.target.textContent === "DESTINATION") {
            
            //removing all classes from body
            containerKidsHider(body)
           
            //checking if destination main already exists or not 
            if(!document.querySelector('.destination-main')){
                destinationPageMaker()
                planetMaker(jsonData, 0)
                body.classList.add('des-body')
                
            }
            else{
                document.querySelector('.destination-main').classList.remove('hidden')
                body.classList.add('des-body')
                
            }         

        }

        //when user clicks on the crew 
        else if (event.target.textContent === "CREW") {
            containerKidsHider(body) // hides all elemetns 

            if(!document.querySelector('.crew-main')){
             
                crewPageMaker(body)
                crewDatafiller(jsonData,0)
                body.classList.add('crew-body')
            }
            else{
                document.querySelector('.crew-main').classList.remove('hidden')
            }

           
            body.classList.add('crew-body')
           
        }
        else if (event.target.textContent === "TECHNOLOGY") {
            containerKidsHider(body)
           if(!document.querySelector(".tech-main")){
            body.classList.add('tech-body')
            techPageMaker(body)
            techDataFetcher(jsonData,0)
            //styling first button by defualt
            let button1=document.querySelectorAll('.tech-button')[0]
            button1.classList.add('black-white')
           }
           else{
              document.querySelector('.tech-main').classList.remove('hidden')
              body.classList.add('tech-body')
           }
        }
        else if (event.target.textContent === "HOME") {
            containerKidsHider(body) // this hide all childrens of body 
            body.classList.add('home-body') //adding home to body 
            homePageMain.classList.remove('hidden')
            
        }
    }

    //planet switcher using delagation 
    if (event.target.hasAttribute('data-planet-name')) {
        let planetIndex= Number(event.target.getAttribute('data-planet-index'))
        planetMaker(jsonData, planetIndex)
    }

    //crew switcher
    if(event.target.classList.contains('circle-button')){
        let crewIndex=Number(event.target.getAttribute('data-circle-num'))
        //resetting styles
        document.querySelectorAll('.circle-button').forEach((button)=>{
            button.style.backgroundColor=""
        })
        crewDatafiller(jsonData,crewIndex)
        event.target.style.backgroundColor = "white";
        
    }

    // tech switcher

    if(event.target.classList.contains('tech-button')){
        let chosenTech=Number(event.target.getAttribute('data--index') )
        techDataFetcher(jsonData,chosenTech)
         
        //making sure all buttons styles are reset before applying clicked style 
        let buttonsBox=document.querySelectorAll('.tech-button')
        buttonBoxesActive(event,buttonsBox)
    }

    // explore button will lead to destination page too
    if(event.target.classList.contains('explore-button')){
        containerKidsHider(body) // hides all elemetns 

            if(!document.querySelector('.crew-main')){
                console.log('ok')
                crewPageMaker(body)
                crewDatafiller(jsonData,0)
                body.classList.add('crew-body')
            }
            else{
                document.querySelector('.crew-main').classList.remove('hidden')
            }

           
            body.classList.add('crew-body')
    }

    if(event.target.classList.contains('hamburger')){
        navBar.classList.add('nav-show')
        navCancelBtn.classList.remove('hidden')
        event.target.classList.add('hidden')
    }
    if(event.target.classList.contains('ham-cancel-button')){
        navBar.classList.remove('nav-show')
        navBar.classList.remove('nav-show')
        navCancelBtn.classList.add('hidden')
        hamburgerButton.classList.remove('hidden')
    }

    
})


// hamburger menu 









// dom creator 
function destinationPageMaker() {
    // creating dom stuff 
    destinationMain = document.createElement('div')
    let introElement = document.createElement('p')
    let heroContainer = document.createElement('div')
    let leftVisual = document.createElement('div')
    let planetImage = document.createElement('img')
    let rightText = document.createElement('div')
    let planetSelectorBox = document.createElement('div')
    let moonButton = document.createElement('a')
    let europaButton = document.createElement('a')
    let marsButton = document.createElement('a')
    let titanButton = document.createElement('a')
    let bigName = document.createElement('p')
    let planetDescription = document.createElement('p')
    let statsBox = document.createElement("div")
    let distanceBox = document.createElement('div')
    let distanceLabel = document.createElement('p')
    let timeValue = document.createElement('p')
    let timeLable = document.createElement('p')
    let timeBox = document.createElement('div')
    let distanceValue = document.createElement('p')

    //adding clases 
    destinationMain.classList.add('destination-main')
    heroContainer.classList.add('hero-container')
    introElement.classList.add('intro-text')
    leftVisual.classList.add('left-visual')
    rightText.classList.add('right-text')
    planetSelectorBox.classList.add('planet-selector')
    bigName.classList.add('big-name')
    planetDescription.classList.add('planet-description')
    statsBox.classList.add('stats-box')
    timeBox.classList.add('fact-boxes')
    distanceBox.classList.add('fact-boxes')
    timeLable.classList.add('label')
    distanceLabel.classList.add('label')
    timeValue.classList.add('value', 'time-value')
    distanceValue.classList.add('value', 'distance-value')
    planetImage.classList.add('planet-image')

    // adding data atribute 
    moonButton.setAttribute('data-planet-name', 'moon')
    moonButton.setAttribute('data-planet-index', '0')
    
    marsButton.setAttribute('data-planet-name', 'mars')
    marsButton.setAttribute('data-planet-index', '1')

    europaButton.setAttribute('data-planet-name', 'europa')
    europaButton.setAttribute('data-planet-index', '2')

    titanButton.setAttribute('data-planet-name', 'titan')
    titanButton.setAttribute('data-planet-index', '3')

    //appending 
    distanceBox.append(distanceLabel, distanceValue)
    timeBox.append(timeLable, timeValue)
    statsBox.append(distanceBox, timeBox)
    planetSelectorBox.append(moonButton, marsButton, europaButton, titanButton)
    rightText.append(planetSelectorBox, bigName, planetDescription, statsBox)
    leftVisual.append(planetImage)
    heroContainer.append(leftVisual, rightText)
    destinationMain.append(introElement, heroContainer)
    body.append(destinationMain)


    //some basic text stuff
    distanceLabel.textContent = "AVG. DISTANCE"
    timeLable.textContent = "EST. TRAVEL TIME"
    introElement.textContent = "PICK YOUR DESTINATION"
    moonButton.textContent = "MOON"
    marsButton.textContent = "MARS"
    europaButton.textContent = "EUROPA"
    titanButton.textContent = "TITAN"
    bigName.textContent = "MOON"
    
}



// planet displaye
function planetMaker(jsonData, planetIndex) {

    let planetImage = document.querySelector('.planet-image')
    let planetName = document.querySelector('.big-name')
    let planetDescription = document.querySelector('.planet-description')
    let plantDistance = document.querySelector('.distance-value')
    let plantTime = document.querySelector('.time-value')

        planetName.textContent = jsonData.destinations[planetIndex].name
        planetImage.src = "assets/destination/image-mars.webp"
        planetDescription.textContent = jsonData.destinations[planetIndex].description
        plantDistance.textContent = jsonData.destinations[planetIndex].distance
        plantTime.textContent = jsonData.destinations[planetIndex].travel

}


//crew dom maker 

function crewPageMaker(body) {
    let crewMain = document.createElement('div')
    let CrewTextBox = document.createElement('div')

    let crewPicBox = document.createElement('div')
    let crewPic = document.createElement('img')
    let meetText = document.createElement('p')
    meetText.textContent=" MEET YOUR CREW"

    let introBox = document.createElement('div')
    let rankText = document.createElement('p')
    let nameText = document.createElement('p')

    let descriptionText = document.createElement('p')
    let aboutBox=document.createElement('div')
    let slideBox = document.createElement('div')
    let circle1 = document.createElement('div')
    let circle2 = document.createElement('div')
    let circle3 = document.createElement('div')
    let circle4 = document.createElement('div')
    


    ///appending elmeents
    crewPicBox.append(crewPic)
    slideBox.append(circle1, circle2, circle3, circle4)
    introBox.append(rankText, nameText)
    aboutBox.append(introBox, descriptionText)
    CrewTextBox.append(meetText,aboutBox , slideBox)
    crewMain.append(CrewTextBox,crewPicBox)
    body.append(crewMain)
    //adding classes

    crewMain.classList.add('crew-main')
    CrewTextBox.classList.add('crew-text')
    crewPicBox.classList.add('crew-pic-box')
    crewPic.classList.add('crew-pic')
    meetText.classList.add('crew-meet-text')
    introBox.classList.add('crew-intro-box')
    rankText.classList.add('crew-rank')
    nameText.classList.add('crew-name')
    descriptionText.classList.add('crew-description')
    aboutBox.classList.add('about-box')
    slideBox.classList.add('crew-slide-box')
    circle1.classList.add('circle-button')
    circle2.classList.add('circle-button')
    circle3.classList.add('circle-button')
    circle4.classList.add('circle-button')
   
    //adding data atributes

    circle1.setAttribute('data-circle-num','0')
    circle2.setAttribute('data-circle-num','1')
    circle3.setAttribute('data-circle-num','2')
    circle4.setAttribute('data-circle-num','3')
}

function crewDatafiller(jsonData,crewIndex) {
    
    document.querySelector('.crew-name').textContent=jsonData.crew[crewIndex].name
    document.querySelector('.crew-rank').textContent=jsonData.crew[crewIndex].role
    document.querySelector('.crew-description').textContent=jsonData.crew[crewIndex].bio
    document.querySelector('.crew-pic').src=jsonData.crew[crewIndex].images.webp
}







function techPageMaker(body){
    let techMain=document.createElement('div')
    let techLabel=document.createElement('p')
    techLabel.textContent="SPACE LAUNCH 101"
    let techTextBox=document.createElement('div')
    let terminologyPara=document.createElement('p')
    terminologyPara.textContent="THE TERMINOLOGY..."
    
    let contentBox=document.createElement('div')

    let rocketName=document.createElement('p')
    let rocketDetails=document.createElement('p')
    let rocketInfoBox=document.createElement('div')

    let buttonsBox=document.createElement('div')
    let button1=document.createElement('button')
    let button2=document.createElement('button')
    let button3=document.createElement('button')
     button1.textContent="1"
     button2.textContent='2'
     button3.textContent="3"
     let rocketPicBox=document.createElement('div')
     let rocketPic=document.createElement('img')

    //addign classes

    techMain.classList.add('tech-main')
    techLabel.classList.add('tech-label')
    techTextBox.classList.add("tech-text-box")
    terminologyPara.classList.add('terminology-para')
    rocketName.classList.add('rocket-name')
    rocketDetails.classList.add('rocket-details')
    rocketInfoBox.classList.add('rock-info-box')
    buttonsBox.classList.add('tech-buttons-box')
    button1.classList.add('tech-button')
    button2.classList.add('tech-button')
    button3.classList.add('tech-button')
    rocketPicBox.classList.add('rocket-Pic-box')
    rocketPic.classList.add('rocket-pic')
    contentBox.classList.add('tech-content-box')

    //appending
    buttonsBox.append(button1,button2,button3)
    rocketInfoBox.append(rocketName,rocketDetails)
    rocketPicBox.append(rocketPic)

    techTextBox.append(terminologyPara,rocketInfoBox)
    
    contentBox.append(buttonsBox,techTextBox,rocketPicBox)

    techMain.append(techLabel,contentBox)
    body.append(techMain)

    //adding data attribute to button
    button1.setAttribute('data--index',(0))
    button2.setAttribute('data--index',(1))
    button3.setAttribute('data--index',(2))

}


function techDataFetcher(jsonData,rocketIndex){
    let rocketName=document.querySelector('.rocket-name')
    let rocketDetails=document.querySelector('.rocket-details')
    let rocketPic=document.querySelector('.rocket-pic')

    rocketName.textContent=(jsonData.technology[rocketIndex].name).toUpperCase()
    rocketDetails.textContent=jsonData.technology[rocketIndex].description
    rocketPic.src=jsonData.technology[rocketIndex].images.landscape
}




























//api function 
async function fetchData() {
    let res = await fetch('data.json')
    jsonData = await res.json()
}


function containerKidsHider(body) {
    let bodyChildren = [...body.children];

    bodyChildren.forEach((child) => {
        if (child.tagName !== 'HEADER') {
            // Always hide children that are not HEADER
            child.style.display = ''
            if(!child.classList.contains('hidden')){
                child.classList.add('hidden')
            }
        }
    });
    //remove all styling classes from body
    body.className=""
}



//
function buttonBoxesActive(event,buttonsBox){
    buttonsBox.forEach((button)=>{
        button.classList.remove('black-white')
        console.log('ok')
    })
    event.target.classList.add('black-white')
}