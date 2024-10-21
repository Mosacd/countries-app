export const translations = {
    en: {
      header: {
        home: 'Home',
        services: 'Services',
        contact: 'Contact',
        about: 'About',
        switch_language: 'Switch to Georgian',
      },
      home: {
        hero:{
            welcomeheader: 'Adventure awaits',
            messege: 'Craft unforgettable moments in breathtaking destinations across the globe',
            button: 'Pick Your Adenture',
        },
      },
      countries: {
        title: 'Countries',
        description: 'Here is a list of all countries.',
      },

      about:{
        text:"Welcome to Country Explorer, your gateway to unforgettable adventures around the globe! We specialize in crafting personalized tours that highlight the unique beauty, culture, and history of each destination. Whether you're looking for thrilling adventures, cultural immersion, or peaceful retreats, our expert team is here to ensure every journey is seamless and enriching. Let Country Explorer take you on a journey of discovery—one unforgettable experience at a time!",
      },

      contact:{
        title:'Contact Us',
        text:"Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        fname:'First Name',
        lname:'Last Name',
        email:'Email address',
        messege:'Message',
        button:'Send',
        errors:{
         fnameerr:'First name should be at least 2 characters long',
         lnameerr:'Last name should be at least 4 characters long',
         emailerr:'Please enter a valid email address',
         messegeerr:'Message should be at least 10 characters long',  
         senderr1:'All fields must be filled out',
         senderr2:'Please fix the errors in the form before submitting',
        }
      },

      services:{
        title: 'Services',
        sort:{
            text: 'Sort by Likes:',
            select: 'Select',
            asc: 'Ascending',
            desc: 'Descending',
        },
        from:{
            name: 'Name',
            population: 'Population',
            capcity: 'Capital City',
            img: 'Image URL',
            button: 'Add Country',
            errors:{
                nameerr: 'Country name must be at least 3 characters',
                populationerr: 'Population must be a number greater than 0',
                capitalcityerr: 'Capital city must be at least 3 characters',
            }
        },
        card:{
            like: 'like',
            delete: 'delete',
            restore: 'restore',
            country:{
                million: 'Million',
            },
            seemore: 'see more',
        }
        
      }
      // Add other components here as necessary...
    },
    ka: {
      header: {
        home: 'სახლი',
        services: 'სერვისები',
        contact: 'კონტაქტი',
        about: 'შესახებ',
        switch_language: 'გადართვა ინგლისურზე',
      },
      home: {
        hero:{
            welcomeheader: 'თავგადასავალი გელის',
            messege: 'მოაწყვეთ დაუვიწყარი მომენტები თვალწარმტაცი მიმართულებებში მთელს მსოფლიოში',
            button: 'აირჩიე შენი თავგადასავალი',
        },
      },
      countries: {
        title: 'ქვეყნები',
        description: 'აქ მოცემულია ყველა ქვეყნის სია.',
      },
      about:{
        text:"კეთილი იყოს თქვენი მობრძანება Country Explorer-ში, თქვენი კარიბჭე დაუვიწყარი თავგადასავლებისკენ მთელს მსოფლიოში! ჩვენ სპეციალიზირებული ვართ პერსონალიზებული ტურების შემუშავებაში, რომლებიც ხაზს უსვამენ თითოეული დანიშნულების ადგილის უნიკალურ სილამაზეს, კულტურას და ისტორიას. მიუხედავად იმისა, თქვენ ეძებთ ამაღელვებელ თავგადასავლებს, კულტურულ ჩაძირვას ან მშვიდობიან თავგადასავლებს, ჩვენი ექსპერტების გუნდი აქ არის იმისათვის, რომ უზრუნველყოს ყოველი მოგზაურობა უწყვეტი და გამდიდრებული. მიეცით საშუალება Country Explorer-ს, აღმოჩენის მოგზაურობაში წაგიყვანოთ — დაუვიწყარი გამოცდილება ერთდროულად!",
      },
      contact:{
        title: 'დაგვიკავშირდით',
        text:"გაქვს შეკითხვა? სიამოვნებით მოვისმენთ თქვენგან. გამოგვიგზავნეთ შეტყობინება და ჩვენ გიპასუხებთ რაც შეიძლება მალე.",
        fname: 'სახელი',
        lname: 'გვარი',
        email: 'ელფოსტის მისამართი',
        messege:'მესიჯი',
        button: "გაგზავნა",
        errors:{
            fnameerr:'სახელი უნდა იყოს მინიმუმ 2 სიმბოლო',
            lnameerr:'გვარი უნდა იყოს მინიმუმ 4 სიმბოლო',
            emailerr:'გთხოვთ, შეიყვანოთ სწორი ელფოსტის მისამართი',
            messegeerr:'მესიჯი უნდა შედგებოდეს მინიმუმ 10 სიმბოლოსგან',
            senderr1:'ყველა ველი უნდა იყოს შევსებული',  
            senderr2:'გთხოვთ შეასწოროთ შეცდომები ფორმაში გაგზავნამდე',
      }
    },
    
    services:{
        title: 'სერვისები',
            sort:{
            text: 'დალაგება მოწონების მიხედვით:',
            select: 'არჩევა',
            asc: 'ზრდადობით',
            desc: 'ნაკლებობით',
            },
            from:{
                name: 'სახელი',
                population: 'პოპულაცია',
                capcity: 'დედაქალაქი',
                img: 'სურათი',
                button: 'დაამატე ქვეყანა',
                errors:{
                    nameerr: 'ქვეყნის სახელი უნდა იყოს მინიმუმ 3 სიმბოლო',
                    populationerr: 'მოსახლეობა უნდა იყოს 0-ზე მეტი რიცხვი',
                    capitalcityerr: "დედაქალაქი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან",
                }
            },
            card:{
                like: 'მოწონება',
                delete: 'წაშლა',
                restore: 'აღდგენა',
                country:{
                    million: 'მილიონი',
                },
                seemore: 'ვრცლად',
            }
      }

  },
};
  