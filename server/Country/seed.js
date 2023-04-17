const Country = require('./Country')

const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Боевики',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Австралия'
]

async function writeDataCountry(){
    const lenght = await Country.count();
    if(lenght == 0){
        data.map((item, index) => {
            new Country({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataCountry