//Basemap
mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0aGFnZW81MiIsImEiOiJjbGYxNzM4OG4wNW56M29yMGptejVqdWk3In0.d2kxvzWsUqplaiE7vbPS-Q';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //style: 'mapbox://styles/kathageo52/clav4xlcm000714o1ykh6ha2f',
    style: 'mapbox://styles/kathageo52/clbopybh9000414o9preg8eny',
    center: [10.179602699945812,48.88614028234175],
    zoom: 14

});




// Pop-up Fenster mit Echtzeitdaten
map.on('load', async () => {
 
    const geojson = await getLocation();
    // Add the location as a source.
    map.addSource('sensor', {
        type: 'geojson',
        data: geojson
    });
    // Add the symbol layer to the map.
    map.addLayer({
        'id': 'sensor',
        'type': 'symbol',
        'source': 'sensor',
        'layout': {

            'icon-image': ['get', 'icon'],
            'icon-allow-overlap': false
        }
    });

    // Update the source from the API every 2 seconds.
    const updateSource = setInterval(async () => { 
        const geojson = await getLocation(updateSource);
        map.getSource('sensor').setData(geojson);
    }, 2000);

    async function getLocation(updateSource) {
        // Make a GET request to the API and return the location.
        try {
            const response = await fetch(
                'http://10.1.0.2:1890/json',
                { method: 'GET' }
            );
            const {temperatureSüd, humiditySüd, co2Süd, tonneGroß, tonneKlein, pegelJagst, A_Autos, A_Fahrrad, A_Motorrad, A_LKW} = await response.json();
            
           
            // Return the location as GeoJSON.
            return {

                "type" : "FeatureCollection",
                "features" : [
                    {
                    "type" : "Feature",
                    "id" : 1,
                    "geometry" : {
                        "type" : "Point",
                        "coordinates" : [
                            10.173508992267417,
                            48.883991463952626
                        ]
                    },
                    'properties': { 
                        'Nutzung':
                        '<h3>Raumluftklimamanagement</h3><a><strong>Temperatur:</strong> </a><strong>'+temperatureSüd+'</strong><a><strong>°C</strong></a>'+'<br><a><strong>Luftfeuchtigkeit: </strong></a><strong>'+humiditySüd+'</strong><a><strong>%</strong></a>'+'<br><a><strong>Co<sub>2</sub>: </strong></a><strong>'+co2Süd+'</strong><a><strong> ppm</a></strong>',
                        
                        'description':
                            '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a> <p>In Büros, Universitäten und Schulen halten sich häufig sehr viele Personen in relativ kleinen Räumen auf. Der Sauerstoffgehalt der genutzten Räumlichkeiten nimmt dabei rapide ab und erreicht nicht selten kohlendioxidgehalte im Bereich zwischen 1000 ppm und 2500 ppm. Diese kritischen CO<sub>2</sub>-Werte verursachen Kopfschmerzen oder Konzentrationsstörungen, sodass die allgemeine Leistungsfähigkeit durch die "Dicke Luft" gehemmt wird. Abhilfe kann durch den Einsatz von CO<sub>2</sub>-Sensoren geschaffen werden. Diese werden kabellos am Einsatzgebiet installiert und geben wahlweise akkustische oder optische Signale zur Warnung bei kritischen CO<sub>2</sub>-Werten aus.</p>',
                       
                            
                        'icon': 'Raumluftklima'
                    },

                    },
                    {
                        "type" : "Feature",
                        "id" : 2,
                        "geometry" : {
                          "type" : "Point",
                          "coordinates" : [
                            10.17414812472745,
                            48.883972749369555
                          ]
                        },
                        'properties' : {
                          'Nutzung' : '<h3>Intelligente Verkehrszählung</h3><a><strong>Auto:</strong> </a><strong>'+A_Autos+'</strong>'+'<br><a><strong>Fahrrad: </strong></a><strong>'+A_Fahrrad+'</strong>'+'<br><a><strong>Motorrad: </strong></a><strong>'+A_Motorrad+'</strong>'+'<br><a><strong>LKW: </strong></a><strong>'+A_LKW+'</strong>',
                          'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Durch die intellgente Verkehrszählung wird eine adäquate Datengrundlage für die Verkehrspalnung geschaffen. Hierfür wird ein optischer Sensor installiert, der mithilfe von künstlicher Intelligenz Verkehrsteilnehmer identifiziert.</p><p>Die erfassten Daten können anschließend im bereitgestellten Dashboard einegesehen und analysiert werden. Damit wird die ein Überblick über eingefahrene Fahrzeuge einer Straße oder eines Bereichs abgegeben. Zusätzlich können Vehrkehrsteilnehmer nach Fahrzeugart (Zweirad, PKW, Kleintransporter, LKW und Busse) klassifiziert werden.</p>',
                          'icon' : 'intelligente Verkehrszählung'
                        }
                      },
                      {
                        "type" : "Feature",
                        "id" : 3,
                        "geometry" : {
                          "type" : "Point",
                          "coordinates" : [
                            10.1736239442844,
                            48.8837524175747
                          ]
                        },
                        'properties' : {
                          'Nutzung' : '<h3>Müllmanagement</h3><a><strong>Papiercontainer:</strong> </a><strong>'+tonneGroß+'</strong>'+'<br><a><strong>Papiertonne: </strong></a><strong>'+tonneKlein+'</strong>',
                          'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Durch die sensorische Austattung von Müllbehältnissen kann von nun an ortsunabhängig auf den Status des Füllstands verschiederner Behälter zugegriffen werden. Hierfür wird ganz einfach ein optischer Sensor unter dem Deckel eines Müllbehälters angebracht, welcher die aktuelle Füllmenge detektiert. Die Erfassung des Status der Füllmenge kann dabei in einem beliebigen Turnus abgefragt werden. Die erfassten Daten können nun über ein Dashboard visualisiert und analysiert werden, um datenbasierte Maßnahmen wie z.B. die frühzeitige Leerung der städtischen Mülleimer einzuleiten oder das überflüssige Ausrücken der Stadtarbeitenden, bei nicht vollen Mülleimern, zu verhindern.</p>',
                          'icon' : 'Müllmanagement'
                        }
                      },
                      {
                        "type" : "Feature",
                        "id" : 4,
                        "geometry" : {
                          "type" : "Point",
                          "coordinates" : [
                            10.1733072782653,
                            48.8839882640258
                          ]
                        },
                        'properties' : {
                          'Nutzung' : '<h3>Bewässerungsmanagement</h3>',
                          'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Der Einsatz von Bodenfeuchtesensoren kann eine ressourcensparende Bewässerung von Pflanzen ermöglichen. Nach der einfach nachrüstbaren kabellosen Installation der Sensorik werden die aufegenommenen Daten an eine zentrale Datenplattform weitergeleitet und können anschließend über ein Dashboard oder eine mobile Applikation aufbereitet und übersichtlich dargestellt werden. Durch die Aufrüstung von Aktoren kann zusätzlich ein autarkes Bewässerungssystem kreiert werden.</p>',
                          'icon' : 'Bewässerungsmanagement'
                        }
                      },
                      {
                          "type" : "Feature",
                          "id" : 5,
                          "geometry" : {
                            "type" : "Point",
                            "coordinates" : [
                                10.1738196036415,
                                48.8837223025494
                            ]
                          },
                          'properties' : {
                            'Nutzung' : '<h3>Intelligente Lademanagement</h3>',
                            'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Dank der Kombination von Parksensorik und Betriebsdaten der E-Ladesäulen lässt sich die Ladeinfrastruktur effizient nutzen: Informationen über freie und funktionsbereite E-Ladesäulen stehen den Nutzern über Apps in Echtzeit zur Verfügung, und gleichzeitig die Park- und Nutzungszeiten an den Ladesäulen für die Betreiber der Ladeinfrastruktur erfasst werden. Zusätzlich kann zwischen Parken ohne Laden und Parken mit aktivem Ladevorgang unterschieden werden, z.B. falls Ladesäulen durch Fahrzeuge mit Verbrennungsmotor blockiert werden.</p><p>Erweiterungsoptionen:</p><ul><li>Bei abgeschlossenen Ladevorgängen können Benachrichtigungen (per Push, Mail oder Messenger) zur Räumung der E-Ladesäule aktiviert werden</li><li>Die erfassten Daten zu Park- und Nutzungszeiten an den Ladesäulen erlauben faktenbasierte Bewertungen zu einem möglichen Ausbau der bestehenden E-Ladeinfrastruktur. </li></ul>',
                            'icon' : 'Ladesäulen'
                          }
                        },
                        {
                            "type" : "Feature",
                            "id" : 6,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.1737835219098,
                                48.883728989528
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Intelligente Lademanagement</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Dank der Kombination von Parksensorik und Betriebsdaten der E-Ladesäulen lässt sich die Ladeinfrastruktur effizient nutzen: Informationen über freie und funktionsbereite E-Ladesäulen stehen den Nutzern über Apps in Echtzeit zur Verfügung, und gleichzeitig die Park- und Nutzungszeiten an den Ladesäulen für die Betreiber der Ladeinfrastruktur erfasst werden. Zusätzlich kann zwischen Parken ohne Laden und Parken mit aktivem Ladevorgang unterschieden werden, z.B. falls Ladesäulen durch Fahrzeuge mit Verbrennungsmotor blockiert werden.</p><p>Erweiterungsoptionen:</p><ul><li>Bei abgeschlossenen Ladevorgängen können Benachrichtigungen (per Push, Mail oder Messenger) zur Räumung der E-Ladesäule aktiviert werden</li><li>Die erfassten Daten zu Park- und Nutzungszeiten an den Ladesäulen erlauben faktenbasierte Bewertungen zu einem möglichen Ausbau der bestehenden E-Ladeinfrastruktur. </li></ul>',
                              'icon' : 'Ladesäulen'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 7,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.1737534094832,
                                48.8837335658546
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Intelligente Lademanagement</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Dank der Kombination von Parksensorik und Betriebsdaten der E-Ladesäulen lässt sich die Ladeinfrastruktur effizient nutzen: Informationen über freie und funktionsbereite E-Ladesäulen stehen den Nutzern über Apps in Echtzeit zur Verfügung, und gleichzeitig die Park- und Nutzungszeiten an den Ladesäulen für die Betreiber der Ladeinfrastruktur erfasst werden. Zusätzlich kann zwischen Parken ohne Laden und Parken mit aktivem Ladevorgang unterschieden werden, z.B. falls Ladesäulen durch Fahrzeuge mit Verbrennungsmotor blockiert werden.</p><p>Erweiterungsoptionen:</p><ul><li>Bei abgeschlossenen Ladevorgängen können Benachrichtigungen (per Push, Mail oder Messenger) zur Räumung der E-Ladesäule aktiviert werden</li><li>Die erfassten Daten zu Park- und Nutzungszeiten an den Ladesäulen erlauben faktenbasierte Bewertungen zu einem möglichen Ausbau der bestehenden E-Ladeinfrastruktur. </li></ul>',
                              'icon' : 'Ladesäulen'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 8,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.1737198205764,
                                48.883738669105
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Intelligente Lademanagement</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Dank der Kombination von Parksensorik und Betriebsdaten der E-Ladesäulen lässt sich die Ladeinfrastruktur effizient nutzen: Informationen über freie und funktionsbereite E-Ladesäulen stehen den Nutzern über Apps in Echtzeit zur Verfügung, und gleichzeitig die Park- und Nutzungszeiten an den Ladesäulen für die Betreiber der Ladeinfrastruktur erfasst werden. Zusätzlich kann zwischen Parken ohne Laden und Parken mit aktivem Ladevorgang unterschieden werden, z.B. falls Ladesäulen durch Fahrzeuge mit Verbrennungsmotor blockiert werden.</p><p>Erweiterungsoptionen:</p><ul><li>Bei abgeschlossenen Ladevorgängen können Benachrichtigungen (per Push, Mail oder Messenger) zur Räumung der E-Ladesäule aktiviert werden</li><li>Die erfassten Daten zu Park- und Nutzungszeiten an den Ladesäulen erlauben faktenbasierte Bewertungen zu einem möglichen Ausbau der bestehenden E-Ladeinfrastruktur. </li></ul>',
                              'icon' : 'Ladesäulen'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 9,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.1736860996173,
                                48.8837433931113
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Intelligente Lademanagement</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Dank der Kombination von Parksensorik und Betriebsdaten der E-Ladesäulen lässt sich die Ladeinfrastruktur effizient nutzen: Informationen über freie und funktionsbereite E-Ladesäulen stehen den Nutzern über Apps in Echtzeit zur Verfügung, und gleichzeitig die Park- und Nutzungszeiten an den Ladesäulen für die Betreiber der Ladeinfrastruktur erfasst werden. Zusätzlich kann zwischen Parken ohne Laden und Parken mit aktivem Ladevorgang unterschieden werden, z.B. falls Ladesäulen durch Fahrzeuge mit Verbrennungsmotor blockiert werden.</p><p>Erweiterungsoptionen:</p><ul><li>Bei abgeschlossenen Ladevorgängen können Benachrichtigungen (per Push, Mail oder Messenger) zur Räumung der E-Ladesäule aktiviert werden</li><li>Die erfassten Daten zu Park- und Nutzungszeiten an den Ladesäulen erlauben faktenbasierte Bewertungen zu einem möglichen Ausbau der bestehenden E-Ladeinfrastruktur. </li></ul>',
                              'icon' : 'Ladesäulen'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 10,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.173660316172,
                                48.8839200914183
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Besucherzählung</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Geeignete Sensoren ermöglichen die akkurate und anonyme Personen- und Fahrzeugzählung mittels Lichtschrankentechnik. Sie sorgt für eine Zählgenauigkeit von 98%. Die Daten werden per Funk an ein LoRaWAN-Gateway gesendet. Nach der Datenverarbeitung können Personenströme, Fahrzeugaufkommen und verschiedene Fahrzeugarten erfasst werden und fortan auf einem Dashboard oder in einer mobilen Applikation komfortabel eingesehen und analysiert werden. So ist ein kompletter Überblick der erfassten Personen- und Fahrzeugfrequenzen möglich.</p>',
                              'icon' : 'Besucherzählung'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 11,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.1732436335258,
                                48.8836338801702
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Energiemanagement (Elektrizität)</h3>' ,
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Im Zuge der Agenda 2030 ist eine nachhaltige Entwicklung vor allem durch Ressourcenschonung und Klimaschutz geprägt. Um die Nachhaltigkeitsziele realisieren zu können, ist die Sicherstellung des Energiebedarfs der Nutzer von enormer bedeutung. Durch ein smartes Energiemanagement wird dies möglich. Dafür wird ein Stromsensor an der zu messen gewünschten Anlage kabellos angeschlossen. Die erfassten Daten werden anschließend per Funk weitergeleitet und können dann über ein Dashboard visualisiert und analysiert werden.</p><p>Somit erlaubt das smarte Energiemanagement auch den frühen Eingriff in Systeme, welche hohe Energieverbräuche generieren oder Netzschwankungen auslösen, um so Kostenersparnisse für Nutzer:innen zu ermöglichen.</p>',
                              'icon' : 'Stromzähler'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 12,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.173516427623,
                                48.8838734333625
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Energiemanagement (Elektrizität)</h3>' ,
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Im Zuge der Agenda 2030 ist eine nachhaltige Entwicklung vor allem durch Ressourcenschonung und Klimaschutz geprägt. Um die Nachhaltigkeitsziele realisieren zu können, ist die Sicherstellung des Energiebedarfs der Nutzer von enormer bedeutung. Durch ein smartes Energiemanagement wird dies möglich. Dafür wird ein Stromsensor an der zu messen gewünschten Anlage kabellos angeschlossen. Die erfassten Daten werden anschließend per Funk weitergeleitet und können dann über ein Dashboard visualisiert und analysiert werden.</p><p>Somit erlaubt das smarte Energiemanagement auch den frühen Eingriff in Systeme, welche hohe Energieverbräuche generieren oder Netzschwankungen auslösen, um so Kostenersparnisse für Nutzer:innen zu ermöglichen.</p>',
                              'icon' : 'Stromzähler'
                            }
                          },
                          {
                            "type" : "Feature",
                            "id" : 13,
                            "geometry" : {
                              "type" : "Point",
                              "coordinates" : [
                                10.17414812472745,
                                48.883972749369555
                              ]
                            },
                            'properties' : {
                              'Nutzung' : '<h3>Intelligente Verkehrszählung</h3>',
                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Durch die intellgente Verkehrszählung wird eine adäquate Datengrundlage für die Verkehrspalnung geschaffen. Hierfür wird ein optischer Sensor installiert, der mithilfe von künstlicher Intelligenz Verkehrsteilnehmer identifiziert.</p><p>Die erfassten Daten können anschließend im bereitgestellten Dashboard einegesehen und analysiert werden. Damit wird die ein Überblick über eingefahrene Fahrzeuge einer Straße oder eines Bereichs abgegeben. Zusätzlich können Vehrkehrsteilnehmer nach Fahrzeugart (Zweirad, PKW, Kleintransporter, LKW und Busse) klassifiziert werden.</p>',
                              'icon' : 'intelligente Verkehrszählung'
                            }
                          },
                          {
                              "type" : "Feature",
                              "id" : 14,
                              "geometry" : {
                                "type" : "Point",
                                "coordinates" : [
                                    10.1741784581397,
                                    48.8840106221588
                                ]
                              },
                              'properties' : {
                                'Nutzung' : '<h3>Intelligente Leuchten</h3>',
                                'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a>',
                                'icon' : 'Leuchtensteuerung'
                              }
                            },
                            {
                                "type" : "Feature",
                                "id" : 15,
                                "geometry" : {
                                  "type" : "Point",
                                  "coordinates" : [
                                    10.1738950917698,
                                    48.8838134214158
                                  ]
                                },
                                'properties' : {
                                  'Nutzung' : '<h3>Breitband Leuchten</h3>',
                                  'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Die Infrastruktur eines Teils unserer intelligenten Leuchten ist über Lichtwellenleiter (Glasfaser) mit unserem Datennetz vor Ort und darüber mit dem Internet verbunden. So können alle Daten schnell und sicher an ihren Bestimmungsort gelangen. </p>',
                                  'icon' : 'Leuchtensteuerung'
                                }
                              },
                              {
                                  "type" : "Feature",
                                  "id" : 16,
                                  "geometry" : {
                                    "type" : "Point",
                                    "coordinates" : [
                                        10.1737252095698,
                                        48.8841224628845
                                    ]
                                  },
                                  'properties' : {
                                    'Nutzung' : '<h3>Autarke Leuchten</h3>',
                                    'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>An abgelegenen Standorten ist die Stromversorgung oft die größte Herausforderung für die Installation von smarter Infrastruktur. Mit der autarken Energielösung dieser vollwertigen LED-Straßenleuchte ist standardkonforme Beleuchtung an jedem Standort möglich. Durch eine adaptive Steuerung wird die volle Lichtleistung nur dann abgegeben, wenn sich Personen oder Fahrzeuge im relevanten Bereich befinden.</p>',
                                    'icon' : 'Leuchtensteuerung'
                                  }
                                },
                                {
                                    "type" : "Feature",
                                    "id" : 17,
                                    "geometry" : {
                                      "type" : "Point",
                                      "coordinates" : [
                                        10.1737201574446,
                                        48.8839597623982
                                      ]
                                    },
                                    'properties' : {
                                      'Nutzung' : '<h3>Intelligente Leuchtmanagement</h3>',
                                      'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Die Bereitstellung von öffentlichem WLAN erfolgt hier durch Integration in die smarten Leuchten ohne sichtbare zusätzliche Infrastruktur. </p><p>Zur Netzwerkanbindung wird die breitbandige Datenanbindung der Leuchten genutzt und damit allen Besuchern schnelles und kostenloses WLAN zur Verfügung gestellt. </p><p>Durch einen komplett getrennten Netzwerkabschnitt und Management der Zugriffsberechtigungen ist dabei ein höchstes Maß an Sicherheit für alle Nutzer und den Anbietern gewährleistet. </p>',
                                      'icon' : 'Leuchtensteuerung'
                                    }
                                  },
                                  {
                                      "type" : "Feature",
                                      "id" : 18,
                                      "geometry" : {
                                        "type" : "Point",
                                        "coordinates" : [
                                            10.1740408479162,
                                            48.8839177864281
                                        ]
                                      },
                                      'properties' : {
                                        'Nutzung' : '<h3>Intelligente Leuchtmanagement</h3>',
                                        'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a>',
                                        'icon' : 'Leuchtensteuerung'
                                      }
                                    },
                                    {
                                        "type" : "Feature",
                                        "id" : 19,
                                        "geometry" : {
                                          "type" : "Point",
                                          "coordinates" : [
                                            10.17415,48.88367
                                          ]
                                        },
                                        'properties' : {
                                          'Nutzung' : '<h3>Parkplatzmanagement</h3>',
                                          'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Parksuchverkehr macht bis zu 40 % des innerstädtischen Verkehrs aus. Zudem werden Entscheidungen für oder gegen mehr Stellflächen häufig aus dem Bauch heraus getroffen.<br>Die stellflächengenaue Erfassung von Parkflächen mit Hilfe von Sensoren bildet die Basis für eine datenbasiertes und intelligentes Parkraummanagement. Die erfassten Daten können nun über Dashboard visualisiert und analysiert werden, um datenbasierte Maßnahmen wie z.B. die Errichtung neuer Stellflächen oder die Anpassung des Stellplatzschlüssels vorzunehmen.</p>',
                                          'icon' : 'Parkplatz'
                                        }
                                      },
                                      {
                                          "type" : "Feature",
                                          "id" : 20,
                                          "geometry" : {
                                            "type" : "Point",
                                            "coordinates" : [
                                                10.17398,48.88395
                                            ]
                                          },
                                          'properties' : {
                                            'Nutzung' : '<h3>Parkplatzmanagement</h3>',
                                            'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Parksuchverkehr macht bis zu 40 % des innerstädtischen Verkehrs aus. Zudem werden Entscheidungen für oder gegen mehr Stellflächen häufig aus dem Bauch heraus getroffen.<br>Die stellflächengenaue Erfassung von Parkflächen mit Hilfe von Sensoren bildet die Basis für eine datenbasiertes und intelligentes Parkraummanagement. Die erfassten Daten können nun über Dashboard visualisiert und analysiert werden, um datenbasierte Maßnahmen wie z.B. die Errichtung neuer Stellflächen oder die Anpassung des Stellplatzschlüssels vorzunehmen.</p>',
                                            'icon' : 'Parkplatz'
                                          }
                                        },
                                        {
                                            "type" : "Feature",
                                            "id" : 21,
                                            "geometry" : {
                                              "type" : "Point",
                                              "coordinates" : [
                                               10.19108766230514,48.89158333917576  
                                              ]
                                            },
                                            'properties' : {
                                              'Nutzung' : '<h3><strong>Pegelstandsüberwachung</strong></h3><a><strong>Pegelstand der Jagst:</strong> </a><strong>'+pegelJagst+'</strong><a><strong> cm</strong></a>',
                                              'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Durch die Installation von Sensoren können jederzeit Pegelstände von Bächen, Flüssen, Seen, Stauanlagen oder Grundwasserschächten überwacht werden. Nachdem die erfassten Zustände an die zentrale Datenplattform geschickt wurden, können sie zur übersichtlichen Darstellung und Analyse am Dashboard verbildlicht werden. Bei kritischen Pegelständen werden Warnungen an die notwendigen Stellen ausgegeben, um schon vor dem Auftreten größerer Schäden einschreiten zu können und Gefahren für Leib und Leben zu verhindern. </p>',
                                              'icon' : 'pegelstand'
                                            }
                                          },
                                            {
                                                "type" : "Feature",
                                                "id" : 22,
                                                "geometry" : {
                                                  "type" : "Point",
                                                  "coordinates" : [
                                                    10.17355,48.88387
                                                  ]
                                                },
                                                'properties' : {
                                                  'Nutzung' : '<h3>Energiemanagement (Wasser)</h3>',
                                                  'description': '<p><a href="https://iot.geodata-gmbh.de/ui/#!/0?socketid=Fuu9pMvODCkeVIwyAAAb" target="_blank" title="Opens in a new window">Dashboard</a><p>Der LoRa-Wasserzähler ermöglicht bequemes Fernauslesen von Zählerständen und das Monitoring des Wasserverbrauchs von Gebäuden. Die Nutzung des intelligenten Wasserzählers bietet folgende Mehrwerte:</p> <ul><li> Fernsaulesung der der Zählerstände vermindern aufwendige und Vor-Ort-Ablesungen</li><li>Echtzeit-Zugriff auf die Daten, visualisiert über ein Dashboard</li><li>Kein zusätzlicher Kabelzug dank der LoRa-Funkverbindung</li><li>Zusätzlich können durch den Einsatz von fernauslesbaren Wasserzählern Leckagen und Rohrbrüche zeitnah erkannt werden</li></ul>',
                                                  'icon' : 'Wasser'
                                                }
                                              }


                ]
            };



        
        } catch (err) {
            // If the updateSource interval is defined, clear the interval to stop updating the source.
           if (updateSource) setInterval(updateSource);
            throw new Error(err);
        }

    }
});




    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'sensor', (e) => {

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
    const Nutzung = e.features[0].properties.Nutzung;


    new mapboxgl.Popup()
   
    .setLngLat(coordinates)
    .setHTML(Nutzung+ description)
    .addTo(map);
    });

    // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })
    );
    
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'sensor', () => {
    map.getCanvas().style.cursor = 'pointer';
    });


    
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'sensor', () => {
    map.getCanvas().style.cursor = '';
    });   


    // Navigationsleiste
    map.addControl(new mapboxgl.NavigationControl(),"bottom-right");

    // 2D/ 3D Button
    class PitchToggle {
    constructor({ bearing = -20, pitch = 70, minpitchzoom = null }) {
    this._bearing = bearing;
    this._pitch = pitch;
    this._minpitchzoom = minpitchzoom;
    }

    onAdd(map) {
    this._map = map;
    let _this = this;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
    this._btn.type = "button";
    this._btn["aria-label"] = "Toggle Pitch";
    this._btn.onclick = function() {
    if (map.getPitch() === 0) {
        let options = { pitch: _this._pitch, bearing: _this._bearing };
        if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
        options.zoom = _this._minpitchzoom;
        }
        map.easeTo(options);
        _this._btn.className =
        "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
    } else {
        map.easeTo({ pitch: 0, bearing: 0 });
        _this._btn.className =
        "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d"; 
        
    }
    };

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
    }

  }


    /* Add Controls to the Map */
    // Zoomstufeneinstellung beim switchen von 2D zu 3D
    map.addControl(new PitchToggle({ minpitchzoom: 20 }), "bottom-right");





  

//-------------------------------------------------------------------------------------

