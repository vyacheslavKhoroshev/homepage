const informations = {
    education: [
        'General education school of I-III degrees No. 55 (1996-2004)', 'Mykolaiv Gymnasium No. 4 named after B. I. Molchanov. (2004-2006)', 
        'Mykolaiv branch of the Kyiv National University of Culture and Arts (2006-2010)', 'Self-learning programming (2022-present)', 
        'English courses at online school (2024-present)'
    ],

    expirience: [
        'Sales consultant in a construction supermarket 33m2 (2010-2012)', 'Department manager in a construction supermarket of 33 m2 (2012 - 2018)',
        'Deputy administrator of a construction supermarket of 33 m2 (2018-2020)', 'Data Specialist in a product IT company (2021-present)'
    ], 
    skills: {
        hard: ['HTML/CSS', 'Javascript', 'Typescript', 'React', 'Redux', 'Node.js', 'Express.js', 'Mongo DB', 'Git', 'Excel', 'English'],
        soft: ['Communication', 'Teamwork', 'Time management', 'Leadership', 'Adaptability-flexibility', 'Creativity', 'Patience', 'Attention to detail', 'Dependability', 'Initiative']
    }
}


const additionalInfoHeader = document.querySelector('.additional-info_header')
const categories = Object.keys(informations)
const isCategory = 

function isCategory(event) {
    return categories.includes(event)
}

function firstLetterToUpperCase(str) {
    if (!(typeof str === 'string')) {

        return str
    } else {
        let string = str.toLocaleLowerCase()
        
        return string[0].toUpperCase() + string.slice(1)
    }
}

function removeElementsByClass(classs) {
    let elements = document.querySelectorAll(`.${classs}`)
    elements.forEach(el => el.remove())
}

function createList(category) {
    if (category == "skills"){
        return
    }
    removeElementsByClass('additional-info_item')

    let list = isCategory(category) ? informations[category] : informations.skills[category]

    list.forEach(item => {
        document.querySelector('.additional-info_main').insertAdjacentHTML('beforeend', `<ol class="additional-info_item">${item}</ol>` )
    })
}

categories.forEach(category => {
    let active = category == 'expirience' ? ' active' : ''
    let categoryName = firstLetterToUpperCase(category)
    
    additionalInfoHeader.insertAdjacentHTML('beforeend', `<div class="additional-info_category${active}" id="${category}">${categoryName}</div>` )
})

createList('expirience')

document.querySelector('body').addEventListener('click', (e) => {
    const event = e.target

    if(event.className == 'additional-info_category') {
        let categoriesEl = document.querySelectorAll('.additional-info_category')

        categoriesEl.forEach(cat => {
            cat.classList.remove('active')
        })

        event.classList.add('active')

        if (!isCategory(event.id)) {
            document.getElementById("skills").classList.add('active')
        }

        if (event.id == 'skills' && !document.querySelector('.additional-info_skills')) {
            document.querySelector('.additional-info_main').insertAdjacentHTML('beforeend', 
                `<div class="additional-info_skills">
                    <div class="additional-info_category active" id="hard">Hard</div>
                    <div class="additional-info_category" id="soft">Soft</div>
                </div>` 
            )

            createList('hard')

            return

        } else if(isCategory(event.id)){
            removeElementsByClass('additional-info_skills')
        }

        createList(event.id)
    }
})


