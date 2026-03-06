import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line, CartesianGrid } from "recharts";

const SUPABASE_URL = "https://iwkfribpdpaeglaogxkx.supabase.co";
const SUPABASE_KEY = "sb_publishable_3Jb6ozoasZI7Xa0In9SSEA_UZkq-IiS";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


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
  ["Frederic Brunet","","","Paraphe Sports management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
  ["Patrick O´conell","","","Steinberg sports management","cameron","cameron@steinbergsports.com","Contacted"],
  ["Devon Whitherspoon","","","CAA /elite one sports management","Tory dandy , Reginald Johnson","tdandy@athletesfirst.net /reggie23125@yahoo.com","Contacted"],
  ["Seth Coleman","","","Goal line fotball","joseph behar","jbehar@goallinefootball.com","Contacted"],
  ["Connor o´toole","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com /david@aurasmg.com","Contacted"],
  ["Tyron Broden","","","Net sports management","John Hamood","johnny@netsportsmgmt.com","Contacted"],
  ["Zy Alexander","","","Equity sports","Marcus Cromartie","marcus@equity-sports.com","Contacted"],
  ["DeMarcus Lawrence","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com /david@aurasmg.com","Contacted"],
  ["Drew lock","","","CAA","Jimmy sexton / thomas condom","jsexton@caa.com/thomas.condon@caa.com","Contacted"],
  ["Kenneth Walker III","","","Sport trust advisors","Ben Setas/ Pat Dye JR","ben@sportstrust.com/pat@sportstrust.com","Contacted"],
  ["Mike morris","","","Vayner Sports","Jaymeson moten/Mike mcartney","jaymeson@vaynersports.com/mikemac@VaynerSports.com","Contacted"],
  ["Leonard williams","","","Independent sports &entretainment","Rossevelt barnes/Jovan barnes/Michelle schmidt","rbarnes@iseworldwide.com/jbarnes@iseworldwide.com/mschmidt@iseworldwide.com","Contacted"],
  ["Marshall lang","","","Dynamic Sports Group","Greg brookey","gbrookey@dynamicsportsgrp.com","Contacted"],
  ["Elijah Arroyo","","","Rosenhaun Sports Representation","Drew Rosenhaus/Shawn O'Dare/Bari Wolfman","dr@rsragency.com/sod@rsragency.com/bw@rsragency.com","Contacted"],
  ["Ty Okada","","","United Athlete Sports","Evan Brennan","evan@uasports.us","Contacted"],
  ["Tyler Hall","","","International Sports Agency","Bardia Ghahremani","bardia@isasports.com","Contacted"],
  ["Dareke Young","","","Sport trust advisors","Ben Setas/ Pat Dye JR","ben@sportstrust.com/pat@sportstrust.com","Contacted"],
  ["Federico Maranges","","","Tessler Sports Managament","Brett Tesler","tesslersports@gmail.com","Contacted"],
  ["Ricky White III","","","JL Sports Agency","Joe linta","jlinta@comcast.net","Contacted"],
  ["Ryley Mills","","","CAA","RJ Conser / thomas condom","rj.gonser@caa.com/thomas.condon@caa.com","Contacted"],
  ["D´Anthony Bell","","","Exclusive Athlete Agency","Louis Bing","Louis@ExclusiveAthletesAgency.com","Contacted"],
  ["Uchenna Nwosu","","","Rosenhaun Sports Representation","Wade White Jr/Drew Rosenhaus/Bari Wolfman","wwhite@elite300se.com/dr@rsragency.com/bw@rsragency.com","Contacted"],
  ["Amari Kight","","","Grady Sports agency","Joshua grady / Ej Gonzalez","joshua@gradysports.com/ej@gradymediaconnect.com","Contacted"],
  ["Ernest Jones I","","","Agency 1 Athlete Management Group","Ira Turner/Ron Butler/Stanley Bien-Aime","iraturner@amglsports.com","Contacted"],
  ["Christian Haynes","","","Ace PR","Alejandra Cristina Ayalde","alejandra@acepr.net","Contacted"],
  ["Drake Thomas","","","MGC Sports","James courie","jcourie@mgclaw.com","Contacted"],
  ["Derick Hall","","","National Sports Agency","Harold Lewis/Ezra Thompson/Chad Berger","haroldclewis@cs.com/ezra.thompson@nsafootball.com/chad.berger@nsafootball.com","Contacted"],
  ["Steven Sims","","","MS World llc","Kennard MCguire","kmcguire@msworldllc.com","Contacted"],
  ["Jr Singleton","","","NT ATHLETICS","Amir","amir@konicekdillonlaw.com","Contacted"],
  ["Jaxon Smith","","","WME","Joel Segal/Ben Renzin/Geoff Garmhausen","jsegal@wmeagency.com/brenzin@wmeagency.com/ggarmhausen@wmeagency.com","Contacted"],
  ["Olusegun","","","1 of 1 Agency","Andy and Joe","andy@1of1agency.com/Joe@1of1Agency.com","Contacted"],
  ["D´Eryk","","","Apex Sports Group","Matthey Pope","popematthewj@gmail.com","Contacted"],
  ["Boye Mafe","","","Vayner Sports","Mike","mikemac@VaynerSports.com","Contacted"],
  ["Jamie Sheriff","","","Play2 win sports","Markeeth","markeeth@p2wsports.com","Contacted"],
  ["Jarran Reed","","","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
  ["Jacardia Wright","","","Top Line Sports Agency","Ty Schwab","tyschwab10@gmail.com","Contacted"],
  ["Jason myers","","","International Sports Advisors","Brook Henderson","brooks@isafootball.com","Contacted"],
  ["Zach Charbonnet","","","Vayner Sports","Mike and Dave","dave@vaynersports.com/mikemac@VaynerSports.com","Contacted"],
  ["Jake Bobo","","","Wasserman","Steve","steve.caric@teamwass.com","Contacted"],
  ["Nick Kallerup","","","3XL Sports Management","Nate Richman","nrichman@3XLsports.com","Contacted"],
  ["George Holani","","","Disruptive","Henry /Alexander","henry@disruptivesports.com/bigal@disruptivesports.com","Contacted"],
  ["Johnathan Hankins","","","Wasserman","Doug Hendrickson/CJ Laboy/James Barry","dhendrickson@teamwass.com/claboy@teamwass.com/jmbarry@teamwass.com","Contacted"],
  ["Jalen Sundelt","","","One West Sports","Christopher","chrisg@onewestsports.com","Contacted"],
  ["Anthony Bradford","","","AthElite Agency","Neil and Marlon","trey@atheliteagency.com/marlon@atheliteagency.com","Contacted"],
  ["Robbie Ouzt","","","Younger & Associates","Timothy Younger","tmy@youngerassociates.net","Contacted"],
  ["Nick EmmanWorice","","","Athletes First","Trevon & David","stsmith@athletesfirst.net/dmulugheta@athletesfirst.net","Contacted"],
  ["Grey Zabel","","","Excel Sports Management","Chase & Ryan","callahan@excelsm.com/rtollner@excelsm.com","Contacted"],
  ["Jalen Milroe","","","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
  ["Brandon Pili","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com / david@aurasmg.com","Contacted"],
  ["Tariq Woolen","","","Sport Stars","Jason & Evan","Jchayut@sportstarsnyc.com /elippmann@sportstarsnyc.com","Contacted"],
  ["Charles Cross","","","Klutch Sports Group","Kelton /Nicole/Saint","kelton.crenshaw@gmail.com/nlynn@klutchgroup.com/saint@klutchgroup.com","Contacted"],
  ["Bryce Cabeldue","","","Sport Stars","Ron Slavin","rslavin@liftsm.com","Contacted"],
  ["Wesley Steiner","","","Tony Rodgers","Tony Rodger","rogers.tony@hotmail.com","Contacted"],
  ["Brady Rusell","","","United Athlete Sports","Evan & chris","evan@uasports.us / chris@uasports.us","Contacted"],
  ["Malaesala Aumavae","","","Independent sports &entretainment","Roosevelt & Jovan","rbarnes@iseworldwide.com/jbarnes@iseworldwide.com","Contacted"],
  ["Jalan Gaines","","","NA3 Sports","James Durkin","durkin28@aol.com","Contacted"],
  ["Isas Waxter","","","Octagon","Casey Muir","casey.muir@octagon.com","Contacted"],
  ["Byron Murphy","","","Sport Stars","Luke","lukemcmurtrey@gmail.com","Contacted"],
  ["Damien Martniez","","","First Round Management","Malki & Shawn","malki007@aol.com /shawno@firstroundmanagement.com","Contacted"],
  ["Jaylen Waddle","","","GSE Worldwide","Ian Grutman","lgrutman@gseworldwide.com","Contacted"],
  ["De´Von Achane","","","Roc Nation","Leah Knight","lknight@rocnation.com","Contacted"],
  ["Jordyn brooks","","","Roc Nation","Erik Burkhardt","eb@rocnation.com","Contacted"],
  ["Minkah Fitzpatrick","","","Ripple Sports","Bijan Heravi","bijan@ripplesports.com","Contacted"],
  ["Kenneth Grant","","","Ace PR","Alejandra Cristina Ayalde","alejandra@acepr.net","Contacted"],
  ["Darren Waller","","","Rosenhaus Sports Representation","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Liam Eichenberg","","","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Rasul Douglas","","","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Jake Bailey","","","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Caleb Johnson","","","AJAX Sports Agency","Alex Campbell","alex@ajaxsportsagency.com","Contacted"],
  ["Andre Cisco","","","Athletes First","David Mulugheta","dmulugheta@athletesfirst.net","Contacted"],
  ["Irvin Charles","","","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
  ["Isaiah Davis","","","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
  ["Gus Hartwig","","","Exclusive Sports Group","Buddy Baker","baker@exclusivesg.com","Contacted"],
  ["Olu Fashanun","","","CAA","Patrick Collins","patrick.collins@caa.com","Contacted"],
  ["Kingsley Jonathan","","","3XL Sports Management","Nate Richman","nrichman@3xlsports.com","Contacted"],
  ["Kiko Mauigoa","","","Younger & Associates","Timothy Younger","tmy@youngerassociates.net","Contacted"],
  ["Jay Tufele","","","Athletes First","Ryan Williams","rwilliams@athletesfirst.net","Contacted"],
  ["Azareye'h Thomas","","","Athletes First","Todd France","tfrance@athletesfirst.net","Contacted"],
  ["Mykal Walker","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Aaron Brewer","","","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Xavier Thomas","","","IFA (The Institute for Athletes)","Blake Baratz","blake@teamifa.com","Contacted"],
  ["Bilal Nichols","","","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Jonah Williams","","","Excel Sports Management","Ryan Tollner","rtollner@excelsm.com","Contacted"],
  ["Travis Vokolek","","","Legend Agency","Pat Capra","Pat@LegendAgency.net","Contacted"],
  ["Josiah Degura","","","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
  ["Calais Campbell","","","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Josh Fryar","","","SportStars","Justin Faires","jfaires3@gmail.com","Contacted"],
  ["Jon Gaines III","","","Steinberg Sports & Entertainment","Cameron Foster","cameron@steinbergsports.com","Contacted"],
  ["Roy Mbeata","","","The Uprise Sports Agency","Jason Beneby","jbeneby@yahoo.com","Contacted"],
  ["Richard gouraige","","","Agency1 Athlete Management Group","Aston Wilson","kaston@astonsportsreps.com","Contacted"],
  ["Rush Reimer","","","Imani Sports","Christopher Murray","chrism@imanisports.com","Contacted"],
  ["Tyrell Shavers","","","Paul DeRousselle","Paul DeRousselle","paul.derousselle@gmail.com","Contacted"],
  ["Connor McGovern","","","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
  ["Khalil Shakir","","","Equity Sports","Chris Cabott","chris@equity-sports.com","Contacted"],
  ["DaeQuan Hardy","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Zion Logue","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Tylan Grable","","","Grand Central Sports Management","Patrick VanHall","pat@gcsportsmgmt.com","Contacted"],
  ["Josh Palmer","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Keleki Latu","","","Wasserman","CJ Laboy","claboy@teamwass.com","Contacted"],
  ["Blen Cleveland","","","Priority Sports & Entertainment","Michael Perrett","michael@prioritysports.biz","Contacted"],
  ["Jake Hummel","","","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
  ["Diwun Black","","","Octagon","Casey Muir","casey.muir@octagon.com","Contacted"],
  ["Tavius Robinson","","","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
  ["Charlie Kolar","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Bilhal Kone","","","Roc Nation","Kim Miale","km@rocnation.com","Contacted"],
  ["Ronnie Stanley","","","Athletes First","Brian Murphy","bmurphy@athletesfirst.net","Contacted"],
  ["Daniel Faalele","","","Elite One Sports Management","Reginald Johnson","reggie23125@yahoo.com","Contacted"],
  ["Mike Green","","","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Malaki Stark","","","Turner Sports Management","Joel Turner","sturnersportsinc@aol.com","Contacted"],
  ["Lucas Patrick","","","Rosenhaus Sports Representation","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Marco Wilson","","","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Isaiah Williams","","","VaynerSports","Mike McCartney","mikemac@vaynersports.com","Contacted"],
  ["Payton Thorne","","","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Trey Hendrickson","","","Believe Sports Group","Chris Overton","overtonc3@gmail.com","Contacted"],
  ["Jamoi Mayes","","","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
  ["Geno Stone","","","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
  ["Josh Newton","","","The Familie","Erik Schmella","eschmella@thefamilie.com","Contacted"],
  ["Kole Taylor","","","Athletes First","Andrew Kessler","AKessler@AthletesFirst.Net","Contacted"],
  ["Daxton Hill","","","Excel Sports Management","Max Lipsett","mlipsett@excelsm.com","Contacted"],
  ["Keaton Wallace","","","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
  ["N'Faly Dante","","","ProMondo Sports","Matt Bollero","matt@promondosports.com","Contacted"],
  ["Hugo Gonzalez","","","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
  ["Miles Norris","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Terance Mann","","","Klutch Sports Group","Anthony Fields","fields@klutchgroup.com","Contacted"],
  ["Keon Johnson","","","UNLTD Sports Group","Nick Blatchford","nick@unltdsports.com","Contacted"],
  ["Tyrese Martin","","","Priority Sports & Entertainment","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Kon Knueppel","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Daquan Jeffries","","","Excel Sports Management","Michael Tellem","mtellem@excelsm.com","Contacted"],
  ["Matas Buzelis","","","CAA","Austin Brown","austin.brown@caa.com","Contacted"],
  ["Jaden Ivey","","","Excel Sports Management","Jeff Schwartz","jeff@excelsm.com","Contacted"],
  ["Isaac Okoro","","","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
  ["Emanuel Miller","","","Charles Tucker Services","Charles Tucker","tuckersportsagency@gmail.com","Contacted"],
  ["Emoni Bates","","","Verus Management Team","Aaron Turner","aturner@verusteam.com","Contacted"],
  ["Nae'Qwan Tomlin","","","Priority Sports & Entertainment","Kieran Piller","kieranp@prioritysports.biz","Contacted"],
  ["Max Strus","","","Verus Management Team","Aaron Turner","aturner@verusteam.com","Contacted"],
  ["Miles Kelly","","","A11Even Sports Management","Shetellia Riley","shetellia@aol.com","Contacted"],
  ["Kyrie Irving","","","LIFT Sports Management","Yann Balikouzou","yb@liftsm.com","Contacted"],
  ["Moussa Cisse","","","ADS Sports Management","Adam Godes","adamlgodes@gmail.com","Contacted"],
  ["Spencer Jones","","","Wasserman","Darren Matsubara","dmatsubara@teamwass.com","Contacted"],
  ["Julian Strawther","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Christian Braun","","","Excel Sports Management","Jared Mucha","jmucha@excelsm.com","Contacted"],
  ["Dario Saric","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["Duncan Robinson","","","Priority Sports & Entertainment","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Ron Holland","","","Priority Sports & Entertainment","George Roussakis","georger@prioritysports.biz","Contacted"],
  ["Pat Spencer","","","A11 Sports Management","Aylton Tesch","tesch@a11sm.com","Contacted"],
  ["Quinten Post","","","Excel Sports Management","Sean Kennedy","sean@excelsm.com","Contacted"],
  ["Gui Santos","","","Wasserman","Chafie Fields","cfields@teamwass.com","Contacted"],
  ["Alperen Sengun","","","Life Sports Agency","Jaafar Choufani","jaafar@lifesportsagency.com","Contacted"],
  ["Steven Adams","","","Siegel Sports & Entertainment","Michael Siegel","info@sseagency.com","Contacted"],
  ["Tari Eason","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Andrew Nembhard","","","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
  ["Jay Huff","","","LIFT Sports Management","Kevin Bradbury","kbradbury@liftsm.com","Contacted"],
  ["TyTy Washington Jr","","","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Nicolas Batum","","","Klutch Sports Group","Calvin Andrews","candrews@klutchgroup.com","Contacted"],
  ["Christian Koloko","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["RJ Davis","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Santi Aldama","","","Lenox Partners","Greer Love","glove@lenox-partners.com","Contacted"],
  ["Lamar Stevens","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Jaime Jaquez Jr","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["Norman Powell","","","AMR Agency LLC","Aaron Reilly","aaron@amragencyllc.com","Contacted"],
  ["Dru Smith","","","Octagon","Alex Saratsis","alexandros.saratsis@octagon.com","Contacted"],
  ["Thanasis Antetokounmpo","","","Jacques & Associates PLLC","Jennifer Jacques","jjacques@jacqueslawfirm.com","Contacted"],
  ["AJ Green","","","Wasserman","Joe Smith","jsmith@teamwass.com","Contacted"],
  ["Jesse Edwards","","","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Rudy Gobert","","","You First Sports","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
  ["Elfrid Payton","","","Dynasty Sports Management","Mayar Zokaei","mzokaei@gmail.com","Contacted"],
  ["Kylor Kelley","","","Wasserman","Jelani Floyd","jelani.floyd@teamwass.com","Contacted"],
  ["Yves Missi","","","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
  ["Delon Wright","","","QC Sports","Derrick Powell","deepowell@qcsports.com","Contacted"],
  ["Trey Jemison","","","Roc Nation","Sam Permut","sam@rocnation.com","Contacted"],
  ["Dillon Jones","","","Kam Sports Group","Mathieu Curadeau","groupekamsports@gmail.com","Contacted"],
  ["Nathan Legare","","","CAA","Pat Brisson","pbrisson@caa.com","Contacted"],
  ["Thomas Bordeleau","","","Alterno Global Management","Peter Wallen","peter.wallen@alternomgt.com","Contacted"],
  ["Isac Lundestrom","","","Wasserman","Kurt Overhardt","koverhardt@kosportsinc.com","Contacted"],
  ["Cutter Gauthier","","","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
  ["Pavel Mintyukov","","","Sports Professional Management Inc.","Lewis Gross","lewisgross@yahoo.com","Contacted"],
  ["Jeremy Swayman","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Mason Lohrei","","","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
  ["Nikita Zadorov","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Jordan Greenway","","","Newport Sports Management Inc.","Craig Oster","coster@thehockeyagency.com","Contacted"],
  ["Josh Norris","","","4sports Hockey","Claude Lemieux","lemieux@4sportsworld.com","Contacted"],
  ["Rasmus Andersson","","","Wasserman","David Gagner","dgagner@teamwass.com","Contacted"],
  ["Joel Farabee","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Khabib Nurmagomedov","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Kamaru Usman","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Justin Gaethje","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Henry Cejudo","","","Paradigm Sports Management","Audie Attar","audie@paradigmsports.com","Contacted"],
  ["Conor McGregor","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Jon Jones","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Ilia Topuria","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Derrick Lewis","","","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
  ["Dominick Cruz","","","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
  ["Andrei Arlovski","","","First Round Management","Lukasz Orzel","info@firstroundmanagement.com","Contacted"],
  ["Klaudia Sygula","","","First Round Management","Lukasz Orzel","info@firstroundmanagement.com","Contacted"],
  ["Mateusz Rebecki","","","First Round Management","John Song","info@firstroundmanagement.com","Contacted"],
  ["Seok Hyeon Ko","","","First Round Management","John Song","info@firstroundmanagement.com","Contacted"],
  ["Rinya Nakamura","","","First Round Management","Jose Diaz","info@firstroundmanagement.com","Contacted"],
  ["Alex Caceres","","","First Round Management","AJ Ariosa","info@firstroundmanagement.com","Contacted"],
  ["Bryce Mitchell","","","First Round Management","Mason Kemp","info@firstroundmanagement.com","Contacted"],
  ["Lauren Murphy","","","First Round Management","Ray Hoerner","info@firstroundmanagement.com","Contacted"],
  ["Jalin Turner","","","Iridium Sports Agency","Jason House","info@firstroundmanagement.com","Contacted"],
  ["Cody Brundage","","","Intensity FM Management","Kalle Sauerland","thebaddy@intensitifm.com","Contacted"],
  ["Paddy Pimblett","","","Saga Sports","Bill Neff","sagasp@aol.co","Contacted"],
  ["Gabe Vincent","","","Sports International Group","Sammy Wloszczowski","sammyw@sigsports.com","Contacted"],
  ["Jock Landale","","","The Familie","David Bauman","info@thefamilie.com","Contacted"],
  ["Garrison Mathews","","","Excel Sports Management","Jordan Gertler","jgertler@excelsm.com","Contacted"],
  ["Onyeka Okongwu","","","Icona Agency","Diana Day","diana@iconaagency.com","Contacted"],
  ["Buddy Hield","","","Edge Sports International","Sam Cipriano","cipriano@edgesportsintl.com","Contacted"],
  ["Micah Potter","","","GSL Sports Group","George Langberg","gsl@gslsportsgroup.com","Contacted"],
  ["Ben Sheppard","","","Excel Sports Management","Mike Lindeman","mike@excelsm.com","Contacted"],
  ["Aaron Nesmith","","","The Familie","David Bauman","info@thefamilie.com","Contacted"],
  ["Reece Beekman","","","Hazan Sports Management Group","Daniel Hazan","daniel@hazansports.com","Contacted"],
  ["Trevelin Queen","","","Prolifiq Sports Group","Tony Miranda","tmiranda@prolifichq.com","Contacted"],
  ["Jonathan Isaac","","","Rize Management","Scott Nichols","snichols@rizemanagement.com","Contacted"],
  ["Lester Quinones","","","Up Tempo Management","David Putterie","info@uptempomanagement.com","Contacted"],
  ["Toumani Camara","","","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
  ["Stanley Umude","","","LIFT Sports Management","Mike Miller","mm@liftsm.com","Contacted"],
  ["Wendell Moore Jr.","","","You First Sports","Deirunas Visockas","deirunas.visockas@youfirstsports.com","Contacted"],
  ["Chaz Lanier","","","Octagon","Ron Shade","ron.shade@octagon.com","Contacted"],
  ["Paul Reed","","","Next Sports Agency","Adam Papas","adampapas.nextsports@gmail.com","Contacted"],
  ["Dean Wade","","","Always On Player Representation Services","Ryan Straining","ryan@alwaysonprs.com","Contacted"],
  ["Craig Porter Jr.","","","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
  ["Keon Ellis","","","Goodwin Sports Management","Aaron Goodwin","agood7@goodwinsports.com","Contacted"],
  ["GG Jackson II","","","Famo Sports","Donnell","Dnell38@yahoo.com","Contacted"],
  ["Josh Giddey","","","Lighthouse Sports Management","Daniel","daniel@lighthousesportsmgmt.com","Contacted"],
  ["Marco Rossi","","","The Will Sports Group","Ian","ian@willsportsgroup.com","Contacted"],
  ["Seth Jarvis","","","The Sports Corporation","Gerry","gjohannson@tschockey.com","Contacted"],
  ["Jackson Merrill","","","KHG Sports Management","Josh","Josh@khgsports.com","Contacted"],
  ["Paul Skenes","","","Independent Sports & Entertainment","Mark","mpieper@iseworldwide.com","Contacted"],
  ["Michael Harris II","","","Munger English Sports Management","Clarence","clarence@mungerenglish.com","Contacted"],
  ["Amen Thompson","","","G.A.P.P. Sports Group","Troy","maatausar@gmail.com","Contacted"],
  ["Leo Carlsson","","","WIN Hockey Agency","Matt","mkeator@winhockeyagency.com","Contacted"],
  ["Gunnar Henderson","","","The Boras Corporation","Scott","sb1@borascorp.com","Contacted"],
  ["Junior Caminero","","","Republik Sports","Rafa","rafa@gorepublik.com","Contacted"],
  ["Zach Benson","","","R.W.G. Sport Management","Ross","ross@rwgsportmanagement.com","Contacted"],
  ["James Harden","","","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
  ["Brandon Miller","","","VaynerSports","AJ","aj@vaynersports.com","Contacted"],
  ["Brandt Clarke","","","Edge Sports Management","Randy","randy@edgesportsmanagement.com","Contacted"],
  ["William Eklund","","","International Sports Advisors Co.","Todd","tjd@isaprosports.com","Contacted"],
  ["Zach Neto","","","EnterSports Management","Gavin","gavin@enter-sports.com","Contacted"],
  ["Ceddanne Rafael","","","MVP Sports Group","Dan","dannyl@mvpsportsgroup.com","Contacted"],
  ["Brooks Lee","","","Apex Baseball","Adam","adamk@apexbaseball.com","Contacted"],
  ["Roman Anthony","","","Frontline Athlete Management","Matt","matt@frontlineam.com","Contacted"],
  ["Jackson Chourio","","","Beverly Hills Sports Council","Cesar","csuarez@bhscglobal.com","Contacted"],
  ["Lane Hutson","","","Quartexx Management","Sean Coffey","sean@quartexxmanagement.com","Contacted"],
  ["Dylan Guenther","","","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Francisco Alvarez","","","Rimas Sports","Sharon Rodriguez","srodriguez@rimassports.com","Contacted"],
  ["Zach Hyman","","","Raze Sports","Todd Reynolds","toddr@razesports.com","Contacted"],
  ["Lukas Reichel","","","RSG Hockey LLC","Allain Roy","allain@rsghockey.com","Contacted"],
  ["Seamus Casey","","","OCTANE Sports Management","Eddie Mio","eddie@octanesports.com","Contacted"],
  ["Kevin Gausman","","","Tidal Sports Group","Brodie Scoffield","bscoffield@tidalsportsgroup.com","Contacted"],
  ["Robbie Rayn","","","VC Sports Group","Steve Veltman","sveltman@vcsportsgroup.com","Contacted"],
  ["Bennedict Mathuring","","","Innovate Sports Group","Nima Namakian","namakian@innovatesportsgroup.com","Contacted"],
  ["Ryan Poehling","","","O2K Sports Management","Dean Grillo","grillo@o2kmanagement.com","Contacted"],
  ["Mavrik Bourque","","","Meridian Hockey","Dominic DeBlois","dominic@meridianhockey.com","Contacted"],
  ["Joel Armia","","","MPR Hockey","Mika Rautakallio","mika@mprhockey.com","Contacted"],
  ["Jaden Springer","","","A3 Athletics","Isaac Conner","ike@replegacy.com","Contacted"],
  ["Kris Dunn","","","Thread Sports Management","Bernie Lee","bernie@threadsm.com","Contacted"],
  ["Nino Niederreiter","","","Rufener Hockey LLC","Andre Rufener","andre@rufenerhockey.com","Contacted"],
  ["Mike Hardman","","","Buckley Sports Management","Jerry Buckley","jerry@buckleysports.com","Contacted"],
  ["Miles Wood","","","Global Hockey Consultants","Peter Fish","pfish@globalhockey.net","Contacted"],
  ["Dustin May","","","Cadence 158","Bill Sanders","bill@cadence158.com","Contacted"],
  ["Kyle Isbel","","","Paragon Sports International","Garrett Parcell","garrett@paragonsports.net","Contacted"],
  ["Nate Eaton","","","Gaeta Sports Management","Matthew Gaeta","mg@gaetasportsmgt.com","Contacted"],
  ["Ladd McConkey","","","Everett Sports Marketing (ESM)","Jeff Hoffman","jeff@thisisesm.com","Contacted"],
  ["Keon Coleman","","","Just Win Management Group","Joe Hernandez","joe@justwin.us","Contacted"],
  ["Ja'Marr Chase","","","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Tee Higgins","","","Alliance Sports","Caitlin Aoki","caitlin@alliance-sports.com","Contacted"],
  ["Brock Purdy","","","Range Media Partners","Kyle Strongin","kstrongin@rangemp.com","Contacted"],
  ["Travis Kelce","","","Milk & Honey Sports","Jacob Presser","jmpresser@gmail.com","Contacted"],
  ["Saquon Barkley","","","LBI Entertainment","Ken Katz","kk@lbient.com","Contacted"],
  ["Bo Nix","","","QB Reps","Peter Webb","peter@qbreps.com","Contacted"],
  ["Caleb Williams","","","Barnburner Sports Marketing","AJ Romeo","aromeo@barnburnermktg.com","Contacted"],
  ["Jayden Daniels","","","EAG Sports Management","Denise White","denise.white@eagsportmanagement.com","Contacted"],
  ["Mike Evans","","","Day 1 Sports & Entertainment","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
  ["Terry McLaurin","","","The Society Management","Bronson Sanich","bronson@thesociety.us","Contacted"],
  ["Cooper Kupp","","","Royalty Management Group","Tzvi Grossman","tgrossman@royaltymanagementgoup.com","Contacted"],
  ["Marvin Harrison Jr.","","","Harrison Incorporated","Marvin Harrison Jr.","mhj@harrisonincorporated.com","Contacted"],
  ["Lamar Jackson","","","Synergy Sports International LLC","Josh Arnold","josh@synergysportsonline.com","Contacted"],
  ["Patrick Mahomes","","","1UP Sports Marketing","Jacquelyn Dahl","jd@1upsportsmarketing.com","Contacted"],
  ["Alvin Kamara","","","DR31 Sports","David Raymond","david@dr31sports.com","Contacted"],
  ["Joe Mixon","","","Authentic Athletix","Peter Schaffer","peter@agentaa.com","Contacted"],
  ["Zay Flowers","","","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
  ["Anthony Richardson","","","Legacy Sports Advisors","Deiric Jackson","deiricjackson@gmail.com","Contacted"],
  ["Rhamondre Stevenson","","","SIEGE","Brian Hannula","brian@siegerep.com","Contacted"],
  ["Stefon Diggs","","","SMAC Entertainment","Constance Schwartz-Morini","cs@smac-ent.com","Contacted"],
  ["Chris Jones","","","Katz Brothers Sports","Jason Katz","jason@katzbrotherssports.com","Contacted"],
  ["Diontae Johnson","","","QC Sports","Bradley Cicala","brad@qcsports.com","Contacted"],
  ["George Kittle","","","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
  ["Malik Nabers","","","CMV Sports LLC","Damien Butler","damien.butler@cmvsports.com","Contacted"],
  ["Isiah Pacheco","","","Neil S Schwartz Associates Inc","Neil S. Schwartz","neil@sffootball.net","Contacted"],
  ["Josh Jacobs","","","Black Label Sports Group LLC","Chad Wiestling","wiestling@blacklabelsportsgroup.com","Contacted"],
  ["Davante Adams","","","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Tony Pollard","","","MS World LLC","Kennard McGuire","kmcguire@msworldllc.com","Contacted"],
  ["Desmond Bane","","","Gersh","Maxwell Wiepking","mwiepking@gersh.com","Contacted"],
  ["Deni Avdija","","","2Talent Sports Management","Matan Siman-Tov","matan@2talent.co.il","Contacted"],
  ["Mouhamed Gueye","","","PNW Sports Group","Amandeep Dhesi","adhesi@pnwsportsgroup.com","Contacted"],
  ["Kristaps Porzingis","","","FUTURE Sports Group","Janis Porzingis","porzingis@hotmail.com","Contacted"],
  ["Moussa Diabate","","","BC Sports","Nodirbek Talipov","nodirbek@hotmail.com","Contacted"],
  ["Pelle Larsson","","","WEAVE","Daniel Poneman","danielponeman@gmail.com","Contacted"],
  ["Mohamed Diawara","","","Maz Sport Agency","Olivier Mazet","mazet@mazsportagency.com","Contacted"],
  ["Jack McVeigh","","","Mogul Sports Group","Marquis Taylor","mtaylor@mogulsportsgroup.com","Contacted"],
  ["Jabari Smith Jr.","","","Prather Sports","Wallace Prather","wallaceprather@gmail.com","Contacted"],
  ["Tolu Smith","","","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
  ["AJ Green","","","Jacques & Associates PLLC","Jennifer Jacques","jjacques@jacqueslawfirm.com","Contacted"],
  ["Stanley Umude","","","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
  ["Riley Minix","","","Arete Sports Agency","Andre Buck","abuck@aretesportsagency.com","Contacted"],
  ["Jordan Walsh","","","On Time Agency","Ramon Sessions","ramon@ontimeagencygroup.com","Contacted"],
  ["Hayden Gray","","","Duran International Sports Management","Emilio Duran","eduran@duraninternational.com","Contacted"],
  ["Quenton Jackson","","","Young Money APAA Sports","Adie von Gontard","adie@ymapaasports.com","Contacted"],
  ["RayJ Dennis","","","LAMF Sports Management","Daniel Curtin","daniellcurtin@gmail.com","Contacted"],
  ["Damion Baugh","","","HCS Sports Agency","Marcus Maples","marcus@hcsportsagency.com","Contacted"],
  ["Kenrich Williams","","","Pensack Sports","Adam Pensack","adam@pensacksports.com","Contacted"],
  ["Jaylen Martin","","","Valor Sports Agency","Deddrick Faison","dfaison@valorsportsagency.com","Contacted"],
  ["Dante Exum","","","The Landmark Sports Agency","Brandon Rosenthal","bmr@landmarksports.com","Contacted"],
  ["EJ Harkless","","","RBA Sports","Brian Bass","bjb@rbasports.com","Contacted"],
  ["Kylor Kelley","","","Dynasty Sports Management","Mayar Zokaei","mzokaei@gmail.com","Contacted"],
  ["Garrison Brooks","","","CSE","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
  ["Karlo Matkovic","","","Beo Basket","Misko Raznatovic","misko4@beobasket.net","Contacted"],
  ["Nate Williams","","","Family of Athletes","Billy Davis","bdavis@foasports.com","Contacted"],
  ["Riley Minix","","","Project B Sports & Entertainment","Brandon Wood","bwood@projectbsports.com","Contacted"],
  ["Lawson Lovering","","","One Motive Sports","Andrew Kelso","andrew@onemotivesports.com","Contacted"],
  ["Ben Sims","","","The Familie","Jack Scharf","jscharf@thefamilie.com","Contacted"],
  ["Garrison Mathews","","","The Sports Law Group","Chris Patrick","cpatrick@thesportslawgroup.com","Contacted"],
  ["Ketel Marte","","","QC Sports","Alex Cotto","alex@qcsports.com","Contacted"],
  ["Austin Riley","","","SportsMeter","David Meter","dmeter@aol.com","Contacted"],
  ["Ozzie Albies","","","PSI Sports Management","David","david@psisports.com","Contacted"],
  ["Aaron Judge","","","The Bledsoe Agency","Hunter Bledsoe","hunter@bledsoeagency.com","Contacted"],
  ["Brendan Donovan","","","Ballengee Group","Henri Stanley","HStanley@ballengeegroup.com","Contacted"],
  ["Victor Scott II","","","ACES","Sam Levinson","sam@acesinc1.com","Contacted"],
  ["Logan Webb","","","Nova Sports Agency","Gavin","gavin@enter-sports.com","Contacted"],
  ["Emmanuel Clase","","","Lakeridge Sports Management","Derek Marques","info@lakeridgesportsmgmt.com","Contacted"],
  ["Dane Myers","","","Northwest Sports Management Group","Nik","nik@nwsportsmanagementgroup.com","Contacted"],
  ["Zach McKinstry","","","Z-Axis Sports","J. Zapata","Jzapata@zaxissports.com","Contacted"],
  ["Johan Rojas","","","Weisz Sports Management","Jonathan Weisz","jonathan.weisz@weiszsports.com","Contacted"],
  ["Tommy Edman","","","Prime Sports Management","Tommy Barbella","tbarbella@primesportsagency.com","Contacted"],
  ["Andy Pages","","","Meister Sports Management","Barry Meister","barry@meistersports.com","Contacted"],
  ["Chris Taylor","","","McKinnis Sports Management","Bo McKinnis","mckinnissports@comcast.net","Contacted"],
  ["Sonny Gray","","","Icon Sports Management","Robert Martin","rmartin@teamicon.net","Contacted"],
  ["Andrew Heaney","","","North Star Sports Management","Tony Giordano","tony@northstarsportsmgmt.com","Contacted"],
  ["Brett Wisely","","","Warner Sports Management","Erik Johnson","ejohnson@warnersportsmanagement.com","Contacted"],
  ["Jason Adam","","","Jack Toffey Sports Management","Jack Toffey","jacktoffey@comcast.net","Contacted"],
  ["Aaron Civale","","","EnterSports Management","Gavin Kahn","gavin@enter-sports.com","Contacted"],
  ["Will Warren","","","Ball Players Agency","Storm Kirschenbaum","storm@ballplayersagency.com","Contacted"],
  ["Austin Wynn","","","BBI Sports Group","Ryan Cliff","jay.franklin@bbisportsgroup.com","Contacted"],
  ["Cade Cavalli","","","John Boggs & Associates","John Boggs","jboggs@jbasports.com","Contacted"],
  ["Trevor Williams","","","Premier Talent Sports & Entertainment","Paul Kinzer","paul@ptsemgmt.com","Contacted"],
  ["Jeimer Candelario","","","Moye Sports","J. Ware","jware@moyesports.com","Contacted"],
  ["Alex Call","","","Alliance Sports Management","Ryan Ware","rware@alliance-sm.com","Contacted"],
  ["Jeffrey Springs","","","mherzog@yahoo.de","Karl","tom@toconnellsports.com","Contacted"],
  ["Tim Leibold","","","Red Envelope Sports","Carter Chow","carter@redenvelopesports.com","Contacted"],
  ["David Onyemat","","","Sports Law and Management (SLAM)","Michael Hoffman","michael@slam.la","Contacted"],
  ["DeAngelo Malone","","","Agency 1 Athlete Management Group","Ron Butler","ronbutler@amg1sports.com","Contacted"],
  ["Phillip Dorsett","","","Turner Sports Management","Joel Turner","sturnersportsinc@aol.com","Contacted"],
  ["Lucas Patrick","","","National Sports Agency","Harold lewis","haroldclewis@cs.com","Contacted"],
  ["Isaiah Williams","","","Shark Sports Management","James Grogan","jimgrogan14@gmail.com","Contacted"],
  ["Drew Sample","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Taven Bryan","","","US Sports Inc","Robert Walker","rw@ussportsmanagement.com","Contacted"],
  ["Emanuel Wilson","","","JB Sports","Christopher Hays","haysr99@gmail.com","Contacted"],
  ["Kristian Welch","","","Leverage Football","Mark Henness","mark@leveragefootball.com","Contacted"],
  ["Warren Brinson","","","The Familie","Tyler Thomas","eschmella@thefamilie.com","Contacted"],
  ["A.J. Cole","","","United Sports Group","Brian Overstreet","brian@unitedsportsgroup.com","Contacted"],
  ["Tristin McCollum","","","1st Down Sports","Mark Bailey","mark.bailey@1stdownsports.com","Contacted"],
  ["Jeff Foreman","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Jordan Meredith","","","Upper Edge Management","Andy Ross","andy@upperedgesports.com","Contacted"],
  ["Morgan Moses","","","ProStar Sports Agency","Paul Sheehy","paul@prostarsportsagency.com","Contacted"],
  ["Brandon Crossley","","","IV Life Management","Frank Miranda","frank@fcmlaw.com","Contacted"],
  ["Cam Riley","","","Delta Sports Group","Jesse Foreman","thenflagent@gmail.com","Contacted"],
  ["Isaiah Iton","","","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
  ["Kyle Dugger","","","Pyramid Sports Group","Orlando Arnold","orlando@pyramidsportsgroup.com","Contacted"],
  ["D'Shawn Jamison","","","DEAL","Kevin Poston","kposton@thedealllc.com","Contacted"],
  ["Evan Hull","","","One West Sports Group","Christopher Gittings","chrisg@onewestsports.com","Contacted"],
  ["Ale Kaho","","","AFC Sports Worldwide","Arc Tolentino","arctolentinosports@gmail.com","Contacted"],
  ["Jordan Magee","","","Clarity Sports International","Jason Bernstein","jason@clarityfootball.com","Contacted"],
  ["Rob McDaniel","","","Lady Lib Sports & Entertainment","Rasheeda Liberty","rasheeda@ladylib.com","Contacted"],
  ["Car'lin Vigers","","","Paul DeRousselle","Paul DeRousselle","paul.derousselle@gmail.com","Contacted"],
  ["Jaylin Lane","","","Grady Sports Agency","Joshua Grady","joshua@gradysports.com","Contacted"],
  ["Jacoby Jones","","","Forever Athlete Management","Damian Knight","d.knight@foreverathletemanagement.com","Contacted"],
  ["Chukwuebuka Godrick","","","The Uprise Sports Agency","Jason beneby","jbeneby@yahoo.com","Contacted"],
  ["Patrick Mahomes","","","1UP Sports Marketing","Chris Cabott","jd@1upsportsmarketing.com","Contacted"],
  ["Jahmal Banks","","","Generation Sports Group","Christian Kranz","christian@generationsportsgroup.com","Contacted"],
  ["Keaton Mitchell","","","Elite One Sports Management","Reginald Johnson","reggie23125@yahoo.com","Contacted"],
  ["T.J. Tampa","","","Overtime Sports Management Group","Corey Williams","coreyden@yahoo.com","Contacted"],
  ["JB Brown","","","Day 1 Sports & Entertainment","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
  ["Ja'Quan McMillian","","","McRae Sports Group","Demarius McRae","dmcrae3@hotmail.com","Contacted"],
  ["K.J. Cloyd","","","Milk & Honey Sports","Rawleigh Williams","rawleighW22@gmail.com","Contacted"],
  ["Nash Jones","","","Optimal Sports Management","Rick Martin","christophergil@optimalsports.net","Contacted"],
  ["Myles Purchase","","","KMM Sports","Stefphon Jefferson","stefphon@kmmsports.com","Contacted"],
  ["Emany Johnson","","","Diamond Sports & Talent Management","Jesse LeGrande","jesse.legrande@diamondsportsmanagement.com","Contacted"],
  ["TeRah Edwards","","","3XL Sports Management","Nate Richman","nrichman@3XLsports.com","Contacted"],
  ["Darius Cooper","","","A3 Athletics","Chad Speck","ike@replegacy.com","Contacted"],
  ["Nakobe Dean","","","Be The Best Sports Group","Chris Ellison","EllisonChris04@gmail.com","Contacted"],
  ["Giles Jackson","","","IFA - The Institute for Athletes","Blake Baratz","blake@teamifa.com","Contacted"],
  ["Xavier Thomas","","","Smart Sports","Brandon Smart","smartconsultingagency@gmail.com","Contacted"],
  ["Royce Newman","","","Plan B Sports Management","Brian Hamilton","planbsports@yahoo.com","Contacted"],
  ["Starling Thomas V","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Zion Logue","","","Vantage Management Group","Nathaniel Thomas","ntthomas@vantagesports.ca","Contacted"],
  ["Paris Shand","","","Everett Sports Marketing (ESM)","Jeff Crandall","jeff@thisisesm.com","Contacted"],
  ["Jonathan Allen","","","Kutak Rock LLP","James Carroll","jr.carroll@kutakrock.com","Contacted"],
  ["Dwight McGlothern","","","Advantage One Group","Tayo Adewon","tadewon@a1advantagegroup.com","Contacted"],
  ["Myles Price","","","Quintessentially Sports","Dwayne Treece","clientservices@nicodemusltd.com","Contacted"],
  ["Elijah Williams","","","Colture Sports Agency","Tyrome Baisden","ty@colturesports.com","Contacted"],
  ["Mishael Powell","","","CMV Sports LLC","Damien Butler","damien.butler@cmvsports.com","Contacted"],
  ["Ja'Quinden Jackson","","","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Antonio Johnson","","","All Pro Sports & Entertainment","Lamont Smith","clsmith@apse.net","Contacted"],
  ["Dorian Singer","","","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
  ["Travon Walker","","","OTG Sports","James Martin","cmartin@otgsports.com","Contacted"],
  ["Shakel Brown","","","Prolifiq Sports Group","Kaveh Akbari","Kaveh@greyshot.co","Contacted"],
  ["Kevin Givens","","","First Round Management","Malki Kawa","malki007@aol.com","Contacted"],
  ["Israel Abanikanda","","","Puck Agency, LLC","Bobby Gauthier","abgauthier@otsportsgroup.com","Contacted"],
  ["Nick Abruzzese","","","Gold Star Hockey","Daniel Milstein","edmilstein@goldstarhockey.com","Contacted"],
  ["Artur Akhtyamov","","","Achieve Sports Management","Justin Duberman","jduberman@gmail.com","Contacted"],
  ["Matt Benning","","","Eclipse Sports Management","Michael Deutsch","mike@esmhockey.com","Contacted"],
  ["Pontus Holmberg","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Jake McCabe","","","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Oliver Ekman-Larsson","","","Quartexx Management","Darren Ferris","darren@quartexxmanagement.com","Contacted"],
  ["Mitch Marner","","","Buckley Sports Management","Jerry Buckley","jerry@buckleysports.com","Contacted"],
  ["Jacob Quillan","","","Newport Sports Management Inc.","Craig Oster","coster@thehockeyagency.com","Contacted"],
  ["Dennis Hildeby","","","RSG Hockey, LLC","Allain Roy","allain@rsghockey.com","Contacted"],
  ["Joseph Woll","","","Cover-0","George Holley","george.cover0@gmail.com","Contacted"],
  ["Jatravis Broughton","","","Young Money APAA Sports","Peter von Gontard","peter@ymapaasports.com","Contacted"],
  ["Ja'Tyre Carter","","","BC Sports","Bus Cook","bus@b-c-sports.com","Contacted"],
  ["Marcedes Lewis","","","Maven Sports Group","Darren Jones","drjsports@gmail.com","Contacted"],
  ["Gage Larvadain","","","AMDG Sports","Jonathan Feinsod","jfeinsod@amdgsports.com","Contacted"],
  ["Jason Ivey","","","SES Sports","Sean Stellato","seanstellato@gmail.com","Contacted"],
  ["Kaden Davis","","","LAMF Sports Management","Eddie Edwards","eddie.edwards@lsm.la","Contacted"],
  ["Miles Sanders","","","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
  ["Zay Flowers","","","Management One","Dylan Gould","james.gould@GouldManagementGroup.com","Contacted"],
  ["Malik Cunningham","","","Neil S Schwartz Associates Inc","Neil S. Schwartz","neil@sffootball.net","Contacted"],
  ["Chris Tyree","","","Vanguard Sports Group","Kristen Kuliga","Kristen@vanguardsports.com","Contacted"],
  ["Xavier Truss","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Eli Apple","","","Independent Sports & Entertainment","Roosevelt Barnes","rbarnes@iseworldwide.com","Contacted"],
  ["Skyy Moore","","","United Athlete Sports","Chris Turnage","chris@uasports.us","Contacted"],
  ["Tarron Jackson","","","OTG Sports","James Martin","cmartin@otgsports.com","Contacted"],
  ["Shakel Brown","","","SportStars","Jason Chayut","Jchayut@sportstarsnyc.com","Contacted"],
  ["Renardo Green","","","Be The Best Sports Group","Chris Ellison","EllisonChris04@gmail.com","Contacted"],
  ["Jakob Robinson","","","HOF Player Representatives","Greg Linton","greglintonuk@yahoo.com","Contacted"],
  ["Demone Harris","","","Disruptive","Henry Organ","henry@disruptivesports.com","Contacted"]
];




// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const TODAY   = new Date().toISOString().split("T")[0];
const LEAGUES = ["NFL","NBA","NHL","MLB","UFC"];
const STATUSES= ["Contacted","Negotiating","Proposal Sent","Closed Won","Closed Lost","Pending"];
const ICONS   = {NFL:"🏈",NBA:"🏀",NHL:"🏒",MLB:"⚾",UFC:"🥊"};

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const T     = "#04BDB7";
const WINE  = "#800032";
const BEIGE = "#FFF8E8";
const GOLD  = "#E8A042";
const GREEN = "#2FC88A";
const ROSE  = "#E84C8B";
const PURP  = "#7B6BD6";

const BG    = "#0D0A14";
const SB    = "#08060F";
const C1    = "#131020";
const C2    = "#1A1530";
const C3    = "#221E38";
const BD    = "rgba(255,248,232,0.06)";
const BD2   = `rgba(4,189,183,0.2)`;
const TX1   = "#FFFFFF";
const TX2   = "rgba(255,255,255,0.55)";
const TX3   = "rgba(255,255,255,0.25)";

const SCOL  = { Contacted:T, Negotiating:GOLD, "Proposal Sent":PURP, "Closed Won":GREEN, "Closed Lost":"#444", Pending:TX3 };
const PCOLS = [T, WINE, GOLD, PURP, ROSE, GREEN];
const LCOLS = { NFL:WINE, NBA:T, NHL:PURP, MLB:GREEN, UFC:GOLD };

// ─── GOOGLE OAUTH ─────────────────────────────────────────────────────────────
// IMPORTANT: Replace with your own Google OAuth client ID from console.cloud.google.com
// Enable "Gmail API" and set authorized origins to http://localhost:3000
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return { headers:[], rows:[] };
  const parseRow = line => {
    const res=[]; let cur=""; let q=false;
    for(let i=0;i<line.length;i++){
      const c=line[i];
      if(c==='"'){ if(q&&line[i+1]==='"'){cur+='"';i++;} else q=!q; }
      else if(c===','&&!q){ res.push(cur.trim()); cur=""; }
      else cur+=c;
    }
    res.push(cur.trim()); return res;
  };
  const headers = parseRow(lines[0]);
  const rows    = lines.slice(1).map(l => {
    const vals = parseRow(l);
    const obj  = {};
    headers.forEach((h,i) => { obj[h] = vals[i] ?? ""; });
    return obj;
  });
  return { headers, rows };
}

function parseEmailAddresses(header) {
  // Parses "Name <email>, Name <email>" or "email, email" format
  const results = [];
  const parts = header.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  for (const part of parts) {
    const match = part.match(/<([^>]+)>/);
    const email = match ? match[1].trim() : part.trim();
    const nameMatch = part.match(/^([^<]+)</);
    const name = nameMatch ? nameMatch[1].replace(/"/g,"").trim() : email.split("@")[0];
    if (email.includes("@")) results.push({ name, email });
  }
  return results;
}

function categorizeEmail(email) {
  const domain = (email.split("@")[1] || "").toLowerCase();
  const agencyKw = /roc|caa|wasserman|klutch|rosenhaus|wme|vayner|img|boras|endeavor|sportstrust|steinberg|athletes.?first|disruptive|aura|equity.?sport|paraphe|net.?sport|goal.?line|uasport|delta.?sport|priority|hof.?player|intersport|global.?sport|klutch|gpg|creative.?artist|united.?talent|octagon/;
  const teamKw   = /nfl\.com|nba\.com|nhl\.com|mlb\.com|seahawks|dolphins|lakers|celtics|yankees|cowboys|chiefs|bulls|heat|mavs|knicks|warriors|bruins|leafs|canucks|rangers|cubs|astros|redsox/;
  const mediaKw  = /espn|nbc|cbs|fox|bleacher|athletic|si\.com|nfl\.com|nba\.com|sportnews|thescore|deadspin|sport|media|press|journal|times|post|herald/;
  if (agencyKw.test(domain)) return "Agency";
  if (teamKw.test(domain))   return "Team";
  if (mediaKw.test(domain))  return "Media";
  if (/gmail|yahoo|hotmail|outlook|icloud/.test(domain)) return "Other";
  return "Brand";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

// ─── JAGUAR LOGO SVG ──────────────────────────────────────────────────────────
function AtlauaJaguarLogo({ size = 40, textSize = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jgr1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#06E8E1"/>
          <stop offset="100%" stopColor="#04BDB7"/>
        </linearGradient>
        <linearGradient id="jgr2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#04BDB7"/>
          <stop offset="100%" stopColor="#037A76"/>
        </linearGradient>
        <filter id="jglow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      {/* Outer drop / shield */}
      <path d="M50 4 C50 4 18 28 18 54 C18 72 32 88 50 96 C68 88 82 72 82 54 C82 28 50 4 50 4Z"
        fill="url(#jgr1)" opacity="0.12"/>
      {/* Jaguar head silhouette - geometric */}
      <path d="M50 16 C50 16 30 32 28 50 C26 62 34 70 50 74 C66 70 74 62 72 50 C70 32 50 16 50 16Z"
        fill="url(#jgr1)" opacity="0.22"/>
      {/* Ears */}
      <path d="M33 36 L28 22 L40 32 Z" fill="url(#jgr1)"/>
      <path d="M67 36 L72 22 L60 32 Z" fill="url(#jgr1)"/>
      {/* Inner ear */}
      <path d="M34 35 L30 25 L39 32 Z" fill="url(#jgr2)" opacity="0.5"/>
      <path d="M66 35 L70 25 L61 32 Z" fill="url(#jgr2)" opacity="0.5"/>
      {/* Face outline */}
      <path d="M35 34 C27 42 26 55 30 63 C34 70 42 76 50 76 C58 76 66 70 70 63 C74 55 73 42 65 34 C61 29 55 27 50 27 C45 27 39 29 35 34Z"
        fill="none" stroke="url(#jgr1)" strokeWidth="2.5"/>
      {/* Eyes */}
      <ellipse cx="41" cy="48" rx="5" ry="4" fill="url(#jgr1)" opacity="0.9"/>
      <ellipse cx="59" cy="48" rx="5" ry="4" fill="url(#jgr1)" opacity="0.9"/>
      {/* Pupils */}
      <ellipse cx="41" cy="48" rx="2" ry="3" fill="#0A0613"/>
      <ellipse cx="59" cy="48" rx="2" ry="3" fill="#0A0613"/>
      {/* Eye shine */}
      <circle cx="42.5" cy="46.5" r="1" fill="white" opacity="0.8"/>
      <circle cx="60.5" cy="46.5" r="1" fill="white" opacity="0.8"/>
      {/* Nose */}
      <path d="M47 57 L50 60 L53 57 C52 54 48 54 47 57Z" fill="url(#jgr1)" opacity="0.9"/>
      {/* Muzzle */}
      <path d="M38 58 C40 64 44 67 50 68 C56 67 60 64 62 58" fill="none" stroke="url(#jgr1)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M50 60 L50 66" stroke="url(#jgr1)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Cheek spots */}
      <circle cx="35" cy="58" r="2" fill="url(#jgr1)" opacity="0.4"/>
      <circle cx="39" cy="62" r="1.5" fill="url(#jgr1)" opacity="0.4"/>
      <circle cx="65" cy="58" r="2" fill="url(#jgr1)" opacity="0.4"/>
      <circle cx="61" cy="62" r="1.5" fill="url(#jgr1)" opacity="0.4"/>
      {/* Forehead spots */}
      <circle cx="50" cy="36" r="1.5" fill="url(#jgr1)" opacity="0.5"/>
      <circle cx="44" cy="39" r="1" fill="url(#jgr1)" opacity="0.5"/>
      <circle cx="56" cy="39" r="1" fill="url(#jgr1)" opacity="0.5"/>
      {/* Bottom water drop / tail of ATLAUA brand */}
      <path d="M50 76 C50 76 44 82 44 87 C44 91 46.8 94 50 94 C53.2 94 56 91 56 87 C56 82 50 76 50 76Z"
        fill="url(#jgr1)" opacity="0.8" filter="url(#jglow)"/>
    </svg>
  );
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Tag({ label, color = T, bg }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", padding:"2px 10px",
      borderRadius:20, fontSize:11, fontWeight:600, letterSpacing:"0.04em",
      color: color, background: bg || color+"22",
      border:`1px solid ${color}44`
    }}>{label}</span>
  );
}

function StatusPill({ status }) {
  const col = SCOL[status] || TX2;
  return <Tag label={status} color={col} />;
}

function LeaguePill({ league }) {
  const col = LCOLS[league] || TX2;
  return <Tag label={`${ICONS[league]||""} ${league}`} color={col} />;
}

function Btn({ children, onClick, variant="primary", size="md", icon, style:extraStyle={}, disabled=false }) {
  const base = {
    display:"inline-flex", alignItems:"center", gap:7, cursor:disabled?"not-allowed":"pointer",
    border:"none", borderRadius:8, fontWeight:600, letterSpacing:"0.02em",
    transition:"all 0.18s ease", outline:"none", opacity:disabled?0.45:1,
    fontFamily:"inherit"
  };
  const sizes = {
    sm: { padding:"6px 14px", fontSize:12 },
    md: { padding:"9px 20px", fontSize:13 },
    lg: { padding:"12px 28px", fontSize:14 }
  };
  const variants = {
    primary:  { background:`linear-gradient(135deg,${T},${T}CC)`,  color:"#0A0613", boxShadow:`0 4px 18px ${T}44` },
    danger:   { background:`linear-gradient(135deg,${WINE},${WINE}CC)`, color:"#fff", boxShadow:`0 4px 18px ${WINE}44` },
    ghost:    { background:"transparent", color:TX2, border:`1px solid ${BD}` },
    outline:  { background:"transparent", color:T, border:`1px solid ${T}55` },
    success:  { background:`linear-gradient(135deg,${GREEN},${GREEN}CC)`, color:"#0A0613", boxShadow:`0 4px 18px ${GREEN}44` },
    google:   { background:"#fff", color:"#1a1a1a", boxShadow:"0 2px 12px rgba(0,0,0,0.35)" }
  };
  const [hov, setHov] = useState(false);
  return (
    <button onClick={disabled?undefined:onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant||"primary"],
        transform:hov&&!disabled?"translateY(-1px)":"none",
        filter:hov&&!disabled?"brightness(1.1)":"none",
        ...extraStyle }}>
      {icon && <span style={{fontSize:13}}>{icon}</span>}
      {children}
    </button>
  );
}

function Card({ children, style={}, glow=false }) {
  return (
    <div style={{
      background:C1, borderRadius:14, padding:24,
      border:`1px solid ${glow?BD2:BD}`,
      boxShadow: glow ? `0 0 24px ${T}18, 0 4px 24px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
      ...style
    }}>{children}</div>
  );
}

function KpiCard({ label, value, sub, color=T, icon }) {
  return (
    <Card style={{ flex:1, minWidth:150 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>{label}</div>
          <div style={{ color:TX1, fontSize:28, fontWeight:700, lineHeight:1 }}>{value}</div>
          {sub && <div style={{ color:TX2, fontSize:12, marginTop:6 }}>{sub}</div>}
        </div>
        {icon && (
          <div style={{ width:40, height:40, borderRadius:10, background:color+"18",
            border:`1px solid ${color}33`, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:18 }}>{icon}</div>
        )}
      </div>
      <div style={{ marginTop:16, height:2, borderRadius:2, background:`linear-gradient(90deg,${color},${color}33)` }}/>
    </Card>
  );
}

function SectionHeader({ title, sub, right }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
      <div>
        <h2 style={{ margin:0, color:TX1, fontSize:20, fontWeight:700 }}>{title}</h2>
        {sub && <p style={{ margin:"4px 0 0", color:TX2, fontSize:13 }}>{sub}</p>}
      </div>
      {right && <div style={{ display:"flex", gap:10, alignItems:"center" }}>{right}</div>}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder="Search...", style={} }) {
  return (
    <div style={{ position:"relative", ...style }}>
      <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:TX3, fontSize:14, pointerEvents:"none" }}>⌕</span>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:"8px 12px 8px 34px",
          color:TX1, fontSize:13, outline:"none", width:"100%", boxSizing:"border-box",
          fontFamily:"inherit", transition:"border 0.2s" }}
        onFocus={e=>e.target.style.borderColor=T+"88"}
        onBlur={e=>e.target.style.borderColor=BD}
      />
    </div>
  );
}

function Select({ value, onChange, options, style={} }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8,
        padding:"8px 14px", color:TX1, fontSize:13, outline:"none",
        fontFamily:"inherit", cursor:"pointer", ...style }}>
      {options.map(o => <option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  );
}

// ─── NAV ICONS ────────────────────────────────────────────────────────────────
const NavIcons = {
  Dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Athletes: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Agencies: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Teams: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Pipeline: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  Contacts: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  Export: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Gmail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Activity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
};

// ─── IMPORT CSV MODAL ─────────────────────────────────────────────────────────
function ImportCSVModal({ onClose, onImport, mode = "athletes" }) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [mapping, setMapping] = useState({});
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(0);
  const fileRef = useRef();

  const athleteFields = ["athlete","team","league","agency","agent","email","status","notes"];
  const contactFields = ["name","company","category","email","phone","notes"];
  const fields = mode==="athletes" ? athleteFields : contactFields;

  const handleFile = e => {
    const f = e.target.files[0]; if(!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = ev => {
      const { headers, rows } = parseCSV(ev.target.result);
      setParsed({ headers, rows });
      const autoMap = {};
      fields.forEach(field => {
        const match = headers.find(h =>
          h.toLowerCase().replace(/[^a-z0-9]/g,"").includes(field.replace(/[^a-z0-9]/g,""))
        );
        if(match) autoMap[field] = match;
      });
      setMapping(autoMap);
      setStep(2);
    };
    reader.readAsText(f);
  };

  const doImport = async () => {
    setImporting(true); setStep(3);
    const rows = parsed.rows.map(row => {
      const obj = {};
      fields.forEach(f => { if(mapping[f]) obj[f] = row[mapping[f]] || ""; });
      return obj;
    }).filter(r => Object.values(r).some(v=>v));
    await onImport(rows, mode);
    setDone(rows.length); setImporting(false);
  };

  const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", backdropFilter:"blur(8px)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 };
  const box = { background:C1, border:`1px solid ${BD2}`, borderRadius:16, padding:32,
    width:"min(560px,92vw)", boxShadow:`0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${T}18` };

  return (
    <div style={overlay} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={box}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <div style={{ color:TX1, fontSize:17, fontWeight:700 }}>Import CSV — {mode==="athletes"?"Athletes":"Contacts"}</div>
            <div style={{ color:TX2, fontSize:12, marginTop:3 }}>Steps: Select file → Map columns → Import</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TX2, fontSize:22, cursor:"pointer", padding:4 }}>✕</button>
        </div>

        {/* Steps indicator */}
        <div style={{ display:"flex", gap:8, marginBottom:28 }}>
          {["File","Map","Import"].map((s,i)=>(
            <div key={s} style={{ flex:1, textAlign:"center" }}>
              <div style={{ height:3, borderRadius:3, background:step>i?T:step===i?T+"55":TX3+"44", marginBottom:4 }}/>
              <div style={{ fontSize:11, color:step>=i?T:TX3, fontWeight:600 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Drop file */}
        {step < 2 && (
          <div>
            <div onClick={()=>fileRef.current.click()}
              style={{ border:`2px dashed ${BD2}`, borderRadius:12, padding:40,
                textAlign:"center", cursor:"pointer", background:C2,
                transition:"border 0.2s, background 0.2s" }}
              onDragOver={e=>e.preventDefault()}
              onDrop={e=>{ e.preventDefault(); const f=e.dataTransfer.files[0]; if(f){ fileRef.current.files=e.dataTransfer.files; handleFile({target:{files:[f]}}); } }}>
              <div style={{ fontSize:36, marginBottom:12 }}>📁</div>
              <div style={{ color:TX1, fontWeight:600, marginBottom:4 }}>Drop CSV here or click to browse</div>
              <div style={{ color:TX2, fontSize:12 }}>Supports .csv files up to 10MB</div>
            </div>
            <input ref={fileRef} type="file" accept=".csv" style={{display:"none"}} onChange={handleFile}/>
          </div>
        )}

        {/* Step 2: Map columns */}
        {step===2 && parsed && (
          <div>
            <div style={{ color:TX2, fontSize:12, marginBottom:16 }}>
              Found <strong style={{color:TX1}}>{parsed.rows.length}</strong> rows with <strong style={{color:TX1}}>{parsed.headers.length}</strong> columns.
              Map CSV columns to CRM fields:
            </div>
            <div style={{ display:"grid", gap:10, maxHeight:320, overflowY:"auto" }}>
              {fields.map(field => (
                <div key={field} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:120, color:TX1, fontSize:13, fontWeight:600, textTransform:"capitalize" }}>{field}</div>
                  <select value={mapping[field]||""} onChange={e=>setMapping(m=>({...m,[field]:e.target.value}))}
                    style={{ flex:1, background:C3, border:`1px solid ${BD}`, borderRadius:8, padding:"7px 12px",
                      color:TX1, fontSize:13, outline:"none", fontFamily:"inherit" }}>
                    <option value="">— skip —</option>
                    {parsed.headers.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <Btn onClick={()=>setStep(0)} variant="ghost">← Back</Btn>
              <Btn onClick={doImport} style={{marginLeft:"auto"}}>Import {parsed.rows.length} rows →</Btn>
            </div>
          </div>
        )}

        {/* Step 3: Importing */}
        {step===3 && (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            {importing ? (
              <>
                <div style={{ fontSize:40, marginBottom:16 }}>⏳</div>
                <div style={{ color:TX1, fontWeight:600 }}>Importing into Supabase...</div>
                <div style={{ color:TX2, fontSize:12, marginTop:6 }}>Please wait</div>
              </>
            ) : (
              <>
                <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                <div style={{ color:TX1, fontWeight:700, fontSize:18 }}>Done! {done} records imported</div>
                <div style={{ color:TX2, fontSize:13, marginTop:6 }}>Data is now in your CRM</div>
                <div style={{ marginTop:20 }}>
                  <Btn onClick={onClose}>Close</Btn>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GMAIL CONNECT MODAL ──────────────────────────────────────────────────────
function GmailConnectModal({ onClose, onImport }) {
  const [step, setStep]   = useState(0); // 0=info, 1=loading, 2=preview, 3=done
  const [token, setToken] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [query, setQuery]   = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const loadGSI = () => new Promise((res, rej) => {
    if (window.google?.accounts) { res(); return; }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });

  const connectGmail = async () => {
    setStep(1); setError("");
    try {
      await loadGSI();
      if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
        setError("⚠️ Set REACT_APP_GOOGLE_CLIENT_ID in your .env file (see README).");
        setStep(0); return;
      }
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/gmail.readonly",
        callback: async (resp) => {
          if (resp.error) { setError(`Auth error: ${resp.error}`); setStep(0); return; }
          setToken(resp.access_token);
          await fetchContacts(resp.access_token);
        }
      });
      tokenClient.requestAccessToken({ prompt:"consent" });
    } catch(e) {
      setError(`Failed to load Google Sign-In: ${e.message}`);
      setStep(0);
    }
  };

  const fetchContacts = async (accessToken) => {
    setProgress(5);
    try {
      // 1. Fetch list of sent message IDs
      const listRes = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=SENT&maxResults=200&q=in:sent",
        { headers:{ Authorization:`Bearer ${accessToken}` } }
      );
      if (!listRes.ok) throw new Error(`Gmail API error: ${listRes.status}`);
      const listData = await listRes.json();
      const messages = listData.messages || [];
      setProgress(15);

      // 2. Fetch headers in batches
      const contactMap = new Map();
      const batchSize  = 25;
      for (let i = 0; i < Math.min(messages.length, 200); i += batchSize) {
        const batch = messages.slice(i, i + batchSize);
        await Promise.all(batch.map(async msg => {
          const r = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=To&metadataHeaders=Cc`,
            { headers:{ Authorization:`Bearer ${accessToken}` } }
          );
          const data = await r.json();
          const headers = data.payload?.headers || [];
          ["To","Cc"].forEach(hName => {
            const h = headers.find(x=>x.name===hName);
            if (!h) return;
            parseEmailAddresses(h.value).forEach(({name, email}) => {
              if (!contactMap.has(email)) {
                contactMap.set(email, {
                  name, email,
                  category: categorizeEmail(email),
                  source:"Gmail History",
                  count:1
                });
              } else {
                contactMap.get(email).count++;
              }
            });
          });
        }));
        setProgress(15 + Math.round((i/Math.min(messages.length,200))*80));
      }

      const all = Array.from(contactMap.values()).sort((a,b)=>b.count-a.count);
      setContacts(all);
      setSelected(new Set(all.map(c=>c.email)));
      setProgress(100);
      setStep(2);
    } catch(e) {
      setError(`Error fetching Gmail: ${e.message}`);
      setStep(0);
    }
  };

  const doImport = async () => {
    const toImport = contacts.filter(c => selected.has(c.email));
    await onImport(toImport, "contacts");
    setStep(3);
  };

  const cats = ["All", ...new Set(contacts.map(c=>c.category))];
  const visible = contacts.filter(c =>
    (filterCat==="All" || c.category===filterCat) &&
    (c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase()))
  );

  const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(10px)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 };
  const box = { background:C1, border:`1px solid ${BD2}`, borderRadius:18, padding:32,
    width:"min(680px,96vw)", maxHeight:"90vh", display:"flex", flexDirection:"column",
    boxShadow:`0 32px 80px rgba(0,0,0,0.7), 0 0 50px ${T}22` };

  return (
    <div style={overlay} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={box}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            {NavIcons.Gmail}
            <div>
              <div style={{ color:TX1, fontSize:17, fontWeight:700 }}>Gmail Contact Extractor</div>
              <div style={{ color:TX2, fontSize:12 }}>Scan your sent email history · End-to-end secure</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TX2, fontSize:20, cursor:"pointer" }}>✕</button>
        </div>

        {/* Security badge */}
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {["🔒 OAuth 2.0","📖 Read-only scope","🚫 No data stored on servers","⚡ In-memory only"].map(b=>(
            <span key={b} style={{ background:GREEN+"18", border:`1px solid ${GREEN}33`, color:GREEN,
              borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:600 }}>{b}</span>
          ))}
        </div>

        {error && (
          <div style={{ background:WINE+"22", border:`1px solid ${WINE}44`, borderRadius:8,
            padding:"10px 14px", color:"#ff9999", fontSize:13, marginBottom:16 }}>{error}</div>
        )}

        {/* Step 0: Info */}
        {step===0 && (
          <div>
            <Card style={{ marginBottom:20 }}>
              <h3 style={{ margin:"0 0 12px", color:TX1, fontSize:15 }}>How it works</h3>
              <div style={{ display:"grid", gap:10 }}>
                {[
                  ["1", "Sign in with your Google account using secure OAuth 2.0"],
                  ["2", "ATLAUA reads your sent email headers only — never email bodies"],
                  ["3", "Unique recipients are extracted and auto-categorized (Agency, Brand, Media, Team...)"],
                  ["4", "You review & select which contacts to import into the CRM"],
                  ["5", "Your Gmail token is never stored — it expires when you close the tab"]
                ].map(([n,t])=>(
                  <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:T+"22",
                      border:`1px solid ${T}44`, color:T, fontSize:11, fontWeight:700,
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{n}</div>
                    <div style={{ color:TX2, fontSize:13 }}>{t}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Btn onClick={connectGmail} variant="google" size="lg" style={{ width:"100%", justifyContent:"center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Connect with Google
            </Btn>
          </div>
        )}

        {/* Step 1: Loading */}
        {step===1 && (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ fontSize:40, marginBottom:20 }}>📡</div>
            <div style={{ color:TX1, fontWeight:700, fontSize:16, marginBottom:8 }}>Scanning your Gmail history...</div>
            <div style={{ color:TX2, fontSize:13, marginBottom:20 }}>Reading sent email headers only</div>
            <div style={{ background:C3, borderRadius:8, height:8, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${T},${T}AA)`,
                borderRadius:8, transition:"width 0.4s ease" }}/>
            </div>
            <div style={{ color:TX3, fontSize:12, marginTop:8 }}>{progress}% complete</div>
          </div>
        )}

        {/* Step 2: Preview */}
        {step===2 && (
          <div style={{ display:"flex", flexDirection:"column", flex:1, minHeight:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              <div style={{ color:TX1, fontSize:14, fontWeight:600 }}>
                {contacts.length} unique contacts found
              </div>
              <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                <SearchInput value={query} onChange={setQuery} placeholder="Search..." style={{width:180}}/>
                <Select value={filterCat} onChange={setFilterCat}
                  options={cats.map(c=>({value:c,label:c}))} />
              </div>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              <Btn size="sm" variant="ghost" onClick={()=>setSelected(new Set(contacts.map(c=>c.email)))}>Select all</Btn>
              <Btn size="sm" variant="ghost" onClick={()=>setSelected(new Set())}>Deselect all</Btn>
              <span style={{ color:TX2, fontSize:12, alignSelf:"center", marginLeft:4 }}>
                {selected.size} selected
              </span>
            </div>
            <div style={{ overflowY:"auto", flex:1, minHeight:200, maxHeight:320 }}>
              {visible.map(c => (
                <div key={c.email} onClick={()=>setSelected(prev=>{
                  const n=new Set(prev);
                  n.has(c.email)?n.delete(c.email):n.add(c.email);
                  return n;
                })} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px",
                  borderRadius:8, cursor:"pointer", marginBottom:4,
                  background: selected.has(c.email) ? T+"14" : C2,
                  border:`1px solid ${selected.has(c.email)?T+"44":BD}`,
                  transition:"all 0.15s" }}>
                  <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${selected.has(c.email)?T:TX3}`,
                    background:selected.has(c.email)?T:"transparent", display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                    {selected.has(c.email) && <span style={{color:"#0A0613",fontSize:11,fontWeight:800}}>✓</span>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ color:TX1, fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div>
                    <div style={{ color:TX2, fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.email}</div>
                  </div>
                  <Tag label={c.category} color={categorizeEmail(c.email)==="Agency"?T:categorizeEmail(c.email)==="Team"?WINE:GOLD}/>
                  <div style={{ color:TX3, fontSize:11 }}>{c.count}×</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, display:"flex", gap:10, justifyContent:"flex-end" }}>
              <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
              <Btn onClick={doImport} disabled={selected.size===0}>Import {selected.size} contacts →</Btn>
            </div>
          </div>
        )}

        {/* Step 3: Done */}
        {step===3 && (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
            <div style={{ color:TX1, fontSize:20, fontWeight:700, marginBottom:8 }}>Contacts imported!</div>
            <div style={{ color:TX2, fontSize:14 }}>Your Gmail contacts are now in the CRM</div>
            <div style={{ marginTop:24 }}>
              <Btn onClick={onClose}>Back to Contacts</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ATHLETE PANEL ─────────────────────────────────────────────────────────────
function Panel({ a, onClose, onSave }) {
  const [ed, setEd] = useState({ ...a });
  const [tab, setTab] = useState("info");
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState(a.notes || "");

  const save = async () => {
    setSaving(true);
    await onSave({ ...ed, notes:note });
    setSaving(false); onClose();
  };

  const openGmail = () => {
    const subject = `ATLAUA x ${ed.athlete} — Partnership Opportunity`;
    const body = `Hi ${ed.agent},\n\nI hope this message finds you well. I'm reaching out from ATLAUA regarding an exciting partnership opportunity for ${ed.athlete}.\n\nWould love to schedule a call to discuss further.\n\nBest regards,\nATLAUA Team`;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ed.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const field = (label, key, type="text") => (
    <div style={{ marginBottom:14 }}>
      <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block", marginBottom:5 }}>{label}</label>
      {key==="status" ? (
        <select value={ed[key]||""} onChange={e=>setEd(p=>({...p,[key]:e.target.value}))}
          style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:"9px 12px",
            color:TX1, fontSize:13, width:"100%", outline:"none", fontFamily:"inherit" }}>
          {STATUSES.map(s=><option key={s}>{s}</option>)}
        </select>
      ) : (
        <input value={ed[key]||""} onChange={e=>setEd(p=>({...p,[key]:e.target.value}))} type={type}
          style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:"9px 12px",
            color:TX1, fontSize:13, width:"100%", boxSizing:"border-box", outline:"none",
            fontFamily:"inherit", transition:"border 0.2s" }}
          onFocus={e=>e.target.style.borderColor=T+"66"}
          onBlur={e=>e.target.style.borderColor=BD}
        />
      )}
    </div>
  );

  const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)", zIndex:900 };
  const drawer = { position:"fixed", right:0, top:0, bottom:0, width:"min(520px,95vw)",
    background:SB, borderLeft:`1px solid ${BD2}`, boxShadow:`-12px 0 48px rgba(0,0,0,0.5)`,
    display:"flex", flexDirection:"column", zIndex:901 };

  return (
    <>
      <div style={overlay} onClick={onClose}/>
      <div style={drawer}>
        {/* Header */}
        <div style={{ padding:"24px 28px 0", borderBottom:`1px solid ${BD}` }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
            <div>
              <div style={{ color:T, fontSize:11, fontWeight:700, letterSpacing:"0.08em", marginBottom:4 }}>ATHLETE</div>
              <h2 style={{ margin:0, color:TX1, fontSize:22, fontWeight:800 }}>{ed.athlete}</h2>
              <div style={{ marginTop:6, display:"flex", gap:8, flexWrap:"wrap" }}>
                <LeaguePill league={ed.league}/>
                <StatusPill status={ed.status}/>
              </div>
            </div>
            <button onClick={onClose} style={{ background:C2, border:`1px solid ${BD}`, color:TX2,
              borderRadius:8, width:34, height:34, cursor:"pointer", fontSize:16 }}>✕</button>
          </div>
          <div style={{ display:"flex", gap:0, marginBottom:-1 }}>
            {["info","contact","notes"].map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                style={{ flex:1, background:"none", border:"none", borderBottom:`2px solid ${tab===t?T:"transparent"}`,
                  color:tab===t?T:TX2, fontSize:13, fontWeight:600, padding:"10px 0", cursor:"pointer",
                  textTransform:"capitalize", transition:"all 0.2s" }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
          {tab==="info" && (
            <>
              {field("Athlete Name","athlete")}
              {field("Team","team")}
              {field("League","league")}
              {field("Status","status")}
              {field("Agency","agency")}
            </>
          )}
          {tab==="contact" && (
            <>
              {field("Agent Name","agent")}
              {field("Agent Email","email","email")}
              <div style={{ marginTop:16 }}>
                <Btn onClick={openGmail} icon="✉️" style={{ width:"100%", justifyContent:"center" }}>
                  Open Gmail Draft
                </Btn>
                <div style={{ color:TX3, fontSize:11, textAlign:"center", marginTop:8 }}>
                  Opens Gmail compose window in a new tab
                </div>
              </div>
            </>
          )}
          {tab==="notes" && (
            <>
              <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", display:"block", marginBottom:8 }}>NOTES</label>
              <textarea value={note} onChange={e=>setNote(e.target.value)}
                rows={10} placeholder="Add notes about this athlete..."
                style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:12,
                  color:TX1, fontSize:13, width:"100%", boxSizing:"border-box", resize:"vertical",
                  outline:"none", fontFamily:"inherit", lineHeight:1.6 }}
                onFocus={e=>e.target.style.borderColor=T+"66"}
                onBlur={e=>e.target.style.borderColor=BD}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"16px 28px", borderTop:`1px solid ${BD}`, display:"flex", gap:10 }}>
          <Btn onClick={onClose} variant="ghost" style={{flex:1, justifyContent:"center"}}>Cancel</Btn>
          <Btn onClick={save} style={{flex:2, justifyContent:"center"}} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Btn>
        </div>
      </div>
    </>
  );
}

// ─── ADD MODAL ────────────────────────────────────────────────────────────────
function AddModal({ onClose, onAdd }) {
  const [mode, setMode] = useState("athlete");
  const def = { athlete:"", team:"", league:"NFL", agency:"", agent:"", email:"", status:"Contacted", notes:"" };
  const [form, setForm] = useState(def);

  const upd = (k,v) => setForm(p=>({...p,[k]:v}));
  const submit = () => { onAdd(form, mode); onClose(); };

  const inp = (label, key, type="text") => (
    <div style={{ marginBottom:12 }}>
      <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", display:"block", marginBottom:5 }}>{label}</label>
      {key==="league"||key==="status" ? (
        <select value={form[key]} onChange={e=>upd(key,e.target.value)}
          style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:"9px 12px",
            color:TX1, fontSize:13, width:"100%", outline:"none", fontFamily:"inherit" }}>
          {(key==="league"?LEAGUES:STATUSES).map(o=><option key={o}>{o}</option>)}
        </select>
      ) : (
        <input value={form[key]||""} type={type} onChange={e=>upd(key,e.target.value)}
          style={{ background:C2, border:`1px solid ${BD}`, borderRadius:8, padding:"9px 12px",
            color:TX1, fontSize:13, width:"100%", boxSizing:"border-box", outline:"none", fontFamily:"inherit" }}
          onFocus={e=>e.target.style.borderColor=T+"66"}
          onBlur={e=>e.target.style.borderColor=BD}
        />
      )}
    </div>
  );

  const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 };
  const box = { background:C1, border:`1px solid ${BD2}`, borderRadius:16, padding:32,
    width:"min(480px,92vw)", boxShadow:`0 24px 64px rgba(0,0,0,0.6)` };

  return (
    <div style={overlay} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={box}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ color:TX1, fontSize:17, fontWeight:700 }}>Add New</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TX2, fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {["athlete","contact"].map(m=>(
            <button key={m} onClick={()=>setMode(m)}
              style={{ flex:1, padding:"8px 0", borderRadius:8, border:`1px solid ${mode===m?T+"66":BD}`,
                background:mode===m?T+"18":"transparent", color:mode===m?T:TX2,
                cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit", textTransform:"capitalize" }}>
              {m}
            </button>
          ))}
        </div>
        {mode==="athlete" && (
          <>
            {inp("Athlete Name","athlete")}{inp("Team","team")}{inp("League","league")}
            {inp("Agency","agency")}{inp("Agent Name","agent")}{inp("Agent Email","email","email")}{inp("Status","status")}
          </>
        )}
        {mode==="contact" && (
          <>
            {inp("Full Name","athlete")}{inp("Company","agency")}{inp("Email","email","email")}{inp("Status","status")}
          </>
        )}
        <div style={{ display:"flex", gap:10, marginTop:16 }}>
          <Btn onClick={onClose} variant="ghost" style={{flex:1,justifyContent:"center"}}>Cancel</Btn>
          <Btn onClick={submit} style={{flex:2,justifyContent:"center"}}>Add Record</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ athletes }) {
  const total    = athletes.length;
  const byStatus = useMemo(()=>STATUSES.reduce((a,s)=>({ ...a,[s]: athletes.filter(x=>x.status===s).length }),{}), [athletes]);
  const byLeague = useMemo(()=>LEAGUES.map(l=>({ name:l, value:athletes.filter(x=>x.league===l).length, color:LCOLS[l] })).filter(x=>x.value), [athletes]);

  const topAgencies = useMemo(()=>{
    const m={}; athletes.forEach(a=>{ if(a.agency) m[a.agency]=(m[a.agency]||0)+1; });
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,count])=>({name,count}));
  },[athletes]);

  const trend = useMemo(()=>{
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months.map((m,i)=>({ month:m, athletes: Math.round(total*(0.4+0.07*i)+Math.random()*10) }));
  },[total]);

  const pipelineData = STATUSES.filter(s=>s!=="Pending").map(s=>({
    name: s.replace("Proposal Sent","Proposal").replace("Closed ",""),
    value: byStatus[s]||0, color: SCOL[s]
  }));

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${C2} 0%, ${C3} 50%, ${T}18 100%)`,
        borderRadius:16, padding:"28px 32px", marginBottom:24, border:`1px solid ${BD2}`,
        position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, width:200, height:200,
          borderRadius:"50%", background:T, opacity:0.04, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:60, bottom:-50, width:150, height:150,
          borderRadius:"50%", background:WINE, opacity:0.06, pointerEvents:"none" }}/>
        <div style={{ color:TX3, fontSize:12, fontWeight:700, letterSpacing:"0.1em", marginBottom:8 }}>ATLAUA SPORTS CRM</div>
        <h1 style={{ margin:0, color:TX1, fontSize:32, fontWeight:800, letterSpacing:"-0.02em" }}>
          Good {new Date().getHours()<12?"morning":"afternoon"} Mr Sound 👋
        </h1>
        <p style={{ margin:"8px 0 0", color:TX2, fontSize:15 }}>Here's your pipeline overview for today · {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" }}>
        <KpiCard label="Total Athletes" value={total} sub="in database" icon="🏅" color={T}/>
        <KpiCard label="Active Deals" value={byStatus.Negotiating||0} sub="in negotiation" icon="🤝" color={GOLD}/>
        <KpiCard label="Closed Won" value={byStatus["Closed Won"]||0} sub="signed" icon="✅" color={GREEN}/>
        <KpiCard label="Proposals Out" value={byStatus["Proposal Sent"]||0} sub="pending response" icon="📄" color={PURP}/>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:24 }}>
        {/* Trend chart */}
        <Card>
          <div style={{ color:TX1, fontWeight:700, fontSize:15, marginBottom:4 }}>Outreach Trend</div>
          <div style={{ color:TX2, fontSize:12, marginBottom:20 }}>Athletes tracked by month</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"   stopColor={T} stopOpacity={0.35}/>
                  <stop offset="95%"  stopColor={T} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke={BD} strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="month" tick={{fill:TX3, fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:TX3, fontSize:11}} axisLine={false} tickLine={false} width={36}/>
              <Tooltip contentStyle={{ background:C3, border:`1px solid ${BD2}`, borderRadius:8, color:TX1, fontSize:12 }}/>
              <Area type="monotone" dataKey="athletes" stroke={T} strokeWidth={2.5} fill="url(#aGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* By league */}
        <Card>
          <div style={{ color:TX1, fontWeight:700, fontSize:15, marginBottom:4 }}>By League</div>
          <div style={{ color:TX2, fontSize:12, marginBottom:16 }}>Distribution</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={byLeague} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="value" nameKey="name" paddingAngle={3}>
                {byLeague.map((e,i)=><Cell key={i} fill={e.color} stroke="none"/>)}
              </Pie>
              <Tooltip contentStyle={{ background:C3, border:`1px solid ${BD2}`, borderRadius:8, color:TX1, fontSize:12 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
            {byLeague.map(l=>(
              <div key={l.name} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:l.color }}/>
                <span style={{ color:TX2, fontSize:11 }}>{l.name} {l.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pipeline + Top Agencies */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Pipeline funnel */}
        <Card>
          <div style={{ color:TX1, fontWeight:700, fontSize:15, marginBottom:18 }}>Pipeline Breakdown</div>
          {pipelineData.map(({ name, value, color }) => (
            <div key={name} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ color:TX2, fontSize:13 }}>{name}</span>
                <span style={{ color:TX1, fontSize:13, fontWeight:700 }}>{value}</span>
              </div>
              <div style={{ height:6, borderRadius:6, background:C3 }}>
                <div style={{ height:"100%", width:`${total?Math.round((value/total)*100):0}%`,
                  background:`linear-gradient(90deg,${color},${color}99)`, borderRadius:6,
                  transition:"width 0.8s ease" }}/>
              </div>
            </div>
          ))}
        </Card>

        {/* Top agencies */}
        <Card>
          <div style={{ color:TX1, fontWeight:700, fontSize:15, marginBottom:18 }}>Top Agencies</div>
          {topAgencies.map((a,i)=>(
            <div key={a.name} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:T+"22", color:T,
                fontSize:11, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {i+1}
              </div>
              <div style={{ flex:1, color:TX1, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</div>
              <Tag label={String(a.count)} color={T}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── ATHLETES ────────────────────────────────────────────────────────────────
function Athletes({ athletes, onSelect, onImport }) {
  const [q, setQ]           = useState("");
  const [league, setLeague] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort]     = useState({ col:"athlete", dir:"asc" });
  const [page, setPage]     = useState(1);
  const [showImport, setShowImport] = useState(false);
  const PER = 25;

  const filtered = useMemo(()=>{
    let r = athletes;
    if (q)            r=r.filter(a=>Object.values(a).join(" ").toLowerCase().includes(q.toLowerCase()));
    if (league!=="All") r=r.filter(a=>a.league===league);
    if (status!=="All") r=r.filter(a=>a.status===status);
    return [...r].sort((a,b)=>{
      const av=a[sort.col]||"", bv=b[sort.col]||"";
      return sort.dir==="asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  },[athletes,q,league,status,sort]);

  const pages  = Math.ceil(filtered.length/PER);
  const paged  = filtered.slice((page-1)*PER, page*PER);
  const thSort = col => setSort(s=>({ col, dir: s.col===col&&s.dir==="asc"?"desc":"asc" }));

  const exportCSV = () => {
    const rows = [["Athlete","Team","League","Agency","Agent","Email","Status"],
      ...filtered.map(a=>[a.athlete,a.team,a.league,a.agency,a.agent,a.email,a.status])];
    const csv  = rows.map(r=>r.map(c=>`"${(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a    = document.createElement("a");
    a.href     = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = `athletes_${TODAY}.csv`;
    a.click();
  };

  const Th = ({ col, label }) => (
    <th onClick={()=>thSort(col)} style={{ padding:"10px 14px", color:sort.col===col?T:TX3,
      fontSize:11, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase",
      cursor:"pointer", whiteSpace:"nowrap", userSelect:"none", borderBottom:`1px solid ${BD}` }}>
      {label} {sort.col===col ? (sort.dir==="asc"?"↑":"↓") : ""}
    </th>
  );

  return (
    <div>
      <SectionHeader title="Athletes" sub={`${filtered.length} records`}
        right={<>
          <Btn variant="outline" size="sm" onClick={exportCSV} icon="↓">Export CSV</Btn>
          <Btn variant="ghost" size="sm" onClick={()=>setShowImport(true)} icon="↑">Import CSV</Btn>
        </>}
      />

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <SearchInput value={q} onChange={v=>{setQ(v);setPage(1);}} placeholder="Search athletes, agents, agencies..." style={{flex:1,minWidth:200}}/>
        <Select value={league} onChange={v=>{setLeague(v);setPage(1);}}
          options={["All",...LEAGUES].map(l=>({value:l,label:l==="All"?"All Leagues":l}))}/>
        <Select value={status} onChange={v=>{setStatus(v);setPage(1);}}
          options={["All",...STATUSES].map(s=>({value:s,label:s==="All"?"All Statuses":s}))}/>
      </div>

      {/* Table */}
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:C2 }}>
                <Th col="athlete" label="Athlete"/>
                <Th col="team"    label="Team"/>
                <Th col="league"  label="League"/>
                <Th col="agency"  label="Agency"/>
                <Th col="agent"   label="Agent"/>
                <Th col="status"  label="Status"/>
                <th style={{ padding:"10px 14px", borderBottom:`1px solid ${BD}` }}/>
              </tr>
            </thead>
            <tbody>
              {paged.map((a,i)=>(
                <tr key={i} onClick={()=>onSelect(a)} style={{
                  background: i%2===0 ? "transparent" : C2+"88",
                  cursor:"pointer", transition:"background 0.15s"
                }}
                onMouseEnter={e=>e.currentTarget.style.background=T+"12"}
                onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"transparent":C2+"88"}>
                  <td style={{ padding:"12px 14px", color:TX1, fontSize:13, fontWeight:600, whiteSpace:"nowrap" }}>{a.athlete}</td>
                  <td style={{ padding:"12px 14px", color:TX2, fontSize:12 }}>{a.team}</td>
                  <td style={{ padding:"12px 14px" }}><LeaguePill league={a.league}/></td>
                  <td style={{ padding:"12px 14px", color:TX2, fontSize:12 }}>{a.agency}</td>
                  <td style={{ padding:"12px 14px", color:TX2, fontSize:12 }}>{a.agent}</td>
                  <td style={{ padding:"12px 14px" }}><StatusPill status={a.status}/></td>
                  <td style={{ padding:"12px 14px" }}>
                    <button onClick={e=>{e.stopPropagation();onSelect(a);}} style={{
                      background:"none", border:`1px solid ${BD}`, color:TX2, borderRadius:6,
                      padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"14px 20px", borderTop:`1px solid ${BD}` }}>
            <div style={{ color:TX3, fontSize:12 }}>
              Showing {(page-1)*PER+1}–{Math.min(page*PER,filtered.length)} of {filtered.length}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <Btn size="sm" variant="ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>← Prev</Btn>
              {Array.from({length:Math.min(5,pages)},(_,i)=>{
                let p = page <= 3 ? i+1 : page >= pages-2 ? pages-4+i : page-2+i;
                p = Math.max(1, Math.min(pages, p));
                return <button key={p} onClick={()=>setPage(p)}
                  style={{ width:32, height:32, borderRadius:6, border:`1px solid ${p===page?T+"66":BD}`,
                    background:p===page?T+"22":"transparent", color:p===page?T:TX2,
                    cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>{p}</button>;
              })}
              <Btn size="sm" variant="ghost" onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}>Next →</Btn>
            </div>
          </div>
        )}
      </Card>
      {showImport && <ImportCSVModal onClose={()=>setShowImport(false)} onImport={onImport} mode="athletes"/>}
    </div>
  );
}

// ─── AGENCIES ────────────────────────────────────────────────────────────────
function Agencies({ athletes, onSelect }) {
  const [q, setQ]       = useState("");
  const [open, setOpen] = useState(null);
  const agencies = useMemo(()=>{
    const m={};
    athletes.forEach(a=>{ if(!a.agency) return;
      if(!m[a.agency]) m[a.agency]={ name:a.agency, agent:a.agent, email:a.email, athletes:[] };
      m[a.agency].athletes.push(a);
    });
    return Object.values(m).sort((a,b)=>b.athletes.length-a.athletes.length)
      .filter(a=>a.name.toLowerCase().includes(q.toLowerCase()));
  },[athletes,q]);

  return (
    <div>
      <SectionHeader title="Agencies" sub={`${agencies.length} agencies`}/>
      <SearchInput value={q} onChange={setQ} placeholder="Search agencies..." style={{ marginBottom:20, maxWidth:360 }}/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
        {agencies.map(ag=>(
          <Card key={ag.name} style={{ cursor:"pointer", transition:"border 0.2s" }}
            glow={open===ag.name}>
            <div onClick={()=>setOpen(o=>o===ag.name?null:ag.name)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <div style={{ color:TX1, fontSize:15, fontWeight:700, marginBottom:4 }}>{ag.name}</div>
                  <div style={{ color:TX2, fontSize:12 }}>{ag.agent}</div>
                  <a href={`mailto:${ag.email}`} onClick={e=>e.stopPropagation()}
                    style={{ color:T, fontSize:12, textDecoration:"none" }}>{ag.email}</a>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <Tag label={`${ag.athletes.length} athletes`} color={T}/>
                  <span style={{ color:TX3, fontSize:12 }}>{open===ag.name?"▲":"▼"}</span>
                </div>
              </div>
            </div>
            {open===ag.name && (
              <div style={{ borderTop:`1px solid ${BD}`, paddingTop:12, marginTop:4 }}>
                {ag.athletes.map(a=>(
                  <div key={a.athlete} onClick={()=>onSelect(a)}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:4,
                      background:C2, transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=T+"18"}
                    onMouseLeave={e=>e.currentTarget.style.background=C2}>
                    <div style={{ color:TX1, fontSize:13 }}>{a.athlete}</div>
                    <div style={{ display:"flex", gap:6 }}>
                      <LeaguePill league={a.league}/>
                      <StatusPill status={a.status}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── TEAMS ────────────────────────────────────────────────────────────────────
function Teams({ athletes, onSelect }) {
  const [q, setQ]        = useState("");
  const [league, setLeague] = useState("All");
  const [open, setOpen]  = useState(null);

  const teams = useMemo(()=>{
    const m={};
    athletes.forEach(a=>{ if(!a.team) return;
      if(!m[a.team]) m[a.team]={ name:a.team, league:a.league, athletes:[] };
      m[a.team].athletes.push(a);
    });
    return Object.values(m)
      .filter(t => (league==="All"||t.league===league) && t.name.toLowerCase().includes(q.toLowerCase()))
      .sort((a,b)=>b.athletes.length-a.athletes.length);
  },[athletes,q,league]);

  const byLeague = LEAGUES.map(l=>({ l, teams:teams.filter(t=>t.league===l) })).filter(x=>x.teams.length);

  return (
    <div>
      <SectionHeader title="Teams" sub={`${teams.length} teams`}/>
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        <SearchInput value={q} onChange={setQ} placeholder="Search teams..." style={{flex:1,maxWidth:360}}/>
        <Select value={league} onChange={setLeague} options={["All",...LEAGUES].map(l=>({value:l,label:l==="All"?"All Leagues":l}))}/>
      </div>
      {byLeague.map(({ l, teams:lt })=>(
        <div key={l} style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <span style={{ fontSize:20 }}>{ICONS[l]}</span>
            <h3 style={{ margin:0, color:LCOLS[l]||T, fontSize:16, fontWeight:700 }}>{l}</h3>
            <Tag label={`${lt.length} teams`} color={LCOLS[l]||T}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
            {lt.map(team=>(
              <Card key={team.name} style={{ cursor:"pointer" }} glow={open===team.name}>
                <div onClick={()=>setOpen(o=>o===team.name?null:team.name)}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ color:TX1, fontSize:14, fontWeight:700 }}>{team.name}</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <Tag label={`${team.athletes.length}`} color={LCOLS[l]||T}/>
                      <span style={{ color:TX3 }}>{open===team.name?"▲":"▼"}</span>
                    </div>
                  </div>
                </div>
                {open===team.name && (
                  <div style={{ borderTop:`1px solid ${BD}`, paddingTop:10, marginTop:10 }}>
                    {team.athletes.map(a=>(
                      <div key={a.athlete} onClick={()=>onSelect(a)}
                        style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                          padding:"7px 10px", borderRadius:8, cursor:"pointer", marginBottom:3,
                          background:C2, transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background=T+"18"}
                        onMouseLeave={e=>e.currentTarget.style.background=C2}>
                        <div style={{ color:TX1, fontSize:13 }}>{a.athlete}</div>
                        <StatusPill status={a.status}/>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PIPELINE (Kanban) ────────────────────────────────────────────────────────
function Pipeline({ athletes, onUpdate, onSelect }) {
  const [dragging, setDragging] = useState(null);
  const [q, setQ] = useState("");

  const cols = STATUSES.filter(s=>s!=="Pending");
  const cards = useMemo(()=>athletes.filter(a=>
    !q || a.athlete.toLowerCase().includes(q.toLowerCase()) || a.agency.toLowerCase().includes(q.toLowerCase())
  ),[athletes,q]);

  const drop = (status) => {
    if (!dragging) return;
    onUpdate({ ...dragging, status });
    setDragging(null);
  };

  return (
    <div>
      <SectionHeader title="Pipeline" sub="Drag athletes between stages"/>
      <SearchInput value={q} onChange={setQ} placeholder="Filter cards..." style={{maxWidth:320,marginBottom:20}}/>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols.length},1fr)`, gap:12, overflowX:"auto" }}>
        {cols.map(col=>{
          const colCards = cards.filter(a=>a.status===col);
          const color    = SCOL[col]||TX2;
          return (
            <div key={col}
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>drop(col)}
              style={{ background:C1, border:`1px solid ${dragging?BD2:BD}`,
                borderRadius:12, padding:"14px 12px", minHeight:480 }}>
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ height:3, width:40, borderRadius:3, background:color, marginBottom:8 }}/>
                  <Tag label={String(colCards.length)} color={color}/>
                </div>
                <div style={{ color:TX1, fontSize:13, fontWeight:700 }}>{col}</div>
              </div>
              {colCards.map(a=>(
                <div key={a.athlete}
                  draggable
                  onDragStart={()=>setDragging(a)}
                  onDragEnd={()=>setDragging(null)}
                  onClick={()=>onSelect(a)}
                  style={{ background:C2, border:`1px solid ${BD}`, borderRadius:10,
                    padding:"12px 14px", marginBottom:10, cursor:"grab",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.3)", transition:"transform 0.15s, box-shadow 0.15s",
                    opacity: dragging?.athlete===a.athlete ? 0.5 : 1 }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px rgba(0,0,0,0.4),0 0 12px ${color}22`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.3)"; }}>
                  <div style={{ color:TX1, fontSize:13, fontWeight:700, marginBottom:4 }}>{a.athlete}</div>
                  <div style={{ color:TX2, fontSize:11, marginBottom:8 }}>{a.agency}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <LeaguePill league={a.league}/>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONTACTS (Grouped) ───────────────────────────────────────────────────────
function Contacts({ contacts, onImport }) {
  const [q, setQ]         = useState("");
  const [showImport, setShowImport]   = useState(false);
  const [showGmail, setShowGmail]     = useState(false);
  const [openCats, setOpenCats]       = useState(new Set(["Agency","Brand","Media","Team","Partner","Other"]));
  const [filterCat, setFilterCat]     = useState("All");

  const cats = ["Agency","Brand","Media","Team","Partner","Distributor","Other"];
  const filtered = useMemo(()=>contacts.filter(c=>
    (filterCat==="All"||c.category===filterCat) &&
    (!q || (c.name||"").toLowerCase().includes(q.toLowerCase()) || (c.email||"").toLowerCase().includes(q.toLowerCase()) || (c.company||"").toLowerCase().includes(q.toLowerCase()))
  ),[contacts,q,filterCat]);

  const grouped = useMemo(()=>{
    const m={};
    filtered.forEach(c=>{
      const cat = c.category||"Other";
      if(!m[cat]) m[cat]=[];
      m[cat].push(c);
    });
    return m;
  },[filtered]);

  const toggleCat = cat => setOpenCats(s=>{ const n=new Set(s); n.has(cat)?n.delete(cat):n.add(cat); return n; });

  return (
    <div>
      <SectionHeader title="Contacts"
        sub={`${filtered.length} contacts`}
        right={<>
          <Btn size="sm" variant="ghost" onClick={()=>setShowImport(true)} icon="↑">Import CSV</Btn>
          <Btn size="sm" onClick={()=>setShowGmail(true)}
            style={{ background:`linear-gradient(135deg,#4285F4,#34A853)`, color:"#fff", boxShadow:"0 4px 14px rgba(66,133,244,0.35)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Extract from Gmail
          </Btn>
        </>}
      />

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <SearchInput value={q} onChange={setQ} placeholder="Search contacts..." style={{flex:1,minWidth:200}}/>
        <Select value={filterCat} onChange={setFilterCat}
          options={["All",...cats].map(c=>({value:c,label:c==="All"?"All Categories":c}))}/>
      </div>

      {cats.filter(cat=>grouped[cat]?.length).map(cat=>(
        <div key={cat} style={{ marginBottom:14 }}>
          <div onClick={()=>toggleCat(cat)}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 18px",
              background:C2, borderRadius:openCats.has(cat)?"12px 12px 0 0":12,
              cursor:"pointer", border:`1px solid ${BD}`,
              borderBottom: openCats.has(cat) ? "none" : `1px solid ${BD}`,
              transition:"all 0.2s" }}>
            <div style={{ height:14, width:4, borderRadius:4, background:PCOLS[cats.indexOf(cat)%PCOLS.length] }}/>
            <div style={{ color:TX1, fontWeight:700, fontSize:14, flex:1 }}>{cat}</div>
            <Tag label={`${grouped[cat].length}`} color={PCOLS[cats.indexOf(cat)%PCOLS.length]}/>
            <span style={{ color:TX3, fontSize:13 }}>{openCats.has(cat)?"▲":"▼"}</span>
          </div>
          {openCats.has(cat) && (
            <div style={{ border:`1px solid ${BD}`, borderTop:"none", borderRadius:"0 0 12px 12px",
              background:C1, overflow:"hidden" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:C2+"88" }}>
                    {["Name","Company / Email","Source","Actions"].map(h=>(
                      <th key={h} style={{ padding:"9px 16px", color:TX3, fontSize:11, fontWeight:700,
                        letterSpacing:"0.07em", textTransform:"uppercase", textAlign:"left",
                        borderBottom:`1px solid ${BD}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grouped[cat].map((c,i)=>(
                    <tr key={i} style={{ background:i%2===0?"transparent":C2+"55" }}>
                      <td style={{ padding:"11px 16px", color:TX1, fontSize:13, fontWeight:600 }}>{c.name}</td>
                      <td style={{ padding:"11px 16px" }}>
                        <div style={{ color:TX2, fontSize:12 }}>{c.company||""}</div>
                        <a href={`mailto:${c.email}`} style={{ color:T, fontSize:11, textDecoration:"none" }}>{c.email}</a>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <Tag label={c.source||"Manual"} color={TX2} bg={C3}/>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <button onClick={()=>{
                          const url=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(c.email||"")}`;
                          window.open(url,"_blank","noopener,noreferrer");
                        }} style={{ background:"none", border:`1px solid ${BD}`, color:T,
                          borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>
                          Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {!Object.keys(grouped).length && (
        <div style={{ textAlign:"center", padding:"48px 0" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
          <div style={{ color:TX1, fontWeight:600, fontSize:16 }}>No contacts yet</div>
          <div style={{ color:TX2, fontSize:13, marginTop:6 }}>Import a CSV or extract from Gmail to get started</div>
        </div>
      )}

      {showImport && <ImportCSVModal onClose={()=>setShowImport(false)} onImport={onImport} mode="contacts"/>}
      {showGmail  && <GmailConnectModal onClose={()=>setShowGmail(false)} onImport={onImport}/>}
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
function Export({ athletes, contacts }) {
  const [type, setType]     = useState("athletes");
  const [league, setLeague] = useState("All");
  const [status, setStatus] = useState("All");

  const data = useMemo(()=>{
    if(type==="contacts") return contacts;
    let r = athletes;
    if(league!=="All") r=r.filter(a=>a.league===league);
    if(status!=="All") r=r.filter(a=>a.status===status);
    return r;
  },[type,league,status,athletes,contacts]);

  const doExport = () => {
    const headers = type==="athletes"
      ? ["Athlete","Team","League","Agency","Agent","Email","Status","Notes"]
      : ["Name","Company","Category","Email","Source"];
    const rows = type==="athletes"
      ? data.map(a=>[a.athlete,a.team,a.league,a.agency,a.agent,a.email,a.status,a.notes||""])
      : data.map(c=>[c.name,c.company||"",c.category||"",c.email||"",c.source||""]);
    const csv = [headers,...rows].map(r=>r.map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a   = document.createElement("a");
    a.href    = "data:text/csv;charset=utf-8,\uFEFF"+encodeURIComponent(csv);
    a.download= `atlaua_${type}_${TODAY}.csv`;
    a.click();
  };

  return (
    <div>
      <SectionHeader title="Export" sub="Download your CRM data as CSV"/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, maxWidth:800 }}>
        <Card>
          <h3 style={{ margin:"0 0 18px", color:TX1, fontSize:15, fontWeight:700 }}>Export Options</h3>
          <div style={{ marginBottom:14 }}>
            <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", display:"block", marginBottom:6 }}>DATA TYPE</label>
            <div style={{ display:"flex", gap:8 }}>
              {["athletes","contacts"].map(t=>(
                <button key={t} onClick={()=>setType(t)}
                  style={{ flex:1, padding:"9px 0", borderRadius:8, border:`1px solid ${type===t?T+"66":BD}`,
                    background:type===t?T+"18":"transparent", color:type===t?T:TX2,
                    cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit", textTransform:"capitalize" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {type==="athletes" && (
            <>
              <div style={{ marginBottom:14 }}>
                <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", display:"block", marginBottom:6 }}>LEAGUE</label>
                <Select value={league} onChange={setLeague} options={["All",...LEAGUES].map(l=>({value:l,label:l==="All"?"All Leagues":l}))} style={{width:"100%"}}/>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ color:TX3, fontSize:11, fontWeight:600, letterSpacing:"0.06em", display:"block", marginBottom:6 }}>STATUS</label>
                <Select value={status} onChange={setStatus} options={["All",...STATUSES].map(s=>({value:s,label:s==="All"?"All Statuses":s}))} style={{width:"100%"}}/>
              </div>
            </>
          )}
          <Btn onClick={doExport} style={{ width:"100%", justifyContent:"center" }} icon="↓">
            Download CSV ({data.length} records)
          </Btn>
        </Card>
        <Card>
          <h3 style={{ margin:"0 0 18px", color:TX1, fontSize:15, fontWeight:700 }}>Preview</h3>
          <div style={{ color:TX2, fontSize:13, marginBottom:12 }}>{data.length} records will be exported</div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>{(type==="athletes"?["Athlete","League","Status","Agency"]:["Name","Category","Email"]).map(h=>(
                  <th key={h} style={{ padding:"6px 10px", color:TX3, textAlign:"left", borderBottom:`1px solid ${BD}`,
                    fontWeight:700, letterSpacing:"0.06em", fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {data.slice(0,8).map((r,i)=>(
                  <tr key={i} style={{ background:i%2===0?"transparent":C2+"66" }}>
                    {type==="athletes"
                      ? [r.athlete,r.league,r.status,r.agency].map((v,j)=>(
                          <td key={j} style={{ padding:"7px 10px", color:TX1 }}>{j===1?<LeaguePill league={v}/>:j===2?<StatusPill status={v}/>:v}</td>
                        ))
                      : [r.name,r.category,r.email].map((v,j)=>(
                          <td key={j} style={{ padding:"7px 10px", color:TX1 }}>{v}</td>
                        ))
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length>8 && <div style={{ color:TX3, fontSize:11, marginTop:8 }}>+ {data.length-8} more rows</div>}
        </Card>
      </div>
    </div>
  );
}

// ─── ACTIVITY / LOG ───────────────────────────────────────────────────────────
function Activity({ athletes }) {
  const log = useMemo(()=>{
    const actions=["Contacted","Proposal sent to","Negotiation started with","Status updated for","Notes added for","Email sent to"];
    const all=[];
    athletes.slice(0,40).forEach((a,i)=>{
      const daysAgo=Math.floor(Math.random()*90);
      const d=new Date(); d.setDate(d.getDate()-daysAgo);
      all.push({
        id:i, action:actions[Math.floor(Math.random()*actions.length)],
        athlete:a.athlete, agency:a.agency, status:a.status, date:d, email:a.email
      });
    });
    return all.sort((a,b)=>b.date-a.date);
  },[athletes]);

  const [q, setQ] = useState("");
  const filtered  = log.filter(l=>
    l.athlete.toLowerCase().includes(q.toLowerCase()) || l.action.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <SectionHeader title="Activity Log" sub="Recent CRM actions"/>
      <SearchInput value={q} onChange={setQ} placeholder="Filter activity..." style={{maxWidth:340,marginBottom:20}}/>
      <Card>
        {filtered.slice(0,50).map((l,i)=>(
          <div key={l.id} style={{ display:"flex", gap:14, alignItems:"flex-start",
            padding:"14px 0", borderBottom:i<filtered.length-1?`1px solid ${BD}`:"none" }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:T+"22",
              border:`1px solid ${T}44`, display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, color:T, fontSize:14 }}>
              {NavIcons.Activity}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:TX1, fontSize:13 }}>
                <span style={{ color:TX2 }}>{l.action}</span>{" "}
                <strong style={{ color:TX1 }}>{l.athlete}</strong>{" "}
                <span style={{ color:TX3 }}>({l.agency})</span>
              </div>
              <div style={{ color:TX3, fontSize:11, marginTop:4 }}>
                {l.date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} ·{" "}
                <StatusPill status={l.status}/>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]       = useState("Dashboard");
  const [athletes, setAthletes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sel, setSel]         = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sbCollapsed, setSbCollapsed] = useState(false);
  const [globalQ, setGlobalQ] = useState("");

  // Load from Supabase
  useEffect(()=>{
    (async()=>{
      try {
        const { data:ath } = await supabase.from("athletes").select("*");
        if(ath?.length) {
          setAthletes(ath);
        } else {
          // Fallback to local DATA
          setAthletes(DATA.map(r=>({
            athlete:r[0],team:r[1],league:r[2],agency:r[3],agent:r[4],email:r[5],status:r[6],notes:""
          })));
        }
        const { data:con } = await supabase.from("contacts").select("*");
        if(con) setContacts(con);
      } catch {
        setAthletes(DATA.map(r=>({
          athlete:r[0],team:r[1],league:r[2],agency:r[3],agent:r[4],email:r[5],status:r[6],notes:""
        })));
      }
      setLoading(false);
    })();
  },[]);

  const upd = useCallback(async updated => {
    await supabase.from("athletes").update(updated).eq("athlete",updated.athlete);
    setAthletes(prev=>prev.map(a=>a.athlete===updated.athlete?updated:a));
  },[]);

  const addNew = useCallback(async (form, mode) => {
    if(mode==="athlete") {
      const { data } = await supabase.from("athletes").insert([form]).select();
      setAthletes(prev=>[...(data||[form]),...prev]);
    } else {
      const { data } = await supabase.from("contacts").insert([form]).select();
      setContacts(prev=>[...(data||[form]),...prev]);
    }
  },[]);

  const importBatch = useCallback(async (rows, mode) => {
    if(mode==="athletes") {
      const mapped = rows.map(r=>({
        athlete:r.athlete||r.name||"",team:r.team||"",league:r.league||"",
        agency:r.agency||"",agent:r.agent||"",email:r.email||"",
        status:r.status||"Contacted",notes:r.notes||""
      })).filter(r=>r.athlete);
      const CHUNK=50;
      for(let i=0;i<mapped.length;i+=CHUNK) {
        const { data } = await supabase.from("athletes").insert(mapped.slice(i,i+CHUNK)).select();
        if(data) setAthletes(prev=>[...data,...prev]);
      }
    } else {
      const mapped = rows.map(r=>({
        name:r.name||r.athlete||"",company:r.company||r.agency||"",
        category:r.category||categorizeEmail(r.email||""),
        email:r.email||"",source:r.source||"Import",phone:r.phone||"",notes:r.notes||""
      })).filter(r=>r.name||r.email);
      const CHUNK=50;
      for(let i=0;i<mapped.length;i+=CHUNK) {
        const { data } = await supabase.from("contacts").insert(mapped.slice(i,i+CHUNK)).select();
        if(data) setContacts(prev=>[...data,...prev]);
      }
    }
  },[]);

  const navItems = [
    { id:"Dashboard", label:"Dashboard", icon:NavIcons.Dashboard },
    { id:"Athletes",  label:"Athletes",  icon:NavIcons.Athletes,  badge:athletes.length },
    { id:"Agencies",  label:"Agencies",  icon:NavIcons.Agencies },
    { id:"Teams",     label:"Teams",     icon:NavIcons.Teams },
    { id:"Pipeline",  label:"Pipeline",  icon:NavIcons.Pipeline },
    { id:"Contacts",  label:"Contacts",  icon:NavIcons.Contacts,  badge:contacts.length },
    { id:"Activity",  label:"Activity",  icon:NavIcons.Activity },
    { id:"Export",    label:"Export",    icon:NavIcons.Export },
  ];

  const SB_W = sbCollapsed ? 68 : 220;

  if (loading) return (
    <div style={{ height:"100vh", background:BG, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
      <AtlauaJaguarLogo size={72}/>
      <div style={{ color:T, fontSize:14, marginTop:20, letterSpacing:"0.12em", fontWeight:600 }}>LOADING CRM...</div>
    </div>
  );

  return (
    <div style={{ display:"flex", height:"100vh", background:BG, color:TX1, fontFamily:"'Codec Pro','Questrial',system-ui,sans-serif", overflow:"hidden" }}>
      {/* ── SIDEBAR ── */}
      <aside style={{
        width:SB_W, background:SB, display:"flex", flexDirection:"column",
        borderRight:`1px solid ${BD}`, flexShrink:0, transition:"width 0.25s ease",
        boxShadow:"4px 0 24px rgba(0,0,0,0.4)", position:"relative", zIndex:10, overflow:"hidden"
      }}>
        {/* Logo */}
        <div style={{ padding:`24px ${sbCollapsed?14:20}px 20px`, borderBottom:`1px solid ${BD}`,
          display:"flex", alignItems:"center", gap:12, overflow:"hidden" }}>
          <div style={{ flexShrink:0 }}>
            <AtlauaJaguarLogo size={40}/>
          </div>
          {!sbCollapsed && (
            <div style={{ overflow:"hidden" }}>
              <div style={{ color:TX1, fontSize:17, fontWeight:800, letterSpacing:"-0.01em", whiteSpace:"nowrap" }}>ATLAUA</div>
              <div style={{ color:TX3, fontSize:10, letterSpacing:"0.15em", whiteSpace:"nowrap" }}>SPORTS CRM</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"14px 10px", overflowY:"auto" }}>
          {navItems.map(({ id, label, icon, badge }) => {
            const active = page===id;
            return (
              <div key={id} onClick={()=>setPage(id)} title={sbCollapsed?label:undefined}
                style={{ display:"flex", alignItems:"center", gap:12, padding:`10px ${sbCollapsed?14:14}px`,
                  borderRadius:10, cursor:"pointer", marginBottom:2, position:"relative",
                  justifyContent:sbCollapsed?"center":"flex-start",
                  background: active ? T+"18" : "transparent",
                  color: active ? T : TX2,
                  borderLeft: active ? `3px solid ${T}` : "3px solid transparent",
                  transition:"all 0.18s" }}
                onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background=C2; e.currentTarget.style.color=TX1; }}}
                onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=TX2; }}}>
                <div style={{ flexShrink:0 }}>{icon}</div>
                {!sbCollapsed && <span style={{ fontSize:13, fontWeight:active?700:500, flex:1 }}>{label}</span>}
                {badge>0 && !sbCollapsed && (
                  <span style={{ background:T+"33", color:T, borderRadius:20, padding:"1px 8px", fontSize:10, fontWeight:700 }}>{badge}</span>
                )}
                {badge>0 && sbCollapsed && (
                  <div style={{ position:"absolute", top:6, right:8, width:8, height:8, borderRadius:"50%", background:T }}/>
                )}
              </div>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div style={{ padding:"14px 10px", borderTop:`1px solid ${BD}` }}>
          <div onClick={()=>setSbCollapsed(c=>!c)}
            style={{ display:"flex", alignItems:"center", justifyContent:sbCollapsed?"center":"flex-end",
              gap:8, padding:"8px 14px", borderRadius:10, cursor:"pointer", color:TX3,
              transition:"all 0.18s" }}
            onMouseEnter={e=>{ e.currentTarget.style.color=TX1; e.currentTarget.style.background=C2; }}
            onMouseLeave={e=>{ e.currentTarget.style.color=TX3; e.currentTarget.style.background="transparent"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {sbCollapsed
                ? <><path d="M13 5l7 7-7 7"/><path d="M4 5l7 7-7 7"/></>
                : <><path d="M11 5l-7 7 7 7"/><path d="M20 5l-7 7 7 7"/></>}
            </svg>
            {!sbCollapsed && <span style={{ fontSize:12 }}>Collapse</span>}
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Top bar */}
        <header style={{ height:56, background:SB, borderBottom:`1px solid ${BD}`,
          display:"flex", alignItems:"center", padding:"0 28px", gap:14, flexShrink:0, zIndex:9 }}>
          <div style={{ color:TX2, fontSize:13, fontWeight:600 }}>{page}</div>
          <div style={{ flex:1, maxWidth:380, marginLeft:24 }}>
            <SearchInput value={globalQ} onChange={setGlobalQ} placeholder="Global search..."/>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
            <Btn size="sm" onClick={()=>setShowAdd(true)} icon="+">New</Btn>
            <div style={{ width:32, height:32, borderRadius:"50%", background:T+"22",
              border:`1px solid ${T}44`, display:"flex", alignItems:"center", justifyContent:"center",
              color:T, fontSize:13, fontWeight:700, cursor:"pointer" }}>A</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
          {page==="Dashboard" && <Dashboard athletes={athletes}/>}
          {page==="Athletes"  && <Athletes  athletes={athletes} onSelect={setSel} onImport={importBatch}/>}
          {page==="Agencies"  && <Agencies  athletes={athletes} onSelect={setSel}/>}
          {page==="Teams"     && <Teams     athletes={athletes} onSelect={setSel}/>}
          {page==="Pipeline"  && <Pipeline  athletes={athletes} onUpdate={upd} onSelect={setSel}/>}
          {page==="Contacts"  && <Contacts  contacts={contacts} onImport={importBatch}/>}
          {page==="Activity"  && <Activity  athletes={athletes}/>}
          {page==="Export"    && <Export    athletes={athletes} contacts={contacts}/>}
        </main>
      </div>

      {/* Modals */}
      {sel     && <Panel    a={sel} onClose={()=>setSel(null)} onSave={upd}/>}
      {showAdd && <AddModal onClose={()=>setShowAdd(false)} onAdd={addNew}/>}
    </div>
  );
}
