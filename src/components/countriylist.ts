export interface Country {
    nameEn: string;
    nameKa: string;
    population: number;
    capitalCityEn: string;
    capitalCityKa: string;
    imageUrl: string;
    textEn:string,
    textKa:string,
    id:string;
    likecount: number;
    isDeleted: boolean;
  }
  
  export const initialCountries: Country[] = [
    {
      nameEn: "Argentina",
      nameKa: "არგენტინა",
      population: 46.23,
      capitalCityEn: "Buenos Aires",
      capitalCityKa: "ბუენოს აირესი",
      imageUrl: '/src/assets/Argentina Tours-h.jpg',
      textEn:"Located in South America, Argentina is famous for its diverse landscapes, from the pampas to the Andes. Its capital, Buenos Aires, is known for its rich cultural scene, including tango music and dance, as well as European-inspired architecture. Argentina is also renowned for its beef and wine production.",
      textKa:"სამხრეთ ამერიკაში მდებარე არგენტინა ცნობილია თავისი მრავალფეროვანი პეიზაჟებით, პამპასიდან ანდესამდე. მისი დედაქალაქი ბუენოს აირესი ცნობილია თავისი მდიდარი კულტურული სცენით, მათ შორის ტანგოს მუსიკით და ცეკვით, ასევე ევროპული არქიტექტურით შთაგონებული. არგენტინა ასევე ცნობილია საქონლის ხორცისა და ღვინის წარმოებით",
      id:'argentina',
      likecount: 10,
      isDeleted: false,
    },
    {
        nameEn: "Brazil",
        nameKa: "ბრაზილია",
        population: 214.3,
        capitalCityEn: "Brasília",
        capitalCityKa: "ბრაზილია",
        imageUrl: '/src/assets/marianna-smiley-IA0-dP_hnbI-unsplash.jpg',
        textEn:"As the largest country in South America, Brazil is known for its Amazon rainforest, vibrant cities, and football culture. The capital, Brasília, was designed by architect Oscar Niemeyer and is known for its modernist architecture. Brazil is famous for its carnivals, samba music, and extensive beaches.",
        textKa:"როგორც უდიდესი ქვეყანა სამხრეთ ამერიკაში, ბრაზილია ცნობილია თავისი ამაზონის ტროპიკული ტყით, ცოცხალი ქალაქებითა და საფეხბურთო კულტურით. დედაქალაქი, ბრაზილია, დააპროექტა არქიტექტორმა ოსკარ ნიმეიერმა და ცნობილია თავისი მოდერნისტული არქიტექტურით. ბრაზილია ცნობილია თავისი კარნავალები, სამბას მუსიკა და ფართო პლაჟები",
        id:'brazil',
        likecount: 12,
        isDeleted: false,
      },
    {
      nameEn: "Egypt",
      nameKa: "ეგვიპტე",
      population: 104.26,
      capitalCityEn: "Cairo",
      capitalCityKa: "ქაირო",
      imageUrl: "/src/assets/kevin-et-laurianne-langlais-Rk8yY0UfPx0-unsplash.jpg",
      textEn:"Situated in northeastern Africa, Egypt is home to ancient civilizations and iconic monuments like the Pyramids of Giza and the Sphinx. Its capital, Cairo, is the largest city in the Arab world and a cultural hub with a rich history. The Nile River plays a crucial role in the country's agriculture and life.",
      textKa:"ჩრდილო-აღმოსავლეთ აფრიკაში მდებარე ეგვიპტე არის უძველესი ცივილიზაციებისა და ხატოვანი ძეგლების სახლი, როგორიცაა გიზას პირამიდები და სფინქსი. მისი დედაქალაქი კაირო არის უდიდესი ქალაქი არაბულ სამყაროში და მდიდარი ისტორიის მქონე კულტურული ცენტრი. ნილოსი მდინარე გადამწყვეტ როლს თამაშობს ქვეყნის სოფლის მეურნეობაში და ცხოვრებაში",
      id:'egypt',
      likecount: 15,
      isDeleted: false,
    }
  ];