# challenge3

Voor challange 3 heb ik een interface gemaakt voor de mensen die terugkomen van mars met SpaceX. Zij hebben begeleiding nodig met het terugkomen naar huis. Ze landen in Delft, omdat dit makkelijk gelegen is tussen de grote steden, en vanuit daar kunnen ze naar huis komen. Daarom heb ik een interface voor deze mensen gemaakt waarmee zij met een handig stappenplan en via een routeplanner veilig naar huis kunnen komen. De interface moet een rustige herkenbare plek weergeven die makkelijk te begrijpen is voor iedereen.
De API's die ik heb gebruikt zijn de map van mapbox en het weer van openweathermap. De API van het weer geeft weer wat voor weer het op dat moment is van waar je bent. Dit helpt de ruimtereizigers zich weer aan te passen aan het aardse leven. Het weer word in javascript van Kelvin naar Celsius aangepast. De tweede API is een mapbox map die een 'outdoor' map weergeeft. Deze map start op een zoom van 12 en op de kaart van Delft door deze in javascript aan te passen in 'center', want hier landen de mensen als eerst. De kaart heeft een routeplanner in zich die je ook kan activeren door in de kaart op je begin en eindpunt te klikken. Onder de kaart kan je dan ook nog zien hoeveel kilometer je dan moet afleggen om naar huis te komen. Dit, omdat de routeplanner alleen de afstand in 'feet' weergeeft. 
De API's zijn in css aangepast om het uiterlijk simpel en overzichtelijk te maken. Ik heb 3 media-queries gebruikt en css grid met flexbox gecombineerd.
