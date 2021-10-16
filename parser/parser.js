const axios     = require('axios');
const cheerio   = require('cheerio');
const fs        = require('fs')




const url = "https://github.com/atso-devs/atso-devs/blob/main/schedule.md"


axios.get(url)
    .then((response) => {
        let $ = cheerio.load(response.data);
        let data = []
        $("table > tbody > tr").each((i, item) => {

            data.push({
                id:             $($(item).find('td')[0]).text(),
                Lesson_date:    $($(item).find('td')[1]).text(),
                Lesson_type:    $($(item).find('td')[2]).text(),
                Time_Start:     $($(item).find('td')[3]).text(),
                Time_End:       $($(item).find('td')[4]).text(),
                Zoom_ID:        $($(item).find('td')[5]).text(),
                Zoom_pass:      $($(item).find('td')[6]).text(),
                Lesson_room:    $($(item).find('td')[7]).text(),
                Lecturer:       $($(item).find('td')[8]).text(),
                Lesson_name:    $($(item).find('td')[9]).text(),

            })
        })
        console.log(data)
        let schedule = JSON.stringify(data)
        
        fs.writeFile ("schedule.json", schedule, function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );

    })
    .catch((error) => {
        console.log(error);
    });





