const informations = {
    education: [
        {
            info: 'Mykolaiv branch of the Kyiv National University of Culture and Arts',
            status: '2006-2010'
        },
        {
            info: 'General education school of I-III degrees No. 55',
            status: '1996-2004'
        },
        {
            info: 'English courses at online school',
            status: '2024-present'
        },
        {
            info: 'Mykolaiv Gymnasium No. 4 named after B. I. Molchanov',
            status: '2004-2006'
        },
        {
            info: 'Self-learning programming',
            status: '2022-present'
        }
    ],

    expirience: [
        {
            info: 'Sales consultant in a construction supermarket 33m2',
            status: '2010-2012'
        },
        {
            info: 'Data Specialist in a product IT company',
            status: '2021-present'
        },
        {
            info: 'Deputy administrator of a construction supermarket of 33 m2',
            status: '2018-2020'
        },
        {
            info: 'Department manager in a construction supermarket of 33 m2',
            status: '2012-2018'
        }
    ], 
    skills: {
        hard: [
            {
                info: 'English',
                status: 2.5
            },
            {
                info: 'Microsoft Office',
                status: 4.1
            },
            {
                info: 'Git',
                status: 2.2
            },
            {
                info: 'Mongo DB',
                status: 2.6
            },
            {
                info: 'Express',
                status: 1.5
            },
            {
                info: 'Node.js',
                status: 2.1
            },
            {
                info: 'Redux',
                status: 2.8
            },
            {
                info: 'React',
                status: 3.3
            },
            {
                info: 'Typescript',
                status: 3.9
            },
            {
                info: 'Javascript',
                status: 4.8
            },
            {
                info: 'HTML/CSS',
                status: 4.2
            }
        ],
        soft: [
            {
                info: 'Dependability',
                status: 4.3
            },
            {
                info: 'Initiative',
                status: 4.8
            },
            {
                info: 'Attention to detail',
                status: 4.2
            },
            {
                info: 'Patience',
                status: 4.7
            },
            {
                info: 'Creativity',
                status: 3.2
            },
            {
                info: 'Adaptability-flexibility',
                status: 3.8
            },
            {
                info: 'Leadership',
                status: 3.5
            },
            {
                info: 'Time management',
                status: 2.7
            },
            {
                info: 'Teamwork',
                status: 3.9
            },
            {
                info: 'Communication',
                status: 2.7
            }
        ]
    }
}

const additionalInfoHeader = document.querySelector('.additional-info_header')
const categories = Object.keys(informations)

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
    if (category == 'skills'){
        return
    }
    removeElementsByClass('additional-info_row')

    let sortedList

    if (isCategory(category)) {
        sortedList = informations[category].sort((a, b) => a.status > b.status ? 1 : -1)
    } else {
        sortedList = informations.skills[category].sort((a, b) => a.status > b.status ? -1 : 1)
    }

    console.log({sortedList})

    sortedList.forEach(item => {
        document.querySelector('.additional-info_list').insertAdjacentHTML(
            'beforeend', 
            `<ul class='additional-info_row'>
                <div class='additional-info_item'>${item.info}</div>
                ${ typeof item.status == 'number'  
                    ? `<div class='additional-info_item_raiting'>
                            <div class='additional-info_item_raiting_active' style='width: ${item.status * 20}%;'></div>
                        </div>`
                    : `<div class='additional-info_item'>${item.status}</div>`
                }
            </ul>` 
        )
    })
}

categories.forEach(category => {
    let active = category == 'expirience' ? ' active' : ''
    let categoryName = firstLetterToUpperCase(category)
    
    additionalInfoHeader.insertAdjacentHTML('beforeend', `<div class='additional-info_category${active}' id='${category}'>${categoryName}</div>` )
})

createList('expirience')

const body = document.querySelector('body')
body.addEventListener('click', (e) => {
    const event = e.target

    if(event.className.includes('category')) {
        let categoriesEl = document.querySelectorAll('[class*="category"')

        categoriesEl.forEach(cat => {
            cat.classList.remove('active')
        })

        event.classList.add('active')

        if (!isCategory(event.id)) {
            document.getElementById('skills').classList.add('active')
        }

        if (event.id == 'skills' && !document.querySelector('.additional-info_skills')) {
            event.insertAdjacentHTML('beforeend', 
                `<div class='additional-info_skills'>
                    <div class='additional-info_subcategory active' id='hard'>Hard</div>
                    <div class='additional-info_subcategory' id='soft'>Soft</div>
                </div>` 
            )

            createList('hard')

            return

        } else if(isCategory(event.id)){
            removeElementsByClass('additional-info_skills')
        }

        createList(event.id)
    }

    if (event.className.includes('contact-info__avatar')) {
        if (event.src.includes('avatar1')) {
            event.src = "assets/avatar2.jpg"
            event.style.transform = 'rotate(1turn)'
        } else {
            event.src = "assets/avatar1.jpg"
            event.style.transform = 'rotate(0turn)'
        }
    }
})

const slideBlocks = [
    document.querySelectorAll('.container')[0],
    document.querySelectorAll('.container')[1],
    document.querySelector('.additional-info_header'),
    document.querySelector('.additional-info_list')
]

slideBlocks.forEach((cont, i) => {
    cont.style.left = '-150%'
    cont.style.opacity = '0'
    cont.style.transition = 'all 0.45s 0s linear'

    setTimeout(() => {
        cont.style.left = '0%'
        cont.style.opacity = '1'
    }, 500 * (i+1))
})





