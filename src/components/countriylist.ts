export interface Country {
    name: string;
    population: string;
    capitalCity: string;
    imageUrl: string;
    text:string,
    id:string;
    likecount: number;
  }
  
  export const initialCountries: Country[] = [
    {
      name: "Argentina",
      population: "46.23 million",
      capitalCity: "Buenos Aires",
      imageUrl: '/src/assets/Argentina Tours-h.jpg',
      text:"Located in South America, Argentina is famous for its diverse landscapes, from the pampas to the Andes. Its capital, Buenos Aires, is known for its rich cultural scene, including tango music and dance, as well as European-inspired architecture. Argentina is also renowned for its beef and wine production.",
      id:'argentina',
      likecount: 10,
    },
    {
        name: "Brazil",
        population: "214.3 million",
        capitalCity: "Brasília",
        imageUrl: '/src/assets/marianna-smiley-IA0-dP_hnbI-unsplash.jpg',
        text:"As the largest country in South America, Brazil is known for its Amazon rainforest, vibrant cities, and football culture. The capital, Brasília, was designed by architect Oscar Niemeyer and is known for its modernist architecture. Brazil is famous for its carnivals, samba music, and extensive beaches.",
        id:'brazil',
        likecount: 12,
      },
    {
      name: "Egypt",
      population: "104.26 million",
      capitalCity: "Cairo",
      imageUrl: "/src/assets/kevin-et-laurianne-langlais-Rk8yY0UfPx0-unsplash.jpg",
      text:"Situated in northeastern Africa, Egypt is home to ancient civilizations and iconic monuments like the Pyramids of Giza and the Sphinx. Its capital, Cairo, is the largest city in the Arab world and a cultural hub with a rich history. The Nile River plays a crucial role in the country's agriculture and life.",
      id:'egypt',
      likecount: 15,
    }
  ];