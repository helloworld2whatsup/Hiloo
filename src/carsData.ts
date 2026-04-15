export interface Car {
  id: string;
  name: string;
  team: string;
  year: number;
  engine: string;
  designer: string;
  championships: number;
  wins: number;
  image: string;
  description: string;
  specs: {
    chassis: string;
    suspension: string;
    weight: string;
    transmission: string;
  };
}

export const cars: Car[] = [
  {
    id: 'mclaren-mp4-4',
    name: 'McLaren MP4/4',
    team: 'McLaren',
    year: 1988,
    engine: 'Honda RA168E 1.5 V6 t',
    designer: 'Steve Nichols, Gordon Murray',
    championships: 2,
    wins: 15,
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/1988_McLaren-Honda_MP4_4_Goodwood%2C_2009_%2801%29.jpg',
    description: 'Eines der dominantesten Formel-1-Autos aller Zeiten. Gewann 15 von 16 Rennen in der Saison 1988 mit Ayrton Senna und Alain Prost.',
    specs: {
      chassis: 'Kohlefaser-Waben-Monocoque',
      suspension: 'Doppelquerlenker, innenliegende Schraubenfedern',
      weight: '540 kg',
      transmission: 'McLaren 6-Gang manuell'
    }
  },
  {
    id: 'ferrari-f2004',
    name: 'Ferrari F2004',
    team: 'Ferrari',
    year: 2004,
    engine: 'Ferrari 053 3.0 V10',
    designer: 'Rory Byrne, Ross Brawn, Aldo Costa',
    championships: 2,
    wins: 15,
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Ferrari_F2004_%288925204549%29.jpg',
    description: 'Das Auto, mit dem Michael Schumacher seinen siebten und letzten Weltmeistertitel gewann. Es brach unzählige Rundenrekorde, von denen einige jahrelang Bestand hatten.',
    specs: {
      chassis: 'Kohlefaser- und Wabenverbundstruktur',
      suspension: 'Doppelquerlenker, innenliegende Torsionsfedern',
      weight: '605 kg (inkl. Fahrer)',
      transmission: 'Ferrari 7-Gang halbautomatisch'
    }
  },
  {
    id: 'mercedes-w11',
    name: 'Mercedes-AMG F1 W11 EQ Performance',
    team: 'Mercedes',
    year: 2020,
    engine: 'Mercedes-AMG F1 M11 EQ Performance 1.6 V6 t',
    designer: 'James Allison, John Owen',
    championships: 2,
    wins: 13,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/2020_Formula_One_tests_Barcelona%2C_Mercedes-AMG_F1_W11_EQ_Performance%2C_Hamilton.jpg',
    description: 'Oft als das schnellste Formel-1-Auto der Geschichte bezeichnet. Es führte das innovative DAS-System (Dual Axis Steering) ein.',
    specs: {
      chassis: 'Geformte Kohlefaser- und Wabenverbundstruktur',
      suspension: 'Kohlefaser-Querlenker und Druckstangen (vorne) / Zugstangen (hinten)',
      weight: '746 kg (inkl. Fahrer)',
      transmission: 'Mercedes 8-Gang halbautomatisch'
    }
  },
  {
    id: 'red-bull-rb9',
    name: 'Red Bull RB9',
    team: 'Red Bull Racing',
    year: 2013,
    engine: 'Renault RS27-2013 2.4 V8',
    designer: 'Adrian Newey, Rob Marshall',
    championships: 2,
    wins: 13,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Bull_RB9_Vettel_F1_Jerez_2013.jpg',
    description: 'Das Auto, das Sebastian Vettel zu seinem vierten Weltmeistertitel in Folge trug, einschließlich einer Rekordserie von 9 Siegen in Folge am Ende der Saison.',
    specs: {
      chassis: 'Kohlefaser-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen (vorne) / Zugstangen (hinten)',
      weight: '642 kg (inkl. Fahrer)',
      transmission: 'Red Bull Technology 7-Gang halbautomatisch'
    }
  },
  {
    id: 'williams-fw14b',
    name: 'Williams FW14B',
    team: 'Williams',
    year: 1992,
    engine: 'Renault RS3C / RS4 3.5 V10',
    designer: 'Adrian Newey, Patrick Head',
    championships: 2,
    wins: 10,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Williams_FW14B_%2835029084126%29.jpg',
    description: 'Eines der technologisch fortschrittlichsten Autos seiner Zeit, ausgestattet mit aktiver Federung, Traktionskontrolle und einem halbautomatischen Getriebe.',
    specs: {
      chassis: 'Kohlefaser-Aramid-Epoxid-Monocoque',
      suspension: 'Aktive Federung',
      weight: '505 kg',
      transmission: 'Williams 6-Gang halbautomatisch'
    }
  },
  {
    id: 'lotus-72',
    name: 'Lotus 72',
    team: 'Team Lotus',
    year: 1970,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Colin Chapman, Maurice Philippe',
    championships: 5,
    wins: 20,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Lotus_72.JPG',
    description: 'Ein revolutionäres Design mit keilförmiger Aerodynamik und seitlich montierten Kühlern, das die Formel 1 für Jahre prägte.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, innenliegende Torsionsstäbe',
      weight: '530 kg',
      transmission: 'Hewland FG400 5-Gang manuell'
    }
  },
  {
    id: 'brawn-bgp-001',
    name: 'Brawn BGP 001',
    team: 'Brawn GP',
    year: 2009,
    engine: 'Mercedes-Benz FO 108W 2.4 V8',
    designer: 'Jörg Zander, Loïc Bigois',
    championships: 2,
    wins: 8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Jenson_Button_%28Brawn_BGP_001%29_on_Sunday_at_2009_Abu_Dhabi_Grand_Prix.jpg',
    description: 'Entstand aus den Überresten des Honda-Teams und gewann sensationell die Meisterschaft in seiner einzigen Saison, berühmt für seinen innovativen Doppeldiffusor.',
    specs: {
      chassis: 'Kohlefaser- und Wabenverbund-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen',
      weight: '605 kg (inkl. Fahrer)',
      transmission: 'Brawn 7-Gang halbautomatisch'
    }
  },
  {
    id: 'tyrrell-p34',
    name: 'Tyrrell P34',
    team: 'Tyrrell',
    year: 1976,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Derek Gardner',
    championships: 0,
    wins: 1,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Tyrrell_P34.jpg',
    description: 'Das berühmte "Sechsrad"-Auto. Entworfen, um den Luftwiderstand durch kleinere Vorderräder zu verringern, während die Kontaktfläche durch vier Räder erhalten blieb.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '595 kg',
      transmission: 'Hewland FG400 5-Gang manuell'
    }
  },
  {
    id: 'maserati-250f',
    name: 'Maserati 250F',
    team: 'Maserati',
    year: 1954,
    engine: 'Maserati 2.5 L6',
    designer: 'Gioacchino Colombo, Vittorio Bellentani',
    championships: 2,
    wins: 8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Maserati_250_F%2C_Bj._1957_%281977-08-14%29_S%C3%BCdkehre.jpg',
    description: 'Eines der klassischsten Frontmotor-Formel-1-Autos. Juan Manuel Fangio gewann damit 1954 und 1957 die Weltmeisterschaft.',
    specs: {
      chassis: 'Gitterrohrrahmen',
      suspension: 'Einzelradaufhängung vorne, De-Dion-Achse hinten',
      weight: '630 kg',
      transmission: 'Maserati 4-Gang manuell'
    }
  },
  {
    id: 'renault-r25',
    name: 'Renault R25',
    team: 'Renault',
    year: 2005,
    engine: 'Renault RS25 3.0 V10',
    designer: 'Bob Bell, Pat Symonds',
    championships: 2,
    wins: 8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Renault_R25_front-left_2017_Museo_Fernando_Alonso.jpg',
    description: 'Das Auto, das die Dominanz von Ferrari und Michael Schumacher beendete und Fernando Alonso zu seinem ersten Weltmeistertitel verhalf. Berühmt für seinen V10-Sound.',
    specs: {
      chassis: 'Kohlefaser- und Wabenverbund-Monocoque',
      suspension: 'Doppelquerlenker, Torsionsstäbe',
      weight: '605 kg (inkl. Fahrer)',
      transmission: 'Renault 6-Gang halbautomatisch'
    }
  },
  {
    id: 'alfa-romeo-158',
    name: 'Alfa Romeo 158',
    team: 'Alfa Romeo',
    year: 1950,
    engine: 'Alfa Romeo 158 1.5 L8 t',
    designer: 'Gioacchino Colombo',
    championships: 1,
    wins: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Alfa_Romeo_158_Alfetta_1950_Museo_Storico_OCT_2015.jpg',
    description: 'Die "Alfetta" dominierte die allererste Formel-1-Saison 1950 und gewann jedes Rennen, an dem sie teilnahm, mit Giuseppe Farina als erstem Weltmeister.',
    specs: {
      chassis: 'Stahlrohrrahmen',
      suspension: 'Einzelradaufhängung, Querblattfeder',
      weight: '710 kg',
      transmission: 'Alfa Romeo 4-Gang manuell'
    }
  },
  {
    id: 'lotus-25',
    name: 'Lotus 25',
    team: 'Team Lotus',
    year: 1962,
    engine: 'Climax FWMV 1.5 V8',
    designer: 'Colin Chapman',
    championships: 2,
    wins: 14,
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Lotus_25_at_Barber_01.jpg',
    description: 'Das erste Formel-1-Auto mit einem echten Monocoque-Chassis. Es war leichter, steifer und sicherer als Gitterrohrrahmen und revolutionierte das Design.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '450 kg',
      transmission: 'ZF 5-Gang manuell'
    }
  },
  {
    id: 'lotus-49',
    name: 'Lotus 49',
    team: 'Team Lotus',
    year: 1967,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Colin Chapman, Maurice Philippe',
    championships: 2,
    wins: 12,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Lotus_49-1.JPG',
    description: 'Das erste Auto, das den legendären Ford Cosworth DFV Motor als tragendes Teil des Chassis nutzte – ein Konzept, das bis heute Standard ist.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '500 kg',
      transmission: 'Hewland FG400 5-Gang manuell'
    }
  },
  {
    id: 'ferrari-312t',
    name: 'Ferrari 312T',
    team: 'Ferrari',
    year: 1975,
    engine: 'Ferrari 015 3.0 F12',
    designer: 'Mauro Forghieri',
    championships: 4,
    wins: 27,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Ferrari_312T_1975.jpg',
    description: 'Mit seinem quer eingebauten Getriebe (daher das "T" für Trasversale) verbesserte es die Gewichtsverteilung drastisch und brachte Niki Lauda seine ersten Titel.',
    specs: {
      chassis: 'Aluminium-Monocoque mit Stahlrohr-Hilfsrahmen',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '575 kg',
      transmission: 'Ferrari 5-Gang manuell (quer)'
    }
  },
  {
    id: 'mclaren-m23',
    name: 'McLaren M23',
    team: 'McLaren',
    year: 1973,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Gordon Coppuck, John Barnard',
    championships: 2,
    wins: 16,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/McLaren_M23_at_2006_Monterey_Historic_%281%29.jpg',
    description: 'Eines der langlebigsten und erfolgreichsten Autos der 70er Jahre. Emerson Fittipaldi und James Hunt gewannen damit Weltmeisterschaften.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '575 kg',
      transmission: 'Hewland FG400 6-Gang manuell'
    }
  },
  {
    id: 'brabham-bt46b',
    name: 'Brabham BT46B',
    team: 'Brabham',
    year: 1978,
    engine: 'Alfa Romeo 115-12 3.0 F12',
    designer: 'Gordon Murray',
    championships: 0,
    wins: 1,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/2001_Goodwood_Festival_of_Speed_Brabham_BT46B_Fan_car.jpg',
    description: 'Das berüchtigte "Staubsauger-Auto". Ein großer Ventilator am Heck saugte die Luft unter dem Auto ab und erzeugte massiven Abtrieb. Nach einem Sieg sofort verboten.',
    specs: {
      chassis: 'Aluminium-Monocoque',
      suspension: 'Doppelquerlenker, Zugstangen',
      weight: '595 kg',
      transmission: 'Alfa Romeo / Hewland 6-Gang manuell'
    }
  },
  {
    id: 'williams-fw07',
    name: 'Williams FW07',
    team: 'Williams',
    year: 1979,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Patrick Head, Neil Oatley',
    championships: 2,
    wins: 15,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Williams_FW07_at_Barber_02.jpg',
    description: 'Williams\' erstes Ground-Effect-Auto. Es perfektionierte das von Lotus eingeführte Konzept und machte Williams zu einem Top-Team.',
    specs: {
      chassis: 'Aluminium-Waben-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '579 kg',
      transmission: 'Hewland FGA 400 5-Gang manuell'
    }
  },
  {
    id: 'benetton-b195',
    name: 'Benetton B195',
    team: 'Benetton',
    year: 1995,
    engine: 'Renault RS7 3.0 V10',
    designer: 'Rory Byrne, Ross Brawn',
    championships: 2,
    wins: 11,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Johnny_Herbert_-_Benetton_B195_at_Silverstone%2C_British_GP_1995_%2849684425471%29.jpg',
    description: 'Mit dem Wechsel zum starken Renault-V10-Motor dominierte Michael Schumacher die Saison 1995 und holte seinen zweiten WM-Titel.',
    specs: {
      chassis: 'Kohlefaser-Waben-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen',
      weight: '595 kg (inkl. Fahrer)',
      transmission: 'Benetton 6-Gang halbautomatisch'
    }
  },
  {
    id: 'mclaren-mp4-13',
    name: 'McLaren MP4/13',
    team: 'McLaren',
    year: 1998,
    engine: 'Mercedes-Benz FO110G 3.0 V10',
    designer: 'Adrian Newey, Neil Oatley',
    championships: 2,
    wins: 9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/McLaren_MP4-13_at_Goodwood_2012.jpg',
    description: 'Das erste Auto nach den neuen Regeln für schmalere Autos und Rillenreifen. Adrian Neweys Design war der Konkurrenz weit voraus.',
    specs: {
      chassis: 'Kohlefaser-Aluminium-Waben-Monocoque',
      suspension: 'Doppelquerlenker, innenliegende Torsionsstäbe',
      weight: '600 kg (inkl. Fahrer)',
      transmission: 'McLaren 6-Gang halbautomatisch'
    }
  },
  {
    id: 'red-bull-rb19',
    name: 'Red Bull RB19',
    team: 'Red Bull Racing',
    year: 2023,
    engine: 'Honda RBPTH001 1.6 V6 t',
    designer: 'Adrian Newey, Pierre Waché',
    championships: 2,
    wins: 21,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Replica_of_Red_Bull_Racing_RB19_%2824021012233%29.jpg',
    description: 'Das statistisch erfolgreichste Formel-1-Auto aller Zeiten. Es gewann 21 von 22 Rennen in der Saison 2023 (eine Siegquote von 95,45%).',
    specs: {
      chassis: 'Kohlefaser-Monocoque',
      suspension: 'Zugstangen (vorne) / Druckstangen (hinten)',
      weight: '798 kg (inkl. Fahrer)',
      transmission: 'Red Bull Technology 8-Gang halbautomatisch'
    }
  },
  {
    id: 'mercedes-w196',
    name: 'Mercedes-Benz W196',
    team: 'Mercedes-Benz',
    year: 1954,
    engine: 'Mercedes-Benz M196 2.5 L8',
    designer: 'Rudolf Uhlenhaut',
    championships: 2,
    wins: 9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Fangio-MB-W196-3lMotor-1986.jpg',
    description: 'Ein Meisterwerk der Ingenieurskunst, das mit Juan Manuel Fangio 1954 und 1955 die Weltmeisterschaft dominierte. Es verfügte über eine innovative desmodromische Ventilsteuerung und direkte Benzineinspritzung.',
    specs: {
      chassis: 'Gitterrohrrahmen',
      suspension: 'Einzelradaufhängung vorne, Pendelachse hinten',
      weight: '640 kg',
      transmission: 'Mercedes-Benz 5-Gang manuell'
    }
  },
  {
    id: 'cooper-t51',
    name: 'Cooper T51',
    team: 'Cooper Car Company',
    year: 1959,
    engine: 'Climax FPF 2.5 L4',
    designer: 'Owen Maddock',
    championships: 1,
    wins: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/1960_Cooper_Climax_T51_%2848914884991%29.jpg',
    description: 'Das Auto, das die Formel 1 für immer veränderte. Es war das erste Mittelmotor-Auto, das die Weltmeisterschaft gewann (mit Jack Brabham) und bewies, dass Frontmotor-Autos veraltet waren.',
    specs: {
      chassis: 'Gitterrohrrahmen',
      suspension: 'Doppelquerlenker, Blattfedern',
      weight: '460 kg',
      transmission: 'Citroën/Cooper 4-Gang manuell'
    }
  },
  {
    id: 'ferrari-156',
    name: 'Ferrari 156 F1 "Sharknose"',
    team: 'Ferrari',
    year: 1961,
    engine: 'Ferrari 178 1.5 V6',
    designer: 'Carlo Chiti',
    championships: 1,
    wins: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/1961_Ferrari_156_F1_Enzo_Medardo_Carlo.jpg',
    description: 'Berühmt für seine markante "Haifischnase" (Sharknose). Es dominierte die Saison 1961 und brachte Phil Hill seinen einzigen Weltmeistertitel ein.',
    specs: {
      chassis: 'Gitterrohrrahmen',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '420 kg',
      transmission: 'Ferrari 5-Gang manuell'
    }
  },
  {
    id: 'lotus-79',
    name: 'Lotus 79',
    team: 'Team Lotus',
    year: 1978,
    engine: 'Ford Cosworth DFV 3.0 V8',
    designer: 'Colin Chapman, Martin Ogilvie, Peter Wright',
    championships: 2,
    wins: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Lotus_79_2009_Lime_Rock.jpg',
    description: 'Bekannt als "Black Beauty". Das erste Auto, das den Ground-Effect (Bodeneffekt) voll ausnutzte und Mario Andretti 1978 überlegen zum Weltmeister machte.',
    specs: {
      chassis: 'Aluminium-Waben-Monocoque',
      suspension: 'Doppelquerlenker, Schraubenfedern',
      weight: '575 kg',
      transmission: 'Hewland FGA 400 5-Gang manuell'
    }
  },
  {
    id: 'mclaren-mp4-2',
    name: 'McLaren MP4/2',
    team: 'McLaren',
    year: 1984,
    engine: 'TAG-Porsche TTE PO1 1.5 V6 t',
    designer: 'John Barnard',
    championships: 3,
    wins: 22,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/ProstAlain_McLarenMP4-2B_1985.jpg',
    description: 'Eines der erfolgreichsten Autos der F1-Geschichte. Mit Niki Lauda und Alain Prost gewann es zwischen 1984 und 1986 drei Fahrerweltmeisterschaften in Folge.',
    specs: {
      chassis: 'Kohlefaser-Waben-Monocoque',
      suspension: 'Doppelquerlenker, Zugstangen',
      weight: '540 kg',
      transmission: 'McLaren/Hewland 5-Gang manuell'
    }
  },
  {
    id: 'jordan-191',
    name: 'Jordan 191',
    team: 'Jordan Grand Prix',
    year: 1991,
    engine: 'Ford HBA4 3.5 V8',
    designer: 'Gary Anderson',
    championships: 0,
    wins: 0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Bertrand_Gachot_1991_USA.jpg',
    description: 'Oft als eines der schönsten Formel-1-Autos aller Zeiten bezeichnet. Es war das Debütauto von Michael Schumacher beim Großen Preis von Belgien 1991.',
    specs: {
      chassis: 'Kohlefaser-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen',
      weight: '505 kg',
      transmission: 'Jordan/Hewland 6-Gang manuell'
    }
  },
  {
    id: 'williams-fw15c',
    name: 'Williams FW15C',
    team: 'Williams',
    year: 1993,
    engine: 'Renault RS5 3.5 V10',
    designer: 'Adrian Newey, Patrick Head',
    championships: 2,
    wins: 10,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Williams_FW15C_-_Donington_Park.JPG',
    description: 'Das technologisch fortschrittlichste Formel-1-Auto aller Zeiten, mit aktiver Federung, ABS, Traktionskontrolle und Fly-by-Wire. Alain Prost gewann damit seinen vierten Titel.',
    specs: {
      chassis: 'Kohlefaser-Aramid-Epoxid-Monocoque',
      suspension: 'Aktive Federung',
      weight: '505 kg',
      transmission: 'Williams 6-Gang halbautomatisch'
    }
  },
  {
    id: 'ferrari-f2002-2',
    name: 'Ferrari F2002',
    team: 'Ferrari',
    year: 2002,
    engine: 'Ferrari 051 3.0 V10',
    designer: 'Rory Byrne, Ross Brawn, Aldo Costa',
    championships: 2,
    wins: 15,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/2002_Ferrari_F2002.jpg',
    description: 'Ein Meisterwerk der Aerodynamik und Zuverlässigkeit. Michael Schumacher beendete 2002 jedes Rennen auf dem Podium und sicherte sich den Titel in Rekordzeit.',
    specs: {
      chassis: 'Kohlefaser- und Wabenverbundstruktur',
      suspension: 'Doppelquerlenker, innenliegende Torsionsfedern',
      weight: '600 kg (inkl. Fahrer)',
      transmission: 'Ferrari 7-Gang halbautomatisch'
    }
  },
  {
    id: 'ferrari-f2007',
    name: 'Ferrari F2007',
    team: 'Ferrari',
    year: 2007,
    engine: 'Ferrari 056 2.4 V8',
    designer: 'Aldo Costa, Nikolas Tombazis',
    championships: 2,
    wins: 9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/2007_Ferrari_F2007.jpg',
    description: 'Das Auto, mit dem Kimi Räikkönen in einem dramatischen Saisonfinale 2007 die Weltmeisterschaft gewann. Es zeichnete sich durch einen längeren Radstand aus.',
    specs: {
      chassis: 'Kohlefaser- und Wabenverbundstruktur',
      suspension: 'Doppelquerlenker, innenliegende Torsionsfedern',
      weight: '605 kg (inkl. Fahrer)',
      transmission: 'Ferrari 7-Gang halbautomatisch'
    }
  },
  {
    id: 'mclaren-mp4-23',
    name: 'McLaren MP4-23',
    team: 'McLaren',
    year: 2008,
    engine: 'Mercedes-Benz FO108V 2.4 V8',
    designer: 'Paddy Lowe, Neil Oatley',
    championships: 1,
    wins: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Lewis_Hamilton%2C_McLaren_MP4-23_Mercedes-Benz.jpg',
    description: 'Das Auto, mit dem Lewis Hamilton seinen ersten Weltmeistertitel in der letzten Kurve der Saison 2008 gewann. Bekannt für seine extrem komplexen aerodynamischen Anbauteile.',
    specs: {
      chassis: 'Kohlefaser-Aluminium-Waben-Monocoque',
      suspension: 'Doppelquerlenker, innenliegende Torsionsstäbe',
      weight: '605 kg (inkl. Fahrer)',
      transmission: 'McLaren 7-Gang halbautomatisch'
    }
  },
  {
    id: 'red-bull-rb7',
    name: 'Red Bull RB7',
    team: 'Red Bull Racing',
    year: 2011,
    engine: 'Renault RS27-2011 2.4 V8',
    designer: 'Adrian Newey',
    championships: 2,
    wins: 12,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Red_Bull_RB7.jpg',
    description: 'Eines der dominantesten Autos der V8-Ära. Sebastian Vettel holte damit 15 Pole-Positions in einer einzigen Saison und verteidigte souverän seinen WM-Titel.',
    specs: {
      chassis: 'Kohlefaser-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen (vorne) / Zugstangen (hinten)',
      weight: '640 kg (inkl. Fahrer)',
      transmission: 'Red Bull Technology 7-Gang halbautomatisch'
    }
  },
  {
    id: 'mercedes-w05',
    name: 'Mercedes F1 W05 Hybrid',
    team: 'Mercedes',
    year: 2014,
    engine: 'Mercedes-Benz PU106A Hybrid 1.6 V6 t',
    designer: 'Aldo Costa, Paddy Lowe',
    championships: 2,
    wins: 16,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Mercedes_F1_W05_Hybrid_front_2015_Malaysia.jpg',
    description: 'Das Auto, das die Hybrid-Ära der Formel 1 einläutete und die Dominanz von Mercedes begründete. Es gewann 16 von 19 Rennen in der Saison 2014.',
    specs: {
      chassis: 'Geformte Kohlefaser- und Wabenverbundstruktur',
      suspension: 'Kohlefaser-Querlenker und Druckstangen (vorne) / Zugstangen (hinten)',
      weight: '691 kg (inkl. Fahrer)',
      transmission: 'Mercedes 8-Gang halbautomatisch'
    }
  },
  {
    id: 'brabham-bt52',
    name: 'Brabham BT52',
    team: 'Brabham',
    year: 1983,
    engine: 'BMW M12/13 1.5 L4 t',
    designer: 'Gordon Murray',
    championships: 1,
    wins: 4,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Brabham_BT52_BMW_-_Flickr_-_exfordy.jpg/1200px-Brabham_BT52_BMW_-_Flickr_-_exfordy.jpg',
    description: 'Das pfeilförmige Auto, mit dem Nelson Piquet 1983 die Weltmeisterschaft gewann. Es war das erste Auto, das mit einem Turbomotor die Fahrer-WM gewann.',
    specs: {
      chassis: 'Kohlefaser/Aluminium-Monocoque',
      suspension: 'Doppelquerlenker',
      weight: '540 kg',
      transmission: 'Brabham/Weismann 5-Gang manuell'
    }
  },
  {
    id: 'lotus-97t',
    name: 'Lotus 97T',
    team: 'Lotus',
    year: 1985,
    engine: 'Renault EF15 1.5 V6 t',
    designer: 'Gérard Ducarouge, Martin Ogilvie',
    championships: 0,
    wins: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ayrton_Senna_Lotus_97T_1985.jpg/1200px-Ayrton_Senna_Lotus_97T_1985.jpg',
    description: 'Das Auto, mit dem Ayrton Senna seinen ersten Formel-1-Sieg in Estoril errang. Berühmt für seine schwarz-goldene John Player Special Lackierung.',
    specs: {
      chassis: 'Kohlefaser-Kevlar-Monocoque',
      suspension: 'Doppelquerlenker, Zugstangen',
      weight: '540 kg',
      transmission: 'Lotus/Hewland 5-Gang manuell'
    }
  },
  {
    id: 'ferrari-641',
    name: 'Ferrari 641',
    team: 'Ferrari',
    year: 1990,
    engine: 'Ferrari 036 3.5 V12',
    designer: 'John Barnard, Enrique Scalabroni',
    championships: 0,
    wins: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ferrari_641_at_the_Museum_of_Modern_Art.jpg/1200px-Ferrari_641_at_the_Museum_of_Modern_Art.jpg',
    description: 'Eines der schönsten Formel-1-Autos aller Zeiten, das sogar im Museum of Modern Art in New York ausgestellt ist. Alain Prost kämpfte damit 1990 um den Titel.',
    specs: {
      chassis: 'Kohlefaser-Kevlar-Waben-Monocoque',
      suspension: 'Doppelquerlenker, Druckstangen',
      weight: '503 kg',
      transmission: 'Ferrari 7-Gang halbautomatisch'
    }
  },
  {
    id: 'mclaren-mp4-20',
    name: 'McLaren MP4-20',
    team: 'McLaren',
    year: 2005,
    engine: 'Mercedes-Benz FO 110R 3.0 V10',
    designer: 'Adrian Newey, Mike Coughlan',
    championships: 0,
    wins: 10,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Kimi_Raikkonen_2005_Canada.jpg/1200px-Kimi_Raikkonen_2005_Canada.jpg',
    description: 'Obwohl es die Weltmeisterschaft wegen Zuverlässigkeitsproblemen nicht gewann, war der MP4-20 das schnellste Auto der Saison 2005 und gewann 10 von 19 Rennen.',
    specs: {
      chassis: 'Kohlefaser-Aluminium-Waben-Monocoque',
      suspension: 'Doppelquerlenker, innenliegende Torsionsfedern',
      weight: '600 kg (inkl. Fahrer)',
      transmission: 'McLaren 7-Gang halbautomatisch'
    }
  },
  {
    id: 'red-bull-rb18',
    name: 'Red Bull RB18',
    team: 'Red Bull Racing',
    year: 2022,
    engine: 'Red Bull RBPTH001 1.6 V6 t',
    designer: 'Adrian Newey, Pierre Waché',
    championships: 2,
    wins: 17,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/F1_2022_Austrian_GP_-_10_-_Max_Verstappen.jpg/1200px-F1_2022_Austrian_GP_-_10_-_Max_Verstappen.jpg',
    description: 'Das erste Auto der neuen Ground-Effect-Ära. Max Verstappen gewann damit seinen zweiten Weltmeistertitel und stellte mit 15 Siegen in einer Saison einen neuen Rekord auf.',
    specs: {
      chassis: 'Kohlefaser-Monocoque',
      suspension: 'Zugstangen (vorne) / Druckstangen (hinten)',
      weight: '798 kg (inkl. Fahrer)',
      transmission: 'Red Bull Technology 8-Gang halbautomatisch'
    }
  }
];
