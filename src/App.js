import React from 'react';
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const TEAL = "#04BDB7", BEIGE = "#FFF8E8", BORD = "#800032", DARK = "#303030", LGRAY = "#C0C0C0", WHITE = "#FFFFFF";

const DATA = [
["Paul Corbeil","Boston Bruins","NHL","Paraphe Sports Management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
["Frederic Brunet","Boston Bruins","NHL","Paraphe Sports Management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
["Patrick O'Connell","Seattle Seahawks","NFL","Steinberg Sports","Cameron Foster","cameron@steinbergsports.com","Contacted"],
["Devon Witherspoon","Seattle Seahawks","NFL","CAA","Tory Dandy","tdandy@athletesfirst.net","Contacted"],
["Seth Coleman","Seattle Seahawks","NFL","Goal Line Football","Joseph Behar","jbehar@goallinefootball.com","Contacted"],
["Connor O'Toole","Seattle Seahawks","NFL","Aura Sports Group","Ness Mugrabi","ness@aurasmg.com","Contacted"],
["Tyron Broden","Seattle Seahawks","NFL","Net Sports Management","John Hamood","johnny@netsportsmgmt.com","Contacted"],
["Zy Alexander","Seattle Seahawks","NFL","Equity Sports","Marcus Cromartie","marcus@equity-sports.com","Contacted"],
["DeMarcus Lawrence","Seattle Seahawks","NFL","Aura Sports Group","Ness Mugrabi","ness@aurasmg.com","Negotiating"],
["Drew Lock","Seattle Seahawks","NFL","CAA","Jimmy Sexton","jsexton@caa.com","Contacted"],
["Kenneth Walker III","Seattle Seahawks","NFL","Sport Trust Advisors","Ben Setas","ben@sportstrust.com","Contacted"],
["Mike Morris","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Negotiating"],
["Leonard Williams","Seattle Seahawks","NFL","Independent Sports","Roosevelt Barnes","rbarnes@iseworldwide.com","Contacted"],
["Marshall Lang","Seattle Seahawks","NFL","Dynamic Sports Group","Greg Brookey","gbrookey@dynamicsportsgrp.com","Contacted"],
["Elijah Arroyo","Seattle Seahawks","NFL","Rosenhaus Sports","Drew Rosenhaus","dr@rsragency.com","Contacted"],
["Ty Okada","Seattle Seahawks","NFL","United Athlete Sports","Evan Brennan","evan@uasports.us","Contacted"],
["Tyler Hall","Seattle Seahawks","NFL","International Sports Agency","Bardia Ghahremani","bardia@isasports.com","Contacted"],
["Dareke Young","Seattle Seahawks","NFL","Sport Trust Advisors","Ben Setas","ben@sportstrust.com","Contacted"],
["Jaxon Smith-Njigba","Seattle Seahawks","NFL","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
["Boye Mafe","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Contacted"],
["Zach Charbonnet","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Contacted"],
["Jake Bobo","Seattle Seahawks","NFL","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
["Johnathan Hankins","Seattle Seahawks","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
["Tariq Woolen","Seattle Seahawks","NFL","Sport Stars","Jason Chayut","Jchayut@sportstarsnyc.com","Contacted"],
["Charles Cross","Seattle Seahawks","NFL","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
["Jalen Milroe","Seattle Seahawks","NFL","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
["Isaiah Iton","Seattle Seahawks","NFL","Delta Sports Group","Jesse Foreman","thenflagent@gmail.com","Negotiating"],
["Jaylen Waddle","Miami Dolphins","NFL","GSE Worldwide","Ian Grutman","lgrutman@gseworldwide.com","Contacted"],
["De'Von Achane","Miami Dolphins","NFL","Roc Nation","Leah Knight","lknight@rocnation.com","Contacted"],
["Jordyn Brooks","Miami Dolphins","NFL","Roc Nation","Erik Burkhardt","eb@rocnation.com","Contacted"],
["Minkah Fitzpatrick","Miami Dolphins","NFL","Ripple Sports","Bijan Heravi","bijan@ripplesports.com","Contacted"],
["Kenneth Grant","Miami Dolphins","NFL","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
["Darren Waller","Miami Dolphins","NFL","Rosenhaus Sports","Drew Rosenhaus","dr@rsragency.com","Contacted"],
["Liam Eichenberg","Miami Dolphins","NFL","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
["Rasul Douglas","Miami Dolphins","NFL","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
["Jake Bailey","Miami Dolphins","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
["Andre Cisco","New York Jets","NFL","Athletes First","David Mulugheta","dmulugheta@athletesfirst.net","Contacted"],
["Irvin Charles","New York Jets","NFL","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
["Isaiah Davis","New York Jets","NFL","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
["Olu Fashanu","New York Jets","NFL","CAA","Patrick Collins","patrick.collins@caa.com","Contacted"],
["Israel Abanikanda","New York Jets","NFL","First Round Management","Malki Kawa","malki007@aol.com","Negotiating"],
["Davante Adams","New York Jets","NFL","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
["Morgan Moses","New York Jets","NFL","Upper Edge Management","Andy Ross","andy@upperedgesports.com","Contacted"],
["Aaron Brewer","Arizona Cardinals","NFL","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
["Bilal Nichols","Arizona Cardinals","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
["Jonah Williams","Arizona Cardinals","NFL","Excel Sports Management","Ryan Tollner","rtollner@excelsm.com","Contacted"],
["Calais Campbell","Arizona Cardinals","NFL","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
["Marvin Harrison Jr.","Arizona Cardinals","NFL","Harrison Incorporated","Marvin Harrison Jr.","mhj@harrisonincorporated.com","Contacted"],
["Dorian Singer","Arizona Cardinals","NFL","All Pro Sports","Lamont Smith","clsmith@apse.net","Contacted"],
["Jonathan Ward","Arizona Cardinals","NFL","Pyramid Sports Group","Orlando Arnold","orlando@pyramidsportsgroup.com","Contacted"],
["Richard Gouraige","Buffalo Bills","NFL","Agency 1 AMG","Aston Wilson","aston@astonsportsreps.com","Contacted"],
["Connor McGovern","Buffalo Bills","NFL","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
["Khalil Shakir","Buffalo Bills","NFL","Equity Sports","Chris Cabott","chris@equity-sports.com","Contacted"],
["Keon Coleman","Buffalo Bills","NFL","Just Win Management","Joe Hernandez","joe@justwin.us","Contacted"],
["Josh Palmer","Buffalo Bills","NFL","The Sports Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
["Lamar Jackson","Baltimore Ravens","NFL","Synergy Sports","Josh Arnold","josh@synergysportsonline.com","Contacted"],
["Zay Flowers","Baltimore Ravens","NFL","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
["Malaki Starks","Baltimore Ravens","NFL","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
["Ronnie Stanley","Baltimore Ravens","NFL","Roc Nation","Kim Miale","km@rocnation.com","Contacted"],
["Keaton Mitchell","Baltimore Ravens","NFL","Generation Sports","Christian Kranz","christian@generationsportsgroup.com","Contacted"],
["Ja'Marr Chase","Cincinnati Bengals","NFL","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
["Tee Higgins","Cincinnati Bengals","NFL","Alliance Sports","Caitlin Aoki","caitlin@alliance-sports.com","Contacted"],
["Trey Hendrickson","Cincinnati Bengals","NFL","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
["Ja'Quan McMillian","Tampa Bay Buccaneers","NFL","Day 1 Sports","Deryk Gilmore","deryk.g@day1sports.com","Negotiating"],
["Mike Evans","Tampa Bay Buccaneers","NFL","Day 1 Sports","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
["Brock Purdy","San Francisco 49ers","NFL","Range Media Partners","Kyle Strongin","kstrongin@rangemp.com","Contacted"],
["George Kittle","San Francisco 49ers","NFL","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
["Travis Kelce","Kansas City Chiefs","NFL","Milk & Honey Sports","Jacob Presser","jmpresser@gmail.com","Contacted"],
["Patrick Mahomes","Kansas City Chiefs","NFL","1UP Sports Marketing","Jacquelyn Dahl","jd@1upsportsmarketing.com","Contacted"],
["Chris Jones","Kansas City Chiefs","NFL","Katz Brothers Sports","Jason Katz","jason@katzbrotherssports.com","Contacted"],
["Antonio Johnson","Kansas City Chiefs","NFL","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
["Saquon Barkley","Philadelphia Eagles","NFL","LBI Entertainment","Ken Katz","kk@lbient.com","Contacted"],
["Nakobe Dean","Philadelphia Eagles","NFL","A3 Athletics","Chad Speck","ike@replegacy.com","Contacted"],
["Bo Nix","Denver Broncos","NFL","QB Reps","Peter Webb","peter@qbreps.com","Contacted"],
["Caleb Williams","Chicago Bears","NFL","Barnburner Sports","AJ Romeo","aromeo@barnburnermktg.com","Contacted"],
["Jayden Daniels","Washington Commanders","NFL","EAG Sports","Denise White","denise.white@eagsportmanagement.com","Contacted"],
["Terry McLaurin","Washington Commanders","NFL","The Society Management","Bronson Sanich","bronson@thesociety.us","Contacted"],
["Jonathan Allen","Washington Commanders","NFL","Everett Sports Marketing","Jeff Crandall","jeff@thisisesm.com","Contacted"],
["Jahmal Banks","Washington Commanders","NFL","Dream Point Sports","Tony Paige","tpaige@dpointsports.com","Contacted"],
["Cooper Kupp","Los Angeles Rams","NFL","Royalty Management","Tzvi Grossman","tgrossman@royaltymanagementgoup.com","Contacted"],
["Ladd McConkey","Los Angeles Chargers","NFL","Everett Sports Marketing","Jeff Hoffman","jeff@thisisesm.com","Contacted"],
["Kevin Givens","Las Vegas Raiders","NFL","Prolifiq Sports","Kaveh Akbari","Kaveh@greyshot.co","Negotiating"],
["Travon Walker","Jacksonville Jaguars","NFL","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
["Alvin Kamara","New Orleans Saints","NFL","DR31 Sports","David Raymond","david@dr31sports.com","Contacted"],
["Diontae Johnson","Carolina Panthers","NFL","QC Sports","Bradley Cicala","brad@qcsports.com","Contacted"],
["Malik Nabers","New York Giants","NFL","CMV Sports","Damien Butler","damien.butler@cmvsports.com","Contacted"],
["Josh Jacobs","Green Bay Packers","NFL","Black Label Sports","Chad Wiestling","wiestling@blacklabelsportsgroup.com","Contacted"],
["Tony Pollard","Tennessee Titans","NFL","MS World LLC","Kennard McGuire","kmcguire@msworldllc.com","Contacted"],
["Kyle Dugger","New England Patriots","NFL","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
["Rhamondre Stevenson","New England Patriots","NFL","SIEGE","Brian Hannula","brian@siegerep.com","Contacted"],
["Anthony Richardson","Indianapolis Colts","NFL","Legacy Sports Advisors","Deiric Jackson","deiricjackson@gmail.com","Contacted"],
["Evan Hull","Indianapolis Colts","NFL","One West Sports","Christopher Gittings","chrisg@onewestsports.com","Contacted"],
["Joe Mixon","Houston Texans","NFL","Authentic Athletix","Peter Schaffer","peter@agentaa.com","Contacted"],
["Stefon Diggs","Houston Texans","NFL","SMAC Entertainment","Constance Schwartz-Morini","cs@smac-ent.com","Contacted"],
["Keaton Wallace","Atlanta Hawks","NBA","Excel Sports Management","Max Lipsett","mlipsett@excelsm.com","Contacted"],
["Onyeka Okongwu","Atlanta Hawks","NBA","Excel Sports Management","Jordan Gertler","jgertler@excelsm.com","Contacted"],
["Garrison Mathews","Atlanta Hawks","NBA","The Sports Law Group","Chris Patrick","cpatrick@thesportslawgroup.com","Contacted"],
["N'Faly Dante","Atlanta Hawks","NBA","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
["Damien Arletti","Atlanta Hawks","NBA","Sports International Group","Sammy Wloszczowski","sammyw@sigsports.com","Contacted"],
["Hugo Gonzalez","Boston Celtics","NBA","ProMondo Sports","Matt Bollero","matt@promondosports.com","Contacted"],
["Kristaps Porzingis","Boston Celtics","NBA","FUTURE Sports Group","Janis Porzingis","porzingis@hotmail.com","Contacted"],
["Jaden Springer","Boston Celtics","NBA","A3 Athletics","Isaac Conner","ike@replegacy.com","Contacted"],
["Jordan Walsh","Boston Celtics","NBA","On Time Agency","Ramon Sessions","ramon@ontimeagencygroup.com","Contacted"],
["Terance Mann","Brooklyn Nets","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
["Keon Johnson","Brooklyn Nets","NBA","Klutch Sports Group","Anthony Fields","afields@klutchgroup.com","Contacted"],
["Kon Knueppel","Charlotte Hornets","NBA","Priority Sports","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
["Brandon Miller","Charlotte Hornets","NBA","VaynerSports","AJ","aj@vaynersports.com","Negotiating"],
["Wendell Moore Jr.","Charlotte Hornets","NBA","LIFT Sports Management","Mike Miller","mm@liftsm.com","Contacted"],
["Matas Buzelis","Chicago Bulls","NBA","Excel Sports Management","Michael Tellem","mtellem@excelsm.com","Contacted"],
["Jaden Ivey","Chicago Bulls","NBA","CAA","Austin Brown","austin.brown@caa.com","Contacted"],
["Josh Giddey","Chicago Bulls","NBA","Lighthouse Sports","Daniel","daniel@lighthousesportsmgmt.com","Contacted"],
["Max Strus","Cleveland Cavaliers","NBA","Priority Sports","Kieran Piller","kieranp@prioritysports.biz","Contacted"],
["Dean Wade","Cleveland Cavaliers","NBA","Next Sports Agency","Adam Papas","adampapas.nextsports@gmail.com","Contacted"],
["Craig Porter Jr.","Cleveland Cavaliers","NBA","Always On PRS","Ryan Straining","ryan@alwaysonprs.com","Contacted"],
["Kyrie Irving","Dallas Mavericks","NBA","A11Even Sports","Shetellia Riley","shetellia@aol.com","Contacted"],
["Miles Kelly","Dallas Mavericks","NBA","Verus Management","Aaron Turner","aturner@verusteam.com","Negotiating"],
["Moussa Cisse","Dallas Mavericks","NBA","LIFT Sports Management","Yann Balikouzou","yb@liftsm.com","Contacted"],
["Christian Braun","Denver Nuggets","NBA","WME","Bill Duffy","duff@bdasports.com","Contacted"],
["Julian Strawther","Denver Nuggets","NBA","Wasserman","Darren Matsubara","dmatsubara@teamwass.com","Contacted"],
["Duncan Robinson","Detroit Pistons","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Contacted"],
["Ron Holland","Detroit Pistons","NBA","Priority Sports","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
["Alperen Sengun","Houston Rockets","NBA","Wasserman","Chafie Fields","cfields@teamwass.com","Contacted"],
["Jabari Smith Jr.","Houston Rockets","NBA","Prather Sports","Wallace Prather","wallaceprather@gmail.com","Contacted"],
["Tari Eason","Houston Rockets","NBA","Siegel Sports","Michael Siegel","info@sseagency.com","Contacted"],
["Amen Thompson","Houston Rockets","NBA","GAPP Sports","Troy","maatausar@gmail.com","Contacted"],
["Andrew Nembhard","Indiana Pacers","NBA","WME","Bill Duffy","duff@bdasports.com","Contacted"],
["Bennedict Mathurin","Indiana Pacers","NBA","Innovate Sports","Nima Namakian","nnamakian@innovatesportsgroup.com","Contacted"],
["Buddy Hield","Indiana Pacers","NBA","Icona Agency","Diana Day","diana@iconaagency.com","Contacted"],
["Aaron Nesmith","Indiana Pacers","NBA","Excel Sports Management","Mike Lindeman","mike@excelsm.com","Contacted"],
["Ben Sheppard","Indiana Pacers","NBA","GSL Sports Group","George Langberg","gsl@gslsportsgroup.com","Contacted"],
["TyTy Washington Jr.","LA Clippers","NBA","LIFT Sports Management","Kevin Bradbury","kbradbury@liftsm.com","Contacted"],
["James Harden","LA Clippers","NBA","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
["Nicolas Batum","LA Clippers","NBA","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
["Christian Koloko","Los Angeles Lakers","NBA","Klutch Sports Group","Calvin Andrews","candrews@klutchgroup.com","Contacted"],
["RJ Davis","Los Angeles Lakers","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Negotiating"],
["Santi Aldama","Memphis Grizzlies","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Negotiating"],
["Desmond Bane","Memphis Grizzlies","NBA","Gersh","Maxwell Wiepking","mwiepking@gersh.com","Contacted"],
["GG Jackson II","Memphis Grizzlies","NBA","Famo Sports","Donnell","Dnell38@yahoo.com","Contacted"],
["Jaime Jaquez Jr.","Miami Heat","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Negotiating"],
["Norman Powell","Miami Heat","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Negotiating"],
["Dru Smith","Miami Heat","NBA","AMR Agency","Aaron Reilly","aaron@amragencyllc.com","Contacted"],
["Thanasis Antetokounmpo","Milwaukee Bucks","NBA","Octagon","Alex Saratsis","alexandros.saratsis@octagon.com","Contacted"],
["Dame Lillard","Milwaukee Bucks","NBA","Goodwin Sports","Aaron Goodwin","agood7@goodwinsports.com","Contacted"],
["Micah Potter","Milwaukee Bucks","NBA","Edge Sports International","Sam Cipriano","scipriano@edgesportsintl.com","Contacted"],
["Rudy Gobert","Minnesota Timberwolves","NBA","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
["Jesse Edwards","Minnesota Timberwolves","NBA","Wasserman","Joe Smith","jsmith@teamwass.com","Contacted"],
["Elfrid Payton","New Orleans Pelicans","NBA","You First Sports","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
["Yves Missi","New Orleans Pelicans","NBA","Wasserman","Jelani Floyd","jelani.floyd@teamwass.com","Contacted"],
["Chaz Lanier","New Orleans Pelicans","NBA","You First Sports","Deirunas Visockas","deirunas.visockas@youfirstsports.com","Contacted"],
["Dillon Jones","New York Knicks","NBA","Roc Nation","Sam Permut","sam@rocnation.com","Negotiating"],
["Delon Wright","New York Knicks","NBA","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
["Deni Avdija","Portland Trail Blazers","NBA","2Talent Sports","Matan Siman-Tov","matan@2talent.co.il","Contacted"],
["Toumani Camara","Portland Trail Blazers","NBA","Up Tempo Management","David Putterie","info@uptempomanagement.com","Contacted"],
["Paul Reed","Philadelphia 76ers","NBA","Octagon","Ron Shade","ron.shade@octagon.com","Contacted"],
["Keon Ellis","Sacramento Kings","NBA","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
["Trevelin Queen","Sacramento Kings","NBA","Hazan Sports","Daniel Hazan","daniel@hazansports.com","Negotiating"],
["Reece Beekman","San Antonio Spurs","NBA","The Familie","David Bauman","info@thefamilie.com","Contacted"],
["Stanley Umude","San Antonio Spurs","NBA","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
["Kris Dunn","Utah Jazz","NBA","Thread Sports","Bernie Lee","bernie@threadsm.com","Contacted"],
["Jonathan Isaac","Orlando Magic","NBA","Prolifiq Sports","Tony Miranda","tmiranda@prolifichq.com","Contacted"],
["Kenrich Williams","Oklahoma City Thunder","NBA","Pensack Sports","Adam Pensack","adam@pensacksports.com","Contacted"],
["Dante Exum","Washington Wizards","NBA","The Landmark Sports Agency","Brandon Rosenthal","bmr@landmarksports.com","Contacted"],
["Jaylen Martin","Washington Wizards","NBA","Valor Sports Agency","Deddrick Faison","dfaison@valorsportsagency.com","Contacted"],
["Khabib Nurmagomedov","","UFC","Dominance MMA","Ali Abdelaziz","alijudo96@yahoo.com","Contacted"],
["Kamaru Usman","","UFC","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
["Justin Gaethje","","UFC","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
["Conor McGregor","","UFC","Paradigm Sports","Audie Attar","audie@paradigmsports.com","Contacted"],
["Jon Jones","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
["Ilia Topuria","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
["Derrick Lewis","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
["Dominick Cruz","","UFC","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
["Paddy Pimblett","","UFC","Intensity FM Management","Kalle Sauerland","thebaddy@intensitifm.com","Contacted"],
["Alex Caceres","","UFC","First Round Management","Jose Diaz","info@firstroundmanagement.com","Contacted"],
["Jeremy Swayman","Boston Bruins","NHL","Sports Professional Management","Lewis Gross","lewisgross@yahoo.com","Contacted"],
["Mason Lohrei","Boston Bruins","NHL","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
["Nikita Zadorov","Boston Bruins","NHL","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
["Josh Norris","Buffalo Sabres","NHL","Newport Sports","Craig Oster","coster@thehockeyagency.com","Contacted"],
["Zach Benson","Buffalo Sabres","NHL","RWG Sport Management","Ross","ross@rwgsportmanagement.com","Contacted"],
["Rasmus Andersson","Calgary Flames","NHL","4Sports Hockey","Claude Lemieux","lemieux@4sportsworld.com","Contacted"],
["Kevin Bahl","Calgary Flames","NHL","Wasserman","David Gagner","dgagner@teamwass.com","Contacted"],
["Cutter Gauthier","Anaheim Ducks","NHL","Wasserman","Kurt Overhardt","koverhardt@kosportsinc.com","Contacted"],
["Leo Carlsson","Anaheim Ducks","NHL","WIN Hockey Agency","Matt Keator","mkeator@winhockeyagency.com","Contacted"],
["Seth Jarvis","Carolina Hurricanes","NHL","The Sports Corporation","Gerry Johannson","gjohannson@tschockey.com","Contacted"],
["Lane Hutson","Montreal Canadiens","NHL","Quartexx Management","Sean Coffey","sean@quartexxmanagement.com","Contacted"],
["Dylan Guenther","Utah Mammoth","NHL","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
["Lukas Reichel","Chicago Blackhawks","NHL","RSG Hockey","Allain Roy","allain@rsghockey.com","Contacted"],
["Zach Hyman","Edmonton Oilers","NHL","Raze Sports","Todd Reynolds","toddr@razesports.com","Contacted"],
["Mavrik Bourque","Edmonton Oilers","NHL","Meridian Hockey","Dominic DeBlois","dominic@meridianhockey.com","Contacted"],
["Mitch Marner","Toronto Maple Leafs","NHL","Quartexx Management","Darren Ferris","darren@quartexxmanagement.com","Contacted"],
["Oliver Ekman-Larsson","Toronto Maple Leafs","NHL","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
["Marco Rossi","Minnesota Wild","NHL","The Will Sports Group","Ian","ian@willsportsgroup.com","Contacted"],
["Nino Niederreiter","Winnipeg Jets","NHL","Rufener Hockey","Andre Rufener","andre@rufenerhockey.com","Contacted"],
["Kevin Gausman","Toronto Blue Jays","MLB","Tidal Sports Group","Brodie Scoffield","bscoffield@tidalsportsgroup.com","Contacted"],
["Paul Skenes","Pittsburgh Pirates","MLB","Independent Sports","Mark Pieper","mpieper@iseworldwide.com","Contacted"],
["Gunnar Henderson","Baltimore Orioles","MLB","The Boras Corporation","Scott Boras","sb1@borascorp.com","Contacted"],
["Jackson Merrill","San Diego Padres","MLB","KHG Sports Management","Josh","Josh@khgsports.com","Contacted"],
["Aaron Judge","New York Yankees","MLB","PSI Sports Management","David","david@psisports.com","Contacted"],
["Francisco Alvarez","New York Mets","MLB","Rimas Sports","Sharon Rodriguez","srodriguez@rimassports.com","Contacted"],
["Ketel Marte","Arizona Diamondbacks","MLB","QC Sports","Alex Cotto","alex@qcsports.com","Contacted"],
["Austin Riley","Atlanta Braves","MLB","ALIGND Sports Agency","Matt","matt@aligndsports.com","Contacted"],
["Ozzie Albies","Atlanta Braves","MLB","SportsMeter","David Meter","dmeter@aol.com","Contacted"],
["Michael Harris II","Atlanta Braves","MLB","Munger English Sports","Clarence","clarence@mungerenglish.com","Contacted"],
["Logan Webb","San Francisco Giants","MLB","ACES","Sam Levinson","sam@acesinc1.com","Contacted"],
["Tommy Edman","Los Angeles Dodgers","MLB","Weisz Sports Management","Jonathan Weisz","jonathan.weisz@weiszsports.com","Contacted"],
["Andy Pages","Los Angeles Dodgers","MLB","Prime Sports Management","Tommy Barbella","tbarbella@primesportsagency.com","Contacted"],
["Sonny Gray","St. Louis Cardinals","MLB","McKinnis Sports","Bo McKinnis","mckinnissports@comcast.net","Contacted"],
["Brendan Donovan","St. Louis Cardinals","MLB","The Bledsoe Agency","Hunter Bledsoe","hunter@bledsoeagency.com","Contacted"],
["Junior Caminero","Tampa Bay Rays","MLB","Republik Sports","Rafa","rafa@gorepublik.com","Contacted"],
["Jason Adam","Tampa Bay Rays","MLB","Warner Sports Management","Erik Johnson","ejohnson@warnersportsmanagement.com","Contacted"],
["Trey Hendrickson","Cincinnati Bengals","MLB","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
["Jackson Chourio","Milwaukee Brewers","MLB","Beverly Hills Sports Council","Cesar","csuarez@bhscglobal.com","Contacted"],
["Brooks Lee","Minnesota Twins","MLB","Apex Baseball","Adam","adamk@apexbaseball.com","Contacted"],
["Roman Anthony","Boston Red Sox","MLB","Frontline Athlete Management","Matt","matt@frontlineam.com","Contacted"],
["Zach Neto","Los Angeles Angels","MLB","EnterSports Management","Gavin","gavin@enter-sports.com","Contacted"],
];

const TODAY = new Date().toISOString().split("T")[0];
const LEAGUES = ["NFL","NBA","NHL","MLB","UFC"];
const ICONS = {NFL:"🏈",NBA:"🏀",NHL:"🏒",MLB:"⚾",UFC:"🥊"};
const STATUSES = ["Contacted","Negotiating","Proposal Sent","Closed Won","Closed Lost","Pending"];
const SCOL = {Contacted:BORD, Negotiating:TEAL, "Proposal Sent":"#B07800", "Closed Won":"#2A7A50", "Closed Lost":"#666", Pending:LGRAY};
const PCOLS = [TEAL,BORD,"#B07800","#4A6FA5","#7B4EA6","#2A7A50"];

function initAthletes() {
  return DATA.map((r,i) => ({ id:i+1, name:r[0], team:r[1], league:r[2], agency:r[3], agent:r[4], email:r[5], status:r[6], notes:"", updated:TODAY }));
}

// ── SMALL COMPONENTS ──────────────────────────────────────────────
function Badge({s}) {
  return <span style={{background:SCOL[s]||LGRAY,color:WHITE,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,fontFamily:"sans-serif",whiteSpace:"nowrap"}}>{s}</span>;
}
function Pill({league}) {
  return <span style={{background:"#f0ede4",border:`1px solid ${LGRAY}`,color:DARK,fontSize:11,padding:"1px 8px",borderRadius:20,fontFamily:"sans-serif",fontWeight:600}}>{ICONS[league]||""} {league}</span>;
}
function H({children,sub}) {
  return <div style={{marginBottom:24}}>
    <div style={{fontFamily:"Georgia,serif",color:BORD,fontSize:20,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>{children}</div>
    {sub&&<div style={{fontFamily:"sans-serif",color:LGRAY,fontSize:12,marginTop:3}}>{sub}</div>}
  </div>;
}
function Kpi({label,val,color}) {
  return <div style={{background:WHITE,borderRadius:10,padding:"18px 22px",borderTop:`3px solid ${color||TEAL}`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
    <div style={{fontFamily:"sans-serif",fontSize:10,color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{label}</div>
    <div style={{fontFamily:"Georgia,serif",fontSize:34,fontWeight:700,color:color||TEAL,lineHeight:1}}>{val}</div>
  </div>;
}

// ── SIDE PANEL ────────────────────────────────────────────────────
function Panel({a, onClose, onSave}) {
  const [st, setSt] = useState(a.status);
  const [notes, setNotes] = useState(a.notes);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const save = () => onSave(a.id, {status:st, notes, updated:TODAY});

  const gen = async () => {
    setLoading(true); setEmail("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,
          messages:[{role:"user",content:`You are a brand partnership manager at ATLAUA — God of Water, a premium sports lifestyle brand (electrolyzed water + CBD recovery drink). Write a short warm first-contact email to ${a.agent} at ${a.agency}, representing ${a.name} (${a.team||"independent"}, ${a.league}). Propose a brand ambassador partnership. Tone: bold, luxurious, motivating. Include subject line. Max 120 words.`}]})
      });
      const d = await res.json();
      setEmail(d.content?.[0]?.text || "Error generating email.");
    } catch { setEmail("Connection error. Check API key."); }
    setLoading(false);
  };

  return <>
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.3)",zIndex:99}} />
    <div style={{position:"fixed",top:0,right:0,width:420,height:"100vh",background:WHITE,zIndex:100,display:"flex",flexDirection:"column",boxShadow:"-6px 0 30px rgba(0,0,0,0.12)",overflowY:"auto"}}>
      <div style={{background:BEIGE,padding:"24px 24px 20px",borderBottom:`1px solid #e8e0cc`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontFamily:"Georgia,serif",color:BORD,fontSize:20,fontWeight:700,marginBottom:8}}>{a.name}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill league={a.league}/>{a.team&&<span style={{background:WHITE,border:`1px solid ${LGRAY}`,color:DARK,fontSize:11,padding:"1px 8px",borderRadius:20,fontFamily:"sans-serif"}}>{a.team}</span>}<Badge s={st}/></div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:24,cursor:"pointer",color:LGRAY,lineHeight:1}}>×</button>
        </div>
      </div>
      <div style={{padding:24,flex:1}}>
        <div style={{background:BEIGE,borderRadius:8,padding:"14px 16px",marginBottom:20}}>
          <div style={{fontSize:10,fontFamily:"sans-serif",color:LGRAY,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Agency</div>
          <div style={{fontFamily:"Georgia,serif",color:TEAL,fontWeight:700,fontSize:15}}>{a.agency}</div>
          <div style={{fontFamily:"sans-serif",color:DARK,fontSize:13,marginTop:3}}>{a.agent}</div>
          {a.email&&<a href={`mailto:${a.email}`} style={{color:TEAL,fontSize:12,fontFamily:"sans-serif",textDecoration:"none",display:"block",marginTop:6}}>✉ {a.email}</a>}
        </div>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>Status</label>
          <select value={st} onChange={e=>setSt(e.target.value)} style={{width:"100%",padding:"9px 12px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:14,background:BEIGE}}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Add notes..." style={{width:"100%",padding:"9px 12px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:13,background:BEIGE,resize:"vertical",boxSizing:"border-box"}}/>
        </div>
        <button onClick={save} style={{width:"100%",background:TEAL,color:WHITE,border:"none",borderRadius:6,padding:"10px",fontFamily:"sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:24}}>Save Changes</button>
        <div style={{borderTop:`1px solid #e8e0cc`,paddingTop:20}}>
          <div style={{fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>AI Outreach Email</div>
          <button onClick={gen} disabled={loading} style={{width:"100%",background:loading?"#ccc":BORD,color:WHITE,border:"none",borderRadius:6,padding:"10px",fontFamily:"sans-serif",fontWeight:700,fontSize:14,cursor:loading?"not-allowed":"pointer",marginBottom:12}}>
            {loading?"Generating…":"✉ Draft Outreach Email"}
          </button>
          {email&&<div style={{background:BEIGE,border:`1px solid #e8e0cc`,borderRadius:8,padding:16}}>
            <pre style={{whiteSpace:"pre-wrap",margin:0,fontFamily:"sans-serif",fontSize:13,color:DARK,lineHeight:1.65}}>{email}</pre>
            <button onClick={()=>{navigator.clipboard.writeText(email);setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{marginTop:10,background:TEAL,color:WHITE,border:"none",borderRadius:4,padding:"5px 14px",cursor:"pointer",fontSize:12,fontFamily:"sans-serif"}}>
              {copied?"✓ Copied":"Copy"}
            </button>
          </div>}
        </div>
        <div style={{marginTop:16,fontSize:10,color:LGRAY,fontFamily:"sans-serif"}}>Last updated: {a.updated}</div>
      </div>
    </div>
  </>;
}

// ── ADD MODAL ─────────────────────────────────────────────────────
function AddModal({athletes, onClose, onAdd}) {
  const [tab,setTab]=useState("athlete");
  const [af,setAf]=useState({name:"",team:"",league:"NFL",agency:"",agent:"",email:"",status:"Contacted"});
  const [cf,setCf]=useState({name:"",company:"",category:"Distributor",email:"",phone:""});
  const [sug,setSug]=useState([]);
  const agencies=useMemo(()=>[...new Set(athletes.map(a=>a.agency).filter(Boolean))].sort(),[athletes]);
  const inp={width:"100%",padding:"9px 12px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:14,background:BEIGE,boxSizing:"border-box"};
  const lbl={display:"block",fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:5};
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:WHITE,borderRadius:12,width:460,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 16px 60px rgba(0,0,0,0.2)"}}>
      <div style={{padding:"22px 26px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"Georgia,serif",color:BORD,fontSize:18,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Add New</div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:LGRAY}}>×</button>
      </div>
      <div style={{display:"flex",margin:"16px 26px 0",borderBottom:`1px solid #e8e0cc`}}>
        {["athlete","contact"].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px 0",border:"none",background:"none",cursor:"pointer",fontFamily:"sans-serif",fontWeight:tab===t?700:400,color:tab===t?TEAL:LGRAY,borderBottom:`2px solid ${tab===t?TEAL:"transparent"}`,fontSize:14}}>{t==="athlete"?"Athlete":"Other Contact"}</button>)}
      </div>
      <div style={{padding:"20px 26px 26px"}}>
        {tab==="athlete"?<div style={{display:"flex",flexDirection:"column",gap:13}}>
          {[["name","Name *"],["team","Team"],["agent","Agent Name"],["email","Email"]].map(([k,l])=><div key={k}><label style={lbl}>{l}</label><input value={af[k]} onChange={e=>setAf(f=>({...f,[k]:e.target.value}))} style={inp}/></div>)}
          <div style={{position:"relative"}}>
            <label style={lbl}>Agency</label>
            <input value={af.agency} onChange={e=>{setAf(f=>({...f,agency:e.target.value}));setSug(e.target.value.length>1?agencies.filter(a=>a.toLowerCase().includes(e.target.value.toLowerCase())).slice(0,5):[])}} style={inp} placeholder="Type to search…"/>
            {sug.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:WHITE,border:`1.5px solid ${LGRAY}`,borderRadius:6,zIndex:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>
              {sug.map(a=><div key={a} onClick={()=>{setAf(f=>({...f,agency:a}));setSug([])}} style={{padding:"8px 12px",cursor:"pointer",fontFamily:"sans-serif",fontSize:13}} onMouseEnter={e=>e.target.style.background=BEIGE} onMouseLeave={e=>e.target.style.background=WHITE}>{a}</div>)}
            </div>}
          </div>
          <div><label style={lbl}>League</label><select value={af.league} onChange={e=>setAf(f=>({...f,league:e.target.value}))} style={inp}>{LEAGUES.map(l=><option key={l}>{l}</option>)}</select></div>
          <div><label style={lbl}>Status</label><select value={af.status} onChange={e=>setAf(f=>({...f,status:e.target.value}))} style={inp}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
          <button onClick={()=>{if(!af.name)return;onAdd({...af,id:Date.now(),notes:"",updated:TODAY});onClose()}} style={{background:TEAL,color:WHITE,border:"none",borderRadius:6,padding:"10px",fontFamily:"sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>Add Athlete</button>
        </div>:<div style={{display:"flex",flexDirection:"column",gap:13}}>
          {[["name","Name *"],["company","Company"],["email","Email"],["phone","Phone"]].map(([k,l])=><div key={k}><label style={lbl}>{l}</label><input value={cf[k]} onChange={e=>setCf(f=>({...f,[k]:e.target.value}))} style={inp}/></div>)}
          <div><label style={lbl}>Category</label><select value={cf.category} onChange={e=>setCf(f=>({...f,category:e.target.value}))} style={inp}>{["Distributor","Brand","Media","Partner","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
          <button onClick={()=>{if(!cf.name)return;onAdd({...cf,id:Date.now(),updated:TODAY},"contact");onClose()}} style={{background:TEAL,color:WHITE,border:"none",borderRadius:6,padding:"10px",fontFamily:"sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>Add Contact</button>
        </div>}
      </div>
    </div>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({athletes}) {
  const byLeague=useMemo(()=>LEAGUES.map(l=>({name:l,value:athletes.filter(a=>a.league===l).length})).filter(x=>x.value>0),[athletes]);
  const bySt=useMemo(()=>STATUSES.map(s=>({name:s,value:athletes.filter(a=>a.status===s).length})).filter(x=>x.value>0),[athletes]);
  const topAg=useMemo(()=>{const m={};athletes.forEach(a=>{if(a.agency)m[a.agency]=(m[a.agency]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,value])=>({name:name.length>22?name.slice(0,22)+"…":name,value}));},[athletes]);
  const agCount=useMemo(()=>new Set(athletes.map(a=>a.agency).filter(Boolean)).size,[athletes]);
  return <div>
    <H sub={`${athletes.length} athletes · ${agCount} agencies`}>Overview</H>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
      <Kpi label="Total Athletes" val={athletes.length} color={TEAL}/>
      <Kpi label="Agencies" val={agCount} color={BORD}/>
      <Kpi label="Negotiating" val={athletes.filter(a=>a.status==="Negotiating").length} color="#B07800"/>
      <Kpi label="Closed Won" val={athletes.filter(a=>a.status==="Closed Won").length} color="#2A7A50"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
      <div style={{background:WHITE,borderRadius:10,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Athletes by League</div>
        <ResponsiveContainer width="100%" height={190}><PieChart><Pie data={byLeague} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={28} paddingAngle={3}>{byLeague.map((e,i)=><Cell key={i} fill={PCOLS[i%PCOLS.length]}/>)}</Pie><Tooltip/><Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11,fontFamily:"sans-serif"}}/></PieChart></ResponsiveContainer>
      </div>
      <div style={{background:WHITE,borderRadius:10,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Pipeline Status</div>
        <ResponsiveContainer width="100%" height={190}><BarChart data={bySt} layout="vertical" margin={{left:8,right:16}}><XAxis type="number" tick={{fontSize:10}} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="name" width={100} tick={{fontSize:11,fontFamily:"sans-serif"}} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="value" fill={TEAL} radius={[0,4,4,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>
    <div style={{background:WHITE,borderRadius:10,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",marginBottom:18}}>
      <div style={{fontSize:10,fontFamily:"sans-serif",color:BORD,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Top Agencies</div>
      <ResponsiveContainer width="100%" height={190}><BarChart data={topAg} margin={{bottom:40,left:8,right:8}}><XAxis dataKey="name" tick={{fontSize:10,angle:-25,textAnchor:"end"}} interval={0} height={55} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10}} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="value" fill={BORD} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
    </div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      {LEAGUES.map(l=><div key={l} style={{background:WHITE,borderRadius:8,padding:"12px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:20}}>{ICONS[l]}</span>
        <div><div style={{fontSize:9,fontFamily:"sans-serif",color:LGRAY,letterSpacing:2,textTransform:"uppercase"}}>{l}</div><div style={{fontFamily:"Georgia,serif",fontSize:22,color:TEAL,fontWeight:700}}>{athletes.filter(a=>a.league===l).length}</div></div>
      </div>)}
    </div>
  </div>;
}

// ── ATHLETES ──────────────────────────────────────────────────────
function Athletes({athletes,onSelect}) {
  const [q,setQ]=useState(""); const [dq,setDq]=useState(""); const [fL,setFL]=useState(""); const [fS,setFS]=useState(""); const [pg,setPg]=useState(0);
  const PER=50; const ref=useRef();
  useEffect(()=>{clearTimeout(ref.current);ref.current=setTimeout(()=>setDq(q),150);},[q]);
  const filtered=useMemo(()=>{const lq=dq.toLowerCase();return athletes.filter(a=>(!lq||[a.name,a.agent,a.agency,a.team].some(v=>v.toLowerCase().includes(lq)))&&(!fL||a.league===fL)&&(!fS||a.status===fS));},[athletes,dq,fL,fS]);
  const paged=filtered.slice(pg*PER,(pg+1)*PER);
  const pages=Math.ceil(filtered.length/PER);
  const sel={padding:"8px 12px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:13,background:WHITE};
  const exportIt=()=>{const rows=[["Name","Team","League","Agency","Agent","Email","Status","Updated"],...filtered.map(a=>[a.name,a.team,a.league,a.agency,a.agent,a.email,a.status,a.updated])];const b=new Blob([rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n")],{type:"text/csv"});const x=document.createElement("a");x.href=URL.createObjectURL(b);x.download=`atlaua-athletes-${TODAY}.csv`;x.click();};
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <H sub={`${filtered.length} of ${athletes.length} athletes`}>Athletes</H>
      <button onClick={exportIt} style={{background:"none",border:`1.5px solid ${BORD}`,color:BORD,borderRadius:6,padding:"7px 16px",cursor:"pointer",fontFamily:"sans-serif",fontWeight:700,fontSize:13}}>↓ Export CSV</button>
    </div>
    <div style={{background:WHITE,borderRadius:10,padding:"14px 18px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",marginBottom:18,display:"flex",gap:10,flexWrap:"wrap"}}>
      <input value={q} onChange={e=>{setQ(e.target.value);setPg(0)}} placeholder="Search name, agent, agency, team…" style={{flex:"2 1 200px",padding:"9px 14px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:14,background:BEIGE}}/>
      <select value={fL} onChange={e=>{setFL(e.target.value);setPg(0)}} style={sel}><option value="">All Leagues</option>{LEAGUES.map(l=><option key={l}>{l}</option>)}</select>
      <select value={fS} onChange={e=>{setFS(e.target.value);setPg(0)}} style={sel}><option value="">All Statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
    </div>
    <div style={{background:WHITE,borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:BEIGE,borderBottom:`2px solid #e8e0cc`}}>
            {["Athlete","League","Team","Agency","Agent","Status","Updated"].map(h=><th key={h} style={{padding:"11px 15px",textAlign:"left",fontFamily:"sans-serif",fontSize:10,color:BORD,letterSpacing:2,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>{paged.map((a,i)=><tr key={a.id} onClick={()=>onSelect(a)} style={{background:i%2===0?WHITE:"#FDFAF3",cursor:"pointer",borderBottom:`1px solid #f0ede4`,transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background="#EEF9F9"} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?WHITE:"#FDFAF3"}>
            <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontWeight:700,color:DARK,whiteSpace:"nowrap"}}>{a.name}</td>
            <td style={{padding:"10px 15px"}}><Pill league={a.league}/></td>
            <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:13,color:DARK}}>{a.team||"—"}</td>
            <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:13,color:DARK,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.agency}</td>
            <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:13,color:LGRAY,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.agent}</td>
            <td style={{padding:"10px 15px"}}><Badge s={a.status}/></td>
            <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:11,color:LGRAY}}>{a.updated}</td>
          </tr>)}</tbody>
        </table>
      </div>
      {pages>1&&<div style={{padding:"12px 16px",borderTop:`1px solid #e8e0cc`,display:"flex",gap:6,justifyContent:"center",background:BEIGE}}>
        {Array.from({length:pages},(_,i)=><button key={i} onClick={()=>setPg(i)} style={{width:30,height:30,borderRadius:6,border:`1.5px solid ${pg===i?TEAL:LGRAY}`,background:pg===i?TEAL:WHITE,color:pg===i?WHITE:DARK,cursor:"pointer",fontFamily:"sans-serif",fontSize:13}}>{i+1}</button>)}
      </div>}
    </div>
  </div>;
}

// ── AGENCIES ──────────────────────────────────────────────────────
function Agencies({athletes,onSelect}) {
  const [q,setQ]=useState(""); const [sort,setSort]=useState("count"); const [exp,setExp]=useState(null);
  const data=useMemo(()=>{
    const m={};athletes.forEach(a=>{if(!a.agency)return;if(!m[a.agency])m[a.agency]={name:a.agency,athletes:[],agents:new Set(),leagues:new Set()};m[a.agency].athletes.push(a);m[a.agency].agents.add(a.agent);m[a.agency].leagues.add(a.league);});
    let list=Object.values(m).map(x=>({...x,agents:[...x.agents],leagues:[...x.leagues]}));
    if(q)list=list.filter(x=>x.name.toLowerCase().includes(q.toLowerCase()));
    return sort==="az"?list.sort((a,b)=>a.name.localeCompare(b.name)):list.sort((a,b)=>b.athletes.length-a.athletes.length);
  },[athletes,q,sort]);
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <H sub={`${data.length} agencies`}>Agencies</H>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"8px 12px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:13,background:WHITE}}>
        <option value="count">Most Athletes</option><option value="az">A – Z</option>
      </select>
    </div>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search agencies…" style={{width:"100%",padding:"9px 14px",borderRadius:6,border:`1.5px solid ${LGRAY}`,fontFamily:"sans-serif",fontSize:14,background:WHITE,marginBottom:18,boxSizing:"border-box"}}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
      {data.map(ag=><div key={ag.name} style={{background:WHITE,borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",borderTop:`3px solid ${TEAL}`}}>
        <div style={{padding:"16px 18px"}}>
          <div style={{fontFamily:"Georgia,serif",color:BORD,fontSize:13,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4,lineHeight:1.3}}>{ag.name}</div>
          <div style={{fontFamily:"Georgia,serif",color:TEAL,fontSize:30,fontWeight:700,lineHeight:1,marginBottom:8}}>{ag.athletes.length}</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{ag.leagues.map(l=><Pill key={l} league={l}/>)}</div>
          <div style={{fontFamily:"sans-serif",fontSize:12,color:LGRAY,marginBottom:12,lineHeight:1.4}}>{ag.agents.slice(0,2).join(" · ")}{ag.agents.length>2?` +${ag.agents.length-2} more`:""}</div>
          <button onClick={()=>setExp(exp===ag.name?null:ag.name)} style={{width:"100%",background:"none",border:`1.5px solid ${TEAL}`,color:TEAL,borderRadius:6,padding:"6px 0",cursor:"pointer",fontFamily:"sans-serif",fontWeight:700,fontSize:12}}>
            {exp===ag.name?"Hide Roster ▲":"View Roster ▼"}
          </button>
        </div>
        {exp===ag.name&&<div style={{borderTop:`1px solid #e8e0cc`,maxHeight:200,overflowY:"auto",background:BEIGE}}>
          {ag.athletes.map(a=><div key={a.id} onClick={()=>onSelect(a)} style={{padding:"8px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:`1px solid #f0ede4`,transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background="#EEF9F9"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontFamily:"sans-serif",fontSize:13,color:DARK,fontWeight:600}}>{ICONS[a.league]||""} {a.name}</span>
            <Badge s={a.status}/>
          </div>)}
        </div>}
      </div>)}
    </div>
  </div>;
}

// ── TEAMS ─────────────────────────────────────────────────────────
function Teams({athletes,onSelect}) {
  const [lg,setLg]=useState("NFL"); const [open,setOpen]=useState(null);
  const data=useMemo(()=>{const m={};athletes.filter(a=>a.league===lg).forEach(a=>{const t=a.team||"Independent";if(!m[t])m[t]=[];m[t].push(a);});return Object.entries(m).sort((a,b)=>b[1].length-a[1].length);},[athletes,lg]);
  return <div>
    <H sub="Browse by team">Teams</H>
    <div style={{display:"flex",gap:8,marginBottom:22,flexWrap:"wrap"}}>
      {LEAGUES.map(l=><button key={l} onClick={()=>{setLg(l);setOpen(null)}} style={{padding:"7px 18px",borderRadius:20,border:`1.5px solid ${l===lg?TEAL:LGRAY}`,background:l===lg?TEAL:"transparent",color:l===lg?WHITE:DARK,cursor:"pointer",fontFamily:"sans-serif",fontWeight:l===lg?700:400,fontSize:14,transition:"all 0.15s"}}>{ICONS[l]} {l}</button>)}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {data.map(([team,aths])=><div key={team} style={{background:WHITE,borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div onClick={()=>setOpen(open===team?null:team)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:open===team?BEIGE:WHITE,transition:"background 0.15s"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:"Georgia,serif",color:BORD,fontWeight:700,letterSpacing:1}}>{team}</span>
            <span style={{fontFamily:"sans-serif",fontSize:12,color:LGRAY}}>{aths.length} athletes</span>
          </div>
          <span style={{color:TEAL,fontSize:13}}>{open===team?"▲":"▼"}</span>
        </div>
        {open===team&&<div style={{borderTop:`1px solid #e8e0cc`}}>
          <div style={{padding:"8px 18px 10px",display:"flex",gap:12,flexWrap:"wrap"}}>
            {STATUSES.map(s=>{const n=aths.filter(a=>a.status===s).length;return n>0?<span key={s} style={{fontFamily:"sans-serif",fontSize:11,color:LGRAY}}>{s}: <strong style={{color:DARK}}>{n}</strong></span>:null})}
          </div>
          {aths.map(a=><div key={a.id} onClick={()=>onSelect(a)} style={{padding:"9px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:`1px solid #f0ede4`,transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background=BEIGE} onMouseLeave={e=>e.currentTarget.style.background=WHITE}>
            <span style={{fontFamily:"sans-serif",fontSize:14,color:DARK,fontWeight:600}}>{a.name}</span>
            <Badge s={a.status}/>
          </div>)}
        </div>}
      </div>)}
    </div>
  </div>;
}

// ── PIPELINE ──────────────────────────────────────────────────────
const PCOL_LIST=["Contacted","Negotiating","Proposal Sent","Closed Won","Closed Lost"];
const PACC={Contacted:BORD,Negotiating:TEAL,"Proposal Sent":"#B07800","Closed Won":"#2A7A50","Closed Lost":"#666"};

function Pipeline({athletes,onUpdate,onSelect}) {
  const [drag,setDrag]=useState(null); const [over,setOver]=useState(null);
  const grouped=useMemo(()=>{const m={};PCOL_LIST.forEach(c=>m[c]=[]);athletes.forEach(a=>{const c=PCOL_LIST.includes(a.status)?a.status:"Contacted";m[c].push(a);});return m;},[athletes]);
  return <div>
    <H sub="Drag cards to update status">Pipeline</H>
    <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:16,alignItems:"flex-start"}}>
      {PCOL_LIST.map(col=><div key={col} onDragOver={e=>{e.preventDefault();setOver(col)}} onDrop={()=>{if(drag&&drag.status!==col)onUpdate(drag.id,{status:col,updated:TODAY});setDrag(null);setOver(null)}}
        style={{minWidth:200,flex:"0 0 200px",background:over===col?"rgba(4,189,183,0.05)":BEIGE,borderRadius:10,padding:12,border:`2px solid ${over===col?TEAL:"#e8e0cc"}`,transition:"all 0.15s"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,paddingBottom:8,borderBottom:`2px solid ${PACC[col]}`}}>
          <span style={{fontFamily:"sans-serif",fontSize:10,color:DARK,textTransform:"uppercase",letterSpacing:2,fontWeight:700}}>{col}</span>
          <span style={{background:PACC[col],color:WHITE,borderRadius:12,padding:"1px 8px",fontSize:11,fontFamily:"sans-serif",fontWeight:700}}>{(grouped[col]||[]).length}</span>
        </div>
        {(grouped[col]||[]).map(a=><div key={a.id} draggable onDragStart={()=>setDrag(a)} onDragEnd={()=>{setDrag(null);setOver(null)}} onClick={()=>onSelect(a)}
          style={{background:WHITE,borderRadius:7,padding:"10px 12px",marginBottom:7,borderLeft:`3px solid ${PACC[col]}`,cursor:"grab",boxShadow:"0 1px 4px rgba(0,0,0,0.07)",opacity:drag?.id===a.id?0.4:1,transition:"opacity 0.1s"}}>
          <div style={{fontFamily:"sans-serif",fontWeight:700,fontSize:13,color:DARK,marginBottom:2}}>{ICONS[a.league]||""} {a.name}</div>
          <div style={{fontFamily:"sans-serif",fontSize:11,color:LGRAY,lineHeight:1.3}}>{a.agency.length>28?a.agency.slice(0,28)+"…":a.agency}</div>
          {a.team&&<div style={{fontFamily:"sans-serif",fontSize:10,color:TEAL,marginTop:3}}>{a.team}</div>}
        </div>)}
      </div>)}
    </div>
  </div>;
}

// ── CONTACTS ──────────────────────────────────────────────────────
function Contacts({contacts}) {
  const CC={Distributor:TEAL,Brand:BORD,Media:DARK,Partner:"#4A6FA5",Other:LGRAY};
  return <div>
    <H sub="Distributors, brands, media, partners">Contacts</H>
    {!contacts.length?<div style={{background:WHITE,borderRadius:10,padding:60,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
      <div style={{fontSize:40,marginBottom:12}}>📋</div>
      <div style={{fontFamily:"Georgia,serif",color:BORD,fontSize:16,letterSpacing:2,marginBottom:8}}>NO CONTACTS YET</div>
      <div style={{fontFamily:"sans-serif",color:LGRAY,fontSize:14}}>Use the + button below to add distributors, brands, media, and partners.</div>
    </div>:<div style={{background:WHITE,borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:BEIGE}}>
          {["Name","Company","Category","Email","Phone","Added"].map(h=><th key={h} style={{padding:"11px 15px",textAlign:"left",fontFamily:"sans-serif",fontSize:10,color:BORD,letterSpacing:2,textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>{contacts.map((c,i)=><tr key={c.id} style={{background:i%2===0?WHITE:"#FDFAF3",borderBottom:`1px solid #f0ede4`}}>
          <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontWeight:700,color:DARK}}>{c.name}</td>
          <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:13,color:DARK}}>{c.company}</td>
          <td style={{padding:"10px 15px"}}><span style={{background:CC[c.category]||LGRAY,color:WHITE,fontSize:10,padding:"2px 10px",borderRadius:20,fontFamily:"sans-serif"}}>{c.category}</span></td>
          <td style={{padding:"10px 15px"}}><a href={`mailto:${c.email}`} style={{color:TEAL,fontFamily:"sans-serif",fontSize:13,textDecoration:"none"}}>{c.email}</a></td>
          <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:13,color:DARK}}>{c.phone}</td>
          <td style={{padding:"10px 15px",fontFamily:"sans-serif",fontSize:11,color:LGRAY}}>{c.updated}</td>
        </tr>)}</tbody>
      </table>
    </div>}
  </div>;
}

// ── SHELL ─────────────────────────────────────────────────────────
const NAV=[{id:"Dashboard",ic:"◈"},{id:"Athletes",ic:"◉"},{id:"Agencies",ic:"◎"},{id:"Teams",ic:"◍"},{id:"Pipeline",ic:"▤"},{id:"Contacts",ic:"◫"}];

export default function App() {
  const [athletes,setAthletes]=useState(initAthletes);
  const [contacts,setContacts]=useState([]);
  const [page,setPage]=useState("Dashboard");
  const [sel,setSel]=useState(null);
  const [showAdd,setShowAdd]=useState(false);

  const upd=useCallback((id,u)=>{
    setAthletes(p=>p.map(a=>a.id===id?{...a,...u}:a));
    setSel(p=>p?.id===id?{...p,...u}:p);
  },[]);

  const addNew=(item,type)=>{
    if(type==="contact") setContacts(p=>[...p,item]);
    else setAthletes(p=>[...p,item]);
  };

  return (
    <div style={{display:"flex",height:"100vh",background:BEIGE,overflow:"hidden",fontFamily:"sans-serif"}}>
      {/* SIDEBAR */}
      <aside style={{width:218,background:WHITE,borderRight:`1px solid #e8e0cc`,display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"2px 0 10px rgba(0,0,0,0.04)"}}>
        <div style={{padding:"26px 22px 22px",borderBottom:`1px solid #e8e0cc`}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,letterSpacing:3,color:BORD,fontSize:15,lineHeight:1}}>ATLAUA</div>
          <div style={{fontFamily:"sans-serif",color:TEAL,fontSize:9,letterSpacing:3,marginTop:5,textTransform:"uppercase"}}>GOD OF WATER</div>
          <div style={{marginTop:12,height:1,background:`linear-gradient(to right,${TEAL},transparent)`}}/>
        </div>
        <nav style={{flex:1,padding:"10px 10px"}}>
          {NAV.map(({id,ic})=>{
            const on=page===id;
            return <div key={id} onClick={()=>setPage(id)} style={{display:"flex",alignItems:"center",gap:9,padding:"10px 11px",borderRadius:7,cursor:"pointer",marginBottom:2,background:on?"rgba(4,189,183,0.1)":"transparent",transition:"all 0.15s"}} onMouseEnter={e=>{if(!on)e.currentTarget.style.background="rgba(4,189,183,0.05)"}} onMouseLeave={e=>{if(!on)e.currentTarget.style.background="transparent"}}>
              <span style={{fontSize:13,color:on?TEAL:LGRAY}}>{ic}</span>
              <span style={{fontFamily:"sans-serif",fontSize:14,fontWeight:on?700:400,color:on?TEAL:BORD}}>{id}</span>
              {on&&<div style={{marginLeft:"auto",width:3,height:14,background:TEAL,borderRadius:2}}/>}
            </div>;
          })}
        </nav>
        <div style={{padding:"14px 22px",borderTop:`1px solid #e8e0cc`}}>
          <div style={{fontFamily:"sans-serif",fontSize:9,color:LGRAY,letterSpacing:2,textTransform:"uppercase"}}>{athletes.length} Athletes</div>
          <div style={{fontFamily:"sans-serif",fontSize:9,color:LGRAY,letterSpacing:2,textTransform:"uppercase",marginTop:2}}>{new Set(athletes.map(a=>a.agency).filter(Boolean)).size} Agencies</div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,overflowY:"auto",padding:"34px 38px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          {page==="Dashboard"&&<Dashboard athletes={athletes}/>}
          {page==="Athletes"&&<Athletes athletes={athletes} onSelect={setSel}/>}
          {page==="Agencies"&&<Agencies athletes={athletes} onSelect={setSel}/>}
          {page==="Teams"&&<Teams athletes={athletes} onSelect={setSel}/>}
          {page==="Pipeline"&&<Pipeline athletes={athletes} onUpdate={upd} onSelect={setSel}/>}
          {page==="Contacts"&&<Contacts contacts={contacts}/>}
        </div>
      </main>

      {/* FAB */}
      <button onClick={()=>setShowAdd(true)} style={{position:"fixed",bottom:30,right:30,width:52,height:52,borderRadius:"50%",background:TEAL,color:WHITE,border:"none",fontSize:28,cursor:"pointer",boxShadow:"0 4px 20px rgba(4,189,183,0.45)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:300,lineHeight:1,transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>+</button>

      {sel&&<Panel a={sel} onClose={()=>setSel(null)} onSave={upd}/>}
      {showAdd&&<AddModal athletes={athletes} onClose={()=>setShowAdd(false)} onAdd={addNew}/>}
    </div>
  );
}